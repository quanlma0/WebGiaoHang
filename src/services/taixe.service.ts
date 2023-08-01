import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaiXe } from 'src/app/models/taiXe';

@Injectable({
  providedIn: 'root'
})
export class TXService {

  readonly APIUrl = "https://localhost:7249/api"
  constructor(private http: HttpClient) { }

  addTX(newTX: TaiXe): Observable<TaiXe> {
    return this.http.post<TaiXe>(this.APIUrl + '/TaiXes', newTX);
  }

  logIn(taixe: TaiXe): Observable<TaiXe> {
    return this.http.post<TaiXe>(this.APIUrl + '/TaiXes/authenticate', taixe)
  }

}
