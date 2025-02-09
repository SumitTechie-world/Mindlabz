import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class LoaderService {
    public showLoader(): void {
        if (!Swal.isVisible()) {
            Swal.fire({
                allowOutsideClick: false,
                showConfirmButton: false,
                background: 'rgba(192, 192, 192, 0)',
                didOpen: () => {
                    Swal.showLoading(null);  // Pass `null` to avoid the argument error
                },
            });
        }
    }

    public hideLoader(): void {
        if (Swal.isVisible()) {
            if (Swal.isLoading()) {
                Swal.hideLoading();
            }
            Swal.close();
        }
    }
}
