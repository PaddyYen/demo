import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { MicroApp } from 'app/core/models/MicroApp';
import { ConstantsService } from 'app/core/services/utils/ConstantsService';
import { MicroAppViewModel } from 'app/core/viewModel/MicroAppViewModel';
import { ToastrService } from 'ngx-toastr';
import { MicroAppComponent } from '../MicroAppComponent';


const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-microappmodal',
  templateUrl: './MicroAppModalComponent.html',
  styleUrls: ['./MicroAppModalComponent.css']
})
export class MicroAppModalComponent implements OnInit {

  addSuccess: string;
  updateSuccess: string;
  errorMsg: string;

  modalId: number;
  title: string;
  microAppForm: FormGroup;
  microApp: MicroApp = new MicroApp;
  isChanged: boolean = false;
  microAppList: MicroApp[];  // Get apps from the MicroAppComponent.
  index: number;

  microAppTypeList: Array<any> = [
    { id: 1, name: '探消息' },
    { id: 2, name: '工作聊' }
  ];

  constructor(private translateService: TranslateService, private fb: FormBuilder,
    private dialogRef: MatDialogRef<MicroAppComponent>,
    @Inject(MAT_DIALOG_DATA) data, private toastrService: ToastrService,
    private microAppViewModel: MicroAppViewModel, private constantsService: ConstantsService) {
    this.title = data.title;
    this.modalId = data.id;
    this.microApp = data.microApp;
    this.index = data.index;
    this.microAppList = data.microAppList;
  }

  ngOnInit() {
    this.translateService.get('toast.addSuccess').subscribe(res => { this.addSuccess = res; });
    this.translateService.get('toast.updateSuccess').subscribe(res => { this.updateSuccess = res; });
    this.translateService.get('toast.inputDataError').subscribe(res => { this.errorMsg = res; });
    this.microAppForm = this.fb.group({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required, Validators.pattern(reg)]),
      appType: new FormControl(0, [Validators.required])
    });
    this.microAppForm.patchValue({
      id: this.microApp.id,
      name: this.microApp.name,
      url: this.microApp.url,
      appType: this.microApp.appType
    });
  }

  onSubmit() {
    if (!this.microAppForm.valid && this.microAppForm.touched) {
      this.toastrService.error(this.errorMsg, '', { timeOut: 3000 });
    } else {
      if (this.modalId == 1) {
        this.addMicroApp();
      } else {
        this.updateMicroApp();
      }
      this.microAppForm.reset();
    }
  }

  /** Add Main MicroApp */
  private addMicroApp(): void {
    if (this.microAppForm.status == this.constantsService.VALID) {
      let microApp: MicroApp = this.microAppForm.value;
      this.microAppViewModel.insertMicroApp(microApp);
    }
    this.close();
  }

  /** Update Main MicroApp */
  private updateMicroApp(): void {
    if (this.microAppForm.status == this.constantsService.VALID) {
      let microApp: MicroApp = this.microAppForm.value;
      this.microAppViewModel.updateMicroApp(microApp);
    }
    this.close();
  }

  /** Close Modal Tab */
  private close() {
    this.dialogRef.close();
  }

}
