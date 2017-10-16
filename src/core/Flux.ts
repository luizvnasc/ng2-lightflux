import {Store} from './Store';
import {FluxOptions} from './FluxOptions';

export class Flux {
    private static _instance : Flux = null;
    private _options : FluxOptions = new FluxOptions();
    private _stores : Store[] = [];
    private contructor() {}

    public static start() : void {
        if(Flux._instance == null) {

            Flux._instance = new Flux();
        } else {}
    }
    public static destroy() {
        Flux._instance = null;

    }

    static get instance() {
        if (Flux._instance == null) 
            Flux._instance = new Flux();
        return Flux._instance;
    }

    set options(options : FluxOptions) {
        this._options = options;
    }

    get options() {
        return this._options;
    }

    addStore(store : Store) : void {
        if(this._stores.indexOf(store) == -1) 
            this._stores.push(store);

        }
    
    getStore(name : string) {
        for (let store in this._stores) {
            if (this._stores[store].constructor.name === name) {
                return this._stores[store];
            }
        }
        return null;
    }

    get stores() {
        return this._stores;
    }
}