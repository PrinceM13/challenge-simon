import { useSimon } from "./context/SimonContext";
import { GAME_OVER_MESSAGE, INITIAL_STATE, START_GAME } from "./reducer/SimonReducer";

export default function Footer() {
    const { game, dispatchGame, setIsPlay } = useSimon();

    const handleYes = () => dispatchGame({ type: START_GAME });
    const handleNo = () => {
        dispatchGame({ type: INITIAL_STATE });
        setIsPlay(false);
    }

    const playAgain = <>
        <h3>Play Again ?</h3>
        <div className="d-flex gap-1">
            <button className="btn btn-outline-success" onClick={handleYes}>Yes</button>
            <button className="btn btn-outline-danger" onClick={handleNo}>No</button>
        </div>
    </>
    return (
        <div className="d-flex justify-content-center align-items-center gap-3">
            {game.message === GAME_OVER_MESSAGE && playAgain}
        </div>
    );
}