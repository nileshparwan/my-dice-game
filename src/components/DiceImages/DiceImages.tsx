import React, { ReactNode } from 'react'

interface IDiceImage {
    digit: number
}

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

const dice2 = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="125"
        height="125"
        viewBox="0 0 100 100"
        aria-labelledby="dice 2"
        role="img"
        className="dice-svg"
    >
        <title id="dice 2">Dice 2</title>
        <g>
            <path d="M6.46115,13.379v73.2388a7.05794,7.05794,0,0,0,7.18726,6.92106H86.35159a7.05794,7.05794,0,0,0,7.18726-6.92106V13.379a7.05464,7.05464,0,0,0-7.18391-6.91784H13.64506A7.05464,7.05464,0,0,0,6.46115,13.379Z" style={{ fill: '#cdcfd2' }} />
            <path d="M33.80355,73.60773A9.14149,9.14149,0,0,1,24.503,82.57028a8.96559,8.96559,0,1,1,0-17.91865A9.14032,9.14032,0,0,1,33.80355,73.60773Z" style={{ fill: '#151417' }} />
            <path d="M83.76605,24.50881a9.30694,9.30694,0,0,1-18.60113,0,9.30719,9.30719,0,0,1,18.60113,0Z" style={{ fill: '#151417' }} />
        </g>
    </svg>

)

const DiceImages: React.FunctionComponent<IDiceImage> = ({ digit }) => {
    let component: ReactNode = <></>
    switch (digit) {
        case 1:
            component = dice1;
            break;
        case 2:
            component = dice2;
            break
        default:
            component = <></>
    }
    return component
}

export default DiceImages