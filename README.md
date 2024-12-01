# Advent Of Code 2024 boilerplate

This is a Node.js environment for running and testing your AOC2024 code!

## How to use it

- login to https://adventofcode.com/ and get your session token from cookies using your browser devtools (after logging in, you will find a session cookie: its value is your token that needs to be copied)
- paste your token in a .env file, eg: `AOC_TOKEN=myTokenCode`
- get a new day puzzle with npm get-day. You need to specify the day number,eg: `npm get-day 1`.
  This will create a days/day folder with:
  - readme.md file containing instructions containing AoC assignment of the day
  - input.txt containing AoC input of the day
  - puzzle.ts with:
    - an input const that holds the input, ready to be used
    - two solveQuiz functions that return the solution string to index.ts. You have to return the right solution, of course!
  - tests/test folder with a predefined test.
- Start coding in TypeScript with hot reload: `npm run dev`.
- Set your puzzleDay variable inside index.ts and start coding your solution inside days/day folder.
- Write your test and run them:
  - `npm run ` will run every test
  - `DAY=1 npm run test-day` will run tests for day 1
- That's it: happy coding!

## Tech stack

Node.js, ts-node, nodemon, native test runner, ESLint, Prettier
