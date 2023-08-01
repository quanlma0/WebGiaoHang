import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TtknvEditComponent } from './admin/taotaikhoannhanvien/ttknv-edit/ttknv-edit.component';
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
import { HomeStartComponent } from './home/home-start/home-start.component';
import { DangkyTaixeComponent } from './home/dangky-taixe/dangky-taixe.component';
import { DangkyKhachhangComponent } from './home/dangky-khachhang/dangky-khachhang.component';
import { GiaohangngayComponent } from './home/giaohangngay/giaohangngay.component';
import { DichvuxetaiComponent } from './home/dichvuxetai/dichvuxetai.component';
import { DatgiaohangComponent } from './home/datgiaohang/datgiaohang.component';
import { VechungtoiComponent } from './home/vechungtoi/vechungtoi.component';
import { TrungtamhotroKhachhangComponent } from './home/trungtamhotro-khachhang/trungtamhotro-khachhang.component';
import { TrungtamhotroTaixeComponent } from './home/trungtamhotro-taixe/trungtamhotro-taixe.component';
import { CamnangtaixeComponent } from './home/camnangtaixe/camnangtaixe.component';
import { RegisterTaixeComponent } from './user/register-taixe/register-taixe.component';
import { DsKhachhangComponent } from './admin/ds-khachhang/ds-khachhang.component';
import { DskhListComponent } from './admin/ds-khachhang/dskh-list/dskh-list.component';
import { DskhDetailComponent } from './admin/ds-khachhang/dskh-detail/dskh-detail.component';
import { QldgEditComponent } from './admin/quanlydongiao/qldg-edit/qldg-edit.component';
import { QldgDetailComponent } from './admin/quanlydongiao/qldg-detail/qldg-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    QuanlygiaohangComponent,
    QlghListComponent,
    QlghEditComponent,
    QlghDeleteComponent,
    TaotaikhoannhanvienComponent,
    NhapkhoComponent,
    XuatkhoComponent,
    TtknvEditComponent,
    TtknvListComponent,
    TtknvDetailComponent,
    LoginComponent,
    RegisterComponent,
    GiaongayComponent,
    HomeStartComponent,
    DangkyTaixeComponent,
    DangkyKhachhangComponent,
    GiaohangngayComponent,
    DichvuxetaiComponent,
    DatgiaohangComponent,
    VechungtoiComponent,
    TrungtamhotroKhachhangComponent,
    TrungtamhotroTaixeComponent,
    CamnangtaixeComponent,
    RegisterTaixeComponent,
    DsKhachhangComponent,
    DskhListComponent,
    DskhDetailComponent,
    QldgEditComponent,
    QldgDetailComponent,
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
