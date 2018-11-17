import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Tab } from '../../core/models/tab.model';
import { Response } from '../../core/models/response.model';
import { TabsViewModel } from '../../core/viewModel/tabs-viewmodel';
import { catchError } from 'rxjs/operators';

import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';

import { TabModalComponent } from './tab-modal/tab-modal.component';
import { SubtabModalComponent } from './tab-modal/subtab-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, OnDestroy {

  constructor(private translateService: TranslateService, private tabsViewModel: TabsViewModel,
    public dialog: MatDialog, private toastrService: ToastrService) {}
    
  tab: Tab = new Tab();//For modal that give a default value.
  private subscribtion: Subscription;

  /** toastr */
  errorMessage: string;
  deleteSuccess: string

  //Angular Material Table
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tabsDataSource = new MatTableDataSource<Tab>();
  displayedColumns = ['number', 'name', 'url', 'editBtn', 'addSubBtn', 'queuesBtn', 'deleteBtn'];
  pageSize = 10;
  firstCut = 0;
  selectedRowIndex: number = -1;

  ngOnInit() {
    this.translateService.get('toast.deleteSuccess').subscribe(res => { this.deleteSuccess = res; });
    this.translateService.get('toast.deleteTab').subscribe(res => { this.errorMessage = res; });
    this.tabsViewModel.getAllTabs();
    this.getAllTabs();
    
  }

  ngOnDestroy() {
    //If subscribe event in ngOnInit(), need to unsubscribe. 
    this.subscribtion.unsubscribe()
  }

  getAllTabs() {
    this.subscribtion = this.tabsViewModel.tabs$
      .pipe(filter(data => data != undefined))
      .subscribe((tabList: Tab[]) => {
        this.tabsDataSource.data = tabList;
        this.tabsDataSource.paginator = this.paginator;
      });
  }


  getTab(tab: Tab): void {
    this.selectedRowIndex = tab.id;
  }

  deleteTab(tab, index: number): void {
    if (tab.subTabList.length !== 0) {
      this.toastrService.error(this.errorMessage, '', { timeOut: 3000 });
      return;
    }
    this.tabsViewModel.deleteTab(tab, this.tabsDataSource.data, index).pipe(
      catchError(error => Observable.throw(error))
    ).subscribe(
      (response: Response) => {
        if (response.success) {
          this.toastrService.success(this.deleteSuccess, '', { timeOut: 3000 });
        }
      }
    );
  }

  openModal(tab: Tab, id: number, index:number): void {
    const dialogConfig = new MatDialogConfig();
    if (id == 1) {
      dialogConfig.data = {
        id: id,
        title: '新增主選單',
        tab: tab
      };
    } else {
      dialogConfig.data = {
        id: id,
        title: '修改主選單',
        tab: tab,
        index:index
      };
    }
    dialogConfig.width = '350px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(TabModalComponent, dialogConfig);
  }

  openSubTabModal(tab: Tab, index: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: '新增子選單',
      tab: tab,
      index:index
    }
    dialogConfig.width = '550px';

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(SubtabModalComponent, dialogConfig);
  }

  moveMainTabUp(index: number) {
    let tabList = this.tabsDataSource.data;
    index = index + this.firstCut;
    if (index >= 1) {
      this.swapTabQueues(tabList, index, index - 1);
    }
    for (let i = 0; i < tabList.length; i++) {
      tabList[i].queues = i + 1;
    }
    this.tabsDataSource.data = tabList;
    this.tabsViewModel.batchUpdateTab(tabList);
  }

  moveMainTabDown(index: number) {
    let tabList = this.tabsDataSource.data;
    index = index + this.firstCut;
    if (index < tabList.length - 1) {
      this.swapTabQueues(tabList, index, index + 1);
    }
    for (let i = 0; i < tabList.length; i++) {
      tabList[i].queues = i + 1;
    }
    this.tabsDataSource.data = tabList;
    this.tabsViewModel.batchUpdateTab(tabList);
  }

  onPageChanged(e) {
    this.firstCut = e.pageIndex * e.pageSize;
  }

  private swapTabQueues(array: any[], first: any, second: any) {
    let b = array[first];
    array[first] = array[second];
    array[second] = b;
  }

}
