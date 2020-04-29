import { AuthService } from "./services/auth.service";
import { VehicleService } from "./services/vehicle.service";
import { AppErrorHandler } from "./app.error-handler";
import * as Sentry from "@sentry/browser";
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import json from 'highlight.js/lib/languages/json';

import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastyModule } from "ng2-toasty";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";
import { VehicleFormComponent } from "./components/vehicle-form/vehicle-form.component";
import { HomeComponent } from "./components/home/home.component";
import { VehicleListComponent } from "./components/vehicle-list/vehicle-list.component";
import { ViewVehicleComponent } from "./components/view-vehicle/view-vehicle.component";

import { PaginationModule } from "ngx-bootstrap/pagination";

import { AppComponent } from "./components/app/app.component";
import { PhotoService } from "./services/photo.service";
import {
  ProgressService,
  BrowserXhrWithProgress
} from "./services/progress.service";
import { BrowserXhr } from "@angular/http";
import { MaterialContainerModule } from "./material.module";
import { ProfileComponent } from "./components/profile/profile.component";
import { AppRoutingModule } from "./app-routing.module";
import { hasLifecycleHook } from "@angular/compiler/src/lifecycle_reflector";

export function getHighlightLanguage() {
  return [{ name: 'json', func: json }];
}

Sentry.init({
  dsn: "https://94b233b3f8014f0fb2af8c61227dd792@sentry.io/1840139"
});

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    VehicleFormComponent,
    VehicleListComponent,
    ViewVehicleComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialContainerModule,
    FormsModule,
    HighlightModule,
    PaginationModule.forRoot(),
    ToastyModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AuthService,
    VehicleService,
    PhotoService,
    ProgressService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
    {provide: HIGHLIGHT_OPTIONS,useValue: {languages: getHighlightLanguage()}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
