import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TaiKhoan } from 'src/app/models/taiKhoan';
import { User } from 'src/app/models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStoreService } from './user-store.service';
@Injectable({
  providedIn: 'root'
})
export class USService {
  taikhoans!: TaiKhoan[]
  private userPayload: any;

  readonly APIUrl = "https://localhost:7249/api"
  constructor(private http: HttpClient, private router: Router,
    private usStore: UserStoreService) {
    this.userPayload = this.decodeToken()
  }

  logIn(user: User): Observable<User> {
    return this.http.post<User>(this.APIUrl + '/KhachHangs/authenticate', user)
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(["login"]);
  }


  

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    // console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token);
  }

  getHoTenFromToken() {
    if (this.userPayload)
      return this.userPayload.unique_name
  }

  getTenCVFromToken() {
    if (this.userPayload)
      return this.userPayload.role
  }

  getEmailFromToken() {
    if (this.userPayload)
      return this.userPayload.email
  }






}
