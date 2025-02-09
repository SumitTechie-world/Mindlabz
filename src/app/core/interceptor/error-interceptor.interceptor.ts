import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from '../services/navigation/navigation.service';
import { LocalStorageService } from '../services/localStorage/local-storage.service';
import { HttpStatusCodeConstant } from '../constant/http-status-code';
// import { HttpStatusCodeConstant } from '../constants/http-status-code';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private readonly storageService: LocalStorageService,
        private readonly toastrService: ToastrService,
        private readonly navigationService: NavigationService
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error.status === HttpStatusCodeConstant.unauthorized || error.status === HttpStatusCodeConstant.forbidden) {
                    this.storageService.clearAll();

                    let activeToast = this.toastrService.warning(
                        'Please re-login to continue',
                        'Session Expired!',
                        { timeOut: 2000 }
                    );

                    activeToast.onHidden.pipe().subscribe(() => {
                        this.navigationService.routeToPath('/');
                        // location.reload();
                    });
                } else {
                    // this.toastrService.error(
                    //     'Oops!, Something Went Wrong!','',
                    //     {
                    //         closeButton: true,
                    //         enableHtml: true,
                    //         disableTimeOut: true,
                    //     }
                    // );
                }

                return throwError(error);
            })
        );
    }
}
