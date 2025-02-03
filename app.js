function Cell () {
    let value = "";

    const getMark = () => value;
    const setMark = (mark) => value = mark;

    return { getMark, setMark }
}

const GameBoard = (() => {
    const board = new Array(9).fill(null).map(() => Cell());

    const getRawBoard = () => board;

    const getBoard = () => board.map(cell => cell.getMark());

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

    return { getBoard, getRawBoard, placeMark, resetBoard };
})();

const GameController = (()=> {
    let count = 0;

    //players stuff
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
    const switchPlayer = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];

    //Check for wins
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

    const checkWinner = (board, winCombos) => {
        for (const combo of winCombos) {
            const [a, b, c] = combo;
            if (board[a] && 
                board[a] === board[b] &&
                board[a] === board[c]) {
                return true;
            }
        }
        return false;
    };

    const playGame = () => {
        while (true) {
            count++;
            const board = GameBoard.getBoard();
            const choice = parseInt(prompt("pick position: "));
            const move = GameBoard.placeMark(choice, activePlayer.mark);
    
            if (!move) {
                console.log("invalid move");
                count--;
                continue;
            }
    
            if(checkWinner(board, winCombos)) {
                console.log(`${activePlayer.name} wins`);
                break;
            }
    
            if(board.every(mark => mark !== "") || count >= 9) {
                console.log("tie");
                break;
            }
            
            switchPlayer();
        }
    }
    
    return { playGame, players }
})();


const DisplayController = (()=> {
    
})();


const Game = (() => {
    const init = () => {

    }

    return { init };
})()


