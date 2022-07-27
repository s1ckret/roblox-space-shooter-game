import Insertable from "../slot/Insertable";
import FastCastRedux from "server/vendor/FastCastRedux";
import { ActiveCast, FastCastBehavior } from "server/vendor/FastCastRedux/TypeDefinitions";
import * as BulletFactory from "server/service/BulletFactory";

export default class Gun implements Insertable {
    private readonly _part: Part;
    private _attachment: Attachment;
    private _attachmentFire: Attachment;
    private _caster: FastCastRedux;
    private _castBehaviour: FastCastBehavior;

    constructor(part: Part) {
        this._part = part;
        this._attachment = <Attachment>this._part.WaitForChild("AttachmentGun");
        this._attachmentFire = <Attachment>this._part.WaitForChild("AttachmentFire");
        this._caster = new FastCastRedux();
        this._caster.LengthChanged.Connect(
            (
                cast: ActiveCast,
                lastPoint: Vector3,
                rayDir: Vector3,
                rayDisplacement: number,
                segmentVelocity: Vector3,
                cosmeticBulletObject?: Instance,
            ) => {
                this._OnLenghChanged(cast, lastPoint, rayDir, rayDisplacement, segmentVelocity, cosmeticBulletObject);
            },
        );
        this._caster.RayHit.Connect(
            (
                cast: ActiveCast,
                resultOfCast: RaycastResult,
                segmentVelocity: Vector3,
                cosmeticBulletObject?: Instance,
            ) => {
                this._OnRayHit(cast, resultOfCast, segmentVelocity, cosmeticBulletObject);
            },
        );
        this._castBehaviour = FastCastRedux.newBehavior();
        this._ConfigCastBehaviour(this._castBehaviour, [this._part, BulletFactory.GetFolderForTempBullets()]);
    }

    public Destroy(): void {
        this._part.Destroy();
    }

    public GetPart(): Part {
        return this._part;
    }

    public GetAttachmentPoint(): Attachment {
        return this._attachment;
    }

    public Shoot(): void {
        const origin: Vector3 = this._attachmentFire.WorldPosition;
        const direction: Vector3 = this._part.CFrame.LookVector;
        // TODO: Read from properties
        this._caster.Fire(origin, direction, 250, this._castBehaviour);
    }

    private _ConfigCastBehaviour(behaviour: FastCastBehavior, transparentInstances: Instance[]): void {
        const raycastParams = new RaycastParams();
        raycastParams.IgnoreWater = true;
        raycastParams.FilterType = Enum.RaycastFilterType.Blacklist;
        raycastParams.FilterDescendantsInstances = transparentInstances;

        // TODO: Read from properties
        behaviour.RaycastParams = raycastParams;
        behaviour.AutoIgnoreContainer = false;
        behaviour.MaxDistance = 50;
        behaviour.CosmeticBulletContainer = BulletFactory.GetFolderForTempBullets();
        behaviour.CosmeticBulletTemplate = BulletFactory.GetBullet(BulletFactory.BulletType.Rocket).part;
    }

    private _OnLenghChanged(
        cast: ActiveCast,
        lastPoint: Vector3,
        rayDir: Vector3,
        rayDisplacement: number,
        segmentVelocity: Vector3,
        cosmeticBulletObject?: Instance,
    ): void {
        if (cosmeticBulletObject !== undefined) {
            const bulletLength: number = (<Part>cosmeticBulletObject).Size.Z / 2.0;
            const offset: CFrame = new CFrame(0, 0, -(rayDisplacement - bulletLength));
            (<Part>cosmeticBulletObject).CFrame = CFrame.lookAt(lastPoint, lastPoint.add(rayDir)).ToWorldSpace(offset);
        }
    }

    private _OnRayHit(
        cast: ActiveCast,
        resultOfCast: RaycastResult,
        segmentVelocity: Vector3,
        cosmeticBulletObject?: Instance,
    ): void {
        const hit: Instance = resultOfCast.Instance;

        const chracter: Model | undefined = hit.FindFirstAncestorWhichIsA("Model");
        if (chracter !== undefined) {
            const humanoid: Humanoid | undefined = <Humanoid>chracter.FindFirstChild("Humanoid");
            if (humanoid !== undefined) {
                // TODO: Read from properties
                humanoid.TakeDamage(10);
            }
        }

        cosmeticBulletObject?.Destroy();
    }
}
