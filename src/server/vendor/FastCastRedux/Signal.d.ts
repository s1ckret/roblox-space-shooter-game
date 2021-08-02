export type Signal = {
    Name: string;
    Connections: { [n: number]: Connection };
    YieldingThreads: { [n: number]: BindableEvent };
    Connect(c: Callback): Connection;
};

export type Connection = {
    Signal?: Signal;
    Delegate: any;
    Index: number;
};
