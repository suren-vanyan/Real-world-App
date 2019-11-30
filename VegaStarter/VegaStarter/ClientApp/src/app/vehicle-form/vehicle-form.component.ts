import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../services/vehicle.service";
import { Router, ActivatedRoute } from "@angular/router";

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
    /* get vehicle by id */
    this.vehicleService
      .getVehicle(this.vehicle.id)
      .subscribe(v => this.vehicle=v,err=>{
        if(err.status==404){
          this.router.navigate(['/home'])
        }
      });

    /* get all makes */
    this.vehicleService.getMakes().subscribe(makes => (this.makes = makes));

    /* get all features */
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
    this.vehicleService.create(this.vehicle).subscribe(x => console.log(x));
  }
}
