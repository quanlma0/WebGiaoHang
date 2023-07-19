import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaiHangGiao } from 'src/app/models/loaiHangGiao';
import { LHGService } from 'src/services/loaihanggiao.service';

@Component({
  selector: 'app-qlgh-edit',
  templateUrl: './qlgh-edit.component.html',
  styleUrls: ['./qlgh-edit.component.css']
})
export class QlghEditComponent implements OnInit {
  id!: number;
  editMode = false;
  loaiHangGiao!: LoaiHangGiao;
  @ViewChild('f')
  form!: NgForm;

  constructor(private route: ActivatedRoute,
    private lghService: LHGService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null
      });

    if (this.id) {
      //call API
      this.lghService.getLHG(this.id).subscribe({
        next: (response) => {
          this.loaiHangGiao = response;
          this.form.setValue({
            tenLHG: this.loaiHangGiao.tenLHG
          })
        },
        error(err) {
          console.log(err)
        },
      })
    }
  }


  onAddUpdateItem(form: NgForm) {
    const value = form.value
    this.loaiHangGiao = new LoaiHangGiao(0, value.tenLHG)

    if (this.editMode) {
      this.lghService.updateLHG(this.id, this.loaiHangGiao)
        .subscribe({
          next: (lgh) => {
            this.router.navigate(['/admin/quanlygiaohang'], { relativeTo: this.route })
            this.toastr.success("Sửa Thành Công", "Thông báo", {
              progressBar: true,
              newestOnTop: true
            })
          },
          error: (err) => {
            console.log(err)
            this.toastr.error("Sửa Thất Bại", "Thông báo", {
              progressBar: true,
              newestOnTop: true
            })
          }
        });
    }
    else {
      this.lghService.addLHG(this.loaiHangGiao)
        .subscribe({
          next: (lgh) => {
            form.reset()
            this.toastr.success("Thêm Thành Công", "Thông báo", {
              progressBar: true,
              newestOnTop: true
            })
          },
          error: (err) => {
            console.log(err)
            this.toastr.error("Thêm Thất Bại", "Thông báo", {
              progressBar: true,
              newestOnTop: true
            })
          }
        })
    }
  }


  onBack() {
    this.router.navigate(['/admin/quanlygiaohang'], { relativeTo: this.route })
  }
}
