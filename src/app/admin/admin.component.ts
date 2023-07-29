import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/services/user-store.service';
import { USService } from 'src/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css',
  ]
})
export class AdminComponent implements OnInit {
  hoTen = "";
  tenCV = ""
  constructor(private usService: USService,
    private usStore: UserStoreService) { }

  ngOnInit(): void {
    this.usStore.getHoTenFromStore()
      .subscribe((value: string) => {
        let hoTenFromToken = this.usService.getHoTenFromToken();
        this.hoTen = value || hoTenFromToken
      })

    this.usStore.getTenCVFromStore()
      .subscribe((value) => {
        let tenCVFromToken = this.usService.getTenCVFromToken();
        this.tenCV = value || tenCVFromToken
      })
  }

  logOut() {
    this.usService.logOut();
  }
}
