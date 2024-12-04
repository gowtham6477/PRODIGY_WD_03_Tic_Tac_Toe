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

    const startGame = () => {
        const player1Name = document.getElementById("player1").value || "Player 1";
        const player2Name = document.getElementById("player2").value || "AI";

        if (document.getElementById("ai-mode").classList.contains("active")) {
            players = [
                Player(player1Name, "X"),
                Player("AI", "O")
            ];
        } else {
            players = [
                Player(player1Name, "X"),
                Player(player2Name, "O")
            ];
        }

        currentPlayerIndex = 0;
        isGameOver = false;
        Gameboard.resetBoard();
        DisplayController.renderBoard();
        DisplayController.updateTurn(players[currentPlayerIndex].name);
    };

    const playTurn = (index) => {
        if (isGameOver || Gameboard.getBoard()[index] !== "") return;

        Gameboard.setCell(index, players[currentPlayerIndex].mark);
        DisplayController.updateCell(index, players[currentPlayerIndex].mark);

        if (checkWinner(players[currentPlayerIndex].mark)) {
            isGameOver = true;
            DisplayController.showResult(`${players[currentPlayerIndex].name} wins!`);
        } else if (Gameboard.getBoard().every(cell => cell !== "")) {
            isGameOver = true;
            DisplayController.showResult("It's a tie!");
        } else {
            currentPlayerIndex = 1 - currentPlayerIndex;
            DisplayController.updateTurn(players[currentPlayerIndex].name);
            if (players[currentPlayerIndex].name === "AI") {
                setTimeout(aiPlay, 500);
            }
        }
    };

    const aiPlay = () => {
        let availableMoves = Gameboard.getBoard().map((cell, index) => cell === "" ? index : -1).filter(index => index !== -1);
        let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        playTurn(randomMove);
    };

    const checkWinner = (mark) => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winningCombos.some(combo =>
            combo.every(index => Gameboard.getBoard()[index] === mark)
        );
    };

    const restartGame = () => {
        Gameboard.resetBoard();
        isGameOver = false;
        currentPlayerIndex = 0;
        DisplayController.renderBoard();
        DisplayController.updateTurn(players[currentPlayerIndex].name);
        DisplayController.hideResult();
    };

    return { startGame, playTurn, restartGame };
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
            cell.textContent = mark;
            cell.addEventListener("click", () => GameController.playTurn(index));
            boardElement.appendChild(cell);
        });
    };

    const updateCell = (index, mark) => {
        const cell = boardElement.children[index];
        cell.textContent = mark;
    };

    const showResult = (message) => {
        resultElement.textContent = message;
        resultElement.classList.remove("hidden");
        document.getElementById("restart-game").classList.remove("hidden");
    };

    const hideResult = () => {
        resultElement.classList.add("hidden");
        document.getElementById("restart-game").classList.add("hidden");
    };

    const updateTurn = (playerName) => {
        turnElement.textContent = `${playerName}'s Turn`;
    };

    return { renderBoard, updateCell, showResult, updateTurn, hideResult };
})();

document.getElementById("2-player").addEventListener("click", () => {
    document.getElementById("game-mode-setup").classList.add("hidden");
    document.getElementById("player-setup").classList.remove("hidden");
    document.getElementById("player2").classList.remove("hidden");
    document.getElementById("ai-mode").classList.remove("active");
    document.getElementById("2-player").classList.add("active");
});

document.getElementById("ai-mode").addEventListener("click", () => {
    document.getElementById("game-mode-setup").classList.add("hidden");
    document.getElementById("player-setup").classList.remove("hidden");
    document.getElementById("player2").classList.add("hidden");
    document.getElementById("ai-mode").classList.add("active");
    document.getElementById("2-player").classList.remove("active");
});

document.getElementById("start-game").addEventListener("click", () => {
    GameController.startGame();
    document.getElementById("player-setup").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
});

document.getElementById("restart-game").addEventListener("click", () => {
    GameController.restartGame();
});
