import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../services/vehicle.service";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/observable/forkJoin";
import { Observable } from "rxjs";
@Component({
  selector: "app-vehicle-form",
  templateUrl: "./vehicle-form.component.html",
  styleUrls: ["./vehicle-form.component.css"]
})
export class VehicleFormComponent implements OnInit {
  makes: any;
  makeId: 0;
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

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.activatedRouter.params.subscribe(p => {
      this.vehicle.id = p["id"];
    });
  }

  ngOnInit() {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];
    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));

    Observable.forkJoin(sources).subscribe(
      data => {
        console.log(data);
        this.makes = data[0] as any;
        this.features = data[1] as any;
        if (this.vehicle.id) this.setVehicle(data[2]);
      },
      error => {
        if (error.status == 404) this.router.navigate["/home"];
      }
    );
  }

  setVehicle(data) {
    this.vehicle.id = data.id;
    this.vehicle.makeId = data.make.id;
    this.vehicle.modelId = data.model.id;
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
    this.vehicleService.create(this.vehicle).subscribe(x => console.log(x));
  }
}
