import { Injectable } from "@angular/core";
import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from "ng2-toasty";

@Injectable({
  providedIn: "root"
})
export class ToastService {
  toastOptions: ToastOptions;

  constructor(
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = "material";
  }

  addToast(
    title: string,
    msg: string,
    timeout: number,
    showClose: boolean = true,
    theme: string = "material"
  ) {
    this.toastOptions = {
      title: title,
      msg: msg,
      showClose: showClose,
      timeout: timeout,
      theme: theme,

      onAdd: (toast: ToastData) => {
        console.log("Toast " + toast.id + " has been added!");
      },
      onRemove: function(toast: ToastData) {
        console.log("Toast " + toast.id + " has been removed!");
      }
    };
    switch (this.toastOptions.title) {
      case "default":
        this.toastyService.default(this.toastOptions);
        break;
      case "info":
        this.toastyService.info(this.toastOptions);
        break;
      case "success":
        this.toastyService.success(this.toastOptions);
        break;
      case "wait":
        this.toastyService.wait(this.toastOptions);
        break;
      case "error":
        this.toastyService.error(this.toastOptions);
        break;
      case "warning":
        this.toastyService.warning(this.toastOptions);
        break;
    }
  }
}
