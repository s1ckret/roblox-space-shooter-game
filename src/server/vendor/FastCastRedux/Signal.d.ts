export type Signal = {
    Name: string;
    Connections: { [n: number]: Connection };
    YieldingThreads: { [n: number]: BindableEvent };
};

export type Connection = {
    Signal?: Signal;
    Delegate: any;
    Index: number;
};
