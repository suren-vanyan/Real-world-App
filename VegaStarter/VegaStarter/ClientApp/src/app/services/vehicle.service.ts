import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';



// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class VehicleService {

  makesUrl = 'http://localhost:5000/api/makes/all-makes';
  constructor(private httpClient: HttpClient) { }

  getMakes() {
    var makes= this.httpClient.get(this.makesUrl) ;
    console.log(makes)
    return makes
  }

  getFeatures() {
    return this.httpClient.get('http://localhost:5000/api/features/all-features');
   }


}
