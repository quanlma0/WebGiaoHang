import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DeliveryComponent } from './service/delivery/delivery.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { QuanlyphuongthucvanchuyenComponent } from './admin/quanlyphuongthucvanchuyen/quanlyphuongthucvanchuyen.component';
import { QuanlygiaohangComponent } from './admin/quanlygiaohang/quanlygiaohang.component';
import { QuanlythanhtoanComponent } from './admin/quanlythanhtoan/quanlythanhtoan.component';
import { QlghEditComponent } from './admin/quanlygiaohang/qlgh-edit/qlgh-edit.component';
import { QlghDeleteComponent } from './admin/quanlygiaohang/qlgh-delete/qlgh-delete.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'quanlygiaohang', component: QuanlygiaohangComponent },
      { path: 'quanlygiaohang/add', component: QlghEditComponent },
      { path: 'quanlygiaohang/:id/edit', component: QlghEditComponent },
      { path: 'quanlygiaohang/:id/delete', component: QlghDeleteComponent },
      { path: 'quanlyphuongthucvanchuyen', component: QuanlyphuongthucvanchuyenComponent },
      { path: 'quanlythanhtoan', component: QuanlythanhtoanComponent },

    ]
  },

  { path: 'service/delivery', component: DeliveryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
