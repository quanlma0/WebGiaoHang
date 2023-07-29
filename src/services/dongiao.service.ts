import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DonGiao } from 'src/app/models/donGiao';

@Injectable({
  providedIn: 'root'
})
export class DGService {
  readonly APIUrl = "https://localhost:7249/api"
  constructor(private http: HttpClient) { }

  getAllDonGiaos(): Observable<DonGiao[]> {
    return this.http.get<DonGiao[]>(this.APIUrl + '/DonGiaos');
  }

  addDG(newDonGiao: DonGiao): Observable<DonGiao> {
    return this.http.post<DonGiao>(this.APIUrl + '/DonGiaos', newDonGiao);
  }
}
