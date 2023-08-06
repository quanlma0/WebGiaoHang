import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DonGiao } from 'src/app/models/donGiao';
import { KhachHang } from 'src/app/models/khachHang';
import { DGService } from 'src/services/dongiao.service';
import { KHService } from 'src/services/khachhang.service';

@Component({
  selector: 'app-nk-list',
  templateUrl: './nk-list.component.html',
  styleUrls: ['./nk-list.component.css']
})
export class NkListComponent {
  processing = false;
  dongiao!: DonGiao[]
  dongiao_chon: DonGiao[] = []
  //Khởi tạo giá trị rỗng cho mảng
  khacHangs!: KhachHang[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dgService: DGService,
    private khService: KHService
  ) { }
  ngOnInit(): void {
    this.processing = true
    this.dgService.getAllDonGiaos().subscribe({
      next: (listData) => {
        this.dongiao = listData
        this.dongiao.forEach(element => {
          if(element.trangThaiDG === "Chờ Xác Nhận"){
            this.dongiao_chon.push(element)
          }
        });
        this.khService.getAllKHs().subscribe({
          next: (listKH) => {
            this.khacHangs = listKH
            this.processing = false
          }
        })
      },
      error: (err) => {
        console.log(err)
        this.processing = false
      }
    });
  }

  getEmailKh(maKH: number) {
    const KhachHang = this.khacHangs?.find(kh => kh.maKH === maKH)
    return KhachHang?.email
  }
  onNhapKho(id: number) {
    this.router.navigate([id, 'add'], { relativeTo: this.route });
  }
}
