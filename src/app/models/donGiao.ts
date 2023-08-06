import { PhuongThucGH } from "./PhuongThucGH";
import { PhuongThucTT } from "./PhuongThucTT";
import { PhuongThucVC } from "./PhuongThucVC";
import { KhachHang } from "./khachHang";
import { Kho } from "./kho";
import { KhuyenMai } from "./khuyenMai";
import { TaiXe } from "./taiXe";
import { User } from "./user";

export class DonGiao {
  constructor(public maDG: number, public trangThaiDG: string, public diaChiGiao: string, public diaChiNhan: string,
    public khoangCach: number, public ngayDatGiao: string, public ngayGiaoHang: string, public tenNguoiNhan: string,
    public sdtNguoiNhan: string, public tenNguoiGui: string, public sdtNguoiGui: string,
    public tongTien: number, public maKH: number, public khachHang: KhachHang, public maPTTT: number, public phuongThucTT: PhuongThucTT,
    public maPTGH: number, public phuongThucGH: PhuongThucGH, public maPTVC: number, public phuongThucVC: PhuongThucVC,
    public maKM?: number, public khuyenMai?: KhuyenMai, public maTX?: number, public taiXe?: TaiXe,
    public maKho?: number, public kho?: Kho) {
    this.maDG = maDG,
      this.trangThaiDG = trangThaiDG,
      this.diaChiGiao = diaChiGiao,
      this.diaChiNhan = diaChiNhan,
      this.khoangCach = khoangCach,
      this.ngayDatGiao = ngayDatGiao,
      this.ngayGiaoHang = ngayGiaoHang,
      this.tenNguoiNhan = tenNguoiNhan,
      this.sdtNguoiNhan = sdtNguoiNhan,
      this.tenNguoiGui = tenNguoiGui,
      this.sdtNguoiGui = sdtNguoiGui,
      this.tongTien = tongTien,
      this.maKH = maKH,
      this.khachHang = khachHang,
      this.maPTTT = maPTTT,
      this.phuongThucTT = phuongThucTT,
      this.maPTGH = maPTGH,
      this.phuongThucGH = phuongThucGH,
      this.maPTVC = maPTVC,
      this.phuongThucVC = phuongThucVC,
      this.maKM = maKM,
      this.khuyenMai = khuyenMai,
      this.maTX = maTX,
      this.taiXe = taiXe,
      this.maKho = maKho,
      this.kho = kho
  }
}