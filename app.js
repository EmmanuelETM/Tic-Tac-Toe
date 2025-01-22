const Cell = function() {
  let value = '';
  
  const getValue = () => value;
  const addMark = (mark) => {
    value = mark;
  }

  return {
    getValue, 
    addMark
  }
}

const gameBoard = (function() {
  const board = new Array(9).fill('');
  
  const getBoard = () => board;

  const fillSpot = (index, mark) => {
    if(board[index] === '' && index < board.length && index >= 0){
      board[index] = mark;
    }
    else {
      console.log('invalid move');
    }
  }

  fillSpot(2, 'X'); 
  return {getBoard};
})(); 

console.log(gameBoard.getBoard())
const players = (function() {
  return {
    player1: {
      name: 'elpepe',
      mark: 'X'
    },
    player2: {
      name: 'mariaairam',
      mark: 'O'
    },
  }
})();


const GameController = (function() {

  let currentPlayer = players.player1;

  const getCurrentPlayer = () => currentPlayer;
  const switchPlayer = () => {
    currentPlayer = currentPlayer === players.player1 ? players.player2 : players.player1;
  }

  const playRound = () => {
    
  }


})();

const game = (function() {

})







