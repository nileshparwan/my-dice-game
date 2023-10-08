import { useEffect, useState } from 'react'
import { randomNumber, randomPlayer } from '../utils/helpers';

const useDice = (maxNumber: number, totalPlayer: number) => {
    const [scores, setScores] = useState<Array<number>>([0, 0]);
    const [state, setState] = useState({
        diceResults: [randomNumber(maxNumber), randomNumber(maxNumber)],
        currentPlayer: randomPlayer(totalPlayer),
        hasWinner: false,
        count: 0
    });

    const { diceResults, currentPlayer, hasWinner, count } = state;

    useEffect(() => {
        const allPlayerPlayed = scores.every(score => score !== 0);
        const allPlayerScoreNotSame = allPlayerPlayed && scores[0] !== scores[1];
        const isCountEven = count % 2 === 0
        if (allPlayerPlayed && allPlayerScoreNotSame && isCountEven) {
            setState(prev => ({ ...prev, hasWinner: allPlayerPlayed && allPlayerScoreNotSame }))
        }
    }, [diceResults, scores, currentPlayer, count]);

    return {
        diceResults,
        currentPlayer,
        hasWinner,
        scores,
        count,
        setScores,
        setState,
    }
}

export default useDice;