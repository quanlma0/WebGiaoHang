import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../gaurds/auth.guard';
import { USService } from 'src/services/user.service';
import { UserStoreService } from 'src/services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  IsLogin = false;
  hoTen = "";
  tenCV = ""

  constructor(private usService: USService,
    private usStore: UserStoreService) { }

  ngOnInit(): void {
    this.IsLogin = this.usService.isLoggedIn()

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
