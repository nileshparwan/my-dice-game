import React, { KeyboardEventHandler, MouseEventHandler } from 'react';
import DiceImages from '../DiceImages/DiceImages';
import useDice from '../../hooks/useDice';
import { randomNumber, randomPlayer } from '../../utils/helpers';
import './Dice.css';

const Dice: React.FunctionComponent = () => {
    const totalDice: number = 6;
    const listOfPlayers: Array<number> = [1, 2];
    const totalNuberOfPlayers = listOfPlayers.length;
    const loaderDelay = 3000;
    const maxDiceRolls = 2;
    const {
        diceResults,
        currentPlayer,
        hasWinner,
        scores,
        loader,
        gameStarted,
        setScores,
        setState,
        setLoader
    } = useDice(totalDice, totalNuberOfPlayers, loaderDelay, maxDiceRolls);

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
            gameStarted: true,
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
        const winner = listOfPlayers[playerIndex]
        return winner;
    }

    const resetGame = (): void => {
        setScores([0, 0]);
        setState({
            diceResults: [randomNumber(totalDice), randomNumber(totalDice)],
            currentPlayer: randomPlayer(listOfPlayers.length),
            hasWinner: false,
            count: 0,
            gameStarted: false
        })
    }

    return (
        <div className="diceGame">
            <div className="diceGame--container">
                <div className='playersContainer'>
                    {
                        listOfPlayers.map((player: number, index: number) => {
                            return (
                                <section
                                    key={player}
                                    className={[
                                        "player",
                                        currentPlayer === player ?
                                            !loader ? `active ${!hasWinner ? 'active--animation' : ''}` :
                                                "" :
                                            ''
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
                            <DiceImages 
                            className={[ "diceImage", loader ? index === 0 ? "rotateClockwise--annimation" : "rotateAntiClockwise--animation" : ""].join(" ")} 
                            digit={diceResults[index]}
                            loader={loader}
                            />
                        ))
                    }
                </div>

                <p aria-live="polite">{gameStarted ? loader ? "Calculating..." : `Scores: ${totalScore}` : "Score 0"}</p>

                {
                    hasWinner && !loader ? (
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
