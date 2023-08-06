import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PhuongThucVC } from 'src/app/models/PhuongThucVC';
import { ChucVu } from 'src/app/models/chucVu';
import { TaiKhoan } from 'src/app/models/taiKhoan';
import { TaiXe } from 'src/app/models/taiXe';
import { PTService } from 'src/services/phuongthuc.service';
import { TXService } from 'src/services/taixe.service';

@Component({
  selector: 'app-register-taixe',
  templateUrl: './register-taixe.component.html',
  styleUrls: ['./register-taixe.component.css']
})
export class RegisterTaixeComponent implements OnInit {
  processing = false;
  f!: FormGroup
  taiXe!: TaiXe
  taiKhoan!: TaiKhoan
  gioitinh = ["Nam", "Nữ"]
  ptvc!: PhuongThucVC[]

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private txService: TXService,
    private ptService: PTService
  ) {
    this.f = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      matKhau: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      maBangLai: new FormControl(null, Validators.required),
      tenPhuongTien: new FormControl(null, Validators.required),
      sdt: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      gioiTinh: new FormControl(null, Validators.required),
      diaChi: new FormControl(null, Validators.required),
      ngaySinh: new FormControl(null, Validators.required),
      hoTen: new FormControl(null, Validators.required),
      trangThaiTK: new FormControl(null, Validators.required),
      ptvc: new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {
    this.ptService.getAllPTVC().subscribe({
      next: (listData) => {
        this.ptvc = listData
        console.log(this.ptvc)
      },
      error: (err) => {
        console.log(err)
      }
    });

    this.f = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      matKhau: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      maBangLai: new FormControl(null, Validators.required),
      tenPhuongTien: new FormControl(null, Validators.required),
      sdt: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      gioiTinh: new FormControl(null, Validators.required),
      diaChi: new FormControl(null, Validators.required),
      ngaySinh: new FormControl(null, [Validators.required, this.minimumAgeValidator(18)]),
      hoTen: new FormControl(null, Validators.required),
      trangThaiTK: new FormControl(null, Validators.required),
      ptvc: new FormControl(this.ptvc, Validators.required),
    })
  }

minimumAgeValidator(minimumAge: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value === null || control.value === '') {
      return null;
    }
    const today = new Date();
    const birthDate = new Date(control.value);
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < minimumAge || age >= 70) {
      return { 'underAge': true };
    }

    return null;
  };
}

  Register() {
    this.processing = true;
    const value = this.f.value
    //Tạo tài khoản Tài xế
    var cv = new ChucVu(0, "")
    this.taiKhoan = new TaiKhoan(0, value.email, value.matKhau, value.sdt,
      value.gioiTinh, value.diaChi, value.ngaySinh, value.hoTen, "Chặn Hoạt Động", 3, cv, "")

    var ptvc = new PhuongThucVC(0, "", 0)
    //Tạo 1 Tài xế mới
    this.taiXe = new TaiXe(0, value.maBangLai, value.tenPhuongTien, value.email, value.matKhau, this.taiKhoan, value.ptvc, ptvc, "", 0);

    //Test JSON
    // console.log(JSON.stringify(this.taiKhoan))
    // console.log(JSON.stringify(this.taiXe))

    this.txService.addTX(this.taiXe)
      .subscribe({
        next: (res) => {
          this.processing = false;
          this.f.reset()
          this.toastr.success("Đăng ký tài xế xong, hãy đợi để Admin xác nhận để chính thức hoạt động!", "Thông báo", {
            progressBar: true,
            newestOnTop: true
          })
          this.router.navigate(['/login'], { relativeTo: this.route })

        },
        error: (err) => {
          this.processing = false;
          this.toastr.error("Tài xế đã tồn tại!", "Thông báo", {
            progressBar: true,
            newestOnTop: true
          })
        }
      })
  }




}
