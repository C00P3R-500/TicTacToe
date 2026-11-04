const squares = document.querySelectorAll(".square");

const gameboard = {
    board: ["", "", "", "", "", "", "", "", ""]
}

const player1 = {
    score: 0,
}

const player2 = {
    score: 0,
}

const gameflow = {
    turn: 1,
    round: 1,

    winCombos: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    resetBoard() {
        for (let i = 0; i < 9; i ++) {
            gameboard.board[i] = "";
            squares[i].textContent = "";
        }
    },

    check() {
        for (let combo of this.winCombos){
            if(gameboard.board[combo[0]] === ""){
                continue;
            }
            else if(gameboard.board[combo[0]] === gameboard.board[combo[1]] &&
                gameboard.board[combo[1]] === gameboard.board[combo[2]]
            ) {
                console.log("win");
                this.turn = 1;
                this.resetBoard();
            }
        }
    },

    play(i) {
        let pick;

        console.log(gameboard.board.slice(0,3));
        console.log(gameboard.board.slice(3,6));
        console.log(gameboard.board.slice(6,9));

        if (this.turn === 1) {
            gameboard.board[i] = "X";
            this.turn = 2;
            this.check();
        }
        else {
            gameboard.board[i] = "O";
            this.turn = 1;
            this.check();
        }
    }
}


for (let i = 0; i < 9; i++) {
    squares[i].addEventListener("click", () => {
        if(gameboard.board[i] === "") {
            gameflow.play(i);
            squares[i].textContent = gameboard.board[i];
        }
        
    })
};