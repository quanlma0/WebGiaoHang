import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class KHService {
  // khachhang!: []

  readonly APIUrl = "https://localhost:7249/api"
  constructor(private http: HttpClient) { }

  // getAllTaiKhoans(): Observable<User[]> {
  //   return this.http.get<User[]>(this.APIUrl + '/TaiKhoans');
  // }
  addKH(newKH: User): Observable<User> {
    return this.http.post<User>(this.APIUrl + '/KhachHangs', newKH);
  }

}
