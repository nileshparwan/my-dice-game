import React, { KeyboardEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import './Dice.css';
import DiceImages from '../DiceImages/DiceImages';

const Dice: React.FunctionComponent = () => {
    const diceSides: number = 2;
    const players: Array<number> = [1, 2];
    const randomNumber = (): number => Math.ceil(Math.random() * diceSides);
    const randomPlayer = (): number => Math.ceil(Math.random() * players.length);
    const [scores, setScores] = useState<Array<number>>([0, 0]);
    const [state, setState] = useState({
        diceResults: [randomNumber(), randomNumber()],
        currentPlayer: randomPlayer(),
        hasWinner: false,
        count: 0
    });

    const { diceResults, currentPlayer, hasWinner, count } = state;

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

    const resetGame = () => {
        setScores([0, 0]);
        setState({
            diceResults: [randomNumber(), randomNumber()],
            currentPlayer: randomPlayer(),
            hasWinner: false,
            count: 0
        })
    }

    useEffect(() => {
        const allPlayerPlayed = scores.every(score => score !== 0);
        const allPlayerScoreNotSame = allPlayerPlayed && scores[0] !== scores[1];
        const isCountEven = count % 2 === 0
        if (allPlayerPlayed && allPlayerScoreNotSame && isCountEven) {
            setState(prev => ({ ...prev, hasWinner: allPlayerPlayed && allPlayerScoreNotSame }))
        }
    }, [diceResults, scores, currentPlayer, count]);

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
                        <button onClick={resetGame}>Reset</button>
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
