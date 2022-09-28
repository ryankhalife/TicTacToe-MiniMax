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
let whose_turn = "red";
let move_played = 0;
let game_over = 0;
let yellow_nb = 0;
let red_nb = 0;
let draw_nb = 0;

const yellow = document.getElementById("yellow");
const red = document.getElementById("red");
const draw = document.getElementById("draw");

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
  if (game_over) return;

  grid[cell_nb] = whose_turn;
  const cell = document.getElementById(`c${cell_nb}`);
  cell.classList.add(whose_turn);
  cell.classList.remove("ghost");
  whose_turn = whose_turn == "red" ? "yellow" : "red";
  move_played++;
  setTimeout(checkWinners, 500);
  if (move_played < 9 && whose_turn != player) setTimeout(playComputerMove, 1000);
};

const playComputerMove = () => {
  if (game_over) return;
  let move = Math.floor(Math.random() * 9);
  while (grid[move]) move = Math.floor(Math.random() * 9);
  playMove(move);
};

const checkWinners = () => {
  for (let wc of winning_combinations) {
    if (grid[wc[0]] && grid[wc[0]] == grid[wc[1]] && grid[wc[0]] == grid[wc[2]]) {
      gameOver();
      if (grid[wc[0]] == "red") red.innerText = `Red: ${++red_nb}`;
      else yellow.innerText = `Yellow: ${++yellow_nb}`;
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
    cells.forEach((cell) => cell.classList.add("lose"));
  }
};

const playAgain = () => {
  grid.fill("");
  whose_turn = "red";
  move_played = 0;
  game_over = 0;
  cells.forEach((cell) => {
    cell.classList.remove("red", "yellow", "lose", "win");
  });
};

const gameOver = () => {
  game_over = 1;
};

const cells = document.querySelectorAll(".row div");
cells.forEach((cell) => cell.addEventListener("click", handleClick));
cells.forEach((cell) => cell.addEventListener("mousemove", handleMouseMove));
cells.forEach((cell) => cell.addEventListener("mouseleave", handleMouseLeave));
