import { LightningElement, track, wire } from 'lwc';
import getAllTasks from '@salesforce/apex/ToDoController.getAllTasks';

export default class ToDoApp extends LightningElement {
    @track allTasks;
    
    @wire(getAllTasks, {status: null})
    wiredGetAllTasks({ data, error}) {
        console.log('data = ' + data);
        console.log('error = ' + error);
        if (data) {
            
        } else {
            
        }
    }

}