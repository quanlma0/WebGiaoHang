import { PhuongThucVC } from "./PhuongThucVC"
import { TaiKhoan } from "./taiKhoan"

export class TaiXe {
  constructor(public maTX: number, public maBangLai: string, public tenPhuongTien: string,
    public email: string, public matKhau: string, public taiKhoan: TaiKhoan,
    public maPTVC: number, public phuongThucVC: PhuongThucVC, public token: string,
    public SLHD?: number) {
    this.maTX = maTX
    this.maBangLai = maBangLai
    this.maPTVC = this.maPTVC
    this.tenPhuongTien = tenPhuongTien
    this.email = email
    this.matKhau = matKhau
    this.phuongThucVC = phuongThucVC
    this.token = token
    this.SLHD = this.SLHD
  }
}