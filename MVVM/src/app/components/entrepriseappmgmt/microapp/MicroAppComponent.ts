import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { MicroApp } from 'app/core/models/MicroApp';
import { MicroAppViewModel } from 'app/core/viewModel/MicroAppViewModel';
import { ToastrService } from 'ngx-toastr';
import { MicroAppModalComponent } from './microappmodal/MicroAppModalComponent';
import { SubMicroAppModalComponent } from './submicroappmodal/SubMicroAppModalComponent';

@Component({
  selector: 'app-microapp',
  templateUrl: './MicroAppComponent.html',
  styleUrls: ['./MicroAppComponent.css']
})
export class MicroAppComponent implements OnInit, OnDestroy {

  /** toastr */
  errorMessage: string;
  deleteSuccess: string

  //Angular Material Table
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  microAppsDataSource = new MatTableDataSource<MicroApp>();
  displayedColumns = ['number', 'name', 'url', 'editBtn', 'addSubBtn', 'queuesBtn', 'deleteBtn'];
  pageSize = 10;
  firstCut = 0;
  selectedRowIndex: number = -1;

  constructor(private microAppViewModel: MicroAppViewModel, private translateService: TranslateService, private toastrService: ToastrService, public dialog: MatDialog) {
    this.microAppViewModel.subscribe("getAllMicroApps", this.getAllMicroAppsRes.bind(this));
  }

  ngOnInit() {
    this.translateService.get('toast.deleteSuccess').subscribe(res => { this.deleteSuccess = res; });
    this.translateService.get('toast.deleteTab').subscribe(res => { this.errorMessage = res; });
    this.microAppViewModel.getAllMicroApps();
  }

  ngOnDestroy() {
    this.microAppViewModel.unsubscribe("getAllMicroApps", this.getAllMicroAppsRes.bind(this));
  }

  getAllMicroAppsRes(microApps: MicroApp[]) {
    this.microAppsDataSource.data = microApps;
  }

  getMicroApp(microApp: MicroApp): void {
    this.selectedRowIndex = microApp.id;
  }

  deleteTab(microApp: MicroApp): void {
    if (microApp.subMicroAppList.length !== 0) {
      this.toastrService.error(this.errorMessage, '', { timeOut: 3000 });
      return;
    }
    this.microAppViewModel.deleteMicroApp(microApp);
  }

  openModal(microApp: MicroApp, id: number, index: number): void {
    const dialogConfig = new MatDialogConfig();
    if (id == 1) {
      dialogConfig.data = {
        id: id,
        title: '新增主應用',
        microApp: new MicroApp,
        microAppList: this.microAppsDataSource.data
      };
    } else {
      dialogConfig.data = {
        id: id,
        title: '修改主應用',
        microApp: microApp,
        index: index,
        microAppList: this.microAppsDataSource.data
      };
    }
    dialogConfig.width = '350px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(MicroAppModalComponent, dialogConfig);
  }

  openSubTabModal(mainMicroApp: MicroApp, index: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: '新增子應用',
      mainMicroApp: mainMicroApp,
      index: index,
      microAppList: this.microAppsDataSource.data
    }
    dialogConfig.width = '550px';

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(SubMicroAppModalComponent, dialogConfig);
  }

  moveMainAppUp(index: number) {
    let microAppList = this.microAppsDataSource.data;
    index = index + this.firstCut;
    if (index >= 1) {
      this.swapMicriAppQueues(microAppList, index, index - 1);
    }
    for (let i = 0; i < microAppList.length; i++) {
      microAppList[i].queues = i + 1;
    }
    this.microAppsDataSource.data = microAppList;
    this.microAppViewModel.batchUpdateMicroApp(microAppList);
  }

  moveMainAppDown(index: number) {
    let microAppList = this.microAppsDataSource.data;
    index = index + this.firstCut;
    if (index < microAppList.length - 1) {
      this.swapMicriAppQueues(microAppList, index, index + 1);
    }
    for (let i = 0; i < microAppList.length; i++) {
      microAppList[i].queues = i + 1;
    }
    this.microAppsDataSource.data = microAppList;
    this.microAppViewModel.batchUpdateMicroApp(microAppList);
  }

  onPageChanged(e) {
    this.firstCut = e.pageIndex * e.pageSize;
  }

  private swapMicriAppQueues(array: any[], first: any, second: any) {
    let b = array[first];
    array[first] = array[second];
    array[second] = b;
  }

}