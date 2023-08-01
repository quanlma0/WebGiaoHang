import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaiKhoan } from 'src/app/models/taiKhoan';

@Injectable({
  providedIn: 'root'
})
export class TKService {
  readonly APIUrl = "https://localhost:7249/api"
  constructor(private http: HttpClient) { }

  getTKFromEmail(email: string): Observable<TaiKhoan> {
    return this.http.get<TaiKhoan>(this.APIUrl + '/TaiKhoans/GetEmail/' + email)
  }

  getAllTaiKhoans(): Observable<TaiKhoan[]> {
    return this.http.get<TaiKhoan[]>(this.APIUrl + '/TaiKhoans');
  }
  addTK(newTK: TaiKhoan): Observable<TaiKhoan> {
    return this.http.post<TaiKhoan>(this.APIUrl + '/TaiKhoans', newTK);
  }

  getTK(id: number): Observable<TaiKhoan> {
    return this.http.get<TaiKhoan>(this.APIUrl + '/TaiKhoans/' + id)
  }

  updateTK(id: number, tkUpdate: TaiKhoan): Observable<TaiKhoan> {
    return this.http.put<TaiKhoan>(this.APIUrl + '/TaiKhoans/' + id, tkUpdate)
  }

  deleteTK(id: number): Observable<TaiKhoan> {
    return this.http.delete<TaiKhoan>(this.APIUrl + '/TaiKhoans/' + id)
  }
}
