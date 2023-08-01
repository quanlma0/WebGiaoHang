import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { USService } from 'src/services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private usService: USService,
    private toastr: ToastrService) { }

  canActivate() {
    if (this.usService.isLoggedIn()) {
      //Giải mã token
      let tokenPayload = this.usService.decodeToken();
      var TenCV = tokenPayload.role
      if (TenCV === 'Admin') {
        return true;
      }

      // Token tồn tại, đã đăng nhập
      this.toastr.error("Bạn không có quyền truy cập", "Lỗi rồi", {
        progressBar: true,
        newestOnTop: true
      })
      this.router.navigate(['/home']);
      return false;
    } else {
      // Token không tồn tại, chưa đăng nhập
      this.toastr.error("Bạn chưa đăng nhập", "Thông báo", {
        progressBar: true,
        newestOnTop: true
      })
      this.router.navigate(['/login']);
      return false;
    }
  }
}
