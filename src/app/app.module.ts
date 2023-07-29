import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveryComponent } from './service/delivery/delivery.component';
import { LHGService } from 'src/services/loaihanggiao.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuanlygiaohangComponent } from './admin/quanlygiaohang/quanlygiaohang.component';
import { QlghListComponent } from './admin/quanlygiaohang/qlgh-list/qlgh-list.component';
import { QlghEditComponent } from './admin/quanlygiaohang/qlgh-edit/qlgh-edit.component';
import { QlghDeleteComponent } from './admin/quanlygiaohang/qlgh-delete/qlgh-delete.component';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaotaikhoannhanvienComponent } from './admin/taotaikhoannhanvien/taotaikhoannhanvien.component';
import { NhapkhoComponent } from './admin/nhapkho/nhapkho.component';
import { XuatkhoComponent } from './admin/xuatkho/xuatkho.component';
import { QuanlytaikhoanComponent } from './admin/quanlytaikhoan/quanlytaikhoan.component';
import { TtknvEditComponent } from './admin/taotaikhoannhanvien/ttknv-edit/ttknv-edit.component';
import { QltkListComponent } from './admin/quanlytaikhoan/qltk-list/qltk-list.component';
import { QltkDetailComponent } from './admin/quanlytaikhoan/qltk-detail/qltk-detail.component';
import { TtknvListComponent } from './admin/taotaikhoannhanvien/ttknv-list/ttknv-list.component';
import { TtknvDetailComponent } from './admin/taotaikhoannhanvien/ttknv-detail/ttknv-detail.component';
import { LoginComponent } from './user/login/login.component';
import { DGService } from 'src/services/dongiao.service';
import { TKService } from 'src/services/taikhoan.service';
import { USService } from 'src/services/user.service';
import { RegisterComponent } from './user/register/register.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { GiaongayComponent } from './giaongay/giaongay.component';
import { KHService } from 'src/services/khachhang.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    DeliveryComponent,
    QuanlygiaohangComponent,
    QlghListComponent,
    QlghEditComponent,
    QlghDeleteComponent,
    TaotaikhoannhanvienComponent,
    NhapkhoComponent,
    XuatkhoComponent,
    QuanlytaikhoanComponent,
    QltkListComponent,
    TtknvEditComponent,
    QltkDetailComponent,
    TtknvListComponent,
    TtknvDetailComponent,
    LoginComponent,
    RegisterComponent,
    GiaongayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [DGService, TKService, USService, KHService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
