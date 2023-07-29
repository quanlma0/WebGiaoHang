import { TaiKhoan } from "./taiKhoan"

export class User {
  constructor(public ma: number, public email: string, public matKhau: string,
    public token: string, public taiKhoan: TaiKhoan) {
    this.ma = ma
    this.email = email
    this.matKhau = matKhau
    this.token = token
    this.taiKhoan = taiKhoan
  }
}