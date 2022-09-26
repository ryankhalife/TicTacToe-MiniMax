// Red: 1; Blue: 2; Red start

const grid = Array(9).fill(0);
const player = "red";
let whose_turn = "red";
let move_played = 0;

const cells = document.querySelectorAll(".row div");

const handleClick = (e) => {
  const cell_number = e.target.closest(".row div").id[1];
  if (grid[cell_number] || whose_turn != player) return;

  grid[cell_number] = whose_turn == "red" ? 1 : 2;
  document.getElementById(
    `c${cell_number}`
  ).style.backgroundImage = `url(assets/${whose_turn}.png)`;
  whose_turn = whose_turn == "red" ? "yellow" : "red";
  move_played++;

  if (move_played < 9) playRandomMove();

  console.log(grid);
};

const playRandomMove = () => {
  let move = Math.floor(Math.random() * 9);
  while (grid[move]) move = Math.floor(Math.random() * 9);

  grid[move] = whose_turn == "red" ? 1 : 2;
  document.getElementById(`c${move}`).style.backgroundImage = `url(assets/${whose_turn}.png)`;
  whose_turn = whose_turn == "red" ? "yellow" : "red";
  move_played++;
};

cells.forEach((cell) => cell.addEventListener("click", handleClick));
