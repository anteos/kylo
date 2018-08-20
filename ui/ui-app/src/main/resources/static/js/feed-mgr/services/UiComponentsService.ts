/**
 * @typedef {Object} TemplateTableOption
 * @property {string} description - a human-readable summary of this option
 * @property {string} displayName - a human-readable title of this option
 * @property {(string|null)} feedDetailsTemplateUrl - the template URL containing sections for viewing or editing a feed
 * @property {Array.<{name: string, description: string}>} metadataProperties - the list of metadata properties that can be used in NiFi property expressions
 * @property {(string|null)} stepperTemplateUrl - the template URL containing steps for creating or editing a feed
 * @property {number} totalSteps - the number of additional steps for creating or editing a feed
 * @property {string} type - a unique identifier for this option
 */

import * as _ from "underscore";
import { Injectable, Inject } from '@angular/core';
import { RestUrlService } from './RestUrlService';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UiComponentsService {

    /**
     * Cache of template table options.
     * @private
     * @type {(Array.<TemplateTableOption>|null)}
     */
    TEMPLATE_TABLE_OPTIONS: any = null;

    /**
     * Cache of the processor templates
     */
    PROCESSOR_TEMPLATES: any = null;

    /**
     * Map of the type, {progress}
     */
    stepperTemplateRenderProgress: any = {};


    /**
     * Flag to indicate if we are already fetching
     */
    initialProcesorTemplatePromise: Promise<any> = null;


    /**
     * Flag to indicate we are already fetching the table options
     * @type {null}
     */
    initialTemplateTableOptionsPromise: Promise<any> = null;


    constructor(private RestUrlService: RestUrlService,
                private http: HttpClient) {

    }

    startStepperTemplateRender(tableOption: any, callback: any) {
        var type = tableOption.type;
        var requests = tableOption.totalSteps == tableOption.totalPreSteps ? 1 : (tableOption.totalPreSteps > 0 ? 2 : 1);
        this.stepperTemplateRenderProgress[type] = {total: requests, complete: 0, callback: callback};
    }

    completeStepperTemplateRender(type: any) {
        var complete = true;
        if (typeof this.stepperTemplateRenderProgress[type] !== 'undefined') {
            var progress = this.stepperTemplateRenderProgress[type];
            progress.complete += 1;
            complete = progress.complete == progress.total;
            if (complete && typeof progress.callback !== 'undefined' && typeof progress.callback === 'function') {
                progress.callback(type);
            }
        }

        return complete;
    }

    /**
     * Gets the template table option with the specified type.
     * @param {string} type - the unique identifier for the table option
     * @returns {Promise} resolves to the TemplateTableOption
     */
    getTemplateTableOption(type: any) {
        return this.getTemplateTableOptions()
            .then((tableOptions: any) => {
                var selected = _.find(tableOptions, (tableOption: any) => {
                    return tableOption.type === type;
                });
                return new Promise((resolve,reject) => {
                    if (typeof selected !== 'undefined') {
                        resolve(selected);
                    } else {
                        reject();
                    }
                });
            });
    }
    getTableOptionAndCacheTemplates(type: any) {
        // var defer = this.$injector.get("$q").defer();
        // // Loads the table option template
        // this.getTemplateTableOption(type)
        //     .then((tableOption: any) => {

        //         var requests = {};
        //         if (typeof tableOption.stepperTemplateUrl !== 'undefined' && tableOption.stepperTemplateUrl) {
        //             requests['stepperTemplateUrl'] = this.$injector.get("$templateRequest")(tableOption.stepperTemplateUrl);
        //         }
        //         if (typeof tableOption.preStepperTemplateUrl !== 'undefined' && tableOption.preStepperTemplateUrl != null) {
        //             requests['preStepperTemplateUrl'] = this.$injector.get("$templateRequest")(tableOption.preStepperTemplateUrl);
        //         }

        //         this.$injector.get("$q").when(requests).then((response: any) => {
        //             defer.resolve(tableOption);
        //         });
        //     })

        // return defer.promise;
    }

    /**
     * Gets the metadata properties for the specified table option.
     *
     * @param {string} type - the unique identifier for the table option
     * @returns {Promise} resolves to the list of metadata properties
     */
    getTemplateTableOptionMetadataProperties(type: any) {
        return this.getTemplateTableOption(type)
            .then((tableOption: any) => {
                return tableOption.metadataProperties.map((property: any) => {
                    return {
                        key: "metadata.tableOption." + property.name,
                        value: "",
                        dataType: property.dataType,
                        description: property.description,
                        type: "metadata"
                    };
                })
            });
    }

    /**
     * Gets the list of template table option plugins.
     * @returns {Promise} resolves to the list of TemplateTableOption objects
     */
    getTemplateTableOptions() {
        if (this.TEMPLATE_TABLE_OPTIONS === null) {
            if (this.initialTemplateTableOptionsPromise == null) {
                this.initialTemplateTableOptionsPromise = new Promise((resolve,reject) => {
                    this.http.get(this.RestUrlService.UI_TEMPLATE_TABLE_OPTIONS).toPromise()
                    .then((response: any) => {
                        this.TEMPLATE_TABLE_OPTIONS = response;
                        resolve(this.TEMPLATE_TABLE_OPTIONS);
                    });
                });
                
            }
            return this.initialTemplateTableOptionsPromise;

        } else {
            return new Promise((resolve,reject) => {
                resolve(this.TEMPLATE_TABLE_OPTIONS);
            });
        }
    }

    /**
     * Gets the list of template table option plugins.
     * @returns {Promise} resolves to the list of TemplateTableOption objects
     */
    getProcessorTemplates(): Promise<any> {
        if (this.PROCESSOR_TEMPLATES === null) {
            if (this.initialProcesorTemplatePromise == null) {
                this.initialProcesorTemplatePromise = new Promise((resolve,reject) => {
                    this.http.get(this.RestUrlService.UI_PROCESSOR_TEMPLATES).toPromise()
                    .then((response: any) => {
                        this.PROCESSOR_TEMPLATES = response;
                        resolve(this.PROCESSOR_TEMPLATES);
                    });
                });
            }
            return this.initialProcesorTemplatePromise;

        } else {
            return new Promise((resolve,reject) => {
                resolve(this.PROCESSOR_TEMPLATES);
            });
        }

    }

}
