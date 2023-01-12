import { useSimon } from "./context/SimonContext";

export default function ColorCard({ color }) {
    const { blinkColor } = useSimon();
    const colorCardState = `${color} ${blinkColor === color ? '' : 'inactive'}`;

    const handleClick = () => {

    }

    return (
        <div className="col-6 p-1">
            <div className={`color-card square rounded ${colorCardState}`} onClick={handleClick}></div>
        </div>
    );
}