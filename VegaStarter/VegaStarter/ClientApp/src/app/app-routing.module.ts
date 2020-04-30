import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: "", redirectTo: "vehicles", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "vehicles", component: VehicleListComponent },
    { path: "vehicles/new", component: VehicleFormComponent },
    { path: "vehicles/edit/:id", component: VehicleFormComponent },
    { path: "vehicles/:id", component: ViewVehicleComponent },
    { path: "profile", component: ProfileComponent },
    { path: "**", redirectTo: "home" },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
