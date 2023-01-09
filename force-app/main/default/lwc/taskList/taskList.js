import { LightningElement, track, api, wire } from 'lwc';

export default class TaskList extends LightningElement {
    originalTaskList = [];

    @api listTitle = '';
    @api 
    get tasks() {
        this.originalTaskList;
    }
    set tasks(value) {
        this.setAttribute('tasks', value);
        console.log('value = ' + value);
        value.forEach(element => {
            element.isComplete = (element.Status__c === 'Done');
        });
        this.originalTaskList = value;
        this.tasksToShow = value;
    }
    
    @track tasksToShow = [];
    @track _tasks = [];

    // handlers
    onSearchInputKeyUp(event) {
        const searchText = event.target.value;
        if (searchText.trim() === '') {
            this.tasksToShow = this.originalTaskList;
        } else {
            if ((this.originalTaskList).length) {
                this.tasksToShow = this.originalTaskList.filter(t => t.Short_Description__c.includes(searchText));
            }
        }
    }
}