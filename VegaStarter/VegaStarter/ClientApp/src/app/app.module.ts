
import { ToastService } from './services/toast.service';
import { VehicleService } from "./services/vehicle.service";
import { AppErrorHandler } from "./app.error-handler";
import * as Sentry from "@sentry/browser";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastyModule } from "ng2-toasty";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModuleComponent } from "./material/material.module";


import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { HomeComponent } from './components/home/home.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';

import { PaginationComponent } from './shared/pagination.component';
import { PaginationModule } from "ngx-bootstrap/pagination";



import { AppComponent } from "./components/app/app.component";
import { PhotoService } from './services/photo.service';



Sentry.init({
  dsn:'https://94b233b3f8014f0fb2af8c61227dd792@sentry.io/1840139'
});
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    VehicleFormComponent,
    VehicleListComponent,
    ViewVehicleComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModuleComponent,
    FormsModule,
    PaginationModule.forRoot(),
    ToastyModule.forRoot(),
    RouterModule.forRoot([
      { path: '',redirectTo:'vehicles', pathMatch: "full" },
      { path: "home", component: HomeComponent},
      {path:'vehicles',component:VehicleListComponent},
      { path: "vehicles/new", component: VehicleFormComponent },
      { path: "vehicles/edit/:id", component: VehicleFormComponent },
      { path: "vehicles/:id", component: ViewVehicleComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [
    VehicleService,
    PhotoService,
     { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
