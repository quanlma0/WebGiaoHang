export class KhuyenMai {
  constructor(public maKM: number, public phanTramKM: number, public moTa: string,
    public ngayApDung: string, public ngayKetThuc: string, public soLuong: number,
    public mucTienApDung: number) {
    this.maKM = maKM
    this.phanTramKM = phanTramKM
    this.moTa = moTa
    this.ngayApDung = ngayApDung
    this.ngayKetThuc = ngayKetThuc
    this.soLuong = soLuong
    this.mucTienApDung = mucTienApDung
  }
}