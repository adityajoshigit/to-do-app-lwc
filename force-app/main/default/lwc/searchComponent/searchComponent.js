import { LightningElement, api } from 'lwc';

export default class SearchComponent extends LightningElement {
    _tasks = [];
    @api internalSearch = false;
    @api searchInputLabel = '';
    @api get tasks() {
        return this._tasks;
    }
    set tasks(value) {
        if (this._tasks.length === 0) {
            this._tasks = value;
        } 
    }


    // handlers
    onSearchInputKeyUp(event) {
        const searchTerm = event.target.value;
        const internalSearch = this.internalSearch;
        let resData = {
            internalSearch,
            searchTerm,
            searchResults: this.internalSearch ? this.performSearch(searchTerm) : null
        };
        this.dispatchEvent(
            new CustomEvent(
                'search',
                {
                    detail: {
                        ...resData
                    }
                }
            )
        );
    }

    performSearch(searchTerm) {
        let searchResults = [];
        if (searchTerm && searchTerm.trim()) {
            if ((this._tasks).length) {
                this._tasks.forEach(t => {
                    if(t.Short_Description__c
                    && t.Short_Description__c.includes(searchTerm)
                    ) {
                        searchResults.push(t);
                    } 
                });
            }
        } else {
            searchResults = this._tasks;
        }
        return searchResults;
    }
}