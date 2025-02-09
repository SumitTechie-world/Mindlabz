import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  showSuccess(title: string, message: string, options?: IndividualConfig) {
    this.toastr.success(message, title, options);
  }

  showWarnig(title: string, message: string, options?: IndividualConfig) {
    this.toastr.warning(message, title, options);
  }

  showInfo(title: string, message: string, options?: IndividualConfig) {
    this.toastr.info(message, title, options);
  }

  showError(title: string, message: string, options?: IndividualConfig) {
    this.toastr.error(message, title, options);
  }
}
