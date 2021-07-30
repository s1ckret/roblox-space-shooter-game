import { Players } from "@rbxts/services";
import PlayerWrapper from "./components/PlayerWrapper";
import SpaceShip from "./components/spaceship/SpaceShip";

Players.PlayerAdded.Connect((player) => {
    print("Player added: ", player.Name);
    const spaceship: SpaceShip = new SpaceShip();
    const playerWrapper: PlayerWrapper = new PlayerWrapper(player);
});

export {};
