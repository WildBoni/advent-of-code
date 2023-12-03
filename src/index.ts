const puzzleDay = 1;

(async () => {
  const { solveQuiz1, solveQuiz2 } = await import(`./days/day${puzzleDay}/puzzle`);

  console.log(solveQuiz1());
  console.log(solveQuiz2());
})();
