"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("rxjs/Rx");
var decorators_1 = require("./decorators");
var Flux_1 = require("./Flux");
/**
 * Classe que representa um store na arquitetura flux;
 * @author luiz.v.nasc
 */
var Store = (function () {
    function Store() {
        this.actionSource = new Rx_1.Subject();
        //Adiciona a store a lista de stores do flux
        Flux_1.Flux.instance.addStore(this);
    }
    /**
     * Método que emite uma ação.
     * @param action Nome da ação.
     * @param payload dado utilizado pela ação.
     */
    Store.prototype.dispatch = function (action, payload) {
        if (action in this) {
            if (Reflect.hasMetadata(decorators_1.actionMetadataKey, this[action]) && Reflect.getMetadata(decorators_1.actionMetadataKey, this[action])) {
                if (payload != undefined)
                    return this[action](payload);
                else
                    return this[action]();
            }
            else {
                throw new TypeError('a propriedade ' + action + ' não é uma instância de Action.');
            }
        }
        else {
            throw new ReferenceError('A ação ' + action + ' não existe nesta store');
        }
    };
    /**
    * Método que emite uma mutação no state.
    * @param mutation Nome da mutação.
    * @param payload dado utilizado pela mutação.
    */
    Store.prototype.commit = function (mutation, payload) {
        if (mutation in this) {
            if (Reflect.hasMetadata(decorators_1.mutationMetadataKey, this[mutation]) && Reflect.getMetadata(decorators_1.mutationMetadataKey, this[mutation])) {
                this[mutation](payload);
                this.actionSource.next(mutation);
            }
            else {
                throw new TypeError('a propriedade ' + mutation + ' não é uma instância de Mutation.');
            }
        }
        else {
            throw new ReferenceError('A mutação ' + mutation + ' não existe nesta store');
        }
    };
    Store.prototype.subscribe = function (method, callback) {
        this.actionSource.asObservable().subscribe(function (action) {
            if (action === method)
                callback();
        });
    };
    return Store;
}());
exports.Store = Store;
