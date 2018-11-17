import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { QuartzConfig } from '../../../core/models/quartz-config.model';
import { Response } from '../../../core/models/response.model';
import { OrganizationViewModel } from 'app/core/viewModel/organization-viewmodel';

@Component({
  selector: 'app-org-setting-model',
  templateUrl: './org-setting-model.component.html',
  styleUrls: ['./org-setting-model.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrgSettingModelComponent implements OnInit {

  title: string;
  mainCron: FormGroup;
  errorMessage: string;
  success: string;
  
  constructor(private dialogRef: MatDialogRef<OrgSettingModelComponent>, private organizationViewModel: OrganizationViewModel, 
    private toastrService: ToastrService, private translateService: TranslateService) {}

  ngOnInit() {
    this.mainCron = new FormGroup({
      cronRadio: new FormControl,
      cronExpression: new FormControl({ value: '', disabled: true })
    });
    this.translateService.get('organization.Synchronize').subscribe(res => { this.title = res; });
    this.translateService.get('toast.inputQuartzParameter').subscribe(res => { this.errorMessage = res; });
    this.translateService.get('public.success').subscribe(res => { this.success = res; });
  }

  addDepartmentJob() {
    if (this.mainCron.value.cronRadio == 2) {
      if (this.mainCron.get('cronExpression').value === "" || this.mainCron.get('cronExpression').value === undefined) {
        this.toastrService.error(this.errorMessage, '', { timeOut: 3000 });
        return;
      }
      const quartzConfig = new QuartzConfig;
      quartzConfig.cronExpression = this.mainCron.value.cronExpression;
      quartzConfig.fullEntity = "AgentflowDepartmentJob";
      quartzConfig.jobName = "AgentflowDepartmentJob";
      quartzConfig.groupName = "Agentflow";

      //ToDo 
      this.organizationViewModel.syschronizeOrgByCronExpression(quartzConfig).subscribe(
        (response: Response) => {
          if (!response.success) {
            this.toastrService.error(response.errorMessage, '', { timeOut: 3000 });
            return;
          } else {
            this.toastrService.info(this.success, '', { timeOut: 3000 });
            this.close();
          }
        }
      );
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
