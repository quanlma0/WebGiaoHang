import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { TaiKhoan } from 'src/app/models/taiKhoan';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private HoTen$ = new BehaviorSubject<string>("");
  private TenCV$ = new BehaviorSubject<string>("");
  private Email$ = new BehaviorSubject<string>("");
  public thongTinTK$ = new ReplaySubject<TaiKhoan>();
  constructor() { }

  public getTenCVFromStore() {
    return this.TenCV$.asObservable();
  }

  public setRoleForStore(tenCV: string) {
    this.TenCV$.next(tenCV);
  }

  public getHoTenFromStore() {
    return this.HoTen$.asObservable();
  }

  public setHoTenFromStore(hoTen: string) {
    this.HoTen$.next(hoTen);
  }

  public getTTTKFromStore() {
    return this.thongTinTK$.asObservable();
  }

  public setTTTKFromStore(tkLuuVaoStore: TaiKhoan) {
    this.thongTinTK$.next(tkLuuVaoStore);
  }

  public getEmailFromStore() {
    return this.Email$.asObservable();
  }

  public setEmailForStore(email: string) {
    this.Email$.next(email);
  }

}
