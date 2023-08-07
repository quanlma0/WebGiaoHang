import { Component, ElementRef, HostListener, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PTService } from 'src/services/phuongthuc.service';
import { UserStoreService } from 'src/services/user-store.service';
import { USService } from 'src/services/user.service';
import { PhuongThucGH } from '../models/PhuongThucGH';
import { PhuongThucVC } from '../models/PhuongThucVC';
import { PhuongThucTT } from '../models/PhuongThucTT';
import { DonGiao } from '../models/donGiao';
import { KhuyenMai } from '../models/khuyenMai';
import { TaiKhoan } from '../models/taiKhoan';
import { DGService } from 'src/services/dongiao.service';
import { KHService } from 'src/services/khachhang.service';
import { KhachHang } from '../models/khachHang';
import { TKService } from 'src/services/taikhoan.service';
import { ChucVu } from '../models/chucVu';
import { CurrencyPipe } from '@angular/common';
import { isAfter, isBefore, isEqual, parse } from 'date-fns';

@Component({
  selector: 'app-giaongay',
  templateUrl: './giaongay.component.html',
  styleUrls: ['./giaongay.component.css']
})
export class GiaongayComponent implements OnInit {
  f!: FormGroup
  thongtinTK!: TaiKhoan
  chucvu = ["KhachHang", "TaiXe"]
  gioitinh = ["Nam", "Nữ"]
  processing = false;
  ptgh!: PhuongThucGH[]
  pttt!: PhuongThucTT[]
  ptvc!: PhuongThucVC[]
  km!: KhuyenMai[]
  km_apdung: KhuyenMai[] = []
  dongiao!: DonGiao
  tatcadongiao!: DonGiao[]
  TongTien = 1;
  email_hienTai!: string
  khachhang_hientai!: KhachHang
  taikhoang_hientai!: TaiKhoan
  currencyPipe!: any

  constructor(private route: ActivatedRoute,
    private usService: USService,
    private router: Router,
    private toastr: ToastrService,
    private usStore: UserStoreService,
    private ptService: PTService,
    private dgService: DGService,
    private khService: KHService,
    private tkService: TKService,
    private injector: Injector) {
    this.f = new FormGroup({
      tenNguoiGui: new FormControl(null, Validators.required),
      sdtNguoiGui: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      tenNguoiNhan: new FormControl(null, Validators.required),
      sdtNguoiNhan: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      diaChiGiao: new FormControl(null, Validators.required),
      diaChiNhan: new FormControl(null, Validators.required),
      khoangCach: new FormControl(null),
      pttt: new FormControl(null, Validators.required),
      ptvc: new FormControl(null, Validators.required),
      ptgh: new FormControl(null, Validators.required),
      km: new FormControl(null),
      tt: new FormControl(null)
    })
    this.currencyPipe = this.injector.get(CurrencyPipe)

  }

  ngOnInit(): void {
    //Xử lý với token
    this.usStore.getEmailFromStore()
      .subscribe((value: string) => {
        let emailFromToken = this.usService.getEmailFromToken();
        this.email_hienTai = value || emailFromToken
      })

    this.khService.getKHFromEmail(this.email_hienTai)
      .subscribe((value) => {
        this.khachhang_hientai = value
      })
    this.tkService.getTKFromEmail(this.email_hienTai)
      .subscribe((value) => {
        this.taikhoang_hientai = value
      })

    //Lấy thông tin tk của người dùng đã đăng nhập vào
    this.thongtinTK = new TaiKhoan(0, '', '', '', '', '', '', '', '', 2, new ChucVu(2, 'KhachHang'), '')
    this.usStore.getTTTKFromStore()
      .subscribe((value) => {
        this.thongtinTK = value
      })
    this.ptService.getAllKM().subscribe({
      next: (listData) => {
        this.km = listData
      },
      error: (err) => {
        console.log(err)
      }
    });
    this.ptService.getAllPTGH().subscribe({
      next: (listData) => {
        this.ptgh = listData
      },
      error: (err) => {
        console.log(err)
      }
    });
    this.ptService.getAllPTTT().subscribe({
      next: (listData) => {
        this.pttt = listData
      },
      error: (err) => {
        console.log(err)
      }
    });
    this.ptService.getAllPTVC().subscribe({
      next: (listData) => {
        this.ptvc = listData
      },
      error: (err) => {
        console.log(err)
      }
    });


    // console.log(this.thongtinTK)
    // console.log(this.thongtinTK.hoTen)
    this.f = new FormGroup({
      tenNguoiGui: new FormControl(this.thongtinTK.hoTen, Validators.required),
      sdtNguoiGui: new FormControl(this.thongtinTK.sdt, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      tenNguoiNhan: new FormControl(null, Validators.required),
      sdtNguoiNhan: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      diaChiGiao: new FormControl(this.thongtinTK.diaChi, Validators.required),
      diaChiNhan: new FormControl(null, Validators.required),
      khoangCach: new FormControl(0),
      pttt: new FormControl(this.pttt, Validators.required),
      ptvc: new FormControl(this.ptvc, Validators.required),
      ptgh: new FormControl(this.ptgh, Validators.required),
      km: new FormControl(null),
      tt: new FormControl(0)
    })
    this.f.get('ptvc')?.valueChanges.subscribe(() => this.tinhTongTien());
    this.f.get('khoangCach')?.valueChanges.subscribe(() => this.tinhTongTien());
    this.f.get('km')?.valueChanges.subscribe(() => this.tinhKhuyenMai());

  }

  // @ViewChild('inputF')
  // inputF!: ElementRef
  // autucomplete: google.maps.places.Autocomplete | undefined
  // ngAfterViewInit(){
  //   this.autucomplete = new google.maps.places.Autocomplete(this.inputF.nativeElement)
  //   this.autucomplete.addListener('place_changed', ()=>{
  //     const place = this.autucomplete?.getPlace();
  //     console.log(place)
  //   });
  // }


  tinhTongTien() {
    const ma_ptvc = this.f.get('ptvc')?.value;
    let dongia = 1
    this.ptvc.forEach(element => {
      if (element.maPTVC == ma_ptvc) {
        dongia = element.donGia
      }
    });
    const soKm = this.f.get('khoangCach')?.value;
    this.TongTien = soKm * dongia

    if (this.TongTien > 0) {
      this.km_apdung = []
      this.km.forEach(element => {
        if (this.TongTien >= element.mucTienApDung && this.thoaManThoiGian(element.ngayApDung, element.ngayKetThuc)) {
          this.km_apdung.push(element)
        }
      });
      this.f.patchValue({
        km: this.km_apdung
      })
    }

    this.f.patchValue({
      tt: this.currencyPipe.transform(this.TongTien, 'VNĐ', 'symbol', '1.0')
    })
  }

  tinhKhuyenMai() {
    const km_chon = this.f.get('km')?.value
    let phantramkm_chon = 1;
    this.km.forEach(element => {
      if (element.maKM == km_chon) {
        phantramkm_chon = element.phanTramKM
      }
    });
    const tien_apDungKm = this.TongTien - (this.TongTien * phantramkm_chon * 0.01)
    this.f.patchValue({
      tt: this.currencyPipe.transform(tien_apDungKm, 'VNĐ', 'symbol', '1.0')
    })
  }

  thoaManThoiGian(ngayApDung: string, ngayKetThuc: string): boolean {
    const currentDate = new Date();
    const parsedNgayApDung = parse(ngayApDung, 'yyyyMMdd', new Date());
    const parsedNgayKetThuc = parse(ngayKetThuc, 'yyyyMMdd', new Date());
    return (
      (isAfter(currentDate, parsedNgayApDung) || isEqual(currentDate, parsedNgayApDung)) &&
      (isBefore(currentDate, parsedNgayKetThuc) || isEqual(currentDate, parsedNgayKetThuc))
    );
  }

  chuyenVNDveString(VND: any) {
    const numericString = VND.replace(/[^\d.,]/g, '');
    return parseInt(numericString)
  }

  GiaoNgay() {
    this.processing = true;
    const value = this.f.value

    this.khachhang_hientai.taiKhoan = this.taikhoang_hientai
    // console.log(this.khachhang_hientai)


    const pttt_chon = new PhuongThucTT(0, "")
    const ptgh_chon = new PhuongThucGH(0, "")
    const ptvc_chon = new PhuongThucVC(0, "", 0)
    const km_chon = new KhuyenMai(0, 0, "", "", "", 0, 0)
    const cv = new ChucVu(2, "KhachHang")
    //format input ngày về dạng yyyymmdd
    const ngay_hientai = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    this.khachhang_hientai.taiKhoan.chucvu = cv;
    this.dongiao = new DonGiao(0, 'Chờ Xác Nhận', value.diaChiGiao, value.diaChiNhan, value.khoangCach, ngay_hientai, ngay_hientai,
      value.tenNguoiNhan, value.sdtNguoiNhan, value.tenNguoiGui, value.sdtNguoiGui, this.chuyenVNDveString(value.tt) * 1000, this.khachhang_hientai.maKH, this.khachhang_hientai,
      value.pttt, pttt_chon, value.ptgh, ptgh_chon, value.ptvc, ptvc_chon,
      value.km, km_chon)

    // console.log(JSON.stringify(this.dongiao))

    if (this.f.valid) {
      this.dgService.addDG(this.dongiao)
        .subscribe({
          next: (res) => {
            this.processing = false;
            this.f.reset()
            // console.log(res)

            this.toastr.success("Giao hàng thành công", "", {
              progressBar: true,
              newestOnTop: true
            })
            this.router.navigate(['/home'], { relativeTo: this.route })

          },
          error: (err) => {
            this.processing = false;
            console.log(err)
            this.toastr.error("Giao hàng thất bại, lỗi kết nối!", "Thông báo", {
              progressBar: true,
              newestOnTop: true
            })
          }
        })

    }
    else {
      this.processing = false;
      this.toastr.warning("Chưa nhập đủ thông tin rồi!", "", {
        progressBar: true,
        newestOnTop: true
      })
    }
  }

}
