import ColorCard from "./ColorCard";
import { useSimon } from "./context/SimonContext";

export default function ColorBoard() {
    const colorArr = ['colorGreen', 'colorRed', 'colorYellow', 'colorBlue'];
    const { isColorActive } = useSimon();
    return (
        <div className="row color-board">
            {
                colorArr.map((el, idx) => (
                    <ColorCard key={idx} color={el} isActive={isColorActive[el]} />
                ))
            }
        </div>
    );
}