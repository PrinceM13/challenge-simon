import { useSimon } from "./context/SimonContext";


export default function Header() {
    const { isPlay, setIsPlay } = useSimon();

    const handleNewGame = () => setIsPlay(true);

    const NewGameButton = <button className="btn btn-secondary" onClick={handleNewGame}>New Game</button>;
    const ScoreDisplay = <>
        <h5>Current Score: 0</h5>
        <h5>High Score: 0</h5>
    </>
    return (
        <div className="text-center d-flex flex-column pt-5 gap-3 align-items-center">
            <h1>SIMON GAME</h1>
            <div className="d-flex flex-column mb-3">
                {isPlay ? ScoreDisplay : NewGameButton}
            </div>
        </div>
    );
}