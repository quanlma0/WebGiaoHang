import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoaiHangGiao } from "src/app/models/loaiHangGiao";

@Injectable({
  providedIn: 'root'
})
export class LHGService {
  readonly APIUrl = "https://localhost:7249/api"
  constructor(private http: HttpClient) { }
  getAllLoaiHangGiaos(): Observable<LoaiHangGiao[]> {
    return this.http.get<LoaiHangGiao[]>(this.APIUrl + '/loaihanggiao');
  }
  loaigiaohangs!: LoaiHangGiao[]

  addLHG(newLHG: LoaiHangGiao): Observable<LoaiHangGiao> {
    return this.http.post<LoaiHangGiao>(this.APIUrl + '/loaihanggiao', newLHG);
  }

  getLHG(id: number): Observable<LoaiHangGiao> {
    return this.http.get<LoaiHangGiao>(this.APIUrl + '/loaihanggiao/' + id)
  }

  updateLHG(id: number, lghupdate: LoaiHangGiao): Observable<LoaiHangGiao> {
    return this.http.put<LoaiHangGiao>(this.APIUrl + '/loaihanggiao/' + id, lghupdate)
  }

  deleteLHG(id: number): Observable<LoaiHangGiao> {
    return this.http.delete<LoaiHangGiao>(this.APIUrl + '/loaihanggiao/' + id)
  }
}