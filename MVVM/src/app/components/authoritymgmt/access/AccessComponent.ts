import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { MUser } from 'app/core/models/matrix/MUser';
import { ResponseData } from 'app/core/models/ResponseData';
import { AccessViewModel } from 'app/core/viewModel/AccessViewModel';
import { ToastrService } from 'ngx-toastr';
import { AccessModalComponent } from './access-modal/AccessModalComponent';

@Component({
  selector: 'app-access',
  templateUrl: './AccessComponent.html',
  styleUrls: ['./AccessComponent.css']
})
export class AccessComponent implements OnInit, OnDestroy {

  success: string;

  //Angular Material Table
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  matrixUserDataSource = new MatTableDataSource<any>();
  displayedColumns = ['number', 'name', 'changePasswordBtn', 'disableBtn'];
  pageSize = 10;
  firstCut = 0;
  selectedRowIndex: string = "";

  constructor(private accessViewModel: AccessViewModel, private toastrService: ToastrService,
    private translateService: TranslateService, public dialog: MatDialog) {
    this.accessViewModel.subscribe("getAllUsers", this.getAllUsersRes.bind(this));
    this.accessViewModel.subscribe("deactivateAccount", this.deactivateAccountRes.bind(this));
  }

  ngOnInit() {
    this.getAllUsers();
    this.translateService.get('access.disabledAccountSuccess').subscribe(res => { this.success = res; });
  }

  ngOnDestroy() {
    this.accessViewModel.unsubscribe("getAllUsers", this.getAllUsersRes.bind(this));
    this.accessViewModel.unsubscribe("deactivateAccount", this.getAllUsersRes.bind(this));
  }

  getAllUsers(): void {
    this.accessViewModel.getAllUsers();
  }

  getAllUsersRes(mUserList: MUser[]): void {
    this.matrixUserDataSource.data = mUserList;
    this.matrixUserDataSource.paginator = this.paginator;
  }

  getUser(user: MUser): void {
    this.selectedRowIndex = user.name;
  }

  openChangePasswordModal(mUser: MUser): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: '變更密碼',
      mUser: mUser,
    }
    dialogConfig.width = '400px';

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AccessModalComponent, dialogConfig);
  }

  deactivateAccount(mUser: MUser): void {
    this.accessViewModel.deactivateAccount(mUser);
  }

  deactivateAccountRes(responseData: ResponseData) {
    if (responseData.success == false) {
      this.toastrService.error(responseData.errorMessage, '', { timeOut: 3000 });
      return;
    } else {
      this.toastrService.success(this.success, '', { timeOut: 3000 });
    }
  }

  onPageChanged(e) {
    this.firstCut = e.pageIndex * e.pageSize;
  }

}
