import * as _ from 'underscore';
import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../services/vehicle.service";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/observable/forkJoin";
import { Observable } from "rxjs";
import { SaveVehicle, Vehicle } from '../models/vehicle';
import { toastyServiceFactory, ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
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

  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    contact: {
      name: '',
      email: '',
      phone: '',
    },
    feature: []
  };

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
  ) {
    this.toastyConfig.theme = "bootstrap";
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
        this.makes = data[0] as any;
        this.features = data[1] as any;
        if (this.vehicle.id) {
          this.setVehicle(data[2] as Vehicle);
          this.populateModels();
        }
      },
      error => {
        if (error.status == 404) this.router.navigate["/home"];
      }
    );
  }

  setVehicle(data: Vehicle) {
    this.vehicle.id = data.id;
    this.vehicle.makeId = data.make.id;
    this.vehicle.modelId = data.model.id;
    this.vehicle.isRegistered = data.isRegistered;
    this.vehicle.contact = data.contact;
    this.vehicle.feature = _.pluck(data.feature, 'id')
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    const selectedMake = this.makes.find(m => m.id == this.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeaturesToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.feature.push(featureId);
    } else {
      var index = this.vehicle.feature.indexOf(featureId);
      this.vehicle.feature.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle).subscribe(x => {
        var toastOptions: ToastOptions = {
          title: "Success",
          msg: "The vehicle was sucessfully updated.",
          showClose: true,
          timeout: 5000,
          theme: "bootstrap",
          onAdd: (toast: ToastData) => {
            console.log("Toast " + toast.id + " has been added!");
          },
          onRemove: function (toast: ToastData) {
            console.log("Toast " + toast.id + " has been removed!");
          }
        };
        this.toastyService.info(toastOptions);
      }
      );

    }
    else {
      this.vehicleService.create(this.vehicle).subscribe(x => console.log(x));
    }
  }
}
