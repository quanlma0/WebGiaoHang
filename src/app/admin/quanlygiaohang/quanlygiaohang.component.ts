import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaiHangGiao } from 'src/app/models/loaiHangGiao';
import { LHGService } from 'src/services/loaihanggiao.service';

@Component({
  selector: 'app-quanlygiaohang',
  templateUrl: './quanlygiaohang.component.html',
  styleUrls: ['./quanlygiaohang.component.css']
})
export class QuanlygiaohangComponent implements OnInit {
  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  addLoaiGiaoHang() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
