import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {UpgradeModule} from "@angular/upgrade/static";

import {addButtonServiceProvider, broadcastServiceProvider, notificationServiceProvider, 
        paginationServiceProvider, tableOptionsServiceProvider, accessControlServiceProvider,
        stateServiceProvider,
        commonRestURLServiceProvider,
        userGroupServiceProvider,
        angularModuleExtensionServiceProvider,
        fileUploadServiceProvider,
        utilsServiceProvider} from "./angular2";

@NgModule({
    imports: [
        CommonModule,
        UpgradeModule
    ],
    providers: [
        addButtonServiceProvider,
        broadcastServiceProvider,
        notificationServiceProvider,
        paginationServiceProvider,
        tableOptionsServiceProvider,
        accessControlServiceProvider,
        stateServiceProvider,
        commonRestURLServiceProvider,
        userGroupServiceProvider,
        fileUploadServiceProvider,
        utilsServiceProvider,
        angularModuleExtensionServiceProvider
    ]
})
export class KyloServicesModule {

}
