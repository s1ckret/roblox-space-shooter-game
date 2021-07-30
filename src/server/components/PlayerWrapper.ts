import { StarterPlayer } from "@rbxts/services";
import SpaceShip from "./spaceship/SpaceShip";

export default class PlayerWrapper {
    private readonly _player: Player;
    private _spaceship: SpaceShip;
    private _model: Model;

    constructor(player: Player) {
        this._player = player;
        this._spaceship = new SpaceShip();
        this._model = this._CreateModel(this._spaceship);
    }

    private _CreateModel(spaceship: SpaceShip): Model {
        const model: Model = new Instance("Model");
        model.Name = "StarterCharacter";

        const primaryPart: Part = spaceship.GetCarcass().GetPart();
        primaryPart.Name = "HumanoidRootPart";
        primaryPart.Parent = model;

        const humanoid: Humanoid = new Instance("Humanoid");
        humanoid.Parent = model;

        model.PrimaryPart = primaryPart;
        model.Parent = StarterPlayer;
        return model;
    }
}
