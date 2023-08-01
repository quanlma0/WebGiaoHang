import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChucVu } from 'src/app/models/chucVu';
import { TaiKhoan } from 'src/app/models/taiKhoan';
import { ChucvuService } from 'src/services/chucvu.service';
import { TKService } from 'src/services/taikhoan.service';

@Component({
  selector: 'app-ttknv-edit',
  templateUrl: './ttknv-edit.component.html',
  styleUrls: ['./ttknv-edit.component.css']
})
export class TtknvEditComponent implements OnInit {
  id!: number;
  editMode = false;
  taiKhoan!: TaiKhoan;
  f!: FormGroup
  chucvu!: ChucVu[]
  gioitinh = ["Nam", "Nữ"]
  trangthaitk = ["Còn hoạt động", "Chặn hoạt động"]

  constructor(private route: ActivatedRoute,
    private TKService: TKService,
    private router: Router,
    private toastr: ToastrService,
    private cvService: ChucvuService) {
    this.f = new FormGroup({
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

  ngOnInit(): void {
    this.cvService.getAllChucVu()
      .subscribe({
        next: (value) => {
          this.chucvu = value
        }
      })
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null
      });

    if (this.id) {
      //call API
      this.TKService.getTK(this.id).subscribe({
        next: (response) => {
          this.taiKhoan = response;
          const maCV = this.taiKhoan.maCV
          var tenCV = ''
          if (maCV === 1) {
            tenCV = "Admin"
          }
          else if (maCV === 2) {
            tenCV = "KhachHang"
          }
          else if (maCV === 3) {
            tenCV = "TaiXe"
          }
          else {
            tenCV = "NhanVienKho"
          }
          this.f.patchValue({
            email: this.taiKhoan.email,
            matKhau: this.taiKhoan.matKhau,
            sdt: this.taiKhoan.sdt,
            gioiTinh: this.taiKhoan.gioiTinh,
            diaChi: this.taiKhoan.diaChi,
            ngaySinh: formatDate(this.taiKhoan.ngaySinh, 'yyyy-MM-dd', 'en-US'),
            hoTen: this.taiKhoan.hoTen,
            trangThaiTK: this.taiKhoan.trangThaiTK,
            tenCV: tenCV,
          })
        },
        error(err) {
        },
      })

      this.f = new FormGroup({
        email: new FormControl({ value: '', disabled: this.editMode }, [Validators.required, Validators.email]),
        matKhau: new FormControl({ value: '', disabled: this.editMode }, [Validators.required, Validators.minLength(8)]),
        sdt: new FormControl({ value: '', disabled: this.editMode }, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
        gioiTinh: new FormControl({ value: '', disabled: this.editMode }, Validators.required),
        diaChi: new FormControl({ value: '', disabled: this.editMode }, Validators.required),
        ngaySinh: new FormControl({ value: '', disabled: this.editMode }, Validators.required),
        hoTen: new FormControl({ value: '', disabled: this.editMode }, Validators.required),
        trangThaiTK: new FormControl("", Validators.required),
        tenCV: new FormControl({ value: '', disabled: this.editMode }, Validators.required),
      })
    }
  }


  onAddUpdateItem() {
    const value = this.f.value
    var cv = new ChucVu(0, "")
    var maCV = 0
    var tenCV = ''
    if (tenCV === "Admin") {
      maCV = 1
    }
    else if (tenCV === "KhachHang") {
      maCV = 2
    }
    else if (tenCV === "KhachHang") {
      maCV = 3
    }
    else {
      maCV = 4
    }


    console.log(JSON.stringify(this.taiKhoan))
    if (this.editMode) {
      this.taiKhoan = new TaiKhoan(this.id, this.taiKhoan.email, this.taiKhoan.matKhau, this.taiKhoan.sdt,
        this.taiKhoan.gioiTinh, this.taiKhoan.diaChi, this.taiKhoan.ngaySinh, this.taiKhoan.hoTen, value.trangThaiTK, maCV, cv, "")
      this.TKService.updateTK(this.id, this.taiKhoan)
        .subscribe({
          next: (tk) => {
            this.router.navigate(['/admin/taotaikhoannhanvien'], { relativeTo: this.route })
            this.toastr.success("Sửa Thành Công", "Thông báo", {
              progressBar: true,
              newestOnTop: true
            })
          },
          error: (err) => {
            this.toastr.error("Sửa Thất Bại", "Thông báo", {
              progressBar: true,
              newestOnTop: true
            })
          }
        });
    }
    else {
      //Tạo tài khoản nhân viên 
      // this.taiKhoan = new TaiKhoan(this.id, value.email, value.matKhau, value.sdt,
      //   value.gioiTinh, value.diaChi, value.ngaySinh, value.hoTen, value.trangThaiTK, maCV, cv, "")
      // this.TKService.addTK(this.taiKhoan)
      //   .subscribe({
      //     next: (tk) => {
      //       this.f.reset()
      //       this.toastr.success("Thêm Thành Công", "Thông báo", {
      //         progressBar: true,
      //         newestOnTop: true
      //       })
      //     },
      //     error: (err) => {
      //       this.toastr.error("Thêm Thất Bại", "Thông báo", {
      //         progressBar: true,
      //         newestOnTop: true
      //       })
      //     }
      //   })
    }
  }


  onBack() {
    this.router.navigate(['/admin/taotaikhoannhanvien'], { relativeTo: this.route })
  }
}
