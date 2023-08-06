import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PhuongThucGH } from 'src/app/models/PhuongThucGH';
import { PhuongThucTT } from 'src/app/models/PhuongThucTT';
import { PhuongThucVC } from 'src/app/models/PhuongThucVC';
import { ChucVu } from 'src/app/models/chucVu';
import { DonGiao } from 'src/app/models/donGiao';
import { KhachHang } from 'src/app/models/khachHang';
import { Kho } from 'src/app/models/kho';
import { KhuyenMai } from 'src/app/models/khuyenMai';
import { PhieuXuatNhap } from 'src/app/models/phieuXuatNhap';
import { TaiKhoan } from 'src/app/models/taiKhoan';
import { DGService } from 'src/services/dongiao.service';
import { KhoService } from 'src/services/kho.service';
import { PTService } from 'src/services/phuongthuc.service';

@Component({
  selector: 'app-nk-add',
  templateUrl: './nk-add.component.html',
  styleUrls: ['./nk-add.component.css']
})
export class NkAddComponent implements OnInit {
  id!: number;
  phieuNhapXuat!: PhieuXuatNhap;
  f!: FormGroup
  khoes!: Kho[]
  dongiao_chon!: DonGiao
  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private ptService: PTService,
    private khoService: KhoService,
    private dgService: DGService
  ) {
    this.f = new FormGroup({
      maDG: new FormControl({ value: '', disabled: true }),
      tenNguoiGui: new FormControl({ value: '', disabled: true }),
      sdtNguoiGui: new FormControl({ value: '', disabled: true }),
      diaChiGiao: new FormControl({ value: '', disabled: true }),
      diaChiNhan: new FormControl({ value: '', disabled: true }),
      kho: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
      });
    if (this.id) {
      this.khoService.getAllKho().subscribe({
        next: (value) => {
          this.khoes = value
        }
      })
      this.dgService.getDG(this.id).subscribe({
        next: (value) => {
          this.dongiao_chon = value

          this.f.patchValue({
            maDG: this.dongiao_chon.maDG,
            tenNguoiGui: this.dongiao_chon.tenNguoiGui,
            sdtNguoiGui: this.dongiao_chon.sdtNguoiGui,
            diaChiGiao: this.dongiao_chon.diaChiGiao,
            diaChiNhan: this.dongiao_chon.diaChiNhan,
            kho: this.khoes
          })
        }
      })
    }
    else {
      this.toastr.error("Lỗi kết nối!", "Thông báo", {
        progressBar: true,
        newestOnTop: true
      })
    }
  }

  onNhapKho() {
    const value = this.f.value
    const currentDate = new Date();
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(currentDate, 'yyyyMMdd');
    const kho_chon = this.khoes.find(kho => kho.maKho == value.kho)

    const pttt_chon = new PhuongThucTT(0, "")
    const ptgh_chon = new PhuongThucGH(0, "")
    const ptvc_chon = new PhuongThucVC(0, "", 0)
    const km_chon = new KhuyenMai(0, 0, "", "", "", 0, 0)
    const kh_chon = new KhachHang(0, "", "", new TaiKhoan(0, "", "", "", "", "", "", "", "", 0, new ChucVu(0, ""), ""))

    const dg_thaydoi = new DonGiao(this.dongiao_chon.maDG, "Đã Nhập Kho", this.dongiao_chon.diaChiGiao, this.dongiao_chon.diaChiNhan, this.dongiao_chon.khoangCach,
      this.dongiao_chon.ngayDatGiao, this.dongiao_chon.ngayGiaoHang, this.dongiao_chon.tenNguoiNhan, this.dongiao_chon.sdtNguoiNhan, this.dongiao_chon.tenNguoiGui, this.dongiao_chon.sdtNguoiNhan, this.dongiao_chon.tongTien,
      this.dongiao_chon.maKH, kh_chon, this.dongiao_chon.maPTTT, pttt_chon, this.dongiao_chon.maPTGH, ptgh_chon, this.dongiao_chon.maPTVC, ptvc_chon,
      this.dongiao_chon.maKM, km_chon, this.dongiao_chon.maTX, this.dongiao_chon.taiXe, value.kho, kho_chon)

    this.phieuNhapXuat = new PhieuXuatNhap(0, formattedDate!, 0, this.dongiao_chon.maDG, dg_thaydoi, value.kho, kho_chon!)
    //test 
    console.log(JSON.stringify(this.phieuNhapXuat))
    console.log(JSON.stringify(dg_thaydoi))

    this.dgService.updateDG(this.id, dg_thaydoi).subscribe({
      next: (value) => {
        this.ptService.addPhieuXN(this.phieuNhapXuat).subscribe({
          next: (value) => {
            this.router.navigate(['/admin/nhapkho'], { relativeTo: this.route })
            this.toastr.success("Nhập kho thành công", "Thông báo", {
              progressBar: true,
              newestOnTop: true
            })
          },
          error: (err) => {
            this.toastr.error("Lỗi kết nối!", "Lỗi!", {
              progressBar: true,
              newestOnTop: true
            })
          }
        })
      },
      error: (err) => {
        this.toastr.error("Lỗi kết nối đơn giao!", "Lỗi!", {
          progressBar: true,
          newestOnTop: true
        })
      }
    })
  }
  onBack() {
    this.router.navigate(['/admin/nhapkho'], { relativeTo: this.route })
  }



}
