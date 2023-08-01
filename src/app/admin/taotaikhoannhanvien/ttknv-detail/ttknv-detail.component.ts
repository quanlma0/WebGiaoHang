import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaiKhoan } from 'src/app/models/taiKhoan';
import { TKService } from 'src/services/taikhoan.service';

@Component({
  selector: 'app-ttknv-detail',
  templateUrl: './ttknv-detail.component.html',
  styleUrls: ['./ttknv-detail.component.css']
})
export class TtknvDetailComponent implements OnInit {
  id!: number;
  taiKhoan!: TaiKhoan;
  f!: FormGroup
  constructor(private route: ActivatedRoute,
    private TKService: TKService,
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
        error(err) {
          console.log(err)
        },
      })
    }
  }

  onBack() {
    this.router.navigate(['/admin/taotaikhoannhanvien'], { relativeTo: this.route })
  }
}
