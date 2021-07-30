import Insertable from "./Insertable";

export default class Slot<T extends Insertable> {
    private _attachmentPoint: Attachment;
    private _insertable: T | undefined;

    constructor(attachmentPoint: Attachment) {
        this._attachmentPoint = attachmentPoint;
        this._insertable = undefined;
    }

    Insert(insertable: T): void {
        this._insertable = insertable;
    }

    Remove(): void {
        this._insertable = undefined;
    }

    GetAttachmentPoint(): Attachment {
        return this._attachmentPoint;
    }

    IsFree(): boolean {
        return this._insertable === undefined;
    }

    Get(): T | undefined {
        return this._insertable;
    }
}
