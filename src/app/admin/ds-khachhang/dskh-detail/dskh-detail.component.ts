import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaiKhoan } from 'src/app/models/taiKhoan';
import { TKService } from 'src/services/taikhoan.service';

@Component({
  selector: 'app-dskh-detail',
  templateUrl: './dskh-detail.component.html',
  styleUrls: ['./dskh-detail.component.css']
})
export class DskhDetailComponent implements OnInit {
  id!: number;
  taiKhoan!: TaiKhoan;
  @ViewChild('f')
  form!: NgForm;

  constructor(private route: ActivatedRoute,
    private tkService: TKService,
    private router: Router,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
      });

    if (this.id) {
      //call API
      this.tkService.getTK(this.id).subscribe({
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
          this.form.setValue({
            maTK: this.taiKhoan.maTK,
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
          console.log(err)
        },
      })
    }
  }
  onBack() {
    this.router.navigate(['/admin/ds-khachhang'], { relativeTo: this.route })
  }
}
