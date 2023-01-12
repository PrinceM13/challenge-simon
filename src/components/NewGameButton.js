import { useSimon } from "./context/SimonContext";

export default function NewGameButton() {
    const { blinkAll } = useSimon();
    const handleNewGame = () => blinkAll(800);
    return (
        <button className="btn btn-secondary" onClick={handleNewGame}>New Game</button>
    );
}