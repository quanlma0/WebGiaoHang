import { CurrencyPipe } from '@angular/common';
import { Component, Injector, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DonGiao } from 'src/app/models/donGiao';
import { DGService } from 'src/services/dongiao.service';

@Component({
  selector: 'app-dsdg-detail',
  templateUrl: './dsdg-detail.component.html',
  styleUrls: ['./dsdg-detail.component.css']
})
export class DsdgDetailComponent {
  id!: number;
  dongiao!: DonGiao
  @ViewChild('f')
  form!: NgForm;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dgService: DGService,
    private injector: Injector) { }
  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
      });

    if (this.id) {
      //call API
      this.dgService.getDG(this.id).subscribe({
        next: (dongiao) => {
          this.dongiao = dongiao
          const currencyPipe = this.injector.get(CurrencyPipe)
          this.form.setValue({
            maDG: this.dongiao.maDG,
            diaChiGiao: this.dongiao.diaChiGiao,
            diaChiNhan: this.dongiao.diaChiNhan,
            khoangCach: this.dongiao.khoangCach,
            ngayDatGiao: this.chuyenStringVeDate(this.dongiao.ngayDatGiao),
            ngayGiaoHang: this.chuyenStringVeDate(this.dongiao.ngayGiaoHang),
            tenNguoiNhan: this.dongiao.tenNguoiNhan,
            sdtNguoiNhan: this.dongiao.sdtNguoiNhan,
            tenNguoiGui: this.dongiao.tenNguoiGui,
            sdtNguoiGui: this.dongiao.sdtNguoiGui,
            tongTien: currencyPipe.transform(this.dongiao.tongTien, 'VNĐ', 'symbol', '1.0'),
          })
        },
        error(err) {
          console.log(err)
        },
      })
    }
  }
  onBack() {
    this.router.navigate(['/admin/danhsachdongiao'], { relativeTo: this.route })
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
