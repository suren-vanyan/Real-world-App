import { environment } from "./../../environments/environment";
/* import { environment } from '../../environments/environment.prod'; */

import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
@Injectable()
export class VehicleService {
  constructor(private httpClient: HttpClient) {}

  
  /* get all makes */
  getMakes() {
    var makes = this.httpClient.get(
      `${environment.remoteServiceBaseUrl}/api/makes/all-makes`
    );
    return makes;
  }

  /* get vehicle */
  getVehicle(id: number) {
    var vehicle = this.httpClient.get(
      `${environment.remoteServiceBaseUrl}` + `/api/vehicles/${id}`
    );
    return vehicle;
  }

   /* get all features */
  getFeatures() {
    var features = this.httpClient.get(
      `${environment.remoteServiceBaseUrl}/api/features/all-features`
    );
    return features;
  }

   /* create new vehicle */  
  create(vehicle) {
    return this.httpClient
      .post(`${environment.remoteServiceBaseUrl}/api/vehicles/create`, vehicle)
      .pipe(map((res: Response) => res))
  }
}
