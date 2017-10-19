"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Flux_1 = require("./Flux");
exports.actionMetadataKey = Symbol('ng2Flux:action');
exports.mutationMetadataKey = Symbol('ng2Flux:mutation');
exports.stateMetadataKey = Symbol('ng2Flux:state');
/**
 * Decorator que indica que um método é uma action.
 * @author luizvnasc
 * @param target
 * @param propertyKey
 */
function action(target, propertyKey) {
    Reflect.defineMetadata(exports.actionMetadataKey, true, target[propertyKey]);
}
exports.action = action;
/**
 * Decorator que indica que um método é uma mutation.
 * @author luizvnasc
 * @param target
 * @param propertyKey
 */
function mutation(target, propertyKey) {
    Reflect.defineMetadata(exports.mutationMetadataKey, true, target[propertyKey]);
}
exports.mutation = mutation;
function state(target, propertyKey) {
    Reflect.defineMetadata(exports.stateMetadataKey, true, target, propertyKey);
}
exports.state = state;
function data(stateName) {
    return function (target, propertyKey) {
        var descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
        descriptor.get = function () {
            if (stateName == undefined) {
                stateName = propertyKey;
            }
            if (Flux_1.Flux.instance.options.namespace) {
                var _a = stateName.split('.'), store = _a[0], state_1 = _a[1];
                var storeInstance = Flux_1.Flux
                    .instance
                    .getStore(store);
                if (storeInstance == null) {
                    throw new Error('Store ' + store + ' inexistente.');
                }
                else {
                    if (state_1 in storeInstance && Reflect.hasMetadata(exports.stateMetadataKey, storeInstance, state_1)) {
                        return storeInstance[state_1];
                    }
                    else {
                        if (!Reflect.hasMetadata(exports.stateMetadataKey, storeInstance, state_1)) {
                            throw new Error('A propriedade ' + state_1 + ' não é um state da store ' + store);
                        }
                        else {
                            throw new Error('State ' + state_1 + ' não existe ou não pertence à store ' + store);
                        }
                    }
                }
            }
            else {
                for (var store in Flux_1.Flux.instance.stores) {
                    var storeInstance = Flux_1.Flux.instance.stores[store];
                    if (stateName in storeInstance && Reflect.hasMetadata(exports.stateMetadataKey, storeInstance, stateName)) {
                        return storeInstance[stateName];
                    }
                }
            }
        };
        descriptor.set = function (value) {
            throw new Error('Um estado não pode ser alterado diretamente. utilize uma ação e uma mutação para' +
                ' isso.');
        };
        return Object.defineProperty(target, propertyKey, descriptor);
    };
}
exports.data = data;
