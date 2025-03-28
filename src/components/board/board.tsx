import Square from "../square/square";
import { turn, board } from "../types";
import './board.css'


export default function Board({ boardData, onSquareClicked }) {

    const board: board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    boardData.forEach((boardRow: turn[], rowIndex: number) => {
        boardRow.forEach((val: turn, colIndex: number) => {
            board[rowIndex][colIndex] = val;
        })
    });

    return (
        <>
            {board.map((boardRow: turn[], rowIndex: number) => {
                return (
                    <div className="boardRow" key={rowIndex}>
                        {
                            boardRow.map((val: turn, colIndex: number) => {
                                return (
                                    <Square value={val} key={rowIndex + '@' + colIndex} squareClicked={() => {
                                        onSquareClicked(rowIndex, colIndex)
                                    }} />
                                )
                            })
                        }
                    </div>
                )
            })}
        </>
    )
}