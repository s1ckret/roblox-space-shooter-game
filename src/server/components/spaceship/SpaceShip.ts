import Slot from "../slot/Slot";
import * as SpaceShipFactory from "./../../service/SpaceShipFactory";
import Carcass from "./Carcass";
import Engine from "./Engine";
import Gun from "./Gun";

export default class SpaceShip {
    private _carcass: Carcass;
    private _engine: Engine;
    private _gun: Gun;

    constructor() {
        this._carcass = SpaceShipFactory.CreateCarcass(SpaceShipFactory.CarcassType.Small);
        this._engine = SpaceShipFactory.CreateEngine(SpaceShipFactory.EngineType.Weak);
        this._gun = SpaceShipFactory.CreateGun(SpaceShipFactory.GunType.MachineGunSmall);
        this._CreateSpaceShip();
        this._AssembleShip();
    }

    public GetCarcass(): Carcass {
        return this._carcass;
    }

    private _CreateSpaceShip(): void {
        const bodyPosition = new Instance("BodyPosition");
        bodyPosition.MaxForce = new Vector3(0, math.huge, 0);
        bodyPosition.Position = new Vector3(0, 10, 0);
        bodyPosition.Parent = this._carcass.GetPart();

        this._engine.GetPart().Parent = this._carcass.GetPart();
        this._gun.GetPart().Parent = this._carcass.GetPart();
        this._carcass.GetPart().Parent = game.Workspace;
    }

    private _AssembleShip(): void {
        const engineSlots: Slot<Engine>[] = this._carcass.GetFreeEngineSlots();
        const gunSlots: Slot<Gun>[] = this._carcass.GetFreeGunSlots();

        if (engineSlots.size() > 0) {
            this._carcass.InsertEngine(engineSlots[0], this._engine);
        }

        if (gunSlots.size() > 0) {
            this._carcass.InsertGun(gunSlots[0], this._gun);
        }
    }
}
