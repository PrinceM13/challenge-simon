import { useEffect, useState } from "react";
import { useSimon } from "./context/SimonContext";

export default function ColorCard({ color, isActive }) {
    const colorCardState = `${color} ${isActive ? '' : 'inactive'}`;
    const { setColorCardState } = useSimon();

    // local state to handle click
    const [isClick, setIsClick] = useState(false);

    const handleClick = () => {
        setColorCardState({ [color]: !isActive });
        setIsClick(true);
    }

    // blinking effect
    useEffect(() => {
        setTimeout(() => {
            if (isClick) {
                setColorCardState({ [color]: !isActive });
                setIsClick(false);
            }
        }, 300);
    }, [isClick])

    return (
        <div className="col-6 p-1">
            <div className={`color-card square rounded ${colorCardState}`} onClick={handleClick}></div>
        </div>
    );
}