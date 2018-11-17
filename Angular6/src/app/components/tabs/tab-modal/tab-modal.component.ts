import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TabsViewModel } from '../../../core/viewModel/tabs-viewmodel';
import { Tab } from '../../../core/models/tab.model';

import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'app/core/models/response.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab-modal',
  templateUrl: './tab-modal.component.html',
  styleUrls: ['./tab-modal.component.css']
})
export class TabModalComponent implements OnInit {
  addSuccess: string;
  updateSuccess: string;
  modalId: number;
  title: string;
  tabForm: FormGroup;
  tab: Tab = new Tab;
  index:number;
  tabTypeList: Array<any> = [
    { id: 1, name: '探消息' },
    { id: 2, name: '工作聊' }
  ];

  constructor(private translateService: TranslateService, private fb: FormBuilder, private dialogRef: MatDialogRef<TabModalComponent>,
    @Inject(MAT_DIALOG_DATA) data, private tabsViewModel: TabsViewModel, private toastrService: ToastrService) {
    this.title = data.title;
    this.modalId = data.id;
    this.tab = data.tab;
    this.index = data.index;
  }

  ngOnInit() {
    this.translateService.get('toast.addSuccess').subscribe(res => { this.addSuccess = res; });
    this.translateService.get('toast.updateSuccess').subscribe(res => { this.updateSuccess = res; });
    this.tabForm = this.fb.group({
      name: "",
      url: "",
      tabType: 0
    });
  }

  save() {
    if (this.modalId == 1) {
      this.addTab();
    } else {
      this.updateTab();
    }
  }

  /** Add Main Tab */
  private addTab(): void {
    this.tabsViewModel.insertTab(this.tab)
      .subscribe((response: Response) => {
        if (response.success) {
          this.toastrService.success(this.addSuccess, '', { timeOut: 3000 });
          this.close();
        }
      });
  }

  /** Update Main Tab */
  private updateTab(): void {
    this.tabsViewModel.updateTab(this.tab, this.index)
      .subscribe((response: Response) => {
        if (response.success) {
          this.toastrService.success(this.updateSuccess, '', { timeOut: 3000 });
          this.close();
        }
      });
  }

  /** Close Modal Tab */
  private close() {
    this.dialogRef.close();
  }

}
