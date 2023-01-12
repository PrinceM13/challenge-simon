import { useSimon } from "./context/SimonContext";

export default function ColorCard({ color }) {
    const colorCardState = `${color}` // ${isColorActive ? '' : 'inactive'}`;
    const { } = useSimon();

    const handleClick = () => {

    }

    return (
        <div className="col-6 p-1">
            <div className={`color-card square rounded ${colorCardState}`} onClick={handleClick}></div>
        </div>
    );
}