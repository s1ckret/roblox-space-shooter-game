import Insertable from "../slot/Insertable";
import FastCastRedux from "server/vendor/FastCastRedux";

FastCastRedux.VisualizeCasts = true;

export default class Gun implements Insertable {
    private readonly _part: Part;
    private _attachment: Attachment;
    private _attachmentFire: Attachment;
    private _caster: FastCastRedux;

    constructor(part: Part) {
        this._part = part;
        this._attachment = <Attachment>this._part.WaitForChild("AttachmentGun");
        this._attachmentFire = <Attachment>this._part.WaitForChild("AttachmentFire");
        this._caster = new FastCastRedux();
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
        this._caster.Fire(origin, direction, 10);
    }
}
