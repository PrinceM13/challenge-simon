import ColorCard from "./ColorCard";
import { useSimon } from "./context/SimonContext";

export default function ColorBoard() {
    const colorArr = ['green', 'red', 'yellow', 'blue'];
    const { } = useSimon();
    return (
        <div className="row color-board">
            {
                colorArr.map((el, idx) => (
                    <ColorCard key={idx} color={el} />
                ))
            }
        </div>
    );
}