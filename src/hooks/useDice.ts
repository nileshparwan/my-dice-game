import { useEffect, useState } from 'react'
import { randomNumber, randomPlayer } from '../utils/helpers';

const useDice = (maxNumber: number, totalPlayer: number, loaderDelay: number = 3000) => {
    const [loader, setLoader] = useState(true);
    const [scores, setScores] = useState<Array<number>>([0, 0]);
    const [state, setState] = useState({
        diceResults: [randomNumber(maxNumber), randomNumber(maxNumber)],
        currentPlayer: randomPlayer(totalPlayer),
        hasWinner: false,
        count: 0
    });

    const { diceResults, currentPlayer, hasWinner, count } = state;

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, loaderDelay);
    }, [loader, loaderDelay])

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
        loader,
        setScores,
        setState,
        setLoader
    }
}

export default useDice;