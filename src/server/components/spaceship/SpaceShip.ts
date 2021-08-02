import Slot from "../slot/Slot";
import * as SpaceShipFactory from "./../../service/SpaceShipFactory";
import Carcass from "./Carcass";
import Engine from "./Engine";
import Gun from "./Gun";

export default class SpaceShip {
    private _carcass: Carcass;
    private _engine: Engine;
    private _engine1: Engine;
    private _gun: Gun;
    private _gun1: Gun;

    constructor() {
        this._carcass = SpaceShipFactory.CreateCarcass(SpaceShipFactory.CarcassType.Large);
        this._engine = SpaceShipFactory.CreateEngine(SpaceShipFactory.EngineType.Weak);
        this._engine1 = SpaceShipFactory.CreateEngine(SpaceShipFactory.EngineType.Strong);
        this._gun = SpaceShipFactory.CreateGun(SpaceShipFactory.GunType.MachineGunSmall);
        this._gun1 = SpaceShipFactory.CreateGun(SpaceShipFactory.GunType.MachineGunBig);
        this._CreateSpaceShip();
        this._AssembleShip();
    }

    public GetCarcass(): Carcass {
        return this._carcass;
    }

    public Shoot(): void {
        this._carcass.GetGunSlots().forEach((slot) => {
            const gun: Gun | undefined = slot.Get();
            if (gun !== undefined) {
                gun.Shoot();
            }
        });
    }

    private _CreateSpaceShip(): void {
        const bodyPosition = new Instance("BodyPosition");
        bodyPosition.MaxForce = new Vector3(0, math.huge, 0);
        bodyPosition.Position = new Vector3(0, 10, 0);
        this._carcass.GetPart().Position = new Vector3(0, 10, 0);
        bodyPosition.Parent = this._carcass.GetPart();

        this._engine.GetPart().Parent = this._carcass.GetPart();
        this._engine1.GetPart().Parent = this._carcass.GetPart();
        this._gun.GetPart().Parent = this._carcass.GetPart();
        this._gun1.GetPart().Parent = this._carcass.GetPart();
        this._carcass.GetPart().Parent = game.Workspace;
    }

    private _AssembleShip(): void {
        const engineSlots: Slot<Engine>[] = this._carcass.GetFreeEngineSlots();
        const gunSlots: Slot<Gun>[] = this._carcass.GetFreeGunSlots();

        if (engineSlots.size() > 0) {
            this._carcass.InsertEngine(engineSlots[0], this._engine);
            this._carcass.InsertEngine(engineSlots[1], this._engine1);
        }

        if (gunSlots.size() > 0) {
            this._carcass.InsertGun(gunSlots[0], this._gun);
            this._carcass.InsertGun(gunSlots[1], this._gun1);
        }
    }
}
