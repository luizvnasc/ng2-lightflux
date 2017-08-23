import { actionMetadataKey, mutationMetadataKey } from './decorators';
import {Injectable} from "@angular/core";
import {Flux} from "./Flux";

/**
 * Classe que representa um store na arquitetura flux;
 * @author luiz.v.nasc
 */
export abstract class Store {


    constructor(){
        //Adiciona a store a lista de stores do flux
        Flux.instance.addStore(this);
    }

    /**
     * Método que emite uma ação.
     * @param action Nome da ação.
     * @param payload dado utilizado pela ação.
     */
    public dispatch(action : string, payload?: any) : void {
        if(action in this) {
            if (Reflect.hasMetadata(actionMetadataKey, this[action]) && Reflect.getMetadata(actionMetadataKey, this[action])) {
                if (payload != undefined) 
                    this[action](payload);
                else 
                    this[action]();
                }
            else {
                throw new TypeError('a propriedade ' + action + ' não é uma instância de Action.')
            }
        } else {
            throw new ReferenceError('A ação ' + action + ' não existe nesta store');
        }
    }
     /**
     * Método que emite uma mutação no state.
     * @param mutation Nome da mutação.
     * @param payload dado utilizado pela mutação.
     */
    public commit(mutation : string, payload : any) : void {
        if(mutation in this) {
            if (Reflect.hasMetadata(mutationMetadataKey, this[mutation]) && Reflect.getMetadata(mutationMetadataKey, this[mutation])) {
                this[mutation](payload);
            } else {
                throw new TypeError('a propriedade ' + mutation + ' não é uma instância de Mutation.')
            }
        } else {
            throw new ReferenceError('A mutação ' + mutation + ' não existe nesta store');
        }

    }

}