import React, { KeyboardEventHandler, MouseEventHandler, useState } from 'react';
import './Dice.css';
import DiceImages from '../DiceImages/DiceImages';

const Dice: React.FunctionComponent = () => {
    const diceSides: number = 2;
    const players: Array<number> = [1, 2];
    const randomNumber = (): number => Math.ceil(Math.random() * diceSides);

    const [state, setState] = useState({
        diceValues:[randomNumber(), randomNumber()],
        scores: [0, 0],
        currentPlayer: 1
    });

    const {diceValues, scores, currentPlayer} = state;
    console.log(scores)

    const rollDice = () => {
        // set new dice value
        const dice1 = randomNumber();
        const dice2 = randomNumber(); 
        const total = dice1 + dice2;
        const playerScore = () => {
            const newScore = scores;
            const playerIndex = currentPlayer - 1;
            const currentPlayerScore = newScore[playerIndex]; 
            newScore[playerIndex] = currentPlayerScore + total;
            return newScore;
        }
        const newPlayerScore = playerScore();
        const nextPlayer = currentPlayer === 1 ? 2 : 1;
        setState(prev => ({ 
            ...prev, 
            diceValues: [dice1, dice2],
            scores: newPlayerScore,
            currentPlayer: nextPlayer
        }));
    }

    const buttonHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
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
                            <section
                                key={player}
                                className={[
                                    "player",
                                    currentPlayer === player ? 'active' : ''
                                ].join(' ')}
                            >
                                <h2>Player {player}</h2>
                                <p aria-live='polite'>{scores[index]}</p>
                            </section>
                        )
                    })
                }
            </div>

            <div className="image-container" aria-hidden="true">
                <DiceImages digit={diceValues[0]} />
                <DiceImages digit={diceValues[1]} />
            </div>

            <p aria-live="polite">Scores: {diceValues[0] + diceValues[1]}</p>

            <button
                className="btn"
                aria-label="lancer les dés"
                onClick={buttonHandler}
                onKeyDown={keyPressHandler}
            >
                lancer les dés
            </button>
        </div>
    );
};

export default Dice;
