import { LightningElement, track, api } from 'lwc';

export default class TaskList extends LightningElement {
    originalTaskList = [];
    _showSearchBar = false;
    @api get showSearchBar() {
        return this._showSearchBar;
    }
    set showSearchBar(value) {
        console.log('value set by parent for showSearchBar = ' + value);
        this._showSearchBar = value;
    }
    @api listTitle = '';
    
    @api 
    get tasks() {
        return this.originalTaskList;
    }
    set tasks(value) {
        this.tasksChangeHandler(value);
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

    tasksChangeHandler(value) {
        this._tasks = [];
        this.originalTaskList = [];
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
}