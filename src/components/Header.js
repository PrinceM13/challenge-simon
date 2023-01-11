import NewGameButton from "./NewGameButton";

export default function Header() {
    return (
        <div className="text-center d-flex flex-column pt-5 gap-3 align-items-center">
            <h1>SIMON GAME</h1>
            <NewGameButton />
            <div className="d-flex flex-column mb-3">
                <h5>Current Score: 0</h5>
                <h5>High Score: 0</h5>
            </div>
        </div>
    );
}