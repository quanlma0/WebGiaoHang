import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kho } from 'src/app/models/kho';
import { PhieuXuatNhap } from 'src/app/models/phieuXuatNhap';
import { KhoService } from 'src/services/kho.service';
import { PTService } from 'src/services/phuongthuc.service';

@Component({
  selector: 'app-xk-list',
  templateUrl: './xk-list.component.html',
  styleUrls: ['./xk-list.component.css']
})
export class XkListComponent implements OnInit {
  processing = false;
  khoes!: Kho[]
  phieuXuatNhap!: PhieuXuatNhap[]
  phieuXuatNhap_chon: PhieuXuatNhap[] = []

  @ViewChild('khoChon')
  khoChon!: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private khoService: KhoService,
    private ptService: PTService) { }
  ngOnInit(): void {
    this.processing = true;
    this.khoService.getAllKho().subscribe({
      next: (value) => {
        this.khoes = value

        this.ptService.getAllPhieuXN().subscribe({
          next: (listData) => {
            this.phieuXuatNhap = listData
            const maKho_chon = this.khoChon.nativeElement.value;
            this.phieuXuatNhap.forEach(element => {
              if (element.maKho == maKho_chon && element.laPhieuXuat == 0) {
                this.phieuXuatNhap_chon.push(element)
              }
            });
            this.processing = false
          },
          error: (err) => {
            console.log(err)
            this.processing = false
          }
        });
      },
      error: (err) => {
        alert(err)
      }
    })

  }

  onKhoSelectChange() {
    this.phieuXuatNhap_chon = []
    const maKho_chon = this.khoChon.nativeElement.value;
    this.phieuXuatNhap.forEach(element => {
      console.log(element.laPhieuXuat)
      if (element.maKho == maKho_chon && element.laPhieuXuat == 0) {
        this.phieuXuatNhap_chon.push(element)
      }
    });
  }
  onXuatKho(id: number) {
    this.router.navigate([id, 'add'], { relativeTo: this.route });
  }
}
