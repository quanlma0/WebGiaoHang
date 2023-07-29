import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DeliveryComponent } from './service/delivery/delivery.component';
import { AdminComponent } from './admin/admin.component';
import { QuanlygiaohangComponent } from './admin/quanlygiaohang/quanlygiaohang.component';
import { QlghEditComponent } from './admin/quanlygiaohang/qlgh-edit/qlgh-edit.component';
import { QlghDeleteComponent } from './admin/quanlygiaohang/qlgh-delete/qlgh-delete.component';
import { QuanlydongiaoComponent } from './admin/quanlydongiao/quanlydongiao.component';
import { TaotaikhoannhanvienComponent } from './admin/taotaikhoannhanvien/taotaikhoannhanvien.component';
import { XuatkhoComponent } from './admin/xuatkho/xuatkho.component';
import { NhapkhoComponent } from './admin/nhapkho/nhapkho.component';
import { QuanlytaikhoanComponent } from './admin/quanlytaikhoan/quanlytaikhoan.component';
import { QltkDetailComponent } from './admin/quanlytaikhoan/qltk-detail/qltk-detail.component';
import { TtknvEditComponent } from './admin/taotaikhoannhanvien/ttknv-edit/ttknv-edit.component';
import { TtknvDetailComponent } from './admin/taotaikhoannhanvien/ttknv-detail/ttknv-detail.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthGuard } from './gaurds/auth.guard';
import { GiaongayComponent } from './giaongay/giaongay.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      { path: 'quanlygiaohang', component: QuanlygiaohangComponent },
      { path: 'quanlygiaohang/add', component: QlghEditComponent },
      { path: 'quanlygiaohang/:id/edit', component: QlghEditComponent },
      { path: 'quanlygiaohang/:id/delete', component: QlghDeleteComponent },
      { path: 'quanlydongiao', component: QuanlydongiaoComponent },
      { path: 'quanlytaikhoan', component: QuanlytaikhoanComponent },
      { path: 'quanlytaikhoan/:id/detail', component: QltkDetailComponent },
      { path: 'taotaikhoannhanvien', component: TaotaikhoannhanvienComponent },
      { path: 'taotaikhoannhanvien/add', component: TtknvEditComponent },
      { path: 'taotaikhoannhanvien/:id/detail', component: TtknvDetailComponent },
      { path: 'taotaikhoannhanvien/:id/edit', component: TtknvEditComponent },
      { path: 'nhapkho', component: NhapkhoComponent },
      { path: 'xuatkho', component: XuatkhoComponent },
    ]
  },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'giaongay', canActivate: [AuthGuard], component: GiaongayComponent },


  { path: 'service/delivery', component: DeliveryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
