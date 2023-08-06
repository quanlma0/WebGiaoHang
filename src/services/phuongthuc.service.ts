import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhuongThucGH } from 'src/app/models/PhuongThucGH';
import { PhuongThucTT } from 'src/app/models/PhuongThucTT';
import { PhuongThucVC } from 'src/app/models/PhuongThucVC';
import { KhuyenMai } from 'src/app/models/khuyenMai';
import { PhieuXuatNhap } from 'src/app/models/phieuXuatNhap';

@Injectable({
  providedIn: 'root'
})
export class PTService {
  readonly APIUrl = "https://localhost:7249/api"
  constructor(private http: HttpClient) { }

  addPhieuXN(phieuMoi: PhieuXuatNhap): Observable<PhieuXuatNhap> {
    return this.http.post<PhieuXuatNhap>(this.APIUrl + '/PhieuXuatNhaps', phieuMoi)
  }
  getPhieuXN(id: number): Observable<PhieuXuatNhap> {
    return this.http.get<PhieuXuatNhap>(this.APIUrl + '/PhieuXuatNhaps/' + id);
  }
  getAllPhieuXN(): Observable<PhieuXuatNhap[]> {
    return this.http.get<PhieuXuatNhap[]>(this.APIUrl + '/PhieuXuatNhaps');
  }
  updatePXN(id: number, phieuXNMoi: PhieuXuatNhap): Observable<PhieuXuatNhap> {
    return this.http.put<PhieuXuatNhap>(this.APIUrl + '/PhieuXuatNhaps/' + id, phieuXNMoi)
  }

  getAllKM(): Observable<KhuyenMai[]> {
    return this.http.get<KhuyenMai[]>(this.APIUrl + '/KhuyenMais');
  }
  getKM(id: number): Observable<KhuyenMai> {
    return this.http.get<KhuyenMai>(this.APIUrl + '/KhuyenMais/' + id)
  }
  addKM(kmMoi: KhuyenMai): Observable<KhuyenMai> {
    return this.http.post<KhuyenMai>(this.APIUrl + '/KhuyenMais', kmMoi)
  }
  deleteKM(id: number): Observable<KhuyenMai> {
    return this.http.delete<KhuyenMai>(this.APIUrl + '/KhuyenMais/' + id)
  }
  updateKM(id: number, kmMoi: KhuyenMai): Observable<KhuyenMai> {
    return this.http.put<KhuyenMai>(this.APIUrl + '/KhuyenMais/' + id, kmMoi)
  }


  getAllPTGH(): Observable<PhuongThucGH[]> {
    return this.http.get<PhuongThucGH[]>(this.APIUrl + '/PhuongThucGHs');
  }
  getPTGH(id: number): Observable<PhuongThucGH> {
    return this.http.get<PhuongThucGH>(this.APIUrl + '/PhuongThucGHs/' + id)
  }


  getAllPTTT(): Observable<PhuongThucTT[]> {
    return this.http.get<PhuongThucTT[]>(this.APIUrl + '/PhuongThucTTs');
  }
  getPTTT(id: number): Observable<PhuongThucTT> {
    return this.http.get<PhuongThucTT>(this.APIUrl + '/PhuongThucTTs/' + id)
  }


  getAllPTVC(): Observable<PhuongThucVC[]> {
    return this.http.get<PhuongThucVC[]>(this.APIUrl + '/PhuongThucVCs');
  }
  getPTVC(id: number): Observable<PhuongThucVC> {
    return this.http.get<PhuongThucVC>(this.APIUrl + '/PhuongThucVCs/' + id)
  }
}
