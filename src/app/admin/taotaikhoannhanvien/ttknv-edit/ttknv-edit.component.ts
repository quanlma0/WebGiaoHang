import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaiKhoan } from 'src/app/models/taiKhoan';
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
  chucvu = ["TaiXe", "Admin", "NhanVienKho"]
  gioitinh = ["Nam", "Nữ"]
  trangthaitk = ["Còn hoạt động", "Chặn hoạt động"]

  constructor(private route: ActivatedRoute,
    private TKService: TKService,
    private router: Router,
    private toastr: ToastrService) { }

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
            tenCV: this.taiKhoan.tenCV,
          })
          console.log(this.taiKhoan.trangThaiTK)
        },
        error(err) {
          console.log(err)
        },
      })
    }
  }


  onAddUpdateItem() {
    const value = this.f.value

    if (this.editMode) {
      this.taiKhoan = new TaiKhoan(this.id, value.email, value.matKhau, value.sdt,
        value.gioiTinh, value.diaChi, value.ngaySinh, value.hoTen, value.trangThaiTK, value.tenCV, "")

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
            console.log(err)
            this.toastr.error("Sửa Thất Bại", "Thông báo", {
              progressBar: true,
              newestOnTop: true
            })
          }
        });
    }
    else {
      this.taiKhoan = new TaiKhoan(0, value.email, value.matKhau, value.sdt,
        value.gioiTinh, value.diaChi, value.ngaySinh, value.hoTen, value.trangThaiTK, value.tenCV, "")

      this.TKService.addTK(this.taiKhoan)
        .subscribe({
          next: (tk) => {
            this.f.reset()
            this.toastr.success("Thêm Thành Công", "Thông báo", {
              progressBar: true,
              newestOnTop: true
            })
          },
          error: (err) => {
            console.log(err)
            this.toastr.error("Thêm Thất Bại", "Thông báo", {
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
