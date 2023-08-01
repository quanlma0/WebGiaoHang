import { ChucVu } from "./chucVu";

export class TaiKhoan {
  constructor(public maTK: number, public email: string, public matKhau: string
    , public sdt: string, public gioiTinh: string, public diaChi: string
    , public ngaySinh: string, public hoTen: string, public trangThaiTK: string, public maCV: number, public chucvu: ChucVu
    , public token: string) {
    this.maTK = maTK,
      this.email = email,
      this.matKhau = matKhau,
      this.sdt = sdt,
      this.gioiTinh = gioiTinh,
      this.diaChi = diaChi,
      this.ngaySinh = ngaySinh,
      this.hoTen = hoTen,
      this.trangThaiTK = trangThaiTK,
      this.maCV = maCV,
      this.token = token
  }
}