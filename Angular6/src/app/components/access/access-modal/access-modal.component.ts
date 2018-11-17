import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { AccessViewModel } from '../../../core/viewModel/access-viewmodel';
import { ChangePassword } from '../../../core/models/chatuser.model';
import { m_User } from '../../../core/models/matrix/user.model';
import { Response } from '../../../core/models/response.model';

@Component({
  selector: 'app-access-modal',
  templateUrl: './access-modal.component.html',
  styleUrls: ['./access-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccessModalComponent implements OnInit {

  title: string;
  mUser: m_User = new m_User();
  
  changePasswordData: ChangePassword = new ChangePassword();

  success:string;
  passwordNotSame:string;

  // changePasswodForm: FormGroup;

  // changePasswodForm = new FormGroup({
  //   userInfoUserName: new FormControl({ value: '' }, Validators.compose([Validators.required])),
  //   userInfoName: new FormControl({ value: '' }, Validators.compose([Validators.required])),
  //   userInfoSurName: new FormControl({ value: '' }, Validators.compose([Validators.required]))
  // });

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AccessModalComponent>, @Inject(MAT_DIALOG_DATA) data, private accessViewModel: AccessViewModel, private toastrService: ToastrService, private translateService: TranslateService) {
    this.title = data.title;
    this.mUser = data.mUser;
    translateService.get('access.passwordChangeSuccess').subscribe(res => { this.success = res; });
    translateService.get('access.passwordNotSame').subscribe(res => { this.passwordNotSame = res; });
  }

  ngOnInit() {
    // this.changePasswodForm = this.fb.group({
    //   oldPassword: "",
    //   newPassword: "",
    //   newConfirmPassword: "",
    // });
  }

  changePassword() {
    if (this.changePasswordData.newPassword !== this.changePasswordData.newConfirmPassword) {
      this.toastrService.error(this.passwordNotSame, '', { timeOut: 3000 });
      return;
    }
    const newMUser: m_User = new m_User();
    newMUser.name = this.mUser.name;
    newMUser.password_hash = this.changePasswordData.newPassword;
    this.accessViewModel.changePassword(newMUser).subscribe(
      (response: Response) => {
        if (response.success == false) {
          this.toastrService.error(response.errorMessage, '', { timeOut: 3000 });
          return;
        } else {
          this.toastrService.success(this.success, '', { timeOut: 3000 });
        }
      }
    );
    this.close();
  }

  private close() {
    this.dialogRef.close();
  }


}
