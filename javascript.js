// Store gameboard as array inside of a Gameboard object.
// Players will be stored in objects
// Will need object to control the flow of the game itself

const gameboardModule = (function () {
  const gameboard = {
    board: ["X", "X", "O", "O", "O", "X", "X", "X", "O"],
  };

  function renderBoard() {
    // For each item of the array, make the text content of its html counterpart the same as the index value
    const markers = gameboard.board;
    markers.forEach((marker, index) => {
      let boardSegment = document.getElementById(`segment${index + 1}`);
      boardSegment.textContent = marker;
    });
  }
  renderBoard();

  function makePlay(player, segment) {

  }
})();


const playersModule = (function () {
  function createPlayer(name, marker) {
    return {
      name,
      marker,
    }
  }
  
  const mark = createPlayer("mark", "X");
  const john = createPlayer("john", "O");

  return {
    mark,
    john,
  }
})();

/*makePlay should go in gameModule but be accessible by the player objects so I 
can call player.makePlay() */
/* makePlay needs to get a reference to which board segment was clicked, then 
change the text content of that segment to whatever the players marker is */

/* clickHandler function to handle event listeners on the segments. On click 
it should get the player who clicked it and create a variable referencing which
segment was clicked, then run the makePlay function, using the player and segment
as parameters*/

/* 
What Each Module Does
  gameboardModule
    -gameboard array
    -render function to display the array on the browser in correct places
    -makePlay function to update the array with the playmaker's marker and render it on browser
  playersModule
    -createPlayer function to create a player object with name, marker and shared makePlay method
    -create the players, probably later on a button click with a name input
  gameModule
    -check for 3 in a row (winner) and announce winner, then reset board
*/