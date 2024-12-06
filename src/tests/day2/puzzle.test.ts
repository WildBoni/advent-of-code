import { test } from "node:test";
import assert from "node:assert";
import { checkSequence } from "../../day2/puzzle.ts";

test("should be safe", () => {
  assert.strictEqual(checkSequence("1,2,3,3,4,5"), "safe");
});
