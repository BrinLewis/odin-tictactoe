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
})();

function player(name) {
  return {};
}
