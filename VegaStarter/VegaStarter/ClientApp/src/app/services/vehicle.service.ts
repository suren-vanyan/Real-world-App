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
  private readonly vehiclesEndPoint = "/api/vehicles";
  constructor(private httpClient: HttpClient) { }

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
      `${environment.remoteServiceBaseUrl}` + `${this.vehiclesEndPoint}${id}`
    );
    return vehicle;
  }

  getVehicles(filter) {
    return this.httpClient.get(environment.remoteServiceBaseUrl+this.vehiclesEndPoint+'?'+ this.toQueryString(filter)).pipe(map((res) => res));

  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
        var itemValue=obj[property];
        if(itemValue!=null && itemValue!=undefined)
        parts.push(encodeURIComponent(property)+'='+encodeURIComponent(itemValue))
    }

    return parts.join('&');
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
      .post(environment.remoteServiceBaseUrl + this.vehiclesEndPoint + '/' + 'create', vehicle)
      .pipe(map((res: Response) => res));
  }

  update(vehicle: SaveVehicle) {
    return this.httpClient
      .put(
        `${environment.remoteServiceBaseUrl + this.vehiclesEndPoint}/${vehicle.id}`,
        vehicle
      )
      .pipe(map((res: Response) => res));
  }

  delete(id) {
    return this.httpClient.delete(
      `${environment.remoteServiceBaseUrl + this.vehiclesEndPoint}/${id}`
    ).pipe(map((res: Response) => res));
  }
}
