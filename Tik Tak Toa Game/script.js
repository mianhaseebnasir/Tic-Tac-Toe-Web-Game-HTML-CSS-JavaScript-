// Selecting all required elements
const selectBox = document.querySelector(".select-box"),
   selectXBtn = selectBox.querySelector(".playerX"),
   selectOBtn = selectBox.querySelector(".playerO"),
   playBoard = document.querySelector(".play-board"),
   allBox = document.querySelectorAll("section span"),
   players = document.querySelector(".players"),
   resultBox = document.querySelector(".result-box"),
   wonText = resultBox.querySelector(".won-text"),
   replayBtn = resultBox.querySelector(".btn button");

window.onload = () => {
   // Add click event to all boxes
   for (let i = 0; i < allBox.length; i++) {
      allBox[i].setAttribute("onclick", "clickedBox(this)");
   }

   // Choose X
   selectXBtn.onclick = () => {
      selectBox.classList.add("hide");
      playBoard.classList.add("show");
   }

   // Choose O
   selectOBtn.onclick = () => {
      selectBox.classList.add("hide");
      playBoard.classList.add("show");
      players.classList.add("active"); // O starts first
   }
}

let playerXIcon = "X";
let playerOIcon = "O";
let playerTurn = "X"; // Track current turn

function clickedBox(element) {
   if (element.innerText !== "") return;

   if (players.classList.contains("active")) {
      element.innerText = playerOIcon;
      playerTurn = "O";
      players.classList.remove("active");
   } else {
      element.innerText = playerXIcon;
      playerTurn = "X";
      players.classList.add("active");
   }

   checkWin();
}

// Function to check win/draw
function checkWin() {
   const winPatterns = [
      [0,1,2],[3,4,5],[6,7,8], // Rows
      [0,3,6],[1,4,7],[2,5,8], // Columns
      [0,4,8],[2,4,6]          // Diagonals
   ];

   let draw = true;

   winPatterns.forEach(pattern => {
      const a = allBox[pattern[0]].innerText;
      const b = allBox[pattern[1]].innerText;
      const c = allBox[pattern[2]].innerText;

      if (a !== "" && a === b && b === c) {
         // Show winner
         showResult(a);
         draw = false;
         return;
      }
   });

   // Check for draw
   allBox.forEach(box => {
      if (box.innerText === "") draw = false;
   });

   if (draw) {
      showResult("Draw");
   }
}

// Show result function
function showResult(winner) {
   resultBox.style.display = "block";
   if (winner === "Draw") {
      wonText.innerHTML = "Match Draw!";
   } else {
      wonText.innerHTML = "Player <p>" + winner + "</p> Won!";
   }
}

// Replay button functionality
replayBtn.onclick = () => {
   resultBox.style.display = "none";
   playBoard.classList.remove("show");
   selectBox.classList.remove("hide");
   players.classList.remove("active");

   allBox.forEach(box => box.innerText = "");
}