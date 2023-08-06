import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NhanVien } from 'src/app/models/nhanvien';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class NVService {
  readonly APIUrl = "https://localhost:7249/api"
  constructor(private http: HttpClient) { }

  getTKNV(id: number): Observable<NhanVien> {
    return this.http.get<NhanVien>(this.APIUrl + '/NhanViens/' + id)
  }
  addTKNV(newNV: NhanVien): Observable<NhanVien> {
    return this.http.post<NhanVien>(this.APIUrl + '/NhanViens', newNV);
  }
  deleteTKNV(id: number): Observable<NhanVien> {
    return this.http.delete<NhanVien>(this.APIUrl + '/NhanViens/' + id)
  }
}
