import SpaceShip from "./spaceship/SpaceShip";

export default class PlayerWrapper {
    private readonly _player: Player;
    private _spaceship: SpaceShip;
    private _model: Model;
    private _characterAddedConnection: RBXScriptConnection;

    constructor(player: Player) {
        this._player = player;
        this._spaceship = new SpaceShip();
        this._model = this._CreateModel(this._player.Name, this._spaceship);
        this._characterAddedConnection = player.CharacterAdded.Connect((model) => {
            this._OnCharacterAdded(model);
        });
    }

    public Shoot(): void {
        this._spaceship.Shoot();
    }

    private _CreateModel(playerName: string, spaceship: SpaceShip): Model {
        const model: Model = new Instance("Model");
        model.Name = playerName;

        const primaryPart: Part = spaceship.GetCarcass().GetPart();
        primaryPart.Name = "HumanoidRootPart";
        primaryPart.Parent = model;

        const humanoid: Humanoid = new Instance("Humanoid");
        humanoid.Parent = model;

        model.PrimaryPart = primaryPart;
        return model;
    }

    private _OnCharacterAdded(oldModel: Model): void {
        // Disconnect to prevent recursion.
        this._characterAddedConnection.Disconnect();

        const oldCFrame: CFrame = oldModel.GetPrimaryPartCFrame();
        this._model.SetPrimaryPartCFrame(oldCFrame);
        oldModel.Destroy();

        this._player.Character = this._model;
        this._model.Parent = game.Workspace;
    }
}
