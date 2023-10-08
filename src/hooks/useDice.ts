import { useEffect, useState } from 'react'
import { randomNumber, randomPlayer } from '../utils/helpers';

const useDice = (totalDice:number, totalNuberOfPlayers:number, loaderDelay:number, maxDiceRolls:number) => {
    const newMaxRolls = maxDiceRolls * 2;
    const [loader, setLoader] = useState(true);
    const [scores, setScores] = useState<Array<number>>([0, 0]);
    const [state, setState] = useState({
        diceResults: [randomNumber(totalDice), randomNumber(totalDice)],
        currentPlayer: randomPlayer(totalNuberOfPlayers),
        hasWinner: false,
        count: 0,
        gameStarted: false
    });

    const { diceResults, currentPlayer, hasWinner, count, gameStarted } = state;

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, loaderDelay);
    }, [loader, loaderDelay])

    useEffect(() => {
        const areAllPlayersActive = scores.every(score => score !== 0);
        const doPlayersHaveDifferentScores = areAllPlayersActive && scores[0] !== scores[1];
        const isCurrentGameCountEven = newMaxRolls === count && count % 2 === 0;
        const isNextGameCountEven = count > newMaxRolls && count % 2 === 0

        if (areAllPlayersActive && doPlayersHaveDifferentScores && (isCurrentGameCountEven || isNextGameCountEven)) {
            setState(prev => ({ ...prev, hasWinner: true }));
        } else if (count === newMaxRolls && areAllPlayersActive && scores[0] === scores[1]) {
            setState(prev => ({ ...prev, count: count + 1 }));
        }
    }, [diceResults, scores, currentPlayer, count, newMaxRolls]);

    return {
        diceResults,
        currentPlayer,
        hasWinner,
        scores,
        count,
        loader,
        gameStarted,
        setScores,
        setState,
        setLoader
    }
}

export default useDice;