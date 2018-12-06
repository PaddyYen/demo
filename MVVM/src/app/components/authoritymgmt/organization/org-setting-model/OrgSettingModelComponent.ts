import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { QuartzConfig } from 'app/core/models/QuartzConfig';
import { ResponseData } from 'app/core/models/ResponseData';
import { OrganizationViewModel } from 'app/core/viewModel/OrganizationViewModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-org-setting-model',
  templateUrl: './OrgSettingModelComponent.html',
  styleUrls: ['./OrgSettingModelComponent.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrgSettingModelComponent implements OnInit, OnDestroy {

  title: string;
  mainCron: FormGroup;
  errorMessage: string;
  success: string;

  constructor(private dialogRef: MatDialogRef<OrgSettingModelComponent>, private organizationViewModel: OrganizationViewModel,
    private toastrService: ToastrService, private translateService: TranslateService) { }

  ngOnInit() {
    this.mainCron = new FormGroup({
      cronRadio: new FormControl,
      cronExpression: new FormControl({ value: '', disabled: true })
    });
    this.translateService.get('organization.Synchronize').subscribe(res => { this.title = res; });
    this.translateService.get('toast.inputQuartzParameter').subscribe(res => { this.errorMessage = res; });
    this.translateService.get('public.success').subscribe(res => { this.success = res; });
    this.organizationViewModel.subscribe("syschronizeOrgByCronExpression", this.syschronizeOrgByCronExpressionRes.bind(this));
  }

  ngOnDestroy() {
    this.organizationViewModel.unsubscribe("syschronizeOrgByCronExpression", this.syschronizeOrgByCronExpressionRes.bind(this));
  }

  syschronizeOrgByCronExpressionRes(responseData: ResponseData) {
    if (!responseData.success) {
      this.toastrService.error(responseData.errorMessage, '', { timeOut: 3000 });
      return;
    } else {
      this.toastrService.success(this.success, '', { timeOut: 3000 });
      this.close();
    }
  }

  addDepartmentJob() {
    if (this.mainCron.value.cronRadio == 2) {
      if (this.mainCron.get('cronExpression').value === "" || this.mainCron.get('cronExpression').value === undefined) {
        this.toastrService.error(this.errorMessage, '', { timeOut: 3000 });
        return;
      } else {
        const quartzConfig = new QuartzConfig;
        quartzConfig.cronExpression = this.mainCron.value.cronExpression;
        quartzConfig.fullEntity = "AgentflowDepartmentJob";
        quartzConfig.jobName = "AgentflowDepartmentJob";
        quartzConfig.groupName = "Agentflow";
        this.organizationViewModel.syschronizeOrgByCronExpression(quartzConfig);
      }
    }
  }

  disableInput(bool: boolean) {
    if (bool === true) {
      this.mainCron.get('cronExpression').disable();
    }
  }

  enableInput(bool: boolean) {
    if (bool === false) {
      this.mainCron.get('cronExpression').enable();
    }
  }

  private close() {
    this.dialogRef.close();
  }

}
