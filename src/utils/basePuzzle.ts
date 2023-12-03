const template = `import getInput from "../../utils/getInput";
import { fileURLToPath } from "url";
import { basename, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const day = basename(dirname(__filename));

const input = getInput(day);

function solveQuiz1() {
  return "solution 1";
}

function solveQuiz2() {
  return "solution 2";
}

export { solveQuiz1, solveQuiz2 };
`;

export default template;
