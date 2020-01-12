import { VehicleService } from "./../../services/vehicle.service";
import { Component, OnInit } from "@angular/core";
import { Vehicle } from "src/app/models/vehicle";

@Component({
  selector: "app-vehicle-list",
  templateUrl: "./vehicle-list.component.html",
  styleUrls: ["./vehicle-list.component.scss"]
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe(vehicles => {
      console.log(vehicles);
      this.vehicles = vehicles as Vehicle[];
    });
  }
}
