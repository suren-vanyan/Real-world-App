import { SaveVehicle } from "./../models/vehicle";
import { environment } from "./../../environments/environment";
/* import { environment } from '../../environments/environment.prod'; */
import { Http } from "@angular/http";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable, of, throwError } from "rxjs";
import { Vehicle } from "../models/vehicle";
import { map, catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
@Injectable()
export class VehicleService {
  private readonly vehiclesEndPoint = "/api/vehicles";
  constructor(private httpClient: HttpClient) {}

  /* get all makes */
  getMakes() {
    return this.httpClient
      .get(`${environment.remoteServiceBaseUrl}/api/makes`)
      .pipe(catchError(this.errorMgmt));
  }

  /* get vehicle */
  getVehicle(id: number) {
    return this.httpClient
      .get(
        `${environment.remoteServiceBaseUrl}` + this.vehiclesEndPoint + "/" + id
      )
      .pipe(catchError(this.errorMgmt));
  }

  getVehicles(filter) {
    return this.httpClient
      .get(
        environment.remoteServiceBaseUrl +
          this.vehiclesEndPoint +
          "?" +
          this.toQueryString(filter)
      )
      .pipe(catchError(this.errorMgmt));
  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var itemValue = obj[property];
      if (itemValue != null && itemValue != undefined)
        parts.push(
          encodeURIComponent(property) + "=" + encodeURIComponent(itemValue)
        );
    }

    return parts.join("&");
  }

  /* get all features */
  getFeatures() {
    return this.httpClient
      .get(`${environment.remoteServiceBaseUrl}/api/features`)
      .pipe(catchError(this.errorMgmt));
  }

  /* create new vehicle */

  create(vehicle: SaveVehicle) {
    return this.httpClient
      .post(
        environment.remoteServiceBaseUrl +
          this.vehiclesEndPoint +
          "/" +
          "create",
        vehicle
      )
      .pipe(catchError(this.errorMgmt));
  }

  update(vehicle: SaveVehicle) {
    return this.httpClient
      .put(
        `${environment.remoteServiceBaseUrl + this.vehiclesEndPoint}/${
          vehicle.id
        }`,
        vehicle
      )
      .pipe(catchError(this.errorMgmt));
  }

  delete(id) {
    return this.httpClient
      .delete(
        `${environment.remoteServiceBaseUrl + this.vehiclesEndPoint}/${id}`
      )
      .pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
