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
    this.processing = true;

    this.tkService.getAllTaiKhoans().subscribe({
      next: (listData) => {
        this.taikhoans = listData

        this.taikhoans.forEach(x => {
          if (x.maCV !== 2) {
            this.taikhoannvs.push(x);
          }
        });
        this.processing = false
      },
      error: (err) => {
        console.log(err)
        this.processing = false
        console.log("XXXXXXXX")
        console.log(!this.taikhoannvs)
      }
    });

  }

  onViewDetail(id: number) {
    this.router.navigate([id, 'detail'], { relativeTo: this.route });
  }
  onEdit(id: number) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }
  onDelete(id: number){
    this.router.navigate([id, 'delete'], { relativeTo: this.route });
  }
}
