import { Store } from './Store';
import { FluxOptions } from './FluxOptions';
export declare class Flux {
    private static _instance;
    private _options;
    private _stores;
    private contructor();
    static start(): void;
    static destroy(): void;
    static readonly instance: Flux;
    options: FluxOptions;
    addStore(store: Store): void;
    getStore(name: string): Store;
    readonly stores: Store[];
}
