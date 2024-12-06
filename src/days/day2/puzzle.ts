import getInput from "../../utils/getInput";
import { fileURLToPath } from "url";
import { basename, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const day = basename(dirname(__filename));

const input = getInput(day);

const lines = input.split("\n");

function checkDirection(num: number, prevNum: number): "increasing" | "decreasing" {
  return num > prevNum ? "increasing" : "decreasing";
}

export function checkSequence(sequence: string): "safe" | "unsafe" {
  let prevNum: number | null = null;
  let safety: "safe" | "unsafe" | null = null;
  let prevDirection: "increasing" | "decreasing" | null = null;
  let dampenerUsed = false;

  const values = sequence.split(" ");
  for (const [i, num] of values.entries()) {
    // console.log(num);

    const currentValue = parseInt(num);

    if (i === 0) {
      prevNum = currentValue;
      // prevDirection = checkDirection(currentValue, prevNum!);
    }
    if (i > 0) {
      const direction = checkDirection(currentValue, prevNum!);
      if (i === 1) {
        prevDirection = direction;
      }
      if (prevDirection && direction !== prevDirection) {
        if (!dampenerUsed) {
          dampenerUsed = true;
          safety = "safe";
        } else {
          safety = "unsafe";
          break;
        }
      }
      const delta = Math.abs(prevNum! - currentValue);
      if (delta < 1 || delta > 3) {
        if (!dampenerUsed) {
          dampenerUsed = true;
          safety = "safe";
        } else {
          safety = "unsafe";
          break;
        }
      }
      prevNum = currentValue;
      safety = "safe";
    }
  }
  return safety!;
}

function solveQuiz1() {
  const safety = lines.map(line => checkSequence(line));
  const safeLines = safety.filter(s => s === "safe");
  return safeLines.length;
  return;
}

function solveQuiz2() {
  return "solution 2";
}

export { solveQuiz1, solveQuiz2 };
