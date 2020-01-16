import { VehicleService } from "./../../services/vehicle.service";
import { Component, OnInit } from "@angular/core";
import { Vehicle } from "src/app/models/vehicle";
import { Observable } from 'rxjs';
import { KeyValuePair } from '../../models/vehicle';

@Component({
  selector: "app-vehicle-list",
  templateUrl: "./vehicle-list.component.html",
  styleUrls: ["./vehicle-list.component.scss"]
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {};
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => {
      this.makes = makes as KeyValuePair[];
    })
    this.populateVehicles();
  }

  populateVehicles() {
    this.vehicleService.getVehicles(this.filter).subscribe(vehicles => {
      this.vehicles = vehicles as Vehicle[];
    })
  }
  onFilterChange() {
 this.filter.modelId=2;
    this.populateVehicles();
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }
}
