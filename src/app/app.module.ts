import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { DeliveryComponent } from './service/delivery/delivery.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LHGService } from 'src/services/loaihanggiao.service';
import { HttpClientModule } from '@angular/common/http';
import { QuanlygiaohangComponent } from './admin/quanlygiaohang/quanlygiaohang.component';
import { QuanlyphuongthucvanchuyenComponent } from './admin/quanlyphuongthucvanchuyen/quanlyphuongthucvanchuyen.component';
import { QuanlythanhtoanComponent } from './admin/quanlythanhtoan/quanlythanhtoan.component';
import { QlghListComponent } from './admin/quanlygiaohang/qlgh-list/qlgh-list.component';
import { QlghEditComponent } from './admin/quanlygiaohang/qlgh-edit/qlgh-edit.component';
import { QlghDeleteComponent } from './admin/quanlygiaohang/qlgh-delete/qlgh-delete.component';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    DeliveryComponent,
    DashboardComponent,
    QuanlygiaohangComponent,
    QuanlyphuongthucvanchuyenComponent,
    QuanlythanhtoanComponent,
    QlghListComponent,
    QlghEditComponent,
    QlghDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [LHGService],
  bootstrap: [AppComponent]
})
export class AppModule { }
