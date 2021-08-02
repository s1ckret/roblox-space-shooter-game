import { Players } from "@rbxts/services";
import PlayerWrapper from "./components/PlayerWrapper";
import SpaceShip from "./components/spaceship/SpaceShip";
import PlayerMapper from "./service/PlayerMapper";

Players.PlayerAdded.Connect((player) => {
    print("Player added: ", player.Name);
    const playerWrapper: PlayerWrapper = new PlayerWrapper(player);
    PlayerMapper.set(player, playerWrapper);
});

export {};
