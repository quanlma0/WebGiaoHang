import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaiKhoan } from 'src/app/models/taiKhoan';
import { TKService } from 'src/services/taikhoan.service';

@Component({
  selector: 'app-ttknv-list',
  templateUrl: './ttknv-list.component.html',
  styleUrls: ['./ttknv-list.component.css']
})
export class TtknvListComponent implements OnInit {
  processing = false;

  taikhoans!: TaiKhoan[]
  taikhoannvs: TaiKhoan[] = []
  constructor(private tkService: TKService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.tkService.getAllTaiKhoans().subscribe({
      next: (listData) => {
        this.taikhoans = listData

        this.taikhoans.forEach(x => {
          if (x.tenCV !== 'KhachHang') {
            this.taikhoannvs.push(x);
          }
        });
        this.tkService.taikhoans = listData
        this.processing = true
      },
      error: (err) => {
        console.log(err)
        this.processing = true
      }
    });
  }

  onViewDetail(id: number) {
    this.router.navigate([id, 'detail'], { relativeTo: this.route });
  }
  onEdit(id: number) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }
}
