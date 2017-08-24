import {Store} from './Store';
import 'reflect-metadata';
import {Flux} from './Flux';
export const actionMetadataKey = Symbol('ng2Flux:action');
export const mutationMetadataKey = Symbol('ng2Flux:mutation');
export const stateMetadataKey = Symbol('ng2Flux:state');

/**
 * Decorator que indica que um método é uma action.
 * @author luizvnasc
 * @param target
 * @param propertyKey
 */
export function action(target : any, propertyKey : string) {
    Reflect.defineMetadata(actionMetadataKey, true, target[propertyKey]);
}

/**
 * Decorator que indica que um método é uma mutation.
 * @author luizvnasc
 * @param target
 * @param propertyKey
 */
export function mutation(target : any, propertyKey : string) {
    Reflect.defineMetadata(mutationMetadataKey, true, target[propertyKey]);
}

export function state(target : any, propertyKey : string) {
    Reflect.defineMetadata(stateMetadataKey, true, target, propertyKey);
}

export function data(stateName
    ?
    : string) {
    return function (target : any, propertyKey : string) {
        let descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
        descriptor.get = () => {
            if (stateName == undefined) {
                stateName = propertyKey;
            }
            if (Flux.instance.options.namespace) {

                let [store,
                    state] = stateName.split('.')

                let storeInstance = Flux
                    .instance
                    .getStore(store);

                if (storeInstance == null) {
                    throw new Error('Store ' + store + ' inexistente.');
                } else {
                    if (state in storeInstance && Reflect.hasMetadata(stateMetadataKey, storeInstance, state)) {
                        return storeInstance[state];
                    } else {
                        if (!Reflect.hasMetadata(stateMetadataKey, storeInstance, state)) {
                            throw new Error('A propriedade ' + state + ' não é um state da store ' + store);
                        } else {
                            throw new Error('State ' + state + ' não existe ou não pertence à store ' + store);
                        }
                    }
                }

            } else {
                for (let store in Flux.instance.stores) {
                    let storeInstance = Flux.instance.stores[store];
                    if (stateName in storeInstance && Reflect.hasMetadata(stateMetadataKey, storeInstance, stateName)) {
                        return storeInstance[stateName];
                    }
                }
            }
        }
        descriptor.set = (value : any) => {
            throw new Error('Um estado não pode ser alterado diretamente. utilize uma ação e uma mutação para' +
                    ' isso.')
        }
        return Object.defineProperty(target, propertyKey, descriptor);
    }
}
