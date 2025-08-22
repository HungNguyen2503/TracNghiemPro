/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';
import { CgSandClock } from "react-icons/cg";
import './CountdownTimer.scss'

const formatTime = (times) => {
    const hours = Math.floor(times / 3600)
    const minutes = Math.floor(times % 3600 / 60);
    const seconds = times % 3600 % 60;
    
    const formattedHours   = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

/**
 * Component Bộ đếm ngược
 * @param {number} initialTimeInSeconds - Thời gian ban đầu (tính bằng giây)
 * @param {function} onTimerEnd - Hàm gọi khi bộ đếm kết thúc
 * @param {boolean} endTest -  Dừng bộ đếm
 */

const CountdownTimer = ({ initialTimeInSeconds, onTimerEnd, endTest }) => {
    const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);
    const [isAnimating, setIsAnimating] = useState(true);

    // (()=>{
    //     if(!isAnimating){
    //         onTimerEnd();
    //         return;
    //     }
    // })();

    const animationStyle = {
        animation: isAnimating ? 'rotate 1s linear infinite' : 'none'
    };

    useEffect(() => {
        if (timeLeft <= 0) {
            if (timeLeft === 0) {
                onTimerEnd();
                setIsAnimating(false);
            }
            return;
        }

        if(endTest) {
            setIsAnimating(false);
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, endTest]);

    return (
        <div className="countdown-timer">
            <p className='clock' style={animationStyle}><CgSandClock /></p>
            <p>{formatTime(timeLeft)}</p>
        </div>
    );
};

export default memo(CountdownTimer);