import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaiKhoan } from 'src/app/models/taiKhoan';
import { NVService } from 'src/services/nhanvien.service';
import { TKService } from 'src/services/taikhoan.service';
import { TXService } from 'src/services/taixe.service';

@Component({
  selector: 'app-tknv-delete',
  templateUrl: './tknv-delete.component.html',
  styleUrls: ['./tknv-delete.component.css']
})
export class TknvDeleteComponent implements OnInit {
  id!: number;
  taiKhoan!: TaiKhoan;
  f!: FormGroup
  maCV!: number
  constructor(private route: ActivatedRoute,
    private TKService: TKService,
    private nvService: NVService,
    private txService: TXService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.f = new FormGroup({
      email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
      matKhau: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(8)]),
      sdt: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      gioiTinh: new FormControl({ value: '', disabled: true }, Validators.required),
      diaChi: new FormControl({ value: '', disabled: true }, Validators.required),
      ngaySinh: new FormControl({ value: '', disabled: true }, Validators.required),
      hoTen: new FormControl({ value: '', disabled: true }, Validators.required),
      trangThaiTK: new FormControl({ value: '', disabled: true }, Validators.required),
      tenCV: new FormControl({ value: '', disabled: true }, Validators.required),
    })


    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
      });

    if (this.id) {
      //call API
      this.TKService.getTK(this.id).subscribe({
        next: (response) => {
          this.taiKhoan = response;
          this.maCV = this.taiKhoan.maCV
          var tenCV = ''
          if (this.maCV === 1) {
            tenCV = "Admin"
          }
          else if (this.maCV === 2) {
            tenCV = "KhachHang"
          }
          else if (this.maCV === 3) {
            tenCV = "TaiXe"
          }
          else {
            tenCV = "NhanVienKho"
          }
          this.f.patchValue({
            maTK: this.taiKhoan.maTK,
            email: this.taiKhoan.email,
            matKhau: this.taiKhoan.matKhau,
            sdt: this.taiKhoan.sdt,
            gioiTinh: this.taiKhoan.gioiTinh,
            diaChi: this.taiKhoan.diaChi,
            ngaySinh: formatDate(this.taiKhoan.ngaySinh, 'yyyy-MM-dd', 'en-US'),
            hoTen: this.taiKhoan.hoTen,
            trangThaiTK: this.taiKhoan.trangThaiTK,
            tenCV: tenCV
          })
        },
        error: (err) => {
          this.toastr.error("Lỗi kết nối", "Thông báo", {
            progressBar: true,
            newestOnTop: true
          })
        },
      })
    }
  }
  onDeleteItem() {
    if (this.maCV === 1) {  // Admin
      this.toastr.error("Không thể xoá tài khoản admin", "Thông báo", {
        progressBar: true,
        newestOnTop: true
      })
    }
    else if (this.maCV === 3) { // TaiXe
      this.txService.deleteTX(this.id)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/admin/taotaikhoannhanvien'], { relativeTo: this.route })
          this.toastr.success("Xoá Thành Công", "Thông báo", {
            progressBar: true,
            newestOnTop: true
          })

        },
        error: (err) => {
          console.log(err)
          this.toastr.error("Xoá thất bại!", "Thông báo", {
            progressBar: true,
            newestOnTop: true
          })
        }
      })
    }
    else { // NhanVien
      this.nvService.deleteTKNV(this.id)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/admin/taotaikhoannhanvien'], { relativeTo: this.route })
          this.toastr.success("Xoá Thành Công", "Thông báo", {
            progressBar: true,
            newestOnTop: true
          })

        },
        error: (err) => {
          console.log(err)
          this.toastr.error("Xoá thất bại!", "Thông báo", {
            progressBar: true,
            newestOnTop: true
          })
        }
      })
    }
   
  }
  onBack() {
    this.router.navigate(['/admin/taotaikhoannhanvien'], { relativeTo: this.route })
  }
}
