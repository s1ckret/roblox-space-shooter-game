import { Signal } from "./FastCastRedux/Signal";
import { ActiveCast, FastCastBehavior } from "./FastCastRedux/TypeDefinitions";

interface FastCastRedux {
    LengthChanged: Signal;
    RayHit: Signal;
    RayPierced: Signal;
    CastTerminating: Signal;
    WorldRoot: Workspace;
    Fire(
        origin: Vector3,
        direction: Vector3,
        velocity: Vector3 | number,
        castDataPacket?: FastCastBehavior,
    ): ActiveCast;
}

interface FastCastReduxConstructor {
    new (): FastCastRedux;
    newBehavior(): FastCastBehavior;
    DebugLogging: boolean;
    VisualizeCasts: boolean;
}

declare const FastCastRedux: FastCastReduxConstructor;
export = FastCastRedux;
