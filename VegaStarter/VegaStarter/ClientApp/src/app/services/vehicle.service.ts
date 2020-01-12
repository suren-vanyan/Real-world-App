import { SaveVehicle } from "./../models/vehicle";
import { environment } from "./../../environments/environment";
/* import { environment } from '../../environments/environment.prod'; */
import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Vehicle } from "../models/vehicle";

@Injectable({
  providedIn: "root"
})
@Injectable()
export class VehicleService {
  constructor(private httpClient: HttpClient) {}

  /* get all makes */
  getMakes() {
    var makes = this.httpClient.get(
      `${environment.remoteServiceBaseUrl}/api/makes`
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

  getVehicles(){
    return this.httpClient.get( `${environment.remoteServiceBaseUrl}` + `/api/vehicles`).pipe(map((res)=>res));
    
  }
  /* get all features */
  getFeatures() {
    var features = this.httpClient.get(
      `${environment.remoteServiceBaseUrl}/api/features`
    );
    return features;
  }

  /* create new vehicle */

  create(vehicle: SaveVehicle) {
    return this.httpClient
      .post(`${environment.remoteServiceBaseUrl}/api/vehicles/create`, vehicle)
      .pipe(map((res: Response) => res));
  }

  update(vehicle: SaveVehicle) {
    return this.httpClient
      .put(
        `${environment.remoteServiceBaseUrl}/api/vehicles/${vehicle.id}`,
        vehicle
      )
      .pipe(map((res: Response) => res));
  }

  delete(id) {
    return this.httpClient.delete(
      `${environment.remoteServiceBaseUrl}/api/vehicles/${id}`
    ).pipe(map((res:Response)=>res));
  }
}
