import { LightningElement, track, api } from 'lwc';

export default class TaskList extends LightningElement {
    originalTaskList = [];
    @api
    listTitle = '';
    
    @api 
    get tasks() {
        return this.originalTaskList;
    }
    set tasks(value) {
        value = value || [];
        value.forEach(element => {
            const taskelement = {
                ...element,
                isComplete: (element.Status__c === 'Done')
            }
            this._tasks.push(taskelement);
            this.originalTaskList.push(taskelement);
        });
    }

    @track _tasks = [];

    // handlers
    onSearchInputKeyUp(event) {
        const searchText = event.target.value;
        if (searchText.trim() === '') {
            this._tasks = this.originalTaskList;
        } else {
            if ((this.originalTaskList).length) {
                this._tasks = this.originalTaskList.filter(t => t.Short_Description__c.includes(searchText));
            }
        }
    }
}