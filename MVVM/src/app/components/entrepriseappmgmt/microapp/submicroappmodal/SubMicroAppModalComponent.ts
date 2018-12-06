import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MicroAppViewModel } from 'app/core/viewModel/MicroAppViewModel';
import { MicroApp } from 'app/core/models/MicroApp';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-submicroappmodal',
  templateUrl: './SubMicroAppModalComponent.html',
  styleUrls: ['./SubMicroAppModalComponent.css']
})
export class SubMicroAppModalComponent implements OnInit, OnDestroy {

  title: string;
  errorMsg: string;
  microAppForm: FormGroup;
  mainMicroApp: MicroApp;
  index: number;
  microAppList: MicroApp[];  // Get apps from the MicroAppComponent.
  deleteMicroAppList: Array<any> = [];

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<SubMicroAppModalComponent>,
    @Inject(MAT_DIALOG_DATA) data, private microAppViewModel: MicroAppViewModel,
    private toastrService: ToastrService, private translateService: TranslateService) {
    this.title = data.title;
    this.mainMicroApp = data.mainMicroApp;
    this.index = data.index;
    this.microAppList = data.microAppList;
    this.microAppViewModel.subscribe("getMicroAppById", this.getMicroAppByIdRes.bind(this));
  }

  ngOnInit() {
    this.translateService.get('toast.inputDataError').subscribe(res => { this.errorMsg = res; });
    this.microAppForm = this.fb.group({
      microAppFormArray: this.fb.array([])
    });
    this.setSubMicroAppFormArray(this.mainMicroApp.subMicroAppList);
  }

  ngOnDestroy() {
      this.microAppViewModel.unsubscribe("getMicroAppById", this.getMicroAppByIdRes.bind(this));
  }

  private setSubMicroAppFormArray(subMicroAppList: Array<any>) {
    const microAppFormGroupList = subMicroAppList.map(subMicroApp => this.createMicroAppList(subMicroApp));
    const microAppformArry = this.fb.array(microAppFormGroupList);
    this.microAppForm.setControl('microAppFormArray', microAppformArry);
  }

  getMicroAppByIdRes(newMicroApp: MicroApp) {
    this.mainMicroApp = newMicroApp;
    this.setSubMicroAppFormArray(this.mainMicroApp.subMicroAppList);
  }

  /** Delete the sub microApp on the modal.*/
  deleteSubMicroApp(i: number, microApp) {
    const control = <FormArray>this.microAppForm.controls['microAppFormArray'];
    if (microApp.value.id !== null) {
      this.deleteMicroAppList.push(microApp.value);
    }
    control.removeAt(i);
  }

  /** Add new microApp tab on the modal.*/
  addSubMicroAppPanel() {
    const microAppFormArray = <FormArray>this.microAppForm.controls['microAppFormArray'];
    microAppFormArray.push(this.createMicroAppList(new MicroApp));
  }

  createMicroAppList(subMicroApp: MicroApp) {
    return this.fb.group({
      id: new FormControl(subMicroApp.id ? subMicroApp.id : null),
      name: new FormControl(subMicroApp.name ? subMicroApp.name : '', [Validators.required]),
      parentId: new FormControl(subMicroApp.parentId ? subMicroApp.parentId : 0),
      url: new FormControl(subMicroApp.url ? subMicroApp.url : '', [Validators.required, Validators.pattern(reg)]),
      appType: new FormControl(subMicroApp.appType ? subMicroApp.appType : 0, [Validators.required]),
      queues: new FormControl(subMicroApp.queues ? subMicroApp.queues : 0)
    });
  }

  /** Update sub microApp on the modal afte click store button.*/
  updateSubMicroAppPanel() {
    if (!this.microAppForm.valid && this.microAppForm.touched) {
      this.toastrService.error(this.errorMsg, '', { timeOut: 3000 });
    } else {
      const updateMicroAppList = [];
      const insertMicroAppList = [];
      for (let i = 0; i < this.microAppForm.value.microAppFormArray.length; i++) {
        let newMicroApp: MicroApp = this.microAppForm.value.microAppFormArray[i];
        if (newMicroApp.id == null) {
          newMicroApp.parentId = this.mainMicroApp.id;
          insertMicroAppList.push(newMicroApp);
        } else {
          updateMicroAppList.push(newMicroApp);
        }
      }
      if (updateMicroAppList.length !== 0) {
        this.microAppViewModel.batchUpdateMicroApp(updateMicroAppList);
      }
      if (insertMicroAppList.length !== 0) {
        this.microAppViewModel.batchInsertMicroApp(insertMicroAppList);
      }
      if (this.deleteMicroAppList.length !== 0) {
        this.microAppViewModel.batchDeleteMicroApp(this.deleteMicroAppList);
      }
      this.close();
    }
  }

  moveSubMicroAppUp(index: number, microAppFormList: MicroApp[]) {
    if (index >= 1) {
      this.swapTabQueues(microAppFormList, index, index - 1);
    }
    this.getNewSubTabList(microAppFormList);
  }

  moveSubMicroAppDown(index: number, microAppFormList: MicroApp[]) {
    if (index < microAppFormList.length - 1) {
      this.swapTabQueues(microAppFormList, index, index + 1);
    }
    this.getNewSubTabList(microAppFormList);
  }

  private getNewSubTabList(microAppFormList: any) {
    let newMicroAppList = [];
    for (let i = 0; i < microAppFormList.length; i++) {
      microAppFormList[i].queues = i + 1;
      newMicroAppList.push(microAppFormList[i]);
    }
     this.microAppViewModel.batchUpdateMicroApp(newMicroAppList);
     this.microAppViewModel.getMicroAppById(this.mainMicroApp);//For updating the modal of data.
  }

  private swapTabQueues(array: any[], first: any, second: any) {
    let b = array[first];
    array[first] = array[second];
    array[second] = b;
  }

  /** Close Modal MicroApp */
  private close() {
    this.dialogRef.close();
  }
}
