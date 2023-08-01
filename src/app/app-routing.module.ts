import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { QuanlygiaohangComponent } from './admin/quanlygiaohang/quanlygiaohang.component';
import { QlghEditComponent } from './admin/quanlygiaohang/qlgh-edit/qlgh-edit.component';
import { QlghDeleteComponent } from './admin/quanlygiaohang/qlgh-delete/qlgh-delete.component';
import { QuanlydongiaoComponent } from './admin/quanlydongiao/quanlydongiao.component';
import { TaotaikhoannhanvienComponent } from './admin/taotaikhoannhanvien/taotaikhoannhanvien.component';
import { XuatkhoComponent } from './admin/xuatkho/xuatkho.component';
import { NhapkhoComponent } from './admin/nhapkho/nhapkho.component';
import { TtknvEditComponent } from './admin/taotaikhoannhanvien/ttknv-edit/ttknv-edit.component';
import { TtknvDetailComponent } from './admin/taotaikhoannhanvien/ttknv-detail/ttknv-detail.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthGuard } from './gaurds/auth.guard';
import { GiaongayComponent } from './giaongay/giaongay.component';
import { HomeStartComponent } from './home/home-start/home-start.component';
import { DangkyTaixeComponent } from './home/dangky-taixe/dangky-taixe.component';
import { CamnangtaixeComponent } from './home/camnangtaixe/camnangtaixe.component';
import { TrungtamhotroTaixeComponent } from './home/trungtamhotro-taixe/trungtamhotro-taixe.component';
import { DangkyKhachhangComponent } from './home/dangky-khachhang/dangky-khachhang.component';
import { TrungtamhotroKhachhangComponent } from './home/trungtamhotro-khachhang/trungtamhotro-khachhang.component';
import { GiaohangngayComponent } from './home/giaohangngay/giaohangngay.component';
import { DichvuxetaiComponent } from './home/dichvuxetai/dichvuxetai.component';
import { DatgiaohangComponent } from './home/datgiaohang/datgiaohang.component';
import { VechungtoiComponent } from './home/vechungtoi/vechungtoi.component';
import { RegisterTaixeComponent } from './user/register-taixe/register-taixe.component';
import { khachhangGuard } from './gaurds/khachhang.guard';
import { DsKhachhangComponent } from './admin/ds-khachhang/ds-khachhang.component';
import { DskhDetailComponent } from './admin/ds-khachhang/dskh-detail/dskh-detail.component';
import { QldgEditComponent } from './admin/quanlydongiao/qldg-edit/qldg-edit.component';
import { QldgDetailComponent } from './admin/quanlydongiao/qldg-detail/qldg-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      { path: 'quanlydongiao', component: QuanlydongiaoComponent },
      { path: 'quanlydongiao/:id/detail', component: QldgDetailComponent },
      { path: 'quanlydongiao/:id/edit', component: QldgEditComponent },

      { path: 'ds-khachhang', component: DsKhachhangComponent },
      { path: 'ds-khachhang/:id/detail', component: DskhDetailComponent },

      { path: 'taotaikhoannhanvien', component: TaotaikhoannhanvienComponent },
      { path: 'taotaikhoannhanvien/add', component: TtknvEditComponent },
      { path: 'taotaikhoannhanvien/:id/detail', component: TtknvDetailComponent },
      { path: 'taotaikhoannhanvien/:id/edit', component: TtknvEditComponent },

      { path: 'nhapkho', component: NhapkhoComponent },
      { path: 'xuatkho', component: XuatkhoComponent },
    ]
  },
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', component: HomeStartComponent },
      { path: 'dangky-taixe', component: DangkyTaixeComponent },
      { path: 'camnangtaixe', component: CamnangtaixeComponent },
      { path: 'trungtamhotro-taixe', component: TrungtamhotroTaixeComponent },
      { path: 'dangky-khachhang', component: DangkyKhachhangComponent },
      { path: 'trungtamhotro-khachhang', component: TrungtamhotroKhachhangComponent },
      { path: 'giaohangngay', component: GiaohangngayComponent },
      { path: 'dichvuxetai', component: DichvuxetaiComponent },
      { path: 'datgiaohang', component: DatgiaohangComponent },
      { path: 'vechungtoi', component: VechungtoiComponent },

    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-taixe', component: RegisterTaixeComponent },
  { path: 'giaongay', canActivate: [khachhangGuard], component: GiaongayComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
