import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DTreeNode } from 'app/core/models/DTreeNode';
import { OrganizationViewModel } from 'app/core/viewModel/OrganizationViewModel';
import { NgProgress } from 'ngx-progressbar';
import { OrgSettingModelComponent } from './org-setting-model/OrgSettingModelComponent';


@Component({
  selector: 'app-organization',
  templateUrl: './OrganizationComponent.html',
  styleUrls: ['./OrganizationComponent.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrganizationComponent implements OnInit, OnDestroy {

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

  constructor(private organizationViewModel: OrganizationViewModel, public dialog: MatDialog,
    private ngProgress: NgProgress) {
    this.organizationViewModel.subscribe("getCompany", this.getCompanyRes.bind(this));
    this.organizationViewModel.subscribe("getMembers", this.getMembersRes.bind(this));
  }

  ngOnInit() {
    this.organizationViewModel.getCompany();
  }

  ngOnDestroy() {
    this.organizationViewModel.unsubscribe("getCompany", this.getCompanyRes.bind(this));
    this.organizationViewModel.unsubscribe("getMembers", this.getMembersRes.bind(this));
  }

  getCompanyRes(dTreeNode: DTreeNode) {
    let nodesArray: Array<DTreeNode> = [];
    nodesArray.push(dTreeNode);
    this.nodes = nodesArray;
  }

  onEvent($event): void {
    this.departmentId = $event.node.data.id;
    this.roleIdList = $event.node.data.roleIdList;
    this.firstCut = 0;
    if (this.roleIdList.length !== 0) {
      this.getMembers(this.roleIdList, this.firstCut, this.pageSize);
    }
  }

  getMembers(roleIdList: string[], firstCut: number, pageSize: number) {
    this.organizationViewModel.getMembers(roleIdList, firstCut, pageSize);
  }

  getMembersRes(memberList: any) {
    this.memberDataSource.data = memberList;
    this.memberDataSource.paginator = this.paginator;
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
