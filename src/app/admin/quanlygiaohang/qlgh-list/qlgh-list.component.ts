import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaiHangGiao } from 'src/app/models/loaiHangGiao';
import { LHGService } from 'src/services/loaihanggiao.service';

@Component({
  selector: 'app-qlgh-list',
  templateUrl: './qlgh-list.component.html',
  styleUrls: ['./qlgh-list.component.css']
})
export class QlghListComponent implements OnInit {
  loaiGiaoHangs!: LoaiHangGiao[]
  constructor(private lghService: LHGService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.lghService.getAllLoaiHangGiaos().subscribe({
      next: (listData) => {
        this.loaiGiaoHangs = listData

        this.lghService.loaigiaohangs = listData
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  onEdit(id: number) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  onDelete(id: number) {
    this.router.navigate([id, 'delete'], { relativeTo: this.route });
  }
}
