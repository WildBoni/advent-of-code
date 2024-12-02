import { mkdirSync, writeFileSync, copyFileSync, existsSync, unlinkSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

import templatePuzzle from "./basePuzzle";

import download from "./downloadInput";

const AOC_URL = "https://adventofcode.com/2024/day";
const AOC_TOKEN = process.env.AOC_TOKEN || "";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const requestedDay = process.argv[2];
const requestedDayPath = `src/days/day${requestedDay}`;
const requestedDayTestPath = `src/tests/day${requestedDay}`;

if (!AOC_TOKEN) {
  console.error("No session token defined! Set it up the variable AOC_TOKEN in the file .env");
  process.exit(1);
}
if (!requestedDay) {
  console.error("No day given! Please specify a day, eg: npm run get-day 1");
  process.exit(2);
}
if (+requestedDay < 1 || +requestedDay > 25) {
  console.error("Incorrect day! Please use an integer between 1 and 25");
  process.exit(2);
}

const generateReadme = async (requestedDay: string) => {
  // Retrieve the page data for the requested day
  const page = await download({
    url: `${AOC_URL}/${requestedDay}`,
    token: AOC_TOKEN,
  });

  const pageData = page as string;
  const re = /<article class="day-desc">[\s\S]+?<\/article>/g;

  const readme: string = (pageData.match(re) || [])
    .join("")
    .replace(
      /<pre><code>(?=[^<]*?<em)([\s\S]+?)<\/code><\/pre>/g,
      (_, m1) => `<pre>${m1.replace(/<(\/?)em>/g, "<$1b>")}</pre>`,
    )
    .replace(/<pre><code>\n*|\n*<\/code><\/pre>/g, "\n```\n")
    .replace(/<code><em>([^<]+)<\/em><\/code>/g, "**`$1`**")
    .replace(/<\/?code>/g, "`")
    .replace(/<\/?em>/g, "**")
    .replace(/<p>/g, "\n")
    .replace(/<\/p>|<\/li>/g, "")
    .replace(/<\/?ul>/g, "")
    .replace(/<li>/g, "* ")
    .replace(/<a .*?href="([^"]+)".*?>([^<]+)<\/a>/g, "[$2]($1)")
    .replace(/ ---<\/h2>/g, "\n")
    .replace(/<\/?article[^>]*>/g, "")
    .replace('<h2 id="part2">---', "\n\n##")
    .replace(/<h2>--- ([^\n]+)/, "# $1\n\n## Part One");

  return readme;
};

if (!existsSync(requestedDayPath)) {
  // If the day folder doesn't exist, create it and set up the puzzle
  mkdirSync(requestedDayPath);
  writeFileSync(`${requestedDayPath}/puzzle.ts`, templatePuzzle);

  download({
    url: `${AOC_URL}/${requestedDay}/input`,
    token: AOC_TOKEN,
  }).then(inputData => {
    writeFileSync(`${requestedDayPath}/input.txt`, inputData as string);
  });

  mkdirSync(`${requestedDayTestPath}`);
  copyFileSync(`${__dirname}/baseTest.ts`, `${requestedDayTestPath}/puzzle.test.ts`);
} else {
  // If the day folder already exists, simply delete the existing readme and generate a new one
  // This is also necessary to retrieve ***PART 2***, as it only appears after completing ***PART 1***.
  if (existsSync(`${requestedDayPath}/readme.md`)) {
    unlinkSync(`${requestedDayPath}/readme.md`); // Delete the existing readme
  }
}

// Generate the readme and write it to the file
generateReadme(requestedDay).then(readme => {
  writeFileSync(`${requestedDayPath}/readme.md`, readme);
});
