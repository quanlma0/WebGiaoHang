import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-danhsachdongiao',
  templateUrl: './danhsachdongiao.component.html',
  styleUrls: ['./danhsachdongiao.component.css']
})
export class DanhsachdongiaoComponent implements OnInit {
  id!: number
  constructor(private router: Router) { }
  ngOnInit(): void {

  }
}
