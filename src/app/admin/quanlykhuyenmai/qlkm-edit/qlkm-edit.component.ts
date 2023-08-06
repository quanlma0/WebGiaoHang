import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { KhuyenMai } from 'src/app/models/khuyenMai';
import { PTService } from 'src/services/phuongthuc.service';

@Component({
  selector: 'app-qlkm-edit',
  templateUrl: './qlkm-edit.component.html',
  styleUrls: ['./qlkm-edit.component.css']
})
export class QlkmEditComponent implements OnInit {
  id!: number;
  editMode = false;
  khuyenmai!: KhuyenMai;
  f!: FormGroup
  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private ptService: PTService,
    private datePipe: DatePipe
  ) {
    this.f = new FormGroup({
      phanTramKM: new FormControl(null),
      moTa: new FormControl(null),
      ngayApDung: new FormControl(null),
      ngayKetThuc: new FormControl(null),
      soLuong: new FormControl(null),
      mucTienApDung: new FormControl(null)
    })

  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null
      });

    this.f = new FormGroup({
      phanTramKM: new FormControl(null, Validators.required),
      moTa: new FormControl(null, Validators.required),
      ngayApDung: new FormControl(null, Validators.required),
      ngayKetThuc: new FormControl(null, Validators.required),
      soLuong: new FormControl(null, Validators.required),
      mucTienApDung: new FormControl(null, Validators.required)
    })
    if (this.id) {
      //call API
      this.ptService.getKM(this.id).subscribe({
        next: (response) => {
          this.khuyenmai = response;
          this.f.patchValue({
            phanTramKM: this.khuyenmai.phanTramKM,
            moTa: this.khuyenmai.moTa,
            ngayApDung: this.convertStringToDate(this.khuyenmai.ngayApDung),
            ngayKetThuc: this.convertStringToDate(this.khuyenmai.ngayApDung),
            soLuong: this.khuyenmai.soLuong,
            mucTienApDung: this.khuyenmai.mucTienApDung
          })
        },
        error(err) {
        },
      })
    }

  }

  chuyenNgayVeString(ngay: string) {
    return ngay.toString().slice(0, 10).replace(/-/g, '');
  }



  onAddUpdateItem() {
    const value = this.f.value
    this.khuyenmai = new KhuyenMai(this.id, value.phanTramKM, value.moTa, this.chuyenNgayVeString(value.ngayApDung),
      this.chuyenNgayVeString(value.ngayKetThuc), value.soLuong, value.mucTienApDung)
    if (value.ngayApDung > value.ngayKetThuc) {
      this.toastr.error("Ngày kết thúc phải sau ngày áp dụng ", "Lỗi!", {
        progressBar: true,
        newestOnTop: true
      })
    }
    else {
      if (this.editMode) {
        //test 
        // console.log(JSON.stringify(this.taiKhoan))

        this.ptService.updateKM(this.id, this.khuyenmai)
          .subscribe({
            next: (tk) => {
              this.router.navigate(['/admin/quanlykhuyenmai'], { relativeTo: this.route })
              this.toastr.success("Sửa Thành Công", "Thông báo", {
                progressBar: true,
                newestOnTop: true
              })
            },
            error: (err) => {
              this.toastr.error("Lỗi kết nối!", "Thông báo", {
                progressBar: true,
                newestOnTop: true
              })
            }
          });
      }
      else {
        //Tạo khuyen mai moi
        //Test
        console.log(JSON.stringify(this.khuyenmai))
        this.khuyenmai.maKM = 0
        this.ptService.addKM(this.khuyenmai)
          .subscribe({
            next: (tk) => {
              this.f.reset()
              this.router.navigate(['/admin/quanlykhuyenmai'], { relativeTo: this.route })
              this.toastr.success("Tạo Khuyến Mãi Xong", "Thông báo", {
                progressBar: true,
                newestOnTop: true
              })
            },
            error: (err) => {
              this.toastr.error("Tạo khuyễn mãi lỗi!", "Thông báo", {
                progressBar: true,
                newestOnTop: true
              })
            }
          })
      }
    }
  }

  convertStringToDate(yyyymmdd: string): string {
    const year = parseInt(yyyymmdd.substr(0, 4));
    const month = parseInt(yyyymmdd.substr(4, 2));
    const day = parseInt(yyyymmdd.substr(6, 2));

    const dateObject = new Date(year, month - 1, day);
    return this.datePipe.transform(dateObject, 'yyyy-MM-dd') as string;
  }

  onBack() {
    this.router.navigate(['/admin/quanlykhuyenmai'], { relativeTo: this.route })
  }
}
