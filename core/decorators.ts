import 'reflect-metadata';

export const actionMetadataKey = Symbol('ng2Flux:action');
export const mutationMetadataKey = Symbol('ng2Flux:mutation');



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
