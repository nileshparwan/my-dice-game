import React from 'react';
import './Dice.css';

const dice1 = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="125"
        height="125"
        viewBox="0 0 100 100"
        aria-labelledby="dice 1"
        role="img"
        className="dice-svg"
    >
        <title id="dice 1">Dice 1</title>
        <g>
            <path
                d="M86.61173,6.46115H13.38221a7.05794,7.05794,0,0,0-6.92106,7.18726V86.35494A7.05464,7.05464,0,0,0,13.379,93.53885H86.61133a7.06452,7.06452,0,0,0,6.92752-7.194V13.71227A7.09557,7.09557,0,0,0,86.61173,6.46115Z"
                style={{ fill: '#cdcfd2' }}
            />
            <path
                d="M49.98065,56.39686A9.31067,9.31067,0,1,1,58.93676,47.103,9.13869,9.13869,0,0,1,49.98065,56.39686Z"
                style={{ fill: '#151417' }}
            />
        </g>
    </svg>
);

const Dice = () => {
    return (
        <div className="dice-container">
            <div className="dice-image-wrapper" aria-hidden="true">
                {dice1}
            </div>

            <p aria-live="polite">1</p>

            <button className="btn" aria-label="Lancer le dés">
                Lancer le dés
            </button>
        </div>
    );
};

export default Dice;
