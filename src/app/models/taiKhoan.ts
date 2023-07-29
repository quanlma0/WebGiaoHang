export class TaiKhoan {
  constructor(public maTK: number, public email: string, public matKhau: string
    , public sdt: string, public gioiTinh: string, public diaChi: string
    , public ngaySinh: string, public hoTen: string, public trangThaiTK: string, public tenCV: string, public token: string) {
    this.maTK = maTK,
      this.email = email,
      this.matKhau = matKhau,
      this.sdt = sdt,
      this.gioiTinh = gioiTinh,
      this.diaChi = diaChi,
      this.ngaySinh = ngaySinh,
      this.hoTen = hoTen,
      this.trangThaiTK = trangThaiTK,
      this.tenCV = tenCV,
      this.token = token
  }
}