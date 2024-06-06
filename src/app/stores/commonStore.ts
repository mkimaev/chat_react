import { makeAutoObservable } from "mobx";
import { SemanticCOLORS } from "semantic-ui-react";


export default class CommonStore {
    private _quickQuiestionValue = ''
    mainColor: SemanticCOLORS = 'teal';

    constructor() {
        makeAutoObservable(this);
    }

    set quickQuiestionValue(value: string){
        this._quickQuiestionValue = value;
    }

    get quickQuiestionValue() {
        return this._quickQuiestionValue;
    }
}