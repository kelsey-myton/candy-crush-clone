document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 8;
  const candies = [];
  const candyColors = ["red", "yellow", "blue", "pink", "orange", "purple"];
  let choosenCandyColor;
  let swapCandyColor;
  let choosenCandyId;
  let swapCandyId;

  // Create game board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const candy = document.createElement("div");
      let randomColor = Math.floor(Math.random() * candyColors.length);
      candy.style.backgroundColor = candyColors[randomColor];
      candy.setAttribute("draggable", true);
      candy.setAttribute("id", i);
      candy.setAttribute("class", "gridItem");
      grid.appendChild(candy);
      candies.push(candy);
    }
  }
  createBoard();

  // Drag candies
  candies.forEach((candy) => {
    candy.addEventListener("dragstart", dragStart);
    candy.addEventListener("dragend", dragEnd);
    candy.addEventListener("dragover", dragOver);
    candy.addEventListener("dragenter", dragEnter);
    candy.addEventListener("dragleave", dragLeave);
    candy.addEventListener("drop", dragDrop);
  });

  function dragStart() {
    choosenCandyColor = this.style.backgroundColor;
    choosenCandyId = parseInt(this.id);
    console.log(this.id, "dragStart");
  }
  function dragEnd() {
    console.log(this.id, "dragEnd");
    let validMoves = [
      choosenCandyId - 1,
      choosenCandyId + 1,
      choosenCandyId - width,
      choosenCandyId + width,
    ];

    // Allow valid moves
    let isValidMove = validMoves.includes(swapCandyId);

    if (swapCandyId && isValidMove) {
      swapCandyId = null;
    } else if (swapCandyId && !isValidMove) {
      candies[swapCandyId].style.backgroundColor = swapCandyColor;
      candies[choosenCandyId].style.backgroundColor = choosenCandyColor;
    } else {
      candies[choosenCandyId].style.backgroundColor = choosenCandyColor;
    }
  }
  function dragOver(e) {
    e.preventDefault();
    console.log(this.id, "dragOver");
  }
  function dragEnter(e) {
    e.preventDefault();
    console.log(this.id, "dragEnter");
  }
  function dragLeave() {
    console.log(this.id, "dragLeave");
  }
  function dragDrop() {
    swapCandyColor = this.style.backgroundColor;
    swapCandyId = parseInt(this.id);
    this.style.backgroundColor = choosenCandyColor;
    candies[choosenCandyId].style.backgroundColor = swapCandyColor;
    console.log(swapCandyId, "dragDrop");
  }
});
