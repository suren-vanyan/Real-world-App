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
  allVehicles: Vehicle[];
  filter: any = {};
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    var source = [
      this.vehicleService.getVehicles(),
      this.vehicleService.getMakes()
    ];

    Observable.forkJoin(source).subscribe(data => {
      this.vehicles = this.allVehicles = data[0] as Vehicle[],
        this.makes = data[1] as KeyValuePair[];
    })

  }

  onFilterChange() {
    var vehicles=this.allVehicles;
    if (this.filter.makeId)
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);
    if (this.filter.modelId)
      vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);
      this.vehicles=vehicles;
  }

  resetFilter(){
    this.filter={};
    this.onFilterChange();
  }
}
