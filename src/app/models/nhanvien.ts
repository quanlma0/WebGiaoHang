import { Kho } from "./kho"
import { TaiKhoan } from "./taiKhoan"

export class NhanVien {
  constructor(public maNV: number, public email: string, public matKhau: string,
    public maTK: number, public taiKhoan: TaiKhoan, public maKho?: number, public kho?: Kho) {
    this.maNV = maNV
    this.email = email
    this.matKhau = matKhau
    this.maTK = maTK
    this.taiKhoan = taiKhoan
    this.maKho = maKho
    this.kho = kho
  }
}