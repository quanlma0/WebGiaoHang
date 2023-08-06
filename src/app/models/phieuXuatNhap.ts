import { DonGiao } from "./donGiao"
import { Kho } from "./kho"

export class PhieuXuatNhap {
  constructor(public maPhieu: number, public ngayTao: string, public laPhieuXuat: number,
    public maDG: number, public donGiao: DonGiao, public maKho: number, public kho: Kho) {
    this.maPhieu = maPhieu
    this.ngayTao = ngayTao
    this.laPhieuXuat = laPhieuXuat
    this.maDG = maDG
    this.donGiao = donGiao
    this.maKho = maKho
    this.kho = kho
  }
}