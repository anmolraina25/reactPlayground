import { useState } from "react";
import Board from "../board/board";
import { board, turn } from "../types";
import './game.css'

export default function Game() {
    const [currentMove, setCurrentMove] = useState(1);
    const [boardState, setBoardState] = useState(Array(10).fill([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ] as board));
    const currentBoardState = boardState[currentMove - 1]
    const userTurn: turn = (currentMove % 2 === 0) ? 'O' : 'X';
    const firstEmptyState: number = boardState.findIndex((board: board, index: number) => {
        if (index > 0 && !boardTouched(board)) {
            return true
        }
        return false
    });
    const boardProgress: number = firstEmptyState >= 0 ? firstEmptyState : 10

    function onSquareClicked(rowIndex: number, colIndex: number) {
        const previousIndex = currentMove - 1;
        const updatedBoard = boardState[previousIndex].map((boardRow: turn[], row: number) => {
            return boardRow.map((val: turn, col: number) => {
                if (row === rowIndex && col === colIndex) {
                    return userTurn
                } else {
                    return val
                }
            })
        })

        boardState[currentMove] = [...updatedBoard];
        setBoardState([...boardState]);
        setCurrentMove(currentMove + 1);
    }

    function goToTurn(turn: number) {
        setCurrentMove(turn + 1);
    }

    function boardTouched(board: board): boolean {
        let result = false;
        for (let i = 0; i < board.length; i++) {
            const boardRow = board[i];
            for (let j = 0; j < boardRow.length; j++) {
                if (boardRow[j] === 'O' || boardRow[j] === 'X') {
                    result = true;
                    break;
                }
            }
            if (result === true) {
                break;
            }
        }
        return result
    }

    return (
        <div className="game">
            <div className="game_part">
                <p>Current Turn: {currentMove < 10 ? userTurn : 'Game Over'}</p>
                <Board boardData={currentBoardState} onSquareClicked={(rowIndex: number, colIndex: number) => {
                    onSquareClicked(rowIndex, colIndex)
                }} />
            </div>
            <div className="game_part">
                <ul>
                    {
                        Array(boardProgress).fill('').map((val: string, index: number) => {
                            return (
                                <li key={index}>
                                    <button onClick={($event) => {
                                        $event?.stopPropagation();
                                        $event.preventDefault();
                                        goToTurn(index);
                                    }}>
                                        { index === 0 ? 'Go to game start' : 'Go to move #' + index }
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}