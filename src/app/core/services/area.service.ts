import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable()
export class AreaService {
    private host = environment.beHost;
    public areaChange$: Subject<boolean> = new Subject<boolean>();
    constructor(private httpClient: HttpClient) {
    }

    saveArea(area) {
        return this.httpClient.post(this.host + 'api/area', area);
    }

    getArea() {
        return this.httpClient.get(this.host + 'api/area');
    }

    deleteArea(area) {
        return this.httpClient.delete(this.host + `api/area/${area._id}`);
    }
}
