import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private HoTen$ = new BehaviorSubject<string>("");
  private TenCV$ = new BehaviorSubject<string>("");
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


}
