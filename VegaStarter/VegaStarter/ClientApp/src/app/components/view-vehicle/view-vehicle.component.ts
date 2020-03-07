import { PhotoService } from "./../../services/photo.service";
import { ToastService } from "./../../services/toast.service";
import { VehicleService } from "./../../services/vehicle.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Vehicle } from "src/app/models/vehicle";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastyService } from "ng2-toasty";
import { VehicleFormComponent } from "../vehicle-form/vehicle-form.component";
import { error } from "protractor";

@Component({
  selector: "app-view-vehicle",
  templateUrl: "./view-vehicle.component.html",
  styleUrls: ["./view-vehicle.component.scss"]
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  vehicle: Vehicle;
  vehicleId: number;

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
  }

  ngOnInit() {
    this.vehicleService.getVehicle(this.vehicleId).subscribe(
      vehicle => {
        this.vehicle = vehicle as Vehicle;
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
    var response = await this.photoService.upload(
      this.vehicle.id,
      nativeEelement.files[0]
    );
    console.log(response);
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id).subscribe(x => {
        this.router.navigate(["/vehicles"]);
      });
    }
  }
}
