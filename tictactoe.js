const grid = Array(9).fill("");
const player = "red";
const computer = "yellow";
const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let red_nb = localStorage.getItem("red") ?? 0;
let yellow_nb = localStorage.getItem("yellow") ?? 0;
let draw_nb = localStorage.getItem("draw") ?? 0;
let who_starts = localStorage.getItem("who_starts") ?? "red";
let whose_turn = who_starts;
let move_played = 0;
let game_over = 0;

const yellow = document.getElementById("yellow");
const red = document.getElementById("red");
const draw = document.getElementById("draw");

const updateScore = (element, value) => (element.innerText = `${value}`);

const handleClick = (e) => {
  const cell_nb = e.target.closest(".row div").id[1];
  if (grid[cell_nb] || whose_turn != player || game_over) return;
  playMove(cell_nb);
};

const handleMouseMove = (e) => {
  if (game_over || whose_turn != player || grid[e.target.closest(".row div").id[1]]) return;
  e.target.classList.add("ghost");
};

const handleMouseLeave = (e) => {
  const cell_nb = e.target.closest(".row div").id[1];
  if (grid[cell_nb]) return;
  e.target.classList.remove("ghost");
};

const playMove = (cell_nb) => {
  grid[cell_nb] = whose_turn;
  const cell = document.getElementById(`c${cell_nb}`);
  cell.classList.add(whose_turn);
  cell.classList.remove("ghost");
  whose_turn = whose_turn === player ? computer : player;
  move_played++;
  checkGameOver();
  if (move_played < 9 && whose_turn != player && !game_over) setTimeout(playComputerMove, 1000);
};

const minimax = (isMaximizing = false) => {
  const boardStatus = getGridStatus();
  if (boardStatus?.winner === computer) return 10;
  if (boardStatus?.winner === player) return -10;
  if (boardStatus?.tie) return 0;

  if (isMaximizing) {
    let best = -1000;
    for (let i = 0; i < 9; i++) {
      if (!grid[i]) {
        grid[i] = computer;
        best = Math.max(best, minimax(!isMaximizing));
        grid[i] = "";
      }
    }
    return best;
  } else {
    let best = 1000;
    for (let i = 0; i < 9; i++) {
      if (!grid[i]) {
        grid[i] = player;
        best = Math.min(best, minimax(!isMaximizing));
        grid[i] = "";
      }
    }
    return best;
  }
};

const playComputerMove = () => {
  let move;
  let best = -1000;
  for (let i = 0; i < 9; i++) {
    if (!grid[i]) {
      grid[i] = computer;
      moveScore = Math.max(best, minimax());
      grid[i] = "";

      if (moveScore > best) {
        best = moveScore;
        move = i;
      }
    }
  }
  playMove(move);
};

const handleGameOver = (wc = null, winner = null) => {
  if (wc === null || winner === null) {
    updateScore(draw, ++draw_nb);
    localStorage.setItem("draw", draw_nb);
    cells.forEach((cell) => cell.classList.add("lose"));
  } else {
    if (winner === player) {
      updateScore(red, ++red_nb);
      localStorage.setItem("red", red_nb);
    } else {
      updateScore(yellow, ++yellow_nb);
      localStorage.setItem("yellow", yellow_nb);
    }
    cells.forEach((cell) => {
      if (!wc.includes(parseInt(cell.id[1]))) cell.classList.add("lose");
      else cell.classList.add("win");
    });
  }
  who_starts = who_starts === player ? computer : player;
  localStorage.setItem("who_starts", who_starts);
  setTimeout(playAgain, 2000);
};

const checkGameOver = () => {
  const boardStatus = getGridStatus();
  if (boardStatus?.winner) {
    game_over = 1;
    setTimeout(() => handleGameOver(boardStatus.wc, boardStatus.winner), 1000);
  } else if (boardStatus?.tie) {
    game_over = 1;
    setTimeout(handleGameOver, 1000);
  }
};

const getGridStatus = () => {
  for (let wc of winning_combinations) {
    if (grid[wc[0]] && grid[wc[0]] === grid[wc[1]] && grid[wc[0]] === grid[wc[2]]) {
      return { winner: grid[wc[0]], wc: wc };
    }
  }
  if (!grid.includes("")) {
    return { tie: true };
  }
};

const playAgain = () => {
  grid.fill("");
  whose_turn = who_starts;
  move_played = 0;
  game_over = 0;
  cells.forEach((cell) => {
    cell.classList.remove("red", "yellow", "lose", "win");
  });
  if (who_starts === computer) setTimeout(playComputerMove, 1000);
};

const reset = () => {
  localStorage.clear();
  red_nb = 0;
  yellow_nb = 0;
  draw_nb = 0;
  who_starts = "red";
  whose_turn = who_starts;
  updateScore(red, red_nb);
  updateScore(yellow, yellow_nb);
  updateScore(draw, draw_nb);
  playAgain();
};

const cells = document.querySelectorAll(".row div");
cells.forEach((cell) => cell.addEventListener("click", handleClick));
cells.forEach((cell) => cell.addEventListener("mousemove", handleMouseMove));
cells.forEach((cell) => cell.addEventListener("mouseleave", handleMouseLeave));

updateScore(yellow, yellow_nb);
updateScore(red, red_nb);
updateScore(draw, draw_nb);

if (who_starts === computer) setTimeout(playComputerMove, 1000);
