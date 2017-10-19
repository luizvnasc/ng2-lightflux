/**
 * Classe que representa um store na arquitetura flux;
 * @author luiz.v.nasc
 */
export declare abstract class Store {
    private actionSource;
    constructor();
    /**
     * Método que emite uma ação.
     * @param action Nome da ação.
     * @param payload dado utilizado pela ação.
     */
    dispatch(action: string, payload?: any): any;
    /**
    * Método que emite uma mutação no state.
    * @param mutation Nome da mutação.
    * @param payload dado utilizado pela mutação.
    */
    commit(mutation: string, payload: any): void;
    subscribe(method: string, callback: () => void): void;
}
