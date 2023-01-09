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

    onSearchEventHandler(event) {
        const internalSearch = event.detail.internalSearch;
        const searchTerm = event.detail.searchTerm;
        const searchResults = event.detail.searchResults;
        console.log('internalSearch = ' + internalSearch);
        console.log('searchResults = ' + searchResults);
        console.log('searchTerm = ' + searchTerm);
        // console.log(searchResults.length);
        if (internalSearch) {
            this._tasks = searchResults;
        } else {

        }
    }
}