
import DoorKey from "../models/doorKey";
import Agent from "../utils/http";


/*
        // return [
        //     new DoorKey('KHA110', new Date(), null!, null!, 'on hand', 'Korobkov took', '', '', 'history: string', coordinate),
        //     new DoorKey('KHA910', new Date(), null!, null!, 'on hand', 'Turevich took', 'нападают пчелы', 'Den', 'history: string', coordinate),
        //     new DoorKey('KHA911', null!, new Date(), null!, 'office', 'Ruzaev return', '', '', 'history: string', coordinate),
        //     new DoorKey('KHA912', null!, new Date(), null!, 'office', 'Kimaev return', 'мужик с топором', '', 'history: string', coordinate),
        // ];
*/

export type SearhCriteria = {
    sitename?: string, 
    byWhere?: string,
    byUser?: string,
}

class KeyService {
    
    // private readonly create_key_url: string = this.main_keys_url;
    // private readonly delete_key_by_id_url: string = this.main_keys_url;
    // private readonly coordinate_key_url: string = this.main_keys_url + '/coordinate';
    private readonly GET_BY_ID_URL: string;
    private readonly SEARCH_URL: string;
    private readonly TAKE_URL: string;
    private readonly RETURN_URL: string;
    private readonly COMMENT_URL: string;
    private _user: string = 'develop.user';
    private readonly agent: Agent = undefined!;

    constructor(host: string){
        this.GET_BY_ID_URL = host;
        this.SEARCH_URL = host + '/search';
        this.TAKE_URL = host + '/take';
        this.RETURN_URL = host + '/return';
        this.COMMENT_URL = host.concat('/comment');
        
        if (host){
            this.agent = new Agent();
        }
        // console.log('KeyService is created.', this.main_keys_url);
    }

    async getMyKeys() {
        let responseKeys = await this.agent.post(this.SEARCH_URL, {byUser: this._user}) as DoorKey[];

        const keys: DoorKey[] = responseKeys.map((keyJson) => {
            return this.mapToKey(keyJson);
        });

        return keys;
    }

    async getKeysBy(searchCriteria: SearhCriteria) {
        let responseKeys = await this.agent.post(this.SEARCH_URL, searchCriteria) as DoorKey[];

        const keys: DoorKey[] = responseKeys.map((keyJson) => {
            return this.mapToKey(keyJson);
        });

        return keys;
    }

    async getKey(id: number) {
        let responseKey: DoorKey = this.mapToKey(await this.agent.get(`${this.GET_BY_ID_URL}/${id}`));
        console.log(responseKey);
        return responseKey;
    }

    async toggleKeyLocation(doorKey: DoorKey) {
        let isTake: boolean = doorKey.location === 'office' ? true : false;

        let item: unknown;

        if (isTake) {
            // how to make queryString is via new URLSearchParams({ gpo: doorKey.gpo });
            let params = JSON.stringify({
                id: doorKey.id,
                gpo: doorKey.gpo,
            });

            item = await this.agent.put(`${this.TAKE_URL}`, params, true);
        }
        else { // return case
            let paramsReturn = doorKey.id; // simple number for primitive (see format at OpenApi)
            item = await this.agent.put(`${this.RETURN_URL}`, paramsReturn, true);
        }

        let modifiedKey: DoorKey = this.mapToKey(item);
        return modifiedKey;
    }

    async backMykey(id: number) {
        await this.agent.put(`${this.RETURN_URL}`, id);
    }

    async changeComment(id: number, text: string) {
        let params = JSON.stringify({
            id: id,
            message: text,
        })
        await this.agent.put(`${this.COMMENT_URL}`, params);
    }

    get user() {
        if (this._user.length === 0) {
            // make request to API
            // this._user = 'value';
        }

        return this._user;
    }

    private mapToKey(data: unknown): DoorKey {
        let jsonData = data as DoorKey;
        let key: DoorKey = Object.assign(new DoorKey(), jsonData);
        return key;
    }
}

let apiServ = import.meta.env.VITE_API_URL;
//console.log('apiServ', apiServ);
const keyService = new KeyService(apiServ);

export default keyService;