import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaiHangGiao } from 'src/app/models/loaiHangGiao';
import { LHGService } from 'src/services/loaihanggiao.service';

@Component({
  selector: 'app-qlgh-delete',
  templateUrl: './qlgh-delete.component.html',
  styleUrls: ['./qlgh-delete.component.css']
})
export class QlghDeleteComponent implements OnInit {
  id!: number;
  loaiHangGiao!: LoaiHangGiao;
  @ViewChild('f')
  form!: NgForm;

  constructor(private lghService: LHGService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
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


  onDelete() {
    this.lghService.deleteLHG(this.id).subscribe({
      next: (response) => {
        this.router.navigate(['/admin/quanlygiaohang'], { relativeTo: this.route })
        this.toastr.success("Xoá Thành Công", "Thông báo", {
          progressBar: true,
          newestOnTop: true,
        })
      },
      error(err) {
        console.log(err)

      },
    })
  }

  onBack() {
    this.router.navigate(['/admin/quanlygiaohang'], { relativeTo: this.route })
  }
}
