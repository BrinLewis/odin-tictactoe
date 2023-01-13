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

      gameModule.checkWin(markers);

      playersModule.switchPlayers();
    } else {
      alert("This place is already taken, try another!");
    }
  }
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

  const player1 = createPlayer("mark", "X");
  const player2 = createPlayer("john", "O");
  let currentPlayer = player1;

  function switchPlayers() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
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
  function checkWin(array) {
    function isGameOver(condition) {
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
      } else if (!array.includes(" ")) {
        setTimeout(function () {
          alert("Draw!");
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
    winConditions.some((condition) => {
      return isGameOver(condition);
    });
  }

  return {
    checkWin,
  };
})();

/* 
What Each Module Does
  gameboardModule
    -gameboard array
    -render function to display the array on the browser in correct places
    -click handler loop for event listeners on segments
    -makePlay function to update the array with the playmaker's marker and render it on browser
  playersModule
    -createPlayer function to create a player object with name, marker and shared makePlay method
    -create the players, probably later on a button click with a name input
  gameModule
    -check for 3 in a row (winner) and announce winner, then reset board
*/
