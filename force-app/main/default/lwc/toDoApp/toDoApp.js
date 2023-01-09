import { LightningElement, track, wire } from 'lwc';
import getAllTasks from '@salesforce/apex/ToDoController.getAllTasks';
import { refreshApex } from '@salesforce/apex';

export default class ToDoApp extends LightningElement {
    @track wiredTasksResponse = null;

    // @track
    // allTasks = [];

    get allTasks() {
        return (
            (this.wiredTasksResponse && this.wiredTasksResponse.data && this.wiredTasksResponse.data.length)
            ? this.wiredTasksResponse.data
            : []
        );
    }

    @wire(getAllTasks)
    wiredGetAllTasks(
        value
    ) {
        this.wiredTasksResponse = value;
    }

    onNewTaskEventHandler() {
        this.refreshWiredAllTasks();
    }

    refreshWiredAllTasks() {
        return refreshApex(this.wiredTasksResponse);
    }

}