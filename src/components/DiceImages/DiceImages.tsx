import React from 'react';
import dice from '../../assets/images/dice.svg'
import dice1 from '../../assets/images/dice1.svg'
import dice2 from '../../assets/images/dice2.svg'
import dice3 from '../../assets/images/dice3.svg'
import dice4 from '../../assets/images/dice4.svg'
import dice5 from '../../assets/images/dice5.svg'
import dice6 from '../../assets/images/dice6.svg'

interface IDiceImage {
    digit: number;
    className: string;
    loader: boolean;
}

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

const DiceImages: React.FunctionComponent<IDiceImage> = ({ loader, digit, className }) => {
    const isValidDigit = digit >= 1 && digit <= 6;
    const selectedImage = isValidDigit ? diceImages[digit - 1] : null;

    return (
        <div className={className}>
            {loader && <img src={dice} alt={`Dice ${0}`} />}
            {selectedImage && !loader && <img src={selectedImage} alt={`Dice ${digit}`} />}
        </div>
    );
}

export default DiceImages