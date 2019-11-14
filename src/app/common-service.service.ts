import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  uri:string;
  constructor() {
this.uri = 'http://localhost/bigdataApi/';
   }
}
