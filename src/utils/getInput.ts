import fs from "node:fs";

export default function getInput(day: string) {
  return fs.readFileSync(`${process.cwd()}/src/days/${day}/input.txt`, "utf-8");
}
