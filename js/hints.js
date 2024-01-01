'use strict'

function useHint() {
    if (gGame.hints > 0 && gGame.isOn) {
        gGame.hints--
        //updateHintsDisplay()
        showHint()
    }
}

function showHint() {
    var emptyCell = findRandomEmptyCell(gBoard)

    // If there is no empty cell, pick a random revealed cell
    if (!emptyCell) return

    if (emptyCell) {
        var i = emptyCell.i
        var j = emptyCell.j

        gGame.hints--

        // Mark the clicked cell and its neighbors as hints
        markCellAndNeighborsAsHint(i, j)

        // Render the board to show the hints
        renderBoard(gBoard, '.board-container')

        setTimeout(function () {
            hideHints()
            renderBoard(gBoard, '.board-container')
        }, 1000 * 3)
    }
    console.log('Hints: ' + gGame.hints)
}


function markCellAndNeighborsAsHint(row, col) {
    for (var i = row - 1; i <= row + 1; i++) {
        for (var j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < gBoard.length && j >= 0 && j < gBoard[0].length) {
                gBoard[i][j].isHint = true
                gBoard[i][j].isShown = true
            }
        }
    }
}

function hideHints() {
    // Reset the isHint property for all cells
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {

            if(gBoard[i][j].isHint) {
                gBoard[i][j].isHint = false
                gBoard[i][j].isShown = false
            }
        }
    }
}


function getRevealedCells(board) {
    var revealedCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].isShown) {
                revealedCells.push({ i, j })
            }
        }
    }
    return revealedCells
}
