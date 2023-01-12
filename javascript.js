// Store gameboard as array inside of a Gameboard object.
// Players will be stored in objects
// Will need object to control the flow of the game itself

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

      const arrayIndex = (Number((segment.id).replace("segment", ""))) - 1;
      markers.splice(arrayIndex, 1, playerMarker);

      playersModule.switchPlayers();
    } else {
      alert("This place is already taken, try another!");
    }
  }
  return {
    markers,
  }
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
  let currentPlayer = player1; //default

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
  };
})();

/*makePlay should go in gameModule but be accessible by the player objects so I 
can call player.makePlay() */
/* makePlay needs to get a reference to which board segment was clicked, then 
change the text content of that segment to whatever the players marker is */

/* getPlayer should define the current player as a variable who's value changes
each time a play is made. */

/* clickHandler function to handle event listeners on the segments. On click 
it should create a variable referencing which segment was clicked, then run the 
makePlay function with the reference as a parameter */

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
