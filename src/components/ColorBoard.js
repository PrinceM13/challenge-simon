import ColorCard from "./ColorCard";
import { useSimon } from "./context/SimonContext";

export default function ColorBoard() {
    const { colorsArr } = useSimon();
    return (
        <div className="row color-board">
            {
                colorsArr.map((el, idx) => (
                    <ColorCard key={idx} color={el} />
                ))
            }
        </div>
    );
}