import Insertable from "../slot/Insertable";

export default class Gun implements Insertable {
    private _attachment: Attachment;
    private readonly _part: Part;
    constructor(part: Part) {
        this._part = part;
        this._attachment = <Attachment>this._part.WaitForChild("AttachmentGun");
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
}
