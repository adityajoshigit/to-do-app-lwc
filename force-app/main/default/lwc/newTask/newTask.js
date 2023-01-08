import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning//platformShowToastEvent';
import TASK__C_OBJ from '@salesforce/schema/Task__c';
import { createRecord } from 'lightning/uiRecordApi';
import TASK__C_SHORT_DESCRIPTION_FLD from '@salesforce/schema/Task__c.Short_Description__c';
// import TASK__C_LABELS from '@salesforce/schema/Task__c.Labels__c';


export default class NewTask extends LightningElement {
    categories = [
        {
            id: 1,
            label: 'Personal'
        },
        {
            id: 2,
            label: 'Work'
        },
        {
            id: 3,
            label: 'Education'
        },
        {
            id: 4,
            label: 'Entertainment'
        }
    ];
    
    @api addBtnLabel = 'Add';
    @api makeBackendUpdates = false;

    @track newTaskLabel = '';

    // button event handler functions
    onAddClick() {
        this.addNewTask();
    }

    // backend related functions
    addNewTask() {
        if (this.makeBackendUpdates) {
            const fields = {};
            fields[TASK__C_SHORT_DESCRIPTION_FLD.fieldApiName] = this.newTaskLabel;
            
            const recordInput = {
                apiName: TASK__C_OBJ.objectApiName,
                fields
            };
    
            createRecord(recordInput)
                .then(result => {
                    this.showToast('New Task Created!', '', 'success', '');
                    this.fireCreationEvent(result.Id, this.newTaskLabel);
                    this.resetState();
                })
                .catch(errorResult => {
                    this.showToast('Oops!', 'Something went wrong..', 'error', '');
                    console.log(errorResult);
                });
        } else {
            this.fireCreationEvent(null, this.newTaskLabel);
            this.resetState();
        }
    }

    // utility functions
    showToast(_title, _msg, _variant, _mode) {
        _title = _title || 'Notification';
        _msg = _msg || '';
        _variant = _variant || 'info';
        _mode = _mode || 'pester';
        this.dispatchEvent(
            new ShowToastEvent({
                title : _title,
                message : _msg,
                variant : _variant,
                mode : _mode
            })
        );
    }

    resetState() {
        this.newTaskLabel = '';
    }

    // events
    fireCreationEvent(newRecordId, newTaskText) {
        const evt = new CustomEvent(
            'newtask',
            { 
                recordId: newRecordId,
                taskText: newTaskText
            }
        );
        this.dispatchEvent(evt);
    }
    
}