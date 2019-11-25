import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { environment } from '../../environments/environment.prod';


// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class VehicleService {

  constructor(private httpClient: HttpClient) { }

  getMakes() {
    var makes = this.httpClient.get(`${environment.remoteServiceBaseUrl}/api/makes/all-makes`);
    console.log(makes);
    return makes;
  }

  getFeatures() {
    var features = this.httpClient.get(`${environment.remoteServiceBaseUrl}/api/features/all-features`);
    console.log(features);
    return features;
  }

  create(vehicle) {
    console.log(vehicle);
   return this.httpClient.post(`${environment.remoteServiceBaseUrl}/api/vehicles/create`, vehicle).pipe(map((res:Response)=>res.json()))
  }
}
