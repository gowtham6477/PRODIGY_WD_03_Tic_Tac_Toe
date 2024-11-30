const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const setCell = (index, mark) => {
        if (board[index] === "") board[index] = mark;
    };
    const resetBoard = () => board.fill("");
    return { getBoard, setCell, resetBoard };
})();

const Player = (name, mark) => {
    return { name, mark };
};

const GameController = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let isGameOver = false;

    const startGame = (player1, player2) => {
        players = [Player(player1, "X"), Player(player2, "O")];
        currentPlayerIndex = 0;
        isGameOver = false;
        Gameboard.resetBoard();
        DisplayController.renderBoard();
        DisplayController.updateTurn(players[currentPlayerIndex].name);
    };

    const playTurn = (index) => {
        if (isGameOver || Gameboard.getBoard()[index] !== "") return;

        Gameboard.setCell(index, players[currentPlayerIndex].mark);
        DisplayController.updateCell(index, players[currentPlayerIndex].mark); // Update cell immediately.

        if (checkWinner(players[currentPlayerIndex].mark)) {
            isGameOver = true;
            DisplayController.showResult(`${players[currentPlayerIndex].name} wins!`);
        } else if (Gameboard.getBoard().every(cell => cell !== "")) {
            isGameOver = true;
            DisplayController.showResult("It's a tie!");
        } else {
            currentPlayerIndex = 1 - currentPlayerIndex;
            DisplayController.updateTurn(players[currentPlayerIndex].name);
        }
    };

    const checkWinner = (mark) => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6],           // Diagonals
        ];
        return winningCombos.some(combo =>
            combo.every(index => Gameboard.getBoard()[index] === mark)
        );
    };

    return { startGame, playTurn };
})();

const DisplayController = (() => {
    const boardElement = document.getElementById("gameboard");
    const resultElement = document.getElementById("result");
    const turnElement = document.getElementById("turn");

    const renderBoard = () => {
        boardElement.innerHTML = "";
        Gameboard.getBoard().forEach((mark, index) => {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.textContent = mark; // Initial rendering of marks.
            cell.addEventListener("click", () => GameController.playTurn(index));
            boardElement.appendChild(cell);
        });
    };

    const updateCell = (index, mark) => {
        const cell = boardElement.children[index];
        cell.textContent = mark; // Update the clicked cell with the player's mark.
    };

    const showResult = (message) => {
        resultElement.textContent = message;
        resultElement.style.visibility = "visible";
    };
    const clearResult = () => {
        resultElement.textContent = "";
        resultElement.style.visibility = "hidden";
    };
    const updateTurn = (playerName) => {
        turnElement.textContent = `Turn: ${playerName}`;
    };

    return { renderBoard, updateCell, showResult, updateTurn, clearResult };
})();

document.getElementById("start-game").addEventListener("click", () => {
    const player1 = document.getElementById("player1").value || "Player 1";
    const player2 = document.getElementById("player2").value || "Player 2";
    GameController.startGame(player1, player2);
    DisplayController.clearResult();
});

document.getElementById("restart-game").addEventListener("click", () => {
    const player1 = document.getElementById("player1").value || "Player 1";
    const player2 = document.getElementById("player2").value || "Player 2";
    GameController.startGame(player1, player2);
    DisplayController.clearResult();
});
