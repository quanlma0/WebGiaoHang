import { PhuongThucVC } from "./PhuongThucVC"
import { TaiKhoan } from "./taiKhoan"

export class TaiXe {
  constructor(public maTX: number, public maBangLai: string, public tenPhuongTien: string,
    public email: string, public matKhau: string, public taiKhoan: TaiKhoan,
    public ptvc: PhuongThucVC, public token: string,) {
    this.maTX = maTX
    this.maBangLai = maBangLai
    this.tenPhuongTien = tenPhuongTien
    this.email = email
    this.matKhau = matKhau
    this.ptvc = ptvc
    this.token = token
  }
}