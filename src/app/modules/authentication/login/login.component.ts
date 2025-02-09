import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { urlRoutes } from '../../../core/constant/url-routes.constant';
import { NavigationService } from '../../../core/services/navigation/navigation.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LocalStorageService } from '../../../core/services/localStorage/local-storage.service';
import { ToasterService } from '../../../core/services/toaster/toaster.service';
import { LoginResponse } from '../../../core/interface/auth';
import { Subject, takeUntil } from 'rxjs';
import { commonConstant } from '../../../core/constant/common.const';
import { storageConstant } from '../../../core/constant/storage.const';
import { LogsService } from '../../../core/services/logs/logs.service';
import { localStorageConstant } from '../../../core/constant/util.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  public AuthenticationRoutes = urlRoutes;
  private _unsubscribeAll = new Subject<void>();
  hotelDetails:any;

  constructor(
    private _router: Router,
    private _navigationService: NavigationService,
    public _fb: FormBuilder,
    private _loaderService: LoaderService,
    private _authService: AuthService,
    private _storageService: LocalStorageService,
    private _toasterService: ToasterService,
    private _logService: LogsService,
  ) { }

  ngOnInit(): void {
    this.initiateLoginForm();
    this.hotelDetails = this.getHotelInfo();
  }

  private initiateLoginForm(): void {
    this.loginForm = this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  public showFieldError(field: AbstractControl): boolean {
    return field.invalid && (field.dirty || field.touched);
  }

  public get f() {
    return this.loginForm.controls;
  }

  goToForgotPassord() {
    this._router.navigate([urlRoutes.forgot_password])
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this._loaderService.showLoader();
    const formValues = this.loginForm.getRawValue();
    const payload = {
      username: formValues.username,
      password: formValues.password
    };
    localStorage.clear();
    this._authService.login(payload)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(
      (res: any) => {
        this._loaderService.hideLoader();
        if (res.statusCode === 200 && res.data?.token) {
          const token = res.data?.token;
          let redirectRoute;
          this._storageService.setKey(storageConstant.access_token, token);
          this._storageService.setKey(storageConstant.role, res?.data?.user);
          this._storageService.setKey(storageConstant.login_object, JSON.stringify(res?.data));
          this.createNotifications();

          if ( res?.data?.type &&  (res?.data?.type === '1' || res?.data?.type === 1)) {
            redirectRoute = `/${this.AuthenticationRoutes.admin}/${this.AuthenticationRoutes.admin_hotels}`;
          } else {
            let hotel: any = {
              "status": res?.data?.status?.toLowerCase() === 'active'? true : false,
              "hotelName": res?.data?.name,
              "hotelId": res?.data?.user,
              "created": res?.data?.createdDate,
            }
            this.setHotelInfo(hotel),
            // redirectRoute = `/${this.AuthenticationRoutes.hotel}/${this.AuthenticationRoutes.hotel}`;
            this._storageService.setKey(storageConstant.role, 'vendor');
            
            // redirectRoute = `/${this.AuthenticationRoutes.hotel}`;
            redirectRoute = `/${this.AuthenticationRoutes.admin}/${this.AuthenticationRoutes.hotel_hotel_services}`;
          }
          this._navigationService.routeToPath(redirectRoute);
          return;
        }
        const message: string = res.data as any;
        this._toasterService.showError('Login Failed', message);
      },
      (err) => {
        this._loaderService.hideLoader();
      }
    );
  }
  
  setHotelInfo(hotel: any) {
    
    this._storageService.setKey(localStorageConstant.hotelDetails,JSON.stringify(hotel));
  }

  getHotelInfo() {
    return JSON.parse(this._storageService.getKey(localStorageConstant.hotelDetails!)!);
  }

  createNotifications() {
    let payload = {
    "hotelId":this._storageService.getKey('role'),
    "message": "Logged In", 
    "type": "login", 
    "status": "true"};

    this._logService.createNotifications(payload)
    .subscribe({
      next: (res) => {
        console.log(res);
        this._loaderService.hideLoader();
      },
      error: (err) => {
        this._loaderService.hideLoader();
      }
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
