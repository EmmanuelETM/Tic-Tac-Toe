function Cell () {
    let value = "";

    const getMark = () => value;
    const setMark = (mark) => value = mark;

    return { getMark, setMark }
}

const GameBoard = (() => {
    const board = new Array(9).fill(null).map(() => Cell());

    const getBoard = () => board;

    const placeMark = (position, mark) => {
        const cell = board[position];

        if(cell.getMark() === ""){
            cell.setMark(mark);
            return true
        }else {
            return false;
        }
    }

    const resetBoard = () => board.forEach(cell => cell.setMark(""));

    return { getBoard, placeMark, resetBoard };
})();


const GameController = (()=> {
    let count = 0;
    const players = [
        {
            name: "john",
            mark: "X",
        },
        {
            name: "maria",
            mark: "O"
        }
    ]

    let activePlayer = players[0];

    let winCombos = [
        [0, 1, 2], // Top Row
        [3, 4, 5], // Middle Row
        [6, 7, 8], // Bottom Row
        [0, 3, 6], // Left Column
        [1, 4, 7], // Middle Column
        [2, 5, 8], // Right Column
        [0, 4, 8], // Left Diagonal
        [2, 4, 6], // Right Diagonal
    ];
    

    const getActivePlayer = () => activePlayer;
    const switchPlayer = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];

    const checkWinner = (board, winCombos) => {
        for (const combo of winCombos) {
            const [a, b, c] = combo;
            if (board[a].getMark() && 
                board[a].getMark() === board[b].getMark() &&
                board[a].getMark() === board[c].getMark()) {
                return true;
            }
        }
        return false;
    };
    
    for(let i = 0; i < 8; ++i){
        const board = GameBoard.getBoard();
        const choice = prompt("pick position: ");
        const move = GameBoard.placeMark(choice, activePlayer.mark);
        console.log(board);

        if (!move) {
            console.log("invalid move");
            i--;
            continue;
        }

        console.log(board[choice].getMark());
        
        const check = checkWinner(board, winCombos);

        if(check) {
            console.log(`${activePlayer.name} wins`);
            break;
        }

        switchPlayer();
    }
})();


const DisplayController = (()=> {

})();


const Game = (() => {
    const init = () => {

    }

    return { init };
})()


