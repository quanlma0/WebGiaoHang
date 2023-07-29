import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaiKhoan } from 'src/app/models/taiKhoan';
import { User } from 'src/app/models/user';
import { KHService } from 'src/services/khachhang.service';
import { TKService } from 'src/services/taikhoan.service';
import { USService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  processing = false;
  f!: FormGroup
  khachhang!: User
  taiKhoan!: TaiKhoan
  chucvu = ["KhachHang", "TaiXe"]
  gioitinh = ["Nam", "Nữ"]
  // trangthaitk = ["Còn hoạt động", "Chặn hoạt động"]


  constructor(private route: ActivatedRoute,
    private TKService: TKService,
    private router: Router,
    private toastr: ToastrService,
    private khService: KHService
  ) { }

  ngOnInit(): void {
    this.f = new FormGroup({
      maTK: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      matKhau: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      sdt: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      gioiTinh: new FormControl(null, Validators.required),
      diaChi: new FormControl(null, Validators.required),
      ngaySinh: new FormControl(null, Validators.required),
      hoTen: new FormControl(null, Validators.required),
      trangThaiTK: new FormControl(null, Validators.required),
      tenCV: new FormControl(null, Validators.required),
    })
  }

  Register() {
    this.processing = true;
    const value = this.f.value
    this.taiKhoan = new TaiKhoan(0, value.email, value.matKhau, value.sdt,
      value.gioiTinh, value.diaChi, value.ngaySinh, value.hoTen, "Còn hoạt động", value.tenCV, "")

    //Tạo 1 khách hàng mới
    this.khachhang = new User(0, value.email, value.matKhau, "", this.taiKhoan);

    console.log(this.taiKhoan)
    console.log(this.khachhang)

    this.khService.addKH(this.khachhang)
      .subscribe({
        next: (res) => {
          this.processing = false;
          this.f.reset()
          this.toastr.success("Đăng Ký Thành Công", "Thông báo", {
            progressBar: true,
            newestOnTop: true
          })
          this.router.navigate(['/login'], { relativeTo: this.route })

        },
        error: (err) => {
          this.processing = false;
          this.toastr.error("Khách hàng đã tồn tại!", "Thông báo", {
            progressBar: true,
            newestOnTop: true
          })
        }
      })


    // this.TKService.addTK(this.taiKhoan)
    //   .subscribe({
    //     next: (res) => {
    //       this.toastr.success("Đăng Ký Thành Công", "Thông báo", {
    //         progressBar: true,
    //         newestOnTop: true
    //       })
    //       // //Add khach hang
    //       this.khService.addKH(this.khachhang)
    //         .subscribe({
    //           next: (res) => {
    //             this.processing = false;
    //             this.f.reset()
    //             this.toastr.success("Đăng Ký Thành Công", "Thông báo", {
    //               progressBar: true,
    //               newestOnTop: true
    //             })
    //             this.router.navigate(['/login'], { relativeTo: this.route })

    //           },
    //           error: (err) => {
    //             this.processing = false;
    //             this.toastr.error("Lỗi tạo khách hàng mới!", "Thông báo", {
    //               progressBar: true,
    //               newestOnTop: true
    //             })
    //           }
    //         })
    //     },
    //     error: (err) => {
    //       this.processing = false;
    //       console.log()
    //       this.toastr.error("Tài khoản đã tồn tại!", "Thông báo", {
    //         progressBar: true,
    //         newestOnTop: true
    //       })
    //     }
    //   })

  }
}
