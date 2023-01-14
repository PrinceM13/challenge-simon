import { useSimon } from "./context/SimonContext";

export default function Header() {
    const { game, isPlay, setIsPlay, highScore } = useSimon();

    const handleNewGame = () => setIsPlay(true);

    const newGameButton = <button className="btn btn-secondary" onClick={handleNewGame}>New Game</button>;
    const scoreDisplay = <>
        <h5>Current Score: {game.score}</h5>
        <h5>High Score: {highScore}</h5>
    </>

    return (
        <div className="text-center d-flex flex-column align-items-center gap-3">
            <h1>{game.message || 'SIMON GAME'}</h1>
            <div className="d-flex flex-column">
                {isPlay ? scoreDisplay : newGameButton}
            </div>
        </div>
    );
}