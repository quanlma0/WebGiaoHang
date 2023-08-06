import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kho } from 'src/app/models/kho';

@Injectable({
  providedIn: 'root'
})
export class KhoService {

  readonly APIUrl = "https://localhost:7249/api"
  constructor(private http: HttpClient) { }


  getAllKho(): Observable<Kho[]> {
    return this.http.get<Kho[]>(this.APIUrl + '/Khoes');
  }
}
