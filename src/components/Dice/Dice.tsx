import React, { KeyboardEventHandler, MouseEventHandler, useState } from 'react';
import './Dice.css';
import DiceImages from '../DiceImages/DiceImages';

const Dice: React.FunctionComponent = () => {
    const diceSides = 2;
    const randomNumber = () => Math.ceil(Math.random() * diceSides);

    const [state, setState] = useState({
        firstDiceDigit: randomNumber(),
        secondDiceDigit: randomNumber(),
        startGame: false
    });

    const { firstDiceDigit, secondDiceDigit, startGame } = state;
    const scores = startGame ? firstDiceDigit + secondDiceDigit : 0;

    const rollDice = () => {
        setState((prev) => ({
            ...prev,
            firstDiceDigit: randomNumber(),
            secondDiceDigit: randomNumber(),
            startGame: true
        }))
    }

    const buttonHandler:MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        rollDice();
    }

    const keyPressHandler: KeyboardEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        if (
            event.key === "Enter"
        ) {
            rollDice();
        }
    }

    return (
        <div className="dice-container">

            <div className='players-container'>
                {
                    players.map((player: number, index: number) => {
                        return (
                            <section key={player} className={["player", currentPlayer === player ? 'active' : ''].join(' ')}>
                                <h2>Player {player}</h2>
                                <p aria-live='polite'>{scores[index]}</p>
                            </section>
                        )
                    })
                }
            </div>

            <div className="image-container" aria-hidden="true">
                <DiceImages digit={firstDiceDigit} />
                <DiceImages digit={secondDiceDigit} />
            </div>

            <p aria-live="polite">{scores}</p>

            <button
                className="btn"
                aria-label="Lancer le dés"
                onClick={buttonHandler}
                onKeyDown={keyPressHandler}
            >
                Lancer le dés
            </button>
        </div>
    );
};

export default Dice;
