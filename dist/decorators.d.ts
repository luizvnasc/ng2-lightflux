import 'reflect-metadata';
export declare const actionMetadataKey: symbol;
export declare const mutationMetadataKey: symbol;
export declare const stateMetadataKey: symbol;
/**
 * Decorator que indica que um método é uma action.
 * @author luizvnasc
 * @param target
 * @param propertyKey
 */
export declare function action(target: any, propertyKey: string): void;
/**
 * Decorator que indica que um método é uma mutation.
 * @author luizvnasc
 * @param target
 * @param propertyKey
 */
export declare function mutation(target: any, propertyKey: string): void;
export declare function state(target: any, propertyKey: string): void;
export declare function data(stateName?: string): (target: any, propertyKey: string) => any;
