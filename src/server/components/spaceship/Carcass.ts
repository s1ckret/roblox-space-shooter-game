import Slot from "../slot/Slot";
import Engine from "./Engine";
import Gun from "./Gun";

export default class Carcass {
    private readonly _part: Part;

    private _gunSlots: Slot<Gun>[];
    private _engineSlots: Slot<Engine>[];

    private _gunWelds: Map<Slot<Gun>, WeldConstraint>;
    private _engineWelds: Map<Slot<Engine>, WeldConstraint>;

    constructor(part: Part) {
        this._part = part;
        this._gunSlots = this._CreateGunSlots(this._part);
        this._engineSlots = this._CreateEngineSlots(this._part);

        this._gunWelds = new Map();
        this._engineWelds = new Map();
    }

    public Destroy(): void {
        this._part.Destroy();
    }

    public GetPart(): Part {
        return this._part;
    }

    public GetFreeGunSlots(): Slot<Gun>[] {
        return this._gunSlots.filter((slot) => slot.IsFree());
    }

    public GetGunSlots(): Slot<Gun>[] {
        return this._gunSlots;
    }

    public GetFreeEngineSlots(): Slot<Engine>[] {
        return this._engineSlots.filter((slot) => slot.IsFree());
    }

    public GetEngineSlots(): Slot<Engine>[] {
        return this._engineSlots;
    }

    public InsertGun(slot: Slot<Gun>, gun: Gun): boolean {
        let result = false;
        if (this._gunSlots.find((s) => s === slot)) {
            slot.Insert(gun);
            const weld: WeldConstraint = this._WeldParts(
                this._part,
                gun.GetPart(),
                slot.GetAttachmentPoint(),
                gun.GetAttachmentPoint(),
            );
            this._gunWelds.set(slot, weld);
            result = true;
        }
        return result;
    }

    public InsertEngine(slot: Slot<Engine>, engine: Engine): boolean {
        let result = false;
        if (this._engineSlots.find((s) => s === slot)) {
            slot.Insert(engine);
            const weld: WeldConstraint = this._WeldParts(
                this._part,
                engine.GetPart(),
                slot.GetAttachmentPoint(),
                engine.GetAttachmentPoint(),
            );
            this._engineWelds.set(slot, weld);
            result = true;
        }
        return result;
    }

    public RemoveGun(slot: Slot<Gun>): boolean {
        let result = false;
        if (this._gunSlots.find((s) => s === slot)) {
            slot.Remove();
            const weld: WeldConstraint | undefined = this._gunWelds.get(slot);
            if (weld !== undefined) {
                weld.Destroy();
            }
            this._gunWelds.delete(slot);
            result = true;
        }
        return result;
    }

    public RemoveEngine(slot: Slot<Engine>): boolean {
        let result = false;
        if (this._engineSlots.find((s) => s === slot)) {
            slot.Remove();
            const weld: WeldConstraint | undefined = this._engineWelds.get(slot);
            if (weld !== undefined) {
                weld.Destroy();
            }
            this._engineWelds.delete(slot);
            result = true;
        }
        return result;
    }

    private _CreateGunSlots(part: Part): Slot<Gun>[] {
        const slots: Slot<Gun>[] = [];
        const children: Instance[] = part.GetChildren();
        children.forEach((c) => {
            if ("AttachmentGun" === c.Name) {
                print("[Carcass]: Create slot for gun", c);
                slots.push(new Slot<Gun>(<Attachment>c));
            }
        });
        return slots;
    }

    private _CreateEngineSlots(part: Part): Slot<Engine>[] {
        const slots: Slot<Engine>[] = [];
        const children: Instance[] = part.GetChildren();
        children.forEach((c) => {
            if ("AttachmentEngine" === c.Name) {
                print("[Carcass]: Create slot for engine", c);
                slots.push(new Slot<Engine>(<Attachment>c));
            }
        });
        return slots;
    }

    // Welds partB to partA. Allign partB's attachment point with partA's attachment point by moving partB
    private _WeldParts(partA: Part, partB: Part, pointA: Attachment, pointB: Attachment): WeldConstraint {
        partB.Position = partA.Position.add(pointA.Position).sub(pointB.Position);

        const weld = new Instance("WeldConstraint");
        weld.Part0 = partA;
        weld.Part1 = partB;
        weld.Parent = partA;
        return weld;
    }
}
