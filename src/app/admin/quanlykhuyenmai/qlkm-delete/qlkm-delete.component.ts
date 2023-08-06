import { CurrencyPipe } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { KhuyenMai } from 'src/app/models/khuyenMai';
import { PTService } from 'src/services/phuongthuc.service';

@Component({
  selector: 'app-qlkm-delete',
  templateUrl: './qlkm-delete.component.html',
  styleUrls: ['./qlkm-delete.component.css']
})
export class QlkmDeleteComponent implements OnInit {
  id!: number;
  khuyenmai!: KhuyenMai;
  f!: FormGroup
  currencyPipe!: any

  constructor(private route: ActivatedRoute,
    private ptService: PTService,
    private toastr: ToastrService,
    private router: Router,
    private injector: Injector
    ) {
    this.f = new FormGroup({
      phanTramKM: new FormControl({ value: '', disabled: true }, Validators.required),
      moTa: new FormControl({ value: '', disabled: true }, Validators.required),
      ngayApDung: new FormControl({ value: '', disabled: true }, Validators.required),
      ngayKetThuc: new FormControl({ value: '', disabled: true }, Validators.required),
      soLuong: new FormControl({ value: '', disabled: true }, Validators.required),
      mucTienApDung: new FormControl({ value: '', disabled: true }, Validators.required)
    })
    this.currencyPipe = this.injector.get(CurrencyPipe)
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
      })

    if (this.id) {
      //call API
      this.ptService.getKM(this.id).subscribe({
        next: (response) => {
          this.khuyenmai = response;
          this.f.patchValue({
            phanTramKM: this.khuyenmai.phanTramKM,
            moTa: this.khuyenmai.moTa,
            ngayApDung: this.chuyenStringVeDate(this.khuyenmai.ngayApDung),
            ngayKetThuc: this.chuyenStringVeDate(this.khuyenmai.ngayKetThuc),
            soLuong: this.khuyenmai.soLuong,
            mucTienApDung: this.currencyPipe.transform(this.khuyenmai.mucTienApDung, 'VNĐ', 'symbol', '1.0')
          })
        },
      })
    }
  }

  onDeleteItem() {
    this.ptService.deleteKM(this.id)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/admin/quanlykhuyenmai'], { relativeTo: this.route })
          this.toastr.success("Xoá Thành Công", "Thông báo", {
            progressBar: true,
            newestOnTop: true
          })

        },
        error: (err) => {
          console.log(err)
          this.toastr.error("Khuyễn mãi đã được sử dụng không được xoá!", "Thông báo", {
            progressBar: true,
            newestOnTop: true
          })
        }
      })
  }
  onBack() {
    this.router.navigate(['/admin/quanlykhuyenmai'], { relativeTo: this.route })
  }
  chuyenStringVeDate(date: string) {
    const ngay_hientai = date;
    const year = Number(ngay_hientai.slice(0, 4));
    const month = Number(ngay_hientai.slice(4, 6)) - 1;
    const day = Number(ngay_hientai.slice(6, 8));

    const dateObject = day + '/' + month + '/' + year
    return dateObject
  }
}
