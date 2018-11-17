import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { TabsViewModel } from '../../../core/viewModel/tabs-viewmodel';
import { Tab } from '../../../core/models/tab.model';

import { tap, catchError } from 'rxjs/operators';
import { Response } from 'app/core/models/response.model';

@Component({
  selector: 'app-subtab-modal',
  templateUrl: './subtab-modal.component.html',
  styleUrls: ['./subtab-modal.component.css']
})
export class SubtabModalComponent implements OnInit {

  title: string;
  tabForm: FormGroup;
  mainTab: Tab;
  index: number;
  deleteSubTabList: Array<any> = [];
  
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<SubtabModalComponent>, @Inject(MAT_DIALOG_DATA) data, private tabsViewModel: TabsViewModel) {
    this.title = data.title;
    this.mainTab = data.tab;
    this.index = data.index;
  }

  ngOnInit() {
    this.tabForm = this.fb.group({
      subTabFormList: []
    });
    this.setSubTabForm(this.mainTab.subTabList);//Method two(Rxjs).
    // this.createSubTabForm(this.mainTab.subTabList); //Method one.
  }

  /** Get sub tab of main tab and tranfrom to fromgroupArray */
  private setSubTabForm(tabList: Array<any>) {
    const subTabFormList = tabList.map(subTab => this.fb.group(subTab));
    const subTabFormArray = this.fb.array(subTabFormList);
    this.tabForm.setControl('subTabFormList', subTabFormArray);
  }

  /** Delete the sub tab on the modal.*/
  deleteSubTab(i: number, tab) {
    const control = <FormArray>this.tabForm.controls['subTabFormList'];
    if (tab.value.id !== null) {
      this.deleteSubTabList.push(tab.value);
    }
    control.removeAt(i);
  }

  /** Add new sub tab on the modal.*/
  addSubTabPanel() {
    const newSubTab = new Tab();
    const control = <FormArray>this.tabForm.controls['subTabFormList'];
    control.push(this.fb.group(newSubTab))
  }

  /** Update sub tab on the modal afte click store button.*/
  updateSubTabPanel() {
    const updateSubTabList = [];
    const insertSubTabList = [];

    for (let i = 0; i < this.tabForm.value.subTabFormList.length; i++) {
      let newSubTab = new Tab();
      newSubTab = this.setSubTab(this.tabForm.value.subTabFormList[i], newSubTab, this.mainTab.id);
      if (newSubTab.id == null) {
        insertSubTabList.push(newSubTab);
      } else {
        updateSubTabList.push(newSubTab);
      }
    }
    this.tabsViewModel.batchUpdateTab(updateSubTabList);
    this.tabsViewModel.batchInsertTab(insertSubTabList);
    this.tabsViewModel.batchDeleteTab(this.deleteSubTabList);
    // location.reload();
    this.tabsViewModel.reloadSubTab(this.mainTab, this.index);
    this.close();
  }

  /** Wrap the fromgroup object to tab object for storing db. */
  private setSubTab(form: any, tab: Tab, parentId: number) {
    tab.id = form.id;
    tab.parentId = parentId;
    tab.name = form.name;
    tab.url = form.url;
    tab.synopsis = form.synopsis == null ? "" : form.synopsis;
    tab.queues = form.queues;
    return tab;
  }

  moveSubTabUp(index: number, tabFormList: any[]) {
    if (index >= 1) {
      this.swapTabQueues(tabFormList, index, index - 1);
    }
    this.getNewSubTabList(tabFormList);
  }

  moveSubTabDown(index: number, tabFormList: any[]) {
    if (index < tabFormList.length - 1) {
      this.swapTabQueues(tabFormList, index, index + 1);
    }
    this.getNewSubTabList(tabFormList);
  }

  private getNewSubTabList(tabFormList) {
    let newSubTabList = [];
    for (let i = 0; i < tabFormList.length; i++) {
      let newSubTab = new Tab();
      tabFormList[i].controls.queues.value = i + 1;
      newSubTab = this.setSubTabData(tabFormList[i].controls, newSubTab, this.mainTab.id);
      newSubTabList.push(newSubTab);
    }
    // this.tabsViewModel.batchUpdateTab(newSubTabList).subscribe(
    //   (response:Response) => this.mainTab.subTabList = response.data
    // );
    this.tabsViewModel.batchUpdateSubTab(newSubTabList, this.mainTab, this.index);
  }

  private setSubTabData(form: any, tab: Tab, parentId: number) {
    tab.id = form.id.value;
    tab.parentId = parentId;
    tab.name = form.name.value;
    tab.url = form.url.value;
    tab.synopsis = form.synopsis.value;
    tab.queues = form.queues.value;
    return tab;
  }

  private swapTabQueues(array: any[], first: any, second: any) {
    let b = array[first];
    array[first] = array[second];
    array[second] = b;
  }


  // private createSubTabForm(subTabList) {
  //   let formArray = []
  //   for (let i = 0; i < subTabList.length; i++) {
  //     formArray.push(this.createSubTabFormList(subTabList[i]));
  //   }
  //   this.tabForm = this.fb.group({
  //     subTabFormList: this.fb.array(formArray)
  //   });
  // }

  // private createSubTabFormList(subTab): FormGroup {
  //   return this.fb.group({
  //     id: [subTab.id],
  //     parentId: [subTab.parentId],
  //     name: [subTab.name],
  //     url: [subTab.url],
  //     synopsis: [subTab.synopsis],
  //     queues: [subTab.queues]
  //   });
  // }

  /** Close Modal Tab */
  private close() {
    this.dialogRef.close();
  }

}
