import React, { KeyboardEventHandler, MouseEventHandler, useRef } from 'react';
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
        loader,
        setScores,
        setState,
        setLoader
    } = useDice(diceSides, players.length, 3000);

    const totalScore = diceResults[0] + diceResults[1];

    const rollDice = () => {
        // set loader and animation 
        setLoader(true);

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

    const resetGame = (): void => {
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
                                        currentPlayer === player ? 'active active--animation' : ''
                                    ].join(' ')}
                                >
                                    <h2>Player {player}</h2>
                                    <p aria-live='polite'>{loader ? "..." : scores[index]}</p>
                                </section>
                            )
                        })
                    }
                </div>

                <div className="imageContainer" aria-hidden="true">
                    {
                        Array.from({ length: 2 }, (_, index) => (
                            <DiceImages className={[ "diceImage", loader ? index === 0 ? "rotateClockwise--annimation" : "rotateAntiClockwise--animation" : ""].join(" ")} digit={diceResults[index]} />
                        ))
                    }
                </div>

                <p aria-live="polite">{loader ? "Calculating..." : `Scores: ${totalScore}`}</p>

                {
                    hasWinner ? (
                        <button className='btn btn-reset' onClick={resetGame}>Reset</button>
                    ) : (
                        <button
                            disabled={loader}
                            className="btn"
                            aria-label="lancer les dés"
                            aria-live="polite"
                            onClick={buttonHandler}
                            onKeyDown={keyPressHandler}
                        >
                            {loader ? "loading..." : "lancer les dés"}
                        </button>
                    )
                }
            </div>

            {
                !loader && (
                    <div className={['diceGame--result', hasWinner ? 'active appear--animation' : "disappear--animation"].join(' ')}>
                        <p aria-live='polite'>Winner <strong>player {playerWon()}</strong></p>
                    </div>
                )
            }
        </div>
    );
};

export default Dice;
