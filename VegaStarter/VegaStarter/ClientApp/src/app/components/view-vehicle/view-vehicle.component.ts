import { environment } from "src/environments/environment";
import { Observable } from "rxjs/Observable";
import { PhotoService } from "./../../services/photo.service";
import { ToastService } from "./../../services/toast.service";
import { VehicleService } from "./../../services/vehicle.service";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import { Vehicle } from "src/app/models/vehicle";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastyService } from "ng2-toasty";
import { VehicleFormComponent } from "../vehicle-form/vehicle-form.component";
import { error } from "protractor";
import { ProgressService } from "src/app/services/progress.service";
import { HttpEventType, HttpEvent } from "@angular/common/http";

@Component({
  selector: "app-view-vehicle",
  templateUrl: "./view-vehicle.component.html",
  styleUrls: ["./view-vehicle.component.scss"]
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  vehicle: Vehicle;
  vehicleId: number;
  photos: any[];
  baseUrl: any;
  progress: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastService,
    private vehicleService: VehicleService,
    private photoService: PhotoService
  ) {
    this.route.params.subscribe(p => {
      this.vehicleId = +p["id"];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        this.router.navigate(["/vehicles"]);
        return;
      }
    });
    this.baseUrl = environment.remoteServiceBaseUrl;
  }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicleId).then(photos => {
      this.photos = photos;
    });
    this.vehicleService.getVehicle(this.vehicleId).subscribe(
      (vehicle: Vehicle) => {
        this.vehicle = vehicle;
      },
      error => {
        if (error.status === 404) {
          this.toastyService.addToast("error", "The vehicle not found.", 5000);
          return;
        }
      }
    );
  }

  async uploadPhoto() {
    var nativeEelement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeEelement.files[0];
    nativeEelement.value = "";
    await this.photoService
      .uploadPhoto(this.vehicle.id, file)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log("Request has been made!");
            break;
          case HttpEventType.ResponseHeader:
            console.log("Response header has been received!");
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log("User successfully created!", event.body);
            setTimeout(() => {
              this.progress = 0;
            }, 1500);
        }
      });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id).subscribe(x => {
        this.router.navigate(["/vehicles"]);
      });
    }
  }
}
