document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 8;
  const candies = [];
  const candyColors = ["red", "yellow", "blue", "pink", "orange", "purple"];
  const scoreDisplay = document.getElementById("score");
  let choosenCandyColor;
  let swapCandyColor;
  let choosenCandyId;
  let swapCandyId;
  let score = 0;

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

  // Checking for matches

  function checkForThreeInRow() {
    for (i = 0; i < 61; i++) {
      // Don't check the last 2 columns
      if (i % width === width - 1 || i % width === width - 2) {
        continue;
      }
      let threeInRow = [i, i + 1, i + 2];
      let rowColor = candies[i].style.backgroundColor;
      let isBlank = rowColor === "";

      if (
        threeInRow.every(
          (candy) =>
            candies[candy].style.backgroundColor === rowColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        threeInRow.forEach((candy) => {
          candies[candy].style.backgroundColor = "";
        });
      }
    }
  }
  checkForThreeInRow();

  function checkForThreeInColumn() {
    for (i = 0; i < 47; i++) {
      let threeInColumn = [i, i + width, i + width * 2];
      let columnColor = candies[i].style.backgroundColor;
      let isBlank = columnColor === "";

      if (
        threeInColumn.every(
          (candy) =>
            candies[candy].style.backgroundColor === columnColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        threeInColumn.forEach((candy) => {
          candies[candy].style.backgroundColor = "";
        });
      }
    }
  }

  checkForThreeInColumn();

  function checkForFourInRow() {
    for (i = 0; i < 60; i++) {
      // Don't check the last 3 columns
      if (
        i % width === width - 1 ||
        i % width === width - 2 ||
        i % width === width - 3
      ) {
        continue;
      }
      let fourInRow = [i, i + 1, i + 2, i + 3];
      let rowColor = candies[i].style.backgroundColor;
      let isBlank = rowColor === "";

      if (
        fourInRow.every(
          (candy) =>
            candies[candy].style.backgroundColor === rowColor && !isBlank
        )
      ) {
        score += 5;
        fourInRow.forEach((candy) => {
          candies[candy].style.backgroundColor = "";
        });
      }
    }
  }
  checkForFourInRow();

  function checkForFourInColumn() {
    for (i = 0; i < 39; i++) {
      let fourInColumn = [i, i + width, i + width * 2, i + width * 3];
      let columnColor = candies[i].style.backgroundColor;
      let isBlank = columnColor === "";

      if (
        fourInColumn.every(
          (candy) =>
            candies[candy].style.backgroundColor === columnColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score
        fourInColumn.forEach((candy) => {
          candies[candy].style.backgroundColor = "";
        });
      }
    }
  }

  checkForFourInColumn();

  function dropCandies() {
    for (i = 0; i < 55; i++) {
      if (candies[i + width].style.backgroundColor === "") {
        candies[i + width].style.backgroundColor =
          candies[i].style.backgroundColor;
        candies[i].style.backgroundColor = "";
        const isFirstRow = 0 <= i && i <= 7;
        if (isFirstRow && candies[i].style.backgroundColor === "") {
          const randomCandyColor = Math.floor(Math.random() * candyColors.length);
          candies[i].style.backgroundColor = candyColors[randomCandyColor];
        }
      }
    }
  }

  window.setInterval(function () {
    dropCandies();
    checkForFourInRow();
    checkForFourInColumn();
    checkForThreeInRow();
    checkForThreeInColumn();
  }, 200);
});
