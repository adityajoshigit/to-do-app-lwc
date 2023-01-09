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


    onSearchEventHandler(event) {
        const internalSearch = event.detail.internalSearch;
        const searchTerm = event.detail.searchTerm;
        const searchResults = event.detail.searchResults;
        console.log('internalSearch = ' + internalSearch);
        console.log('searchResults = ' + searchResults);
        console.log('searchTerm = ' + searchTerm);
        // console.log(searchResults.length);
        if (internalSearch) {
            this.allTasks = searchResults;
        } else {

        }
    }

}