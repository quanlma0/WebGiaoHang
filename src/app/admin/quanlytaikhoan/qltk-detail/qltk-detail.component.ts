import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaiKhoan } from 'src/app/models/taiKhoan';
import { TKService } from 'src/services/taikhoan.service';

@Component({
  selector: 'app-qltk-detail',
  templateUrl: './qltk-detail.component.html',
  styleUrls: ['./qltk-detail.component.css']
})
export class QltkDetailComponent implements OnInit {
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
            tenCV: this.taiKhoan.tenCV,
          })
        },
        error(err) {
          console.log(err)
        },
      })
    }
  }
  onBack() {
    this.router.navigate(['/admin/quanlytaikhoan'], { relativeTo: this.route })
  }
}
