import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaiKhoan } from 'src/app/models/taiKhoan';
import { TKService } from 'src/services/taikhoan.service';

@Component({
  selector: 'app-dskh-list',
  templateUrl: './dskh-list.component.html',
  styleUrls: ['./dskh-list.component.css']
})
export class DskhListComponent implements OnInit {
  processing = false;
  taikhoans!: TaiKhoan[]
  //Khởi tạo giá trị rỗng cho mảng
  taikhoan_kh: TaiKhoan[] = []

  constructor(private tkService: TKService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.tkService.getAllTaiKhoans().subscribe({
      next: (listData) => {
        this.taikhoans = listData

        this.taikhoans.forEach(x => {
          if (x.maCV === 2) {
            this.taikhoan_kh.push(x);
          }
        });
        this.processing = false
      },
      error: (err) => {
        console.log(err)
        this.processing = false
      }
    });
  }

  onViewDetail(id: number) {
    this.router.navigate([id, 'detail'], { relativeTo: this.route });
  }
}
