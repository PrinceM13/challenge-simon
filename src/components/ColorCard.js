export default function ColorCard({ color }) {
    return (
        <div className="col-6 p-1">
            <div className={`color-card square rounded light ${color}`}></div>
        </div>
    );
}