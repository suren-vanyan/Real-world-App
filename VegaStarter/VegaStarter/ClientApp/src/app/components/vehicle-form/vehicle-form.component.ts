import { KeyValuePair } from "./../../models/vehicle";
import { ToastService } from "../../services/toast.service";
import * as _ from "underscore";
import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../../services/vehicle.service";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/observable/forkJoin";
import { Observable } from "rxjs";
import { SaveVehicle, Vehicle } from "../../models/vehicle";
import {
  toastyServiceFactory,
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from "ng2-toasty";
@Component({
  selector: "app-vehicle-form",
  templateUrl: "./vehicle-form.component.html",
  styleUrls: ["./vehicle-form.component.css"]
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  features: any[];

  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    contact: {
      name: "",
      email: "",
      phone: ""
    },
    features: []
  };

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private toastService: ToastService
  ) {
    this.toastyConfig.theme = "bootstrap";
    this.activatedRouter.params.subscribe(p => {
      this.vehicle.id = p["id"] || 0;
    });
  }

  ngOnInit() {
    const sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];
    if (this.vehicle.id) {
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
    }
    Observable.forkJoin(sources).subscribe(
      data => {
        this.makes = data[0] as any[];
        this.features = data[1] as any[];
        if (this.vehicle.id) {
          this.setVehicle(data[2] as Vehicle);
          this.populateModels();
        }
      },
      error => {
        if (error.status === 404) {
          this.router.navigate(["/home"]);
        }
      }
    );
  }

  setVehicle(data: Vehicle) {
    this.vehicle.id = data.id;
    this.vehicle.makeId = data.make.id;
    this.vehicle.modelId = data.model.id;
    this.vehicle.isRegistered = data.isRegistered;
    this.vehicle.contact = data.contact;
    this.vehicle.features = _.pluck(data.features, "id");
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    var selectedMake: any;
    if (!Number.isInteger(this.vehicle.makeId)) {
      this.vehicle.makeId = Number.parseInt(this.vehicle.makeId.toString());
      selectedMake = this.makes.find(m => m.id === this.vehicle.makeId);
    } else {
      selectedMake = this.makes.find(m => m.id === this.vehicle.makeId);
    }
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeaturesToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      const index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  onSubmit() {
    var result$ = this.vehicle.id
      ? this.vehicleService.update(this.vehicle)
      : this.vehicleService.create(this.vehicle);
    result$.subscribe(vehicle => {
      this.toastService.addToast(
        "success",
        "The data was sucessfully saved.",
        5000
      );
      this.router.navigate(["/vehicles/", vehicle.id]);
    });
   
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id).subscribe(x => {
        this.router.navigate(["/home"]);
      });
    }
  }
}
