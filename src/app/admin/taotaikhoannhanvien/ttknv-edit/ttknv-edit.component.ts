import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChucVu } from 'src/app/models/chucVu';
import { Kho } from 'src/app/models/kho';
import { NhanVien } from 'src/app/models/nhanvien';
import { TaiKhoan } from 'src/app/models/taiKhoan';
import { ChucvuService } from 'src/services/chucvu.service';
import { KhoService } from 'src/services/kho.service';
import { NVService } from 'src/services/nhanvien.service';
import { TKService } from 'src/services/taikhoan.service';

@Component({
  selector: 'app-ttknv-edit',
  templateUrl: './ttknv-edit.component.html',
  styleUrls: ['./ttknv-edit.component.css']
})
export class TtknvEditComponent implements OnInit {
  id!: number;
  editMode = false;
  taiKhoan!: TaiKhoan;
  taiKhoans: TaiKhoan[] = []
  f!: FormGroup
  chucvu!: ChucVu[]
  chucvu_nv: ChucVu[] = []
  gioitinh = ["Nam", "Nữ"]
  kho!: Kho[]
  nhanvien_moi!: NhanVien

  constructor(private route: ActivatedRoute,
    private TKService: TKService,
    private router: Router,
    private toastr: ToastrService,
    private cvService: ChucvuService,
    private khoService: KhoService,
    private nvService: NVService,
    private tkService: TKService
  ) {
    this.f = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      matKhau: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      sdt: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      gioiTinh: new FormControl(null, Validators.required),
      diaChi: new FormControl(null, Validators.required),
      ngaySinh: new FormControl(null, Validators.required),
      hoTen: new FormControl(null, Validators.required),
      trangThaiTK: new FormControl(null, Validators.required),
      tenCV: new FormControl(null, Validators.required),
      kho: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.tkService.getAllTaiKhoans().subscribe({
      next: (value) => {
        this.taiKhoans = value
      }
    })

    this.cvService.getAllChucVu()
      .subscribe({
        next: (value) => {
          this.chucvu = value
          this.chucvu.forEach(element => {
            if (element.tenCV != 'KhachHang' && element.tenCV != 'TaiXe') {
              this.chucvu_nv.push(element)
            }
          });
        }
      })
    this.khoService.getAllKho().subscribe({
      next: (allKho) => {
        this.kho = allKho
      },
      error(err) {
        console.log(err)
      },
    })
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null
      });

    if (this.id) {
      //call API
      this.TKService.getTK(this.id).subscribe({
        next: (response) => {
          this.taiKhoan = response;
          const maCV = this.taiKhoan.maCV
          var tenCV = ''
          if (maCV === 1) {
            tenCV = "Admin"
          }
          else if (maCV === 3) {
            tenCV = "TaiXe"
          }
          else {
            tenCV = "NhanVienKho"
          }
          this.f.patchValue({
            email: this.taiKhoan.email,
            matKhau: this.taiKhoan.matKhau,
            sdt: this.taiKhoan.sdt,
            gioiTinh: this.taiKhoan.gioiTinh,
            diaChi: this.taiKhoan.diaChi,
            ngaySinh: formatDate(this.taiKhoan.ngaySinh, 'yyyy-MM-dd', 'en-US'),
            hoTen: this.taiKhoan.hoTen,
            trangThaiTK: this.taiKhoan.trangThaiTK,
            tenCV: tenCV,
            kho: this.kho
          })
        },
        error(err) {
        },
      })
    } else {
      this.f.patchValue({
        tenCV: this.chucvu_nv,
        kho: this.kho
      })
    }

    this.f = new FormGroup({
      email: new FormControl({ value: '', disabled: this.editMode }, [Validators.required, Validators.email]),
      matKhau: new FormControl({ value: '', disabled: this.editMode }, [Validators.required, Validators.minLength(8)]),
      sdt: new FormControl({ value: '', disabled: this.editMode }, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      gioiTinh: new FormControl({ value: '', disabled: this.editMode }, Validators.required),
      diaChi: new FormControl({ value: '', disabled: this.editMode }, Validators.required),
      ngaySinh: new FormControl({ value: '', disabled: this.editMode }, [Validators.required, this.minimumAgeValidator(18)]),
      hoTen: new FormControl({ value: '', disabled: this.editMode }, Validators.required),
      trangThaiTK: new FormControl("", Validators.required),
      tenCV: new FormControl({ value: '', disabled: this.editMode }, Validators.required),
      kho: new FormControl({ value: '', disabled: this.editMode })
    })

  }


  minimumAgeValidator(minimumAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value === null || control.value === '') {
        return null;
      }
      const today = new Date();
      const birthDate = new Date(control.value);
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < minimumAge || age >= 70) {
        return { 'underAge': true };
      }

      return null;
    };
  }

  onAddUpdateItem() {
    const value = this.f.value
    var cv_chon = new ChucVu(0, "")
    var maCV = 0
    var tenCV = value.tenCV
    if (tenCV === "Admin") {
      maCV = 1
    }
    else if (tenCV === "KhachHang") {
      maCV = 2
    }
    else {
      maCV = 4
    }

    let maKho = 0;
    if (value.kho != null) {
      maKho = value.kho
    }
    if (this.editMode) {
      this.taiKhoan = new TaiKhoan(this.id, this.taiKhoan.email, this.taiKhoan.matKhau, this.taiKhoan.sdt,
        this.taiKhoan.gioiTinh, this.taiKhoan.diaChi, this.taiKhoan.ngaySinh, this.taiKhoan.hoTen, value.trangThaiTK, this.taiKhoan.maCV, cv_chon, "")

      //test 
      // console.log(JSON.stringify(this.taiKhoan))

      this.TKService.updateTK(this.id, this.taiKhoan)
        .subscribe({
          next: (tk) => {
            this.router.navigate(['/admin/taotaikhoannhanvien'], { relativeTo: this.route })
            this.toastr.success("Sửa Thành Công", "Thông báo", {
              progressBar: true,
              newestOnTop: true
            })
          },
          error: (err) => {
            this.toastr.error("Lỗi kết nối!", "Thông báo", {
              progressBar: true,
              newestOnTop: true
            })
          }
        });
    }
    else {
      let checkSDT = 0;

      var tk_chon = new TaiKhoan(0, value.email, value.matKhau, value.sdt, value.gioiTinh, value.diaChi, value.ngaySinh, value.hoTen,
        value.trangThaiTK, maCV, cv_chon, "")
      if (maCV === 1) {
        //Tạo tài khoản nhân viên (Admin)
        this.nhanvien_moi = new NhanVien(0, value.email, value.matKhau, 0, tk_chon, 0, new Kho(0, "", ""))
      } else {
        //Tạo tài khoản nhân viên (NhanVienKho)
        this.nhanvien_moi = new NhanVien(0, value.email, value.matKhau, 0, tk_chon, maKho, new Kho(0, "", ""))
      }

      //Test
      console.log(JSON.stringify(this.nhanvien_moi))

      //Kiểm tra số điện thoại đã được đăng ký chưa + kiểm tra Email ở Server
      this.taiKhoans.forEach(element => {
        if (element.sdt === value.sdt) {
          checkSDT = 1;
        }
      });
      if (checkSDT === 1 || value.sdt.length !== 10) {
        this.toastr.error("Số điện thoại đã có. Xin kiểm tra lại", "Thông báo", {
          progressBar: true,
          newestOnTop: true
        })
      } else {
        this.nvService.addTKNV(this.nhanvien_moi)
          .subscribe({
            next: (tk) => {
              this.f.reset()
              this.router.navigate(['/admin/taotaikhoannhanvien'], { relativeTo: this.route })
              this.toastr.success("Tạo tài khoản NV Thành Công", "Thông báo", {
                progressBar: true,
                newestOnTop: true
              })
            },
            error: (err) => {
              this.toastr.error("Tài khoản đã có!", "Thông báo", {
                progressBar: true,
                newestOnTop: true
              })
            }
          })
      }
    }
  }


  onBack() {
    this.router.navigate(['/admin/taotaikhoannhanvien'], { relativeTo: this.route })
  }
}
