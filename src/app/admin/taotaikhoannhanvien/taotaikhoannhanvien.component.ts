import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-taotaikhoannhanvien',
  templateUrl: './taotaikhoannhanvien.component.html',
  styleUrls: ['./taotaikhoannhanvien.component.css']
})
export class TaotaikhoannhanvienComponent implements OnInit {
  constructor(private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {

  }

  addTKNhanVien() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
