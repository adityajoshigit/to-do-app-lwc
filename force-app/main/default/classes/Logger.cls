public with sharing class Logger {
    List<Log__c> lstLogs;
    public Logger() {
        this.lstLogs = new List<Log__c>();
    }

    public void addLog(Log__c log) {
        this.lstLogs.add(log);
    }

    public void insertAllLogs() {
        insert this.lstLogs;
    }

    public void clearAllLogs() {
        if (this.lstLogs != null) {
            this.lstLogs.clear();
        }
    }

    public List<Id> getAllLogIds() {
        List<Id> lstIds = new List<Id>();
        if (this.lstLogs != null) {
            for (Log__c log : this.lstLogs) {
                if(!String.isEmpty(log.Id)) {
                    lstIds.add(log.Id);
                }
            }
        }
        return lstIds;
    }
}
