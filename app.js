console.log("tic tac toe");

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


class Player {
    constructor(name, mark){
        this.name = name;
        this.mark = mark;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }
}

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


// 📌 Objetivo: Manejar la lógica del juego.

// 🔹 Qué debe hacer:

// Controlar de quién es el turno (X o O).
// Validar si hay un ganador.
// Detectar si hay un empate.
// Reiniciar el juego cuando sea necesario.
// 💡 Tips:

// Usa un array de combinaciones ganadoras para verificar victorias.
// Cambia de turno solo si la jugada es válida.
// Usa una función separada para verificar el ganador (así es más reutilizable).
})();




const DisplayController = (()=> {

//     Objetivo: Actualizar la UI según el estado del juego.

// 🔹 Qué debe hacer:

// Escuchar eventos en las celdas (click).
// Mostrar el estado del juego (turno actual, ganador, empate).
// Resetear la UI cuando se reinicia el juego.
// 💡 Tips:

// Usa event delegation para manejar clicks en las celdas.
// Separa la lógica de la UI de la lógica del juego.
// Usa clases CSS en lugar de modificar estilos directamente en JS.
})();

const Game = (() => {
    const init = () => {

    }

    return { init };
})()


