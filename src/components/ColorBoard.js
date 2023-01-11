import ColorCard from "./ColorCard";

export default function ColorBoard() {
    const colorArr = ['s-green', 's-red', 's-yellow', 's-blue'];
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