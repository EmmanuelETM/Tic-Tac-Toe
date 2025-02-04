const Game = (() => {
    
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
                name: "player 1",
                mark: "X",
            },
            {
                name: "player 2",
                mark: "O"
            }
        ]

        let activePlayer = players[0];
        const getActivePlayer = () => activePlayer;
        const switchPlayer = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];
        const setPlayerNames = (obj) => {
            players[0].name = obj.player1.trim() || "Player 1";
            players[1].name = obj.player2.trim() || "Player 2";
        }

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

        const checkWinner = () => {
            const board = GameBoard.getBoard();
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

        const checkTie = () => {
            const board = GameBoard.getBoard();
            if(board.every(mark => mark !== "") || count >= 9) {
                return true;
            }
            return false;
        }

        const resetGame = () => {
            count = 0;
            GameBoard.resetBoard();
            activePlayer = players[0];
        }

        const handleMoves = (choice) => {
            count++;
            const move = GameBoard.placeMark(choice, activePlayer.mark);
            if (!move) {
                return;
            }
        }

        return { handleMoves, players, getActivePlayer, switchPlayer, setPlayerNames, resetGame, checkWinner, checkTie }
    })();


    const DisplayController = (()=> {
        const boardContainer = document.querySelector(".board-container");
        const restartButton = document.querySelectorAll(".restart");
        const startButton = document.querySelector(".start");
        const gameDialog = document.querySelector(".game-dialog");
        const gameDialogH1 = document.querySelector(".game-dialog-header");
        const gameDialogClose = document.querySelector(".close-button");
        const playerDialog = document.querySelector(".player-dialog");
        const form = document.querySelector("form");
        const formButton = document.querySelector(".form-button");
        const overlay = document.querySelector(".overlay");
        const player1 = document.querySelector(".player1");
        const player2 = document.querySelector(".player2");
        const playerTurn = document.querySelector(".player-turn");

        startButton.disabled = true;
        // playerDialog.showModal();
        // overlay.classList.add("active");

        const createCells = () => {
            GameBoard.getBoard().forEach((element, index) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.innerText = element;
                cell.setAttribute("data-index", `${index}`);
                boardContainer.appendChild(cell);
            })
        }

        const updateBoard = () => {
            boardContainer.innerText = "";
            createCells();
        }

        //listener's functions
        const handleBoardClick = (event) => {
            GameController.handleMoves(event.target.dataset.index);
            if (GameController.checkWinner()) {
                gameDialogH1.innerText = `${GameController.getActivePlayer().name} wins`;
                gameDialog.showModal();
                overlay.classList.add("active");
            }

            if(!GameController.checkWinner() && GameController.checkTie()) {
                gameDialogH1.innerText = `It's a Tie`;
                gameDialog.showModal();
                overlay.classList.add("active");
            }

            GameController.switchPlayer();
            playerTurn.innerText = `${GameController.getActivePlayer().name}'s Turn`
            updateBoard();
        }

        const handleRestartButton = () => {
            GameController.resetGame();
            updateBoard();
            if(gameDialog.open) {
                gameDialog.close();
                overlay.classList.remove("active");
            }
            playerTurn.innerText = `${GameController.getActivePlayer().name}'s Turn`
        }

        const handleStartButton = () => {
            addBoardListener();
            GameController.resetGame();
            updateBoard();
            startButton.disabled = true;
            restartButton.forEach(button => button.disabled = false);
        }

        const handleCloseGameDialog = () => {
            gameDialog.close();
            overlay.classList.remove("active");
            removeBoardListener();
            startButton.disabled = false;
            restartButton.forEach(button => button.disabled = true);
        }

        const handleFormSubmit = (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const dataObj = Object.fromEntries(formData.entries());
            GameController.setPlayerNames(dataObj);
            player1.innerText = `${GameController.players[0].name} (${GameController.players[0].mark})`;
            player2.innerText = `${GameController.players[1].name} (${GameController.players[1].mark})`;
            playerTurn.innerText = `${GameController.getActivePlayer().name}'s Turn`;
        }

        const handleFormButton = () => {
            playerDialog.close();
            overlay.classList.remove("active");
        }

        const AddListeners = () => {
            boardContainer.addEventListener('click', handleBoardClick);
            gameDialogClose.addEventListener("click", handleCloseGameDialog);
            restartButton.forEach(button => {
                button.addEventListener("click", handleRestartButton);
            })
            startButton.addEventListener("click", handleStartButton);
            form.addEventListener("submit", handleFormSubmit);
            formButton.addEventListener("click", handleFormButton);
        }

        const removeBoardListener = () => {
            boardContainer.removeEventListener("click", handleBoardClick);
        }

        const addBoardListener = () => {
            boardContainer.addEventListener('click', handleBoardClick);
        }
    

        return { updateBoard, AddListeners };
    })();


    const init = () => {
        DisplayController.updateBoard();
        DisplayController.AddListeners();
    }

    return { init };
})();

Game.init();

