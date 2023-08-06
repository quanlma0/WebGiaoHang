import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KhachHang } from 'src/app/models/khachHang';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class KHService {
  readonly APIUrl = "https://localhost:7249/api"
  constructor(private http: HttpClient) { }

  addKH(newKH: User): Observable<User> {
    return this.http.post<User>(this.APIUrl + '/KhachHangs', newKH);
  }

  getKHFromEmail(email: string): Observable<KhachHang> {
    return this.http.get<KhachHang>(this.APIUrl + '/KhachHangs/GetEmail/' + email);
  }

  getAllKHs(): Observable<KhachHang[]> {
    return this.http.get<KhachHang[]>(this.APIUrl + '/KhachHangs/');
  }
}
