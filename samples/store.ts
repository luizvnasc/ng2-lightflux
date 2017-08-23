import { store } from '../src/core/decorators';

@store
export class TestStore{


    test(){
        this.commit()
    }
}