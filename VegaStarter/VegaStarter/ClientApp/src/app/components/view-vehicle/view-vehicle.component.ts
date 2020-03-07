import { ToastService } from "./../../services/toast.service";
import { VehicleService } from "./../../services/vehicle.service";
import { Component, OnInit } from "@angular/core";
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
  vehicle: Vehicle;
  vehicleId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastService,
    private vehicleService: VehicleService
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

  delete() {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.vehicle.id).subscribe(x => {
        this.router.navigate(['/vehicles'])
      });
    }
  }
}
