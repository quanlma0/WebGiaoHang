import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quanlykhuyenmai',
  templateUrl: './quanlykhuyenmai.component.html',
  styleUrls: ['./quanlykhuyenmai.component.css']
})
export class QuanlykhuyenmaiComponent implements OnInit {
  constructor(private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {

  }

  addKM() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
