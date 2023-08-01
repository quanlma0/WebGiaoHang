import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { USService } from 'src/services/user.service';

export const khachhangGuard: CanActivateFn = (route, state) => {
  const usService = inject(USService)
  const toastr = inject(ToastrService)
  const router = inject(Router)

  if (usService.isLoggedIn()) { //kiểm tra có đăng nhập hay chưa bằng Token
    let tokenPayload = usService.decodeToken();
    var TenCV = tokenPayload.role
    if (TenCV === 'KhachHang') {
      return true;
    }
    toastr.error("Chỉ có khách hàng mới sử dụng được", "Lỗi Rồi", {
      progressBar: true,
      newestOnTop: true
    })
    return false
  }
  // Token không tồn tại, chưa đăng nhập
  toastr.error("Hãy đăng nhập để sử dụng dịch vụ", "Thông báo", {
    progressBar: true,
    newestOnTop: true
  })
  router.navigate(['/login']);
  return false;
};
