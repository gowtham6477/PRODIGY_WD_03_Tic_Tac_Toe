const Gameboard =( () =>{
    let board = ["","","","","","","","",""];
    const getBoard =() =>board;
    const setCell = (index,mark) =>{
        if(board[index] === "")
            board[index]=mark;
    };
    const resetBoard =() => board.fill("");
    return {getBoard,setCell,resetBoard};
})();

const Player =(name,mark) =>{
    return{name,mark};
};

const GameController =(()=>{
    let players =[];
    let currentPlayerIndex =0;
    let isGameOver = false;

    const startGame =(player1,player2)=>{
        players =[Player(player1,"x"),Player(player2,"o")]
        currentPlayerIndex =0;
        isGameOver = false;
        Gameboard.resetBoard();
        DisplayController.renderBoard();
    };
    const playTurn =(index) =>{
        if(isGameOver ||  GameController.getBoard()[index] !=="" ) return;
        Gameboard.setCell(index,players[currentPlayerIndex].mark);
        if(checkWinner(players[currentPlayerIndex].mark)){
            isGameOver = true;
            DisplayController.showResult(`${players[currentPlayerIndex].name} wins!`);
        }
        elseif(Gameboard.getBoard().every(cell => cell !=="")){
            isGameOver = true;
            DisplayController.showResult("It's a tie!");
        }
        else{
            currentPlayerIndex = 1 - currentPlayerIndex ;
            DisplayController.updateTurn(players[currentPlayerIndex].name);
        }
    }
})