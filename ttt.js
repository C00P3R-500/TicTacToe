const squares = document.querySelectorAll(".square");
const p1score = document.querySelector("#p1");
const p2score = document.querySelector("#p2");
const playLabel = document.querySelector(".playLabel");
const Rbtn = document.querySelector("#Rbtn");
const form = document.querySelector("#name-form");

const gameboard = {
    board: ["", "", "", "", "", "", "", "", ""]
};

const player1 = {
    score: 0,
    name: ""
};

const player2 = {
    score: 0,
    name: ""
};

const gameflow = {
    turn: 1,
    gameActive: false,

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
        for (let i = 0; i < 9; i++) {
            gameboard.board[i] = "";
            squares[i].textContent = "";
        }

        playLabel.textContent = `${player1.name}'s Turn`;
        this.turn = 1;
    },

    check() {
        for (let combo of this.winCombos) {
            if (gameboard.board[combo[0]] === "") {
                continue;
            }

            if (
                gameboard.board[combo[0]] === gameboard.board[combo[1]] &&
                gameboard.board[combo[1]] === gameboard.board[combo[2]]
            ) {
                if (gameboard.board[combo[0]] === "X") {
                    player1.score++;
                } else {
                    player2.score++;
                }

                if (player1.score === 3) {
                    playLabel.textContent = `${player1.name} Wins!`;
                    player1.score = 0;
                    player2.score = 0;
                    this.gameActive = false;
                    return;
                }

                if (player2.score === 3) {
                    playLabel.textContent = `${player2.name} Wins!`;
                    player1.score = 0;
                    player2.score = 0;
                    this.gameActive = false;
                    return;
                }

                console.log("win");
                this.turn = 1;
                this.updateScore();
                this.resetBoard();
                return;
            }
        }

        if (!gameboard.board.includes("")) {
            this.turn = 1;
            this.updateScore();
            this.resetBoard();
            playLabel.textContent = "Tie";
            return;
        }
    },

    play(i) {
        if (this.turn === 1) {
            playLabel.textContent = `${player2.name}'s Turn`;
            gameboard.board[i] = "X";
            this.turn = 2;
            squares[i].textContent = gameboard.board[i];
            this.check();
        } else {
            playLabel.textContent = `${player1.name}'s Turn`;
            gameboard.board[i] = "O";
            this.turn = 1;
            squares[i].textContent = gameboard.board[i];
            this.check();
        }
    }
};

for (let i = 0; i < 9; i++) {
    squares[i].addEventListener("click", () => {
        if (!gameflow.gameActive) {
            return;
        }

        if (gameboard.board[i] === "") {
            gameflow.play(i);
            gameflow.updateScore();
        }
    });
}

let clicked = false;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!clicked) {
        clicked = true;
        gameflow.gameActive = true;

        const p1 = document.querySelector("#p1Name").value;
        const p2 = document.querySelector("#p2Name").value;

        player1.name = p1;
        player2.name = p2;

        playLabel.textContent = `${player1.name}'s Turn`;

        form.reset();
    }
});

Rbtn.addEventListener("click", () => {
    if (clicked) {
        clicked = false;
        gameflow.gameActive = false;

        player1.score = 0;
        player2.score = 0;

        gameflow.resetBoard();
        gameflow.updateScore();

        playLabel.textContent = "Click Start To Play!";
    }
});