import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../services/vehicle.service";

@Component({
  selector: "app-vehicle-form",
  templateUrl: "./vehicle-form.component.html",
  styleUrls: ["./vehicle-form.component.css"]
})
export class VehicleFormComponent implements OnInit {
  makes: any;
  makeId:0;
  models: any;
  features: any;
  vehicle: any = {
    modelId: 0,
    isRegitered: false,
    contact: {
      name: "Jeferson",
      email: "example@mail.ru",
      phone: "0985468995"
    },
    features: []
  };

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => (this.makes = makes));

    this.vehicleService
      .getFeatures()
      .subscribe(features => (this.features = features));
  }

  onMakeChange() {
    const selectedMake = this.makes.find(m => m.id == this.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }

  onFeaturesToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  onSubmit() {
    console.log(this.vehicle);
    this.vehicleService.create(this.vehicle).subscribe(x => console.log(x));
  }
}
