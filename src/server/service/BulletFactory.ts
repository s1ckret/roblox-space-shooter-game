import { ReplicatedStorage } from "@rbxts/services";
import Bullet from "server/components/spaceship/Bullet";

const modelFolder: Folder = <Folder>ReplicatedStorage.WaitForChild("Model");
const bulletFolder: Folder = <Folder>modelFolder.WaitForChild("Bullets");
const bulletTempFolder: Folder = new Instance("Folder");
bulletTempFolder.Name = "TempBullets";
bulletTempFolder.Parent = game.Workspace;

const partBulletSmall: Part = <Part>bulletFolder.WaitForChild("BulletSmall");
const partBulletBig: Part = <Part>bulletFolder.WaitForChild("BulletBig");
const partBulletRocket: Part = <Part>bulletFolder.WaitForChild("BulletRocket");

const bulletSmall: Bullet = new Bullet(partBulletSmall);
const bulletBig: Bullet = new Bullet(partBulletBig);
const bulletRocket: Bullet = new Bullet(partBulletRocket);

export const enum BulletType {
    Small = 0,
    Big,
    Rocket,
}

export function GetFolderForTempBullets(): Folder {
    return bulletTempFolder;
}

// Returns a reference to a const bullet
export function GetBullet(bulletType: BulletType): Bullet {
    let bullet: Bullet;
    switch (bulletType) {
        case BulletType.Small:
            bullet = bulletSmall;
            break;
        case BulletType.Big:
            bullet = bulletBig;
            break;
        case BulletType.Rocket:
            bullet = bulletRocket;
            break;
        default:
            error("The BulletType [" + bulletType + "] doesn't exist!");
            break;
    }
    return bullet;
}

export function ToBulletType(name: string): BulletType {
    let bulletType: BulletType;
    switch (name) {
        case "Small":
            bulletType = BulletType.Small;
            break;
        case "Big":
            bulletType = BulletType.Big;
            break;
        case "Rocket":
            bulletType = BulletType.Rocket;
            break;
        default:
            error("The BulletType for [" + name + "] doesn't exist!");
            break;
    }
    return bulletType;
}
