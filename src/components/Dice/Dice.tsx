import React, { KeyboardEventHandler, MouseEventHandler } from 'react';
import DiceImages from '../DiceImages/DiceImages';
import useDice from '../../hooks/useDice';
import { randomNumber, randomPlayer } from '../../utils/helpers';
import './Dice.css';

const Dice: React.FunctionComponent = () => {
    const diceSides: number = 2;
    const players: Array<number> = [1, 2];
    const {
        diceResults,
        currentPlayer,
        hasWinner,
        scores,
        setScores,
        setState,
    } = useDice(diceSides, players.length);

    const rollDice = () => {
        // set new dice value
        const dice1 = randomNumber(2);
        const dice2 = randomNumber(2);
        const total = dice1 + dice2;
        const playerScore = () => {
            const newScore = scores;
            const playerIndex = currentPlayer - 1;
            const currentPlayerScore = newScore[playerIndex];
            newScore[playerIndex] = currentPlayerScore + total;
            return newScore;
        }
        const playerNewScore = playerScore();
        const nextPlayer = currentPlayer === 1 ? 2 : 1;

        setState(prev => ({
            ...prev,
            diceResults: [dice1, dice2],
            currentPlayer: nextPlayer,
            count: prev.count + 1
        }));

        setScores(playerNewScore);
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

    const playerWon = (): number => {
        let highScore = 0;
        let playerIndex = 0;
        scores.forEach((score, index) => {
            if (score > highScore) {
                highScore = score
                playerIndex = index;
            }
        })
        const winner = players[playerIndex]
        return winner;
    }

    const resetGame = ():void => {
        setScores([0, 0]);
        setState({
            diceResults: [randomNumber(diceSides), randomNumber(diceSides)],
            currentPlayer: randomPlayer(players.length),
            hasWinner: false,
            count: 0
        })
    }

    return (
        <div className="diceGame">
            <div className="diceGame--container">
                <div className='playersContainer'>
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

                <div className="imageContainer" aria-hidden="true">
                    <DiceImages digit={diceResults[0]} />
                    <DiceImages digit={diceResults[1]} />
                </div>

                <p aria-live="polite">Scores: {diceResults[0] + diceResults[1]}</p>

                {
                    hasWinner ? (
                        <button className='btn btn-reset' onClick={resetGame}>Reset</button>
                    ) : (
                        <button
                            className="btn"
                            aria-label="lancer les dés"
                            onClick={buttonHandler}
                            onKeyDown={keyPressHandler}
                        >
                            lancer les dés
                        </button>
                    )
                }
            </div>

            <div className={['diceGame--result', hasWinner && 'active'].join(' ')}>
                <p aria-live='polite'>Winner {playerWon()}</p>
            </div>
        </div>
    );
};

export default Dice;
