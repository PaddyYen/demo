import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { DTreeNode } from '../../core/models/dTreeNode.model';
import { OrgSettingModelComponent } from './org-setting-model/org-setting-model.component';
import { Response } from '../../core/models/response.model';
import { OrganizationViewModel } from 'app/core/viewModel/organization-viewmodel';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrganizationComponent implements OnInit, OnDestroy {

  constructor(private organizationViewModel: OrganizationViewModel, public dialog: MatDialog, private ngProgress:NgProgress) {}
  
  private subscription: Subscription;
  departmentId: string;

  @ViewChild('tree') tree;
  nodes: Array<DTreeNode> = [];

  //Angular Material Table
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  memberDataSource = new MatTableDataSource<any>();
  displayedColumns = ['number', 'name', 'jobTitle', 'phone', 'email'];
  pageSize = 10;
  firstCut = 0;
  roleIdList: Array<string> = [];

  ngOnInit() {
    this.organizationViewModel.getCompany();
    this.subscription = this.organizationViewModel.company$.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(
      data => {
        let nodesArray: Array<DTreeNode> = [];
        nodesArray.push(data);
        this.nodes = nodesArray;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEvent($event): void {
    this.departmentId = $event.node.data.id;
    this.roleIdList = $event.node.data.roleIdList;
    this.firstCut = 0;
    if (this.roleIdList.length !== 0) {
      this.getMembers(this.roleIdList, this.firstCut, this.pageSize);
    }
  }

  private getMembers(roleIdList: string[], firstCut: number, pageSize: number) {
    this.organizationViewModel.getMembers(roleIdList, firstCut, pageSize).subscribe(
      (response: Response) => {
        this.memberDataSource.data = response.data;
        this.memberDataSource.paginator = this.paginator;
      }
    );
  }

  // registerAsLaleMember(): void {
  //   this.ngProgress.start();
  //   this.ngProgress.done();
  // }

  /**
   * Expand All nodes.
   * @param tree 
   */
  onUpdateData(tree) {
    tree.treeModel.expandAll();
  }

  onPageChanged(e): void {
    this.firstCut = e.pageIndex * e.pageSize;
    this.getMembers(this.roleIdList, this.firstCut, this.pageSize);
  }

  openOrgSettingModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(OrgSettingModelComponent, dialogConfig);
  }
}
