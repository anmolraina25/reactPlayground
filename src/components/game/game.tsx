import { useState } from "react";
import Board from "../board/board";
import { board, turn } from "../types";
import './game.css'

export default function Game() {
    const [currentMove, setCurrentMove] = useState(0);
    const [boardState, setBoardState] = useState(Array(9).fill([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ] as board));
    const currentBoardState = boardState[currentMove]
    const userTurn: turn = (currentMove % 2 === 0) ? 'X' : 'O';

    function onSquareClicked(rowIndex: number, colIndex: number) {
        const nextMove = currentMove + 1;
        const updatedBoard = boardState[currentMove].map((boardRow: turn[], row: number) => {
            return boardRow.map((val: turn, col: number) => {
                if (row === rowIndex && col === colIndex) {
                    return userTurn
                } else {
                    return val
                }
            })
        })
        boardState[currentMove] = [...updatedBoard];
        boardState[nextMove] = [...updatedBoard];
        setBoardState([...boardState]);
        setCurrentMove(nextMove);
    }

    return (
        <div className="game">
            <div className="game_part">
                <p>Current Turn: {currentMove < 9 ? userTurn : 'Game Over'}</p>
                <Board boardData={currentBoardState} onSquareClicked={(rowIndex: number, colIndex: number) => {
                    onSquareClicked(rowIndex, colIndex)
                }} />
            </div>
            <div className="game_part">
                <ul>
                    {
                        Array(currentMove + 1).fill('').map((val: string, index: number) => {
                            return (
                                <li key={index}>
                                    { index === 0 ? (<button>Go to Game Start</button>) : (<button>Go to move: {index}</button>) }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}