import { useEffect, useState } from 'react';

export default function Timer() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [milliseconds, setMilliseconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMilliseconds(milliseconds => milliseconds + 1);
        }, 10);

        if (milliseconds === 100) {
            setSeconds(seconds => seconds + 1);
            setMilliseconds(0);
        }

        if (seconds === 60) {
            setMinutes(minutes => minutes + 1);
            setSeconds(0);
        }
        
        return () => clearInterval(interval);
    }, [milliseconds, seconds]);

    const time = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}:${milliseconds < 10 ? `0${milliseconds}` : milliseconds}`;
    

    return (
    <div className="timer">{time}</div>

    );
}