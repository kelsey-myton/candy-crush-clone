document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 8;
  const candies = [];
  const candyColors = ["red", "yellow", "blue", "pink", "orange", "purple"];

  // Create game board
  function createBoard() {
    for (let i = 0; i < width; i++) {
      candies.push([]);
      for (let j = 0; j < width; j++) {
        const candy = document.createElement("div");
        let randomColor = Math.floor(Math.random() * candyColors.length);
        candy.style.backgroundColor = candyColors[randomColor];
        candy.setAttribute("class", "gridItem");
        grid.appendChild(candy);
        candies[i].push(candy);
      }
    }
  }
  createBoard();
});
