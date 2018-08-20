import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatStepperModule} from '@angular/material/stepper';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import {BrowserModule} from "@angular/platform-browser";

import { CovalentCommonModule } from '@covalent/core/common';
import {CovalentLoadingModule} from "@covalent/core/loading";
import {CovalentMenuModule} from "@covalent/core/menu";
import {CovalentNotificationsModule} from "@covalent/core/notifications";
import { CovalentChipsModule } from '@covalent/core/chips';

import {TranslateModule} from "@ngx-translate/core";

import {KyloServicesModule} from "../../services/services.module";
import {KyloCommonModule} from "../../common/common.module";

import { UIRouterModule } from "@uirouter/angular";
import {jobStates} from "./jobs.states";

import { MatSnackBarModule } from "@angular/material/snack-bar";

import { CovalentDataTableModule } from '@covalent/core/data-table';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentPagingModule } from '@covalent/core/paging';
import { FormsModule, ReactiveFormsModule, FormControlDirective } from '@angular/forms';
import * as angular from "angular";
import { JobsPageController } from "./JobsPageController.component";
import { JobsCardController, abandonAllDialogController, JobFilterHelpPanelMenuCtrl } from "./JobsCardController.component";
import TabService from "../services/TabService";
import OpsManagerJobService from "../services/OpsManagerJobService";
import OpsManagerRestUrlService from "../services/OpsManagerRestUrlService";
import IconService from "../services/IconStatusService";
import { OpsManagerServicesModule } from "../services/ops-mgr.services.module";

@NgModule({
    declarations: [
        JobsPageController,
        JobsCardController,
        abandonAllDialogController,
        JobFilterHelpPanelMenuCtrl
    ],
    entryComponents: [
        JobsPageController,
        JobsCardController,
        JobFilterHelpPanelMenuCtrl
    ],
    imports: [
        CovalentCommonModule,
        CovalentLoadingModule,
        CovalentDataTableModule,
        CovalentSearchModule,
        CovalentPagingModule,
        CovalentMenuModule,
        CovalentNotificationsModule,
        CovalentChipsModule,
        KyloServicesModule,
        KyloCommonModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatInputModule,
        MatSelectModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatDialogModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        MatFormFieldModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatSnackBarModule,
        CovalentDialogsModule,
        MatTabsModule,
        OpsManagerServicesModule,
        UIRouterModule.forChild({states: jobStates})
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [ {provide: "$injector", useFactory: () => angular.element(document.body).injector()}
    ]
})
export class JobsModule {
    constructor() {
    }
}