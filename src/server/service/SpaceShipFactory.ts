import { ReplicatedStorage } from "@rbxts/services";

import Carcass from "server/components/spaceship/Carcass";
import Engine from "server/components/spaceship/Engine";
import Gun from "server/components/spaceship/Gun";

const modelFolder: Folder = <Folder>ReplicatedStorage.WaitForChild("Model");
const carcassFolder: Folder = <Folder>modelFolder.WaitForChild("Carcasses");
const engineFolder: Folder = <Folder>modelFolder.WaitForChild("Engines");
const gunFolder: Folder = <Folder>modelFolder.WaitForChild("Guns");

const carcassSmall: Part = <Part>carcassFolder.WaitForChild("CarcassSmall");
const carcassBig: Part = <Part>carcassFolder.WaitForChild("CarcassBig");

const engineWeak: Part = <Part>engineFolder.WaitForChild("EngineWeak");
const engineStrong: Part = <Part>engineFolder.WaitForChild("EngineStrong");

const gunMachineSmall: Part = <Part>gunFolder.WaitForChild("MachineGunSmall");
const gunMachineBig: Part = <Part>gunFolder.WaitForChild("MachineGunBig");

const enum CarcassType {
    Small = 0,
    Big,
}

enum EngineType {
    Weak = 0,
    Strong,
}

enum GunType {
    MachineGunSmall = 0,
    MachineGunBig,
}

function CreateCarcass(carcassType: CarcassType): Carcass {
    let part: Part;
    switch (carcassType) {
        case CarcassType.Small:
            part = carcassSmall.Clone();
            break;
        case CarcassType.Big:
            part = carcassBig.Clone();
            break;
        default:
            part = new Instance("Part");
            error("Carcass " + carcassType + " is not found!");
            break;
    }
    return new Carcass(part);
}

function CreateEngine(engineType: EngineType): Engine {
    let part: Part;
    switch (engineType) {
        case EngineType.Weak:
            part = engineWeak.Clone();
            break;
        case EngineType.Strong:
            part = engineStrong.Clone();
            break;
        default:
            part = new Instance("Part");
            error("Engine " + engineType + " is not found!");
            break;
    }
    return new Engine(part);
}

function CreateGun(gunType: GunType): Gun {
    let part: Part;
    switch (gunType) {
        case GunType.MachineGunSmall:
            part = gunMachineSmall.Clone();
            break;
        case GunType.MachineGunBig:
            part = gunMachineBig.Clone();
            break;
        default:
            part = new Instance("Part");
            error("Gun " + gunType + " is not found!");
            break;
    }
    return new Gun(part);
}

export { CarcassType, EngineType, GunType, CreateCarcass, CreateEngine, CreateGun };
