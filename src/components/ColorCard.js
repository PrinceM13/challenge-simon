import { useSimon } from "./context/SimonContext";

export default function ColorCard({ color, isActive }) {
    const colorCardState = `${color} ${isActive ? '' : 'inactive'}`;
    const { blink } = useSimon();
    const handleClick = () => blink(color);
    return (
        <div className="col-6 p-1">
            <div className={`color-card square rounded ${colorCardState}`} onClick={handleClick}></div>
        </div>
    );
}