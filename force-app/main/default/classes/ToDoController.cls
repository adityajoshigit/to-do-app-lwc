public with sharing class ToDoController {

    @AuraEnabled(cacheable=true)
    public static List<Task__c> getAllTasks(String status){
        Logger loggerObj = new Logger();
        List<Task__c> tasks;
        try {
            tasks = [
                SELECT 
                    Id, 
                    Name,
                    Short_Description__c,
                    Status__c,
                    Labels__c,
                    Due_Date__c
                FROM
                    Task__c
                WHERE 
                    Status__c != NULL
                ORDER BY 
                    LastModifiedDate DESC
                LIMIT 100
            ];
        } catch (Exception e) {
            loggerObj.addLog(
                new Log__c(
                    Description__c = e.getMessage()
                )
            );
            loggerObj.insertAllLogs();
        }
        return tasks;
    }
}
