import { ReplicatedStorage } from "@rbxts/services";
import PlayerWrapper from "server/components/PlayerWrapper";
import PlayerMapper from "server/service/PlayerMapper";

const fireEvent: RemoteEvent = <RemoteEvent>ReplicatedStorage.WaitForChild("Event").WaitForChild("FireEvent");

fireEvent.OnServerEvent.Connect((player) => {
    const playerWrapper: PlayerWrapper | undefined = PlayerMapper.get(player);
    if (playerWrapper !== undefined) {
        playerWrapper.Shoot();
    }
});
