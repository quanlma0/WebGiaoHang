import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChucVu } from 'src/app/models/chucVu';

@Injectable({
  providedIn: 'root'
})
export class ChucvuService {

  readonly APIUrl = "https://localhost:7249/api"
  constructor(private http: HttpClient) { }


  getAllChucVu(): Observable<ChucVu[]> {
    return this.http.get<ChucVu[]>(this.APIUrl + '/ChucVus');
  }
}
