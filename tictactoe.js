// Red: 1; Blue: 2; Red start

let grid = Array(9).fill(0);
let whose_turn = "red";

const cells = document.querySelectorAll(".row div");

const handleClick = (e) => {
  const cell_number = e.target.closest(".row div").id[1];
  if (grid[cell_number]) return;

  grid[cell_number] = whose_turn == "red" ? 1 : 2;
  document.getElementById(`c${cell_number}`).innerHTML = `<img src="assets/${whose_turn}.png"/>`;

  whose_turn = whose_turn == "red" ? "yellow" : "red";
  console.log(grid);
};

cells.forEach((cell) => cell.addEventListener("click", handleClick));
