import React, { KeyboardEventHandler, MouseEventHandler, useState } from 'react';
import './Dice.css';
import DiceImages from '../DiceImages/DiceImages';

const Dice: React.FunctionComponent = () => {
    const diceSides = 2;
    const randomNumber = () => Math.ceil(Math.random() * diceSides);

    const [state, setState] = useState({
        firstDiceDigit: randomNumber(),
        secondDiceDigit: randomNumber()
    });

    const { firstDiceDigit, secondDiceDigit } = state;

    const rollDice = () => {
        setState((prev) => ({
            ...prev,
            firstDiceDigit: randomNumber(),
            secondDiceDigit: randomNumber()
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
            <div className="dice-image-wrapper" aria-hidden="true">
                <DiceImages digit={firstDiceDigit} />
                <DiceImages digit={secondDiceDigit} />
            </div>

            <p aria-live="polite">1</p>

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
