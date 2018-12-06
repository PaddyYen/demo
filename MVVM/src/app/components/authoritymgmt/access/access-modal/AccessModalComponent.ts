import { Component, Inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ResponseData } from 'app/core/models/ResponseData';
import { compareValidator } from 'app/shared/directives/CompareValidatorDirective';
import { ToastrService } from 'ngx-toastr';
import { AccessViewModel } from 'app/core/viewModel/AccessViewModel';
import { MUser } from 'app/core/models/matrix/MUser';

@Component({
  selector: 'app-access-modal',
  templateUrl: './AccessModalComponent.html',
  styleUrls: ['./AccessModalComponent.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccessModalComponent implements OnInit, OnDestroy {

  title: string;
  mUser: MUser = new MUser();
  changePasswodForm: FormGroup;

  success: string;
  passwordNotSame: string;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AccessModalComponent>, @Inject(MAT_DIALOG_DATA) data,
    private accessViewModel: AccessViewModel, private toastrService: ToastrService,
    private translateService: TranslateService) {
    this.title = data.title;
    this.mUser = data.mUser;
    this.translateService.get('access.passwordChangeSuccess').subscribe(res => { this.success = res; });
    this.translateService.get('access.passwordNotSame').subscribe(res => { this.passwordNotSame = res; });
    this.accessViewModel.subscribe("changePassword", this.changePasswordRes.bind(this));
  }

  ngOnInit() {
    this.changePasswodForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmedPassword: ['', [Validators.required, compareValidator('newPassword')]]
    });
  }

  ngOnDestroy() {
    this.accessViewModel.unsubscribe("changePassword", this.changePasswordRes.bind(this));
  }

  onSubmit() {
    let newMUser: MUser = new MUser();
    newMUser.name = this.mUser.name;
    newMUser.password_hash = this.changePasswodForm.value.confirmedPassword;
    this.accessViewModel.changePassword(newMUser);
    this.close();
  }

  changePasswordRes(responseData: ResponseData) {
    if (responseData.success == false) {
      this.toastrService.error(responseData.errorMessage, '', { timeOut: 3000 });
      return;
    } else {
      this.toastrService.success(this.success, '', { timeOut: 3000 });
    }
  }

  private close() {
    this.dialogRef.close();
  }

  get newPassword() {
    return this.changePasswodForm.get('newPassword');
  }

  get confirmedPassword() {
    return this.changePasswodForm.get('confirmedPassword');
  }

}
