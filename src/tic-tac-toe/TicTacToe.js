import React, { useState } from 'react';
import './TicTacToe.css';

const MOVES = ['X', 'O'];

export default function TicTacToe() {
    const [cells, setCells] = useState(Array(9).fill(null));
    const [currentMove, setCurrentMove] = useState(MOVES[0]);
    const [message, setMessage] = useState('');
    const [gameOver, setGameOver] = useState(false);

    const handleResetClick = () => {
        setCells(Array(9).fill(null));
        setCurrentMove(MOVES[0]);
        setMessage('');
        setGameOver(false);
    };

    const handleClick = (index) => {
        if (cells[index] || gameOver) {
            return;
        }
        const nextCells = cells.slice();
        nextCells[index] = currentMove;
        updateCurrentMove();
        setCells(nextCells);

        const winner = calculateWinner(nextCells);
        if (winner) {
            setGameOver(true);
            showWinner(winner);
        }
    };

    const showWinner = (winner) => {
        setMessage(`The winner is: ${winner}! Press 'reset' to continue playing`)
    };

    const calculateWinner = (cells) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return cells[a];
            }
        }
        return null;
    }

    const updateCurrentMove = () => {
        setCurrentMove((prev) => MOVES[(MOVES.indexOf(prev) + 1) % MOVES.length]);
    }

    return (
        <div className="game">
            <div className="flex-row">
                <Board cells={cells} handleClick={handleClick} />
                <ControlPanel onResetClick={handleResetClick} />
            </div>
            <p className="message">{message}</p>
        </div>
    );
}

function Board({cells, handleClick}) {
    return (
        <div className="flex-column">
            <div className="board-row">
                <Cell value={cells[0]} onCellClick={() => handleClick(0)} />
                <Cell value={cells[1]} onCellClick={() => handleClick(1)} />
                <Cell value={cells[2]} onCellClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Cell value={cells[3]} onCellClick={() => handleClick(3)} />
                <Cell value={cells[4]} onCellClick={() => handleClick(4)} />
                <Cell value={cells[5]} onCellClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Cell value={cells[6]} onCellClick={() => handleClick(6)} />
                <Cell value={cells[7]} onCellClick={() => handleClick(7)} />
                <Cell value={cells[8]} onCellClick={() => handleClick(8)} />
            </div>
        </div>
    );
}

function Cell({ value, onCellClick }) {
    return <button className="square" onClick={onCellClick}>{value}</button>;
}

function ControlPanel({onResetClick}) {
    return (
        <div className="control-panel">
            <button onClick={onResetClick}>Reset</button>
        </div>
    );
}
