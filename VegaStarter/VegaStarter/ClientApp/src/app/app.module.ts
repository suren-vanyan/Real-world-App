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


import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { VehicleFormComponent } from "./vehicle-form/vehicle-form.component";


Sentry.init({
  dsn:'https://94b233b3f8014f0fb2af8c61227dd792@sentry.io/1840139'
});
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    VehicleFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModuleComponent,
    FormsModule,
    ToastyModule.forRoot(),
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "home", component: HomeComponent},
      { path: "vehicles/new", component: VehicleFormComponent },
      { path: "vehicles/:id", component: VehicleFormComponent }
    ])
  ],
  providers: [
    VehicleService,
    ToastService,
     { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
