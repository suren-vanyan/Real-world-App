import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { map, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { throwError } from "rxjs";

@Injectable()
export class PhotoService {
  constructor(private httpClient: HttpClient) {}

  uploadPhoto(vehicleId, file) {
    var formFile = new FormData();
    formFile.append("file", file);
    return this.httpClient
      .post(
        `${environment.remoteServiceBaseUrl}/api/vehicles/${vehicleId}/photos`,
        formFile,
        { reportProgress: true, observe: "events" }
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

  async getPhotos(vehicleId: number): Promise<any> {
    return this.httpClient
      .get(
        `${environment.remoteServiceBaseUrl}/api/vehicles/${vehicleId}/photos`
      )
      .pipe(catchError(this.errorMgmt)).toPromise();
  }
}
