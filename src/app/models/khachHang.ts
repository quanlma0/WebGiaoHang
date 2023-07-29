import { TaiKhoan } from "./taiKhoan"

export class KhachHang {
  constructor(public maKH: number, public email: string, public matKhau: string,
    public taiKhoan: TaiKhoan) {
    this.maKH = maKH
    this.email = email
    this.matKhau = matKhau
    this.taiKhoan = taiKhoan
  }
}