const gameboardModule = (function () {
  const gameboard = {
    board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  };
  const markers = gameboard.board;

  function renderBoard() {
    // For each item of the array, make the text content of its html counterpart the same as the index value
    markers.forEach((marker, index) => {
      let boardSegment = document.getElementById(`segment${index + 1}`);
      boardSegment.textContent = marker;
    });
  }
  renderBoard();

  for (let i = 0; i < 9; i++) {
    let segment = document.getElementById(`segment${i + 1}`);
    segment.addEventListener("click", () => {
      makePlay(segment);
    });
  }

  function makePlay(segment) {
    if (segment.textContent === " ") {
      let playerMarker = playersModule.getMarker();
      segment.textContent = playerMarker;

      const arrayIndex = Number(segment.id.replace("segment", "")) - 1;
      markers.splice(arrayIndex, 1, playerMarker);

      gameModule.isGameOver(markers);

      playersModule.switchPlayers();
    } else {
      alert("This place is already taken, try another!");
    }
  }

  const resetButton = document.getElementById("resetBtn");
  resetButton.addEventListener("click", () => {
    markers.forEach((marker, index) => {
      markers[index] = " ";
    });
    renderBoard();
  });

  return {
    markers,
  };
})();

const playersModule = (function () {
  function createPlayer(name, marker) {
    return {
      name,
      marker,
    };
  }

  const player1 = createPlayer("player1", "X");
  const player2 = createPlayer("player2", "O");
  let currentPlayer = player1;

  function switchPlayers() {
    const turnIndicators = document.querySelectorAll(".turnIndicator");

    function switchPlayerTurn() {
      turnIndicators.forEach(indicator => {
        indicator.classList.toggle("visible");
      });
    }

    if (currentPlayer === player1) {
      currentPlayer = player2;
      switchPlayerTurn();
    } else {
      currentPlayer = player1;
      switchPlayerTurn();
    }
  }

  function getMarker() {
    return currentPlayer.marker;
  }

  return {
    getMarker,
    switchPlayers,
    currentPlayer,
  };
})();

const gameModule = (function () {
  function isGameOver(array) {
    function checkForWin(condition) {
      if (
        array[condition[0]] !== " " &&
        array[condition[0]] === array[condition[1]] &&
        array[condition[0]] === array[condition[2]]
      ) {
        //setTimeout so alert doesn't fire before board renders final marker.
        setTimeout(function () {
          alert("Winner!");
        }, 300);
        return true;
      } else {
        return false;
      }
    }

    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    /* Exits loop when game is over to prevent further unnecessary checks 
    and multiple "draw" alerts. */
    const gameOver = winConditions.some((condition) => {
      return checkForWin(condition);
    });

    function checkForDraw() {
      if (!array.includes(" ")) {
        setTimeout(function () {
          alert("Draw!");
        }, 300);
      }
    }

    if (gameOver === false) {
      checkForDraw();
    }
  }

  return {
    isGameOver,
  };
})();
