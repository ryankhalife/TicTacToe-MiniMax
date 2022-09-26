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
  const move = e.target.closest(".row div").id[1];
  if (grid[move] || whose_turn != player || game_over) return;
  playMove(move);
};

const playMove = (move) => {
  if (game_over) return;

  grid[move] = whose_turn;
  document.getElementById(`c${move}`).classList.add(whose_turn);
  whose_turn = whose_turn == "red" ? "yellow" : "red";
  move_played++;
  checkWinners();

  if (move_played < 9 && whose_turn != player) playRandomMove();
};

const playRandomMove = () => {
  if (game_over) return;
  let move = Math.floor(Math.random() * 9);
  while (grid[move]) move = Math.floor(Math.random() * 9);
  playMove(move);
};

const checkWinners = () => {
  for (let wc of winning_combinations) {
    if (grid[wc[0]] && grid[wc[0]] == grid[wc[1]] && grid[wc[0]] == grid[wc[2]]) {
      game_over = 1;
      if (grid[wc[0]] == "red") red.innerText = `Red: ${++red_nb}`;
      else yellow.innerText = `Yellow: ${++yellow_nb}`;
      cells.forEach((cell) => {
        if (!wc.includes(parseInt(cell.id[1]))) cell.classList.add("brightness-low");
      });
      break;
    }
  }
  if (!game_over && move_played >= 9) {
    game_over = 1;
    draw.innerText = `Draw: ${++draw_nb}`;
    cells.forEach((cell) => cell.classList.add("brightness-low"));
  }
};

const playAgain = () => {
  grid.fill("");
  whose_turn = "red";
  move_played = 0;
  game_over = 0;
  cells.forEach((cell) => {
    cell.classList.remove("red", "yellow", "brightness-low");
  });
};

const cells = document.querySelectorAll(".row div");
cells.forEach((cell) => cell.addEventListener("click", handleClick));
