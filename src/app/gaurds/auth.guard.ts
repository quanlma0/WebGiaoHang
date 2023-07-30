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
      // Token tồn tại, đã đăng nhập
      // this.toastr.success("Đăng nhập thành công", "Thông báo", {
      //   progressBar: true,
      //   newestOnTop: true
      // })
      return true;
    } else {
      // Token không tồn tại, chưa đăng nhập
      this.toastr.error("Hãy đăng nhập để truy cập", "Lỗi Rồi", {
        progressBar: true,
        newestOnTop: true
      })
      this.router.navigate(['login']);
      return false;
    }
  }
}
