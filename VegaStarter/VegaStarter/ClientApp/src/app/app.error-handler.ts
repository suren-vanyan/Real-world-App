import * as Sentry from "@sentry/browser";
import { ErrorHandler, Inject, NgZone, isDevMode } from "@angular/core";
import {
  ToastOptions,
  ToastData,
  ToastyService,
  ToastyConfig
} from "ng2-toasty";
import { HttpErrorResponse } from "@angular/common/http";

export class AppErrorHandler implements ErrorHandler {
  constructor(
    @Inject(ToastyService) private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private ngZone: NgZone
  ) {
    this.toastyConfig.theme = "material";
  }

  handleError(error): void {
  console.log("Error",error);
    /* const eventId = Sentry.captureException(error.originalError || error);
    if (isDevMode()) Sentry.showReportDialog({ eventId });
    else throw error; */

    this.ngZone.run(() => {
      var toastOptions: ToastOptions = {
        title: "Error",
        msg: "An unexpected Error happened.",
        showClose: true,
        timeout: 5000,
        theme: "material",
        onAdd: (toast: ToastData) => {
          console.log("Toast " + toast.id + " has been added!");
        },
        onRemove: function(toast: ToastData) {
          console.log("Toast " + toast.id + " has been removed!");
        }
      };
      this.toastyService.info(toastOptions);
    });
  }
}
