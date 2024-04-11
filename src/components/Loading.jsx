import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../img/Animation - 1712724325266.json'

const YourComponent = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='mx-auto max-w-sm p-4'>
                <Lottie options={defaultOptions} height={200} width={200} />
            </div>
        </div>
    );
};

export default YourComponent;
