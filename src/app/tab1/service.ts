import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MyService {
    
	constructor(private _http:HttpClient) {

    }
    getPockemons(url:string){
        return this._http.get(url);
    }


}