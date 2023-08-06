import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nhapkho',
  templateUrl: './nhapkho.component.html',
  styleUrls: ['./nhapkho.component.css']
})
export class NhapkhoComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {

  }
}
