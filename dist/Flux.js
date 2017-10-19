"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FluxOptions_1 = require("./FluxOptions");
var Flux = (function () {
    function Flux() {
        this._options = new FluxOptions_1.FluxOptions();
        this._stores = [];
    }
    Flux.prototype.contructor = function () { };
    Flux.start = function () {
        if (Flux._instance == null) {
            Flux._instance = new Flux();
        }
        else { }
    };
    Flux.destroy = function () {
        Flux._instance = null;
    };
    Object.defineProperty(Flux, "instance", {
        get: function () {
            if (Flux._instance == null)
                Flux._instance = new Flux();
            return Flux._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Flux.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (options) {
            this._options = options;
        },
        enumerable: true,
        configurable: true
    });
    Flux.prototype.addStore = function (store) {
        if (this._stores.indexOf(store) == -1)
            this._stores.push(store);
    };
    Flux.prototype.getStore = function (name) {
        for (var store in this._stores) {
            if (this._stores[store].constructor.name === name) {
                return this._stores[store];
            }
        }
        return null;
    };
    Object.defineProperty(Flux.prototype, "stores", {
        get: function () {
            return this._stores;
        },
        enumerable: true,
        configurable: true
    });
    Flux._instance = null;
    return Flux;
}());
exports.Flux = Flux;
