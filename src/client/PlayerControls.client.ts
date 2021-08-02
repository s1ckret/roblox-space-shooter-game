import { UserInputService, ReplicatedStorage } from "@rbxts/services";

const fireEvent: RemoteEvent = <RemoteEvent>ReplicatedStorage.WaitForChild("Event").WaitForChild("FireEvent");

UserInputService.InputBegan.Connect((input, gameProcessed) => {
    if (input.UserInputType === Enum.UserInputType.MouseButton1) {
        fireEvent.FireServer();
    }
});
export {};
