import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaiKhoan } from 'src/app/models/taiKhoan';
import { TKService } from 'src/services/taikhoan.service';

@Component({
  selector: 'app-qltk-list',
  templateUrl: './qltk-list.component.html',
  styleUrls: ['./qltk-list.component.css']
})
export class QltkListComponent implements OnInit {
  processing = false;

  taikhoans!: TaiKhoan[]
  constructor(private tkService: TKService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.tkService.getAllTaiKhoans().subscribe({
      next: (listData) => {
        this.taikhoans = listData

        this.tkService.taikhoans = listData
        this.processing = true
        console.log(this.taikhoans)
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
}
