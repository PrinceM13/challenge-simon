import { useSimon } from "../context/SimonContext";
import { GAME_OVER_MESSAGE } from "../reducer/SimonReducer";
import { timeout } from "../utilities/utilities";

export default function Header() {
  const { game, isPlay, setIsPlay, highScore } = useSimon();

  const handleNewGame = async () => {
    await timeout();
    setIsPlay(true);
  };

  const newGameButton = (
    <button className="btn btn-outline-light" onClick={handleNewGame}>
      New Game
    </button>
  );
  const scoreDisplay = (
    <>
      <h4>Current Score: {game.score}</h4>
      <h6>High Score: {highScore}</h6>
    </>
  );

  return (
    <div className="text-center d-flex flex-column align-items-center gap-3">
      {!isPlay || game.message === GAME_OVER_MESSAGE ? (
        <h1>{game.message || "SIMON GAME"}</h1>
      ) : null}
      <div className="d-flex flex-column gap-3">{isPlay ? scoreDisplay : newGameButton}</div>
    </div>
  );
}
