import { CurrencyPipe } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { KhuyenMai } from 'src/app/models/khuyenMai';
import { PTService } from 'src/services/phuongthuc.service';

@Component({
  selector: 'app-qlkm-detail',
  templateUrl: './qlkm-detail.component.html',
  styleUrls: ['./qlkm-detail.component.css']
})
export class QlkmDetailComponent implements OnInit {
  id!: number;
  khuyenmai!: KhuyenMai;
  f!: FormGroup
  currencyPipe!: any

  constructor(private route: ActivatedRoute,
    private ptService: PTService,
    private router: Router,
    private injector: Injector
  ) {
    this.currencyPipe = this.injector.get(CurrencyPipe)
  }

  ngOnInit(): void {
    this.f = new FormGroup({
      phanTramKM: new FormControl({ value: '', disabled: true }, [Validators.required]),
      moTa: new FormControl({ value: '', disabled: true }, [Validators.required]),
      ngayApDung: new FormControl({ value: '', disabled: true }, [Validators.required]),
      ngayKetThuc: new FormControl({ value: '', disabled: true }, Validators.required),
      soLuong: new FormControl({ value: '', disabled: true }, Validators.required),
      mucTienApDung: new FormControl({ value: '', disabled: true }, Validators.required)
    })


    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
      });

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
        error(err) {
          console.log(err)
        },
      })
    }
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
