export type CanPierceFunction = (activeCast: ActiveCast, raycastResult: RaycastResult, v3: Vector3) => boolean;

export type GenericTable = { [a: string]: any };

export type Caster = {
    WorldRoot: WorldRoot;
    LengthChanged: RBXScriptSignal;
    RayHit: RBXScriptSignal;
    RayPierced: RBXScriptSignal;
    CastTerminating: RBXScriptSignal;
    Fire: (
        origin: Vector3,
        direction: Vector3,
        velocity: Vector3 | number,
        castDataPacket?: FastCastBehavior,
    ) => ActiveCast;
};

export type FastCastBehavior = {
    RaycastParams?: RaycastParams;
    MaxDistance: number;
    Acceleration: Vector3;
    HighFidelityBehavior: number;
    HighFidelitySegmentSize: number;
    CosmeticBulletTemplate?: Instance;
    CosmeticBulletProvider: any;
    CosmeticBulletContainer?: Instance;
    AutoIgnoreContainer: boolean;
    CanPierceFunction: CanPierceFunction;
};

export type CastTrajectory = {
    StartTime: number;
    EndTime: number;
    Origin: Vector3;
    InitialVelocity: Vector3;
    Acceleration: Vector3;
};

export type CastStateInfo = {
    UpdateConnection: RBXScriptSignal;
    HighFidelityBehavior: number;
    HighFidelitySegmentSize: number;
    Paused: boolean;
    TotalRuntime: number;
    DistanceCovered: number;
    IsActivelySimulatingPierce: boolean;
    IsActivelyResimulating: boolean;
    CancelHighResCast: boolean;
    Trajectories: { [n: number]: CastTrajectory };
};

export type CastRayInfo = {
    Parameters: RaycastParams;
    WorldRoot: WorldRoot;
    MaxDistance: number;
    CosmeticBulletObject?: Instance;
    CanPierceCallback: CanPierceFunction;
};

export type ActiveCast = {
    Caster: Caster;
    StateInfo: CastStateInfo;
    RayInfo: CastRayInfo;
    UserData: { [d: string]: any };
};
