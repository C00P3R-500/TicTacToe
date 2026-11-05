const squares = document.querySelectorAll(".square");
const p1score = document.querySelector("#p1");
const p2score = document.querySelector("#p2");
const playLabel = document.querySelector(".playLabel");

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

    updateScore() {
        p1score.textContent = player1.score;
        p2score.textContent = player2.score;
    },

    resetBoard() {
        for (let i = 0; i < 9; i ++) {
            gameboard.board[i] = "";
            squares[i].textContent = "";
        }
        playLabel.textContent = "Player One's Turn"
    },

    check() {
        for (let combo of this.winCombos){
            if(gameboard.board[combo[0]] === ""){
                continue;
            }
            else if(gameboard.board[combo[0]] === gameboard.board[combo[1]] &&
                gameboard.board[combo[1]] === gameboard.board[combo[2]]
            ) {
                if(gameboard.board[combo[0]] === "X") {
                    player1.score++;
                }
                else {
                    player2.score++;
                }

                if(player1.score === 3) {
                    console.log("Player One Wins!")
                    player1.score = 0;
                    player2.score = 0;
                }
                else if(player2.score === 3){
                    console.log("Player Two Wins!")
                    player1.score = 0;
                    player2.score = 0;
                }

                console.log("win");
                this.turn = 1;
                this.updateScore();
                this.resetBoard();
                return        
            }
            
            if (!gameboard.board.includes("")){
                console.log("tie");
                this.turn = 1;
                this.updateScore();
                this.resetBoard();
                return    
            }
        }
    },

    play(i) {
        if (this.turn === 1) {
            playLabel.textContent = "Player Two's Turn";
            gameboard.board[i] = "X";
            this.turn = 2;
            this.check();
        }
        else {
            playLabel.textContent = "Player Ones's Turn";
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
            gameflow.updateScore();
        }
        
    })
};