// Red: 1; Blue: 2; Red start

const grid = Array(9).fill(0);
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

const cells = document.querySelectorAll(".row div");

const handleClick = (e) => {
  const move = e.target.closest(".row div").id[1];
  if (grid[move] || whose_turn != player || game_over) return;

  playMove(move);

  if (move_played < 9) playRandomMove();

  console.log(grid);
};

const playMove = (move) => {
  if (move_played > 9 || game_over) return;

  grid[move] = whose_turn == "red" ? 1 : 2;
  document.getElementById(`c${move}`).style.backgroundImage = `url(assets/${whose_turn}.png)`;
  whose_turn = whose_turn == "red" ? "yellow" : "red";
  move_played++;
  checkWinners();
};

const playRandomMove = () => {
  let move = Math.floor(Math.random() * 9);
  while (grid[move]) move = Math.floor(Math.random() * 9);
  playMove(move);
};

const checkWinners = () => {
  winning_combinations.forEach((cmb) => {
    if (grid[cmb[0]] != 0 && grid[cmb[0]] == grid[cmb[1]] && grid[cmb[0]] == grid[cmb[2]]) {
      game_over = 1;
      cmb.forEach((nb) => {
        document.getElementById(`c${nb}`).style.backgroundColor = grid[nb] == 1 ? "red" : "yellow";
      });
      return;
    }
  });
};

cells.forEach((cell) => cell.addEventListener("click", handleClick));
