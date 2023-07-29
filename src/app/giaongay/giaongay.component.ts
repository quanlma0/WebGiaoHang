import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
import { KhuyenMai } from '../models/khuyenMain';
import { TaiKhoan } from '../models/taiKhoan';
import { DGService } from 'src/services/dongiao.service';
import { KHService } from 'src/services/khachhang.service';
import { User } from '../models/user';
import { TaiXe } from '../models/taiXe';
import { KhachHang } from '../models/khachHang';
import { TKService } from 'src/services/taikhoan.service';
import { Kho } from '../models/kho';

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
  dongiao!: DonGiao
  tatcadongiao!: DonGiao[]

  email_hienTai!: string
  khachhang_hientai!: KhachHang
  taikhoang_hientai!: TaiKhoan

  constructor(private route: ActivatedRoute,
    private usService: USService,
    private router: Router,
    private toastr: ToastrService,
    private usStore: UserStoreService,
    private ptService: PTService,
    private dgService: DGService,
    private khService: KHService,
    private tkService: TKService) {
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


  }

  ngOnInit(): void {
    // this.dgService.getAllDonGiaos().subscribe(x => {
    //   this.tatcadongiao = x
    //   console.log("aaaaa")
    //   console.log(this.tatcadongiao)
    // })

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

        // cách set giá trị mặt định cho FormGroup
        // this.ptgh_md = this.ptgh[0].tenPTGH
        // console.log(this.ptgh[0])
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


    console.log(this.thongtinTK)
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
      km: new FormControl(this.km),
      tt: new FormControl(0)
    })



  }

  GiaoNgay() {
    // this.processing = true;
    const value = this.f.value
    // console.log(value.ptgh)
    // console.log("XXXXXXXXXXXXX")
    // console.log(value.ptvc)
    // console.log(value.pttt)
    // console.log(value.km)

    this.khachhang_hientai.taiKhoan = this.taikhoang_hientai
    console.log(this.khachhang_hientai)


    const pttt_chon = new PhuongThucTT(0, "")
    const ptgh_chon = new PhuongThucGH(0, "", 0)
    const km_chon = new KhuyenMai(0, 0, "", "", "", 0, 0)
    
    //format input ngày về dạng yyyymmdd
    const ngay_hientai = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    this.dongiao = new DonGiao(0, 'Chờ Xác Nhận', value.diaChiGiao, value.diaChiNhan, value.khoangCach, ngay_hientai, ngay_hientai,
      0, value.tenNguoiNhan, value.sdtNguoiNhan, value.tenNguoiGui, value.sdtNguoiGui, value.tt, this.khachhang_hientai.maKH, this.khachhang_hientai, value.pttt, pttt_chon, value.ptgh, ptgh_chon,
      value.km, km_chon)

    console.log(JSON.stringify(this.dongiao))

    if (this.f.valid) {
      this.dgService.addDG(this.dongiao)
        .subscribe({
          next: (res) => {
            this.processing = false;
            this.f.reset()
            console.log(res)

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
      this.toastr.warning("Chưa nhập đủ thông tin rồi!", "", {
        progressBar: true,
        newestOnTop: true
      })
    }
  }

}
