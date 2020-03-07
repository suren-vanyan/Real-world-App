import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { map, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class PhotoService {
  constructor(private httpClient: HttpClient) {}

  async upload(vehicleId, file) {
    var formFile = new FormData();
    formFile.append("file", file);
    var response = await this.httpClient
      .post(
        `${environment.remoteServiceBaseUrl}/api/vehicles/${vehicleId}/photos`,
        formFile
      )
      .toPromise();
    return response;
  }
}
