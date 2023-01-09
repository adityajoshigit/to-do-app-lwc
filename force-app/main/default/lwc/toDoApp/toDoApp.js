import { LightningElement, wire } from 'lwc';
import getAllTasks from '@salesforce/apex/ToDoController.getAllTasks';

export default class ToDoApp extends LightningElement {
    @wire(getAllTasks, {status: null})
    alltasks;

    
}