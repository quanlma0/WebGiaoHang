import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhuongThucGH } from 'src/app/models/PhuongThucGH';
import { PhuongThucTT } from 'src/app/models/PhuongThucTT';
import { PhuongThucVC } from 'src/app/models/PhuongThucVC';
import { KhuyenMai } from 'src/app/models/khuyenMain';

@Injectable({
  providedIn: 'root'
})
export class PTService {
  readonly APIUrl = "https://localhost:7249/api"
  constructor(private http: HttpClient) { }

  getAllKM(): Observable<KhuyenMai[]> {
    return this.http.get<KhuyenMai[]>(this.APIUrl + '/KhuyenMais');
  }
  getKM(id: number): Observable<KhuyenMai> {
    return this.http.get<KhuyenMai>(this.APIUrl + '/KhuyenMais/' + id)
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
