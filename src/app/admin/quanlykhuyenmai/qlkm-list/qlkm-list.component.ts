import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KhuyenMai } from 'src/app/models/khuyenMai';
import { TaiKhoan } from 'src/app/models/taiKhoan';
import { PTService } from 'src/services/phuongthuc.service';

@Component({
  selector: 'app-qlkm-list',
  templateUrl: './qlkm-list.component.html',
  styleUrls: ['./qlkm-list.component.css']
})
export class QlkmListComponent implements OnInit{
  processing = false;

  km!: KhuyenMai[]
  constructor(private ptService: PTService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.processing = true;

    this.ptService.getAllKM().subscribe({
      next: (listData) => {
        this.km = listData
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
  onEdit(id: number) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }
  onDelete(id: number){
    this.router.navigate([id, 'delete'], { relativeTo: this.route });
  }
}
