import { useSimon } from "./context/SimonContext";

export default function ColorCard({ color, isColorActive }) {
    const colorCardState = `${color} ${isColorActive ? '' : 'inactive'}`;
    const { setColorCardState } = useSimon();

    const handleClick = () => {
        setColorCardState({ [color]: !isColorActive })
    }

    return (
        <div className="col-6 p-1">
            <div className={`color-card square rounded ${colorCardState}`} onClick={handleClick}></div>
        </div>
    );
}