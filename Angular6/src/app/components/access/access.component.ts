import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { AccessModalComponent } from './access-modal/access-modal.component';
import { AccessViewModel } from '../../core/viewModel/access-viewmodel';
import { ChatUser } from '../../core/models/chatuser.model';
import { m_User } from '../../core/models/matrix/user.model';
import { Response } from '../../core/models/response.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit, OnDestroy {

  constructor(private accessViewModel: AccessViewModel, private toastrService: ToastrService,
    private translateService: TranslateService, public dialog: MatDialog) { }

  private subscription: Subscription;
  users$: Observable<m_User[]> = this.accessViewModel.mUserList$;
  success: string;

  //Angular Material Table
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  matrixUserDataSource = new MatTableDataSource<any>();
  // displayedColumns = ['number', 'afName', 'name','changePasswordBtn', 'disableBtn'];
  displayedColumns = ['number', 'name', 'changePasswordBtn', 'disableBtn'];
  pageSize = 10;
  firstCut = 0;
  selectedRowIndex: string = "";


  ngOnInit() {
    this.getAllUsers();
    this.subscription = this.users$.subscribe(mUserList => {
      this.matrixUserDataSource.data = mUserList;
      this.matrixUserDataSource.paginator = this.paginator;
    });
    this.translateService.get('access.disabledAccountSuccess').subscribe(res => { this.success = res; });
  }

  ngOnDestroy() {
    //If subscribe event in ngOnInit(), need to unsubscribe. 
    this.subscription.unsubscribe();
  }

  getAllUsers(): void {
    this.accessViewModel.getAllUsers();
  }

  getUser(user: m_User): void {
    this.selectedRowIndex = user.name;
  }

  openChangePasswordModal(mUser: m_User): void {
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

  opneDeactivateAccountModal(mUser: m_User): void {
    this.accessViewModel.deactivateAccount(mUser).subscribe(
      (response: Response) => {
        if (response.success == false) {
          this.toastrService.error(response.errorMessage, '', { timeOut: 3000 });
          return;
        } else {
          this.toastrService.success(this.success, '', { timeOut: 3000 });
        }
      }
    );
  }

  onPageChanged(e) {
    this.firstCut = e.pageIndex * e.pageSize;
  }

}
