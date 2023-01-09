import { LightningElement, track, wire } from 'lwc';
import getAllTasks from '@salesforce/apex/ToDoController.getAllTasks';

export default class ToDoApp extends LightningElement {
    
    @track
    allTasks = [];

    @wire(getAllTasks)
    wiredGetAllTasks(
        {
            data,
            error
        }
    ) {
        if (data) {
            this.allTasks = data;
        } else if(error) {
            this.allTasks = [];
        }
    }

    get taskListData() {
        return this.allTasks.data;
    }

}