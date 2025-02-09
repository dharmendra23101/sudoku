const grid = document.getElementById("sudoku-grid");
for (let i = 0; i < 81; i++) {
    let input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.oninput = function () {
        this.value = this.value.replace(/[^1-9]/g, '');
        validateGrid();
    };
    grid.appendChild(input);
}

function getGrid() {
    let board = [];
    let inputs = document.querySelectorAll(".grid input");
    for (let i = 0; i < 9; i++) {
        board.push([]);
        for (let j = 0; j < 9; j++) {
            let val = inputs[i * 9 + j].value;
            board[i].push(val ? parseInt(val) : 0);
        }
    }
    return board;
}

function setGrid(board) {
    let inputs = document.querySelectorAll(".grid input");
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            inputs[i * 9 + j].value = board[i][j] || '';
        }
    }
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num && i !== col) return false;
        if (board[i][col] === num && i !== row) return false;
        let boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        let boxCol = 3 * Math.floor(col / 3) + (i % 3);
        if (board[boxRow][boxCol] === num && (boxRow !== row || boxCol !== col)) return false;
    }
    return true;
}

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function validateGrid() {
    let board = getGrid();
    let inputs = document.querySelectorAll(".grid input");
    let valid = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== 0 && !isValid(board, i, j, board[i][j])) {
                inputs[i * 9 + j].classList.add("invalid");
                valid = false;
            } else {
                inputs[i * 9 + j].classList.remove("invalid");
            }
        }
    }
    return valid;
}

function solveSudoku() {
    if (!validateGrid()) {
        alert("Invalid input detected! Please correct it before solving.");
        return;
    }
    let board = getGrid();
    if (solve(board)) setGrid(board);
    else alert("No solution exists!");
}

function clearGrid() {
    document.querySelectorAll(".grid input").forEach(input => {
        input.value = '';
        input.classList.remove("invalid");
    });
}