const grid = Array(9).fill("");
const player = "red";
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

const updateScore = (element, value) => (element.innerText = `${element.id}: ${value}`);

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
  whose_turn = whose_turn == "red" ? "yellow" : "red";
  move_played++;
  setTimeout(checkWinners, 500);
  if (move_played < 9 && whose_turn != player && !game_over) setTimeout(playComputerMove, 1000);
};

const playComputerMove = () => {
  let move = Math.floor(Math.random() * 9);
  while (grid[move]) move = Math.floor(Math.random() * 9);
  playMove(move);
};

const checkWinners = () => {
  for (let wc of winning_combinations) {
    if (grid[wc[0]] && grid[wc[0]] == grid[wc[1]] && grid[wc[0]] == grid[wc[2]]) {
      gameOver();
      if (grid[wc[0]] == "red") {
        red.innerText = `Red: ${++red_nb}`;
        localStorage.setItem("red", red_nb);
      } else {
        yellow.innerText = `Yellow: ${++yellow_nb}`;
        localStorage.setItem("yellow", yellow_nb);
      }
      cells.forEach((cell) => {
        if (!wc.includes(parseInt(cell.id[1]))) cell.classList.add("lose");
        else cell.classList.add("win");
      });
      break;
    }
  }
  if (!game_over && move_played >= 9) {
    gameOver();
    draw.innerText = `Draw: ${++draw_nb}`;
    localStorage.setItem("draw", draw_nb);
    cells.forEach((cell) => cell.classList.add("lose"));
  }
};

const playAgain = () => {
  grid.fill("");
  who_starts = who_starts == "red" ? "yellow" : "red";
  localStorage.setItem("who_starts", who_starts);
  whose_turn = who_starts;
  move_played = 0;
  game_over = 0;
  cells.forEach((cell) => {
    cell.classList.remove("red", "yellow", "lose", "win");
  });
  if (who_starts == "yellow") setTimeout(playComputerMove, 1000);
};

const gameOver = () => {
  game_over = 1;
};

const reset = () => {
  red_nb = 0;
  yellow_nb = 0;
  draw_nb = 0;
  localStorage.clear();
  red.innerText = `Red: 0`;
  yellow.innerText = `Yellow: 0`;
  draw.innerText = `Draw: 0`;
  playAgain();
};

const cells = document.querySelectorAll(".row div");
cells.forEach((cell) => cell.addEventListener("click", handleClick));
cells.forEach((cell) => cell.addEventListener("mousemove", handleMouseMove));
cells.forEach((cell) => cell.addEventListener("mouseleave", handleMouseLeave));

updateScore(yellow, yellow_nb);
updateScore(red, red_nb);
updateScore(draw, draw_nb);

if (who_starts === "yellow") setTimeout(playComputerMove, 1000);
