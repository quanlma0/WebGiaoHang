import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaiKhoan } from 'src/app/models/taiKhoan';
import { User } from 'src/app/models/user';
import { TKService } from 'src/services/taikhoan.service';
import { UserStoreService } from 'src/services/user-store.service';
import { USService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  f!: FormGroup
  user!: User
  processing = false;
  taiKhoan = new TaiKhoan(0, "", "", "", "", "", "", "", "", "", "")
  thongtinTK!: TaiKhoan
  constructor(private route: ActivatedRoute,
    private usService: USService,
    private router: Router,
    private toastr: ToastrService,
    private usStore: UserStoreService,
    private tkService: TKService) { }

  ngOnInit(): void {
    this.f = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      matKhau: new FormControl(null, Validators.required),
    })
  }


  Login() {
    this.processing = true;
    const value = this.f.value
    // console.log(value.email)
    this.tkService.getTKFromEmail(value.email)
      .subscribe({
        next: (tk) => {
          this.taiKhoan = tk
          this.taiKhoan.maTK = 0
          //Lưu thông tin Tài Khoản US đã login
          this.usStore.setTTTKFromStore(tk)

          this.user = new User(0, value.email, value.matKhau, "", this.taiKhoan)
          // console.log(this.taiKhoan)
          // console.log(this.user)
          this.usService.logIn(this.user)
            .subscribe({
              next: (res) => {
                this.processing = false;

                //Lưu token vào store
                this.usService.storeToken(res.token)
                //Giải mã token
                let tokenPayload = this.usService.decodeToken();
                //Lấy Hoten Role Email lưu bào Store
                this.usStore.setHoTenFromStore(tokenPayload.unique_name)
                this.usStore.setRoleForStore(tokenPayload.role)
                this.usStore.setEmailForStore(tokenPayload.email)

                this.router.navigate(['/home'], { relativeTo: this.route })
                this.toastr.success("Đăng nhập thành công", "Thông báo", {
                  progressBar: true,
                  newestOnTop: true
                })
              },
              error: (err) => {
                this.processing = false;
                this.toastr.error("Đăng nhập Thất Bại", "Thông báo", {
                  progressBar: true,
                  newestOnTop: true
                })
              }
            })
        },
        error: (err) => {
          this.processing = false;
          this.toastr.error("Tài khoản không có!", "Thông báo", {
            progressBar: true,
            newestOnTop: true
          })
        }
      })


  }






}
