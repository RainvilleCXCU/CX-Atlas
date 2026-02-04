export interface Alert {
    databaseId: string | number;
    displayPages: string[] | string;
    doNotDisplayPages: string[];
    active: string | boolean;
    startDate: string;
    endDate: string;
    name?: string;
    heading?: string;
    message?: string;
    type?: string;
    darkMode?: boolean;
    ctaButtonText?: string;
    ctaButtonUrl?: string;
    disableDismiss?: boolean;
    iconPosition?: string;
    noIcon?: boolean;
    ctas?: Array<{
        ctaButtonText: string;
        ctaButtonUrl: string;
        ctaButtonType?: string;
    }>;
}

export const getActiveAlerts = (alerts: Alert[] = [], databaseId?: string | number): Alert[] => {
    const now = new Date();
    console.log("Getting active alerts for databaseId:", databaseId);
    console.log("Total alerts:", alerts.length);
    
    // Helper function to check if alert is active (handles both string and boolean values)
    const isActive = (alert: Alert): boolean => {
        return alert.active === true || alert.active === "1";
    };
    
    // First filter by active status
    const activeAlerts = alerts.filter(isActive);
    console.log("Active alerts:", activeAlerts.length);
    
    if (!databaseId) {
        return activeAlerts;
    }
    
    // Get alerts for the current page
    const pageAlerts = activeAlerts.filter(alert => {
        if(alert.displayPages.length === 0 && alert.doNotDisplayPages && alert.doNotDisplayPages.length > 0) {
            return !alert.doNotDisplayPages.includes(databaseId.toString());
        }
        if(alert.displayPages) {
            const displayPages = Array.isArray(alert.displayPages) 
                ? alert.displayPages 
                : [alert.displayPages];
            
            if(displayPages.length > 0) {
                return displayPages.includes(databaseId.toString());
            }
        }
        console.log("No displayPages set for alert:", alert.doNotDisplayPages);
        return alert.displayPages.length === 0; // If no displayPages, show the alert
    });
    console.log("Page alerts for databaseId", databaseId, ":", pageAlerts.length);
    
    // Get alerts that are within the start and end date
    const alertsWithinDates = pageAlerts.filter(alert => {
        if (!alert.startDate || !alert.endDate) {
            console.log("Alert missing date range:", alert);
            return false;
        }
        
        // Replace space with T to make it a valid date string
        const formattedStart = alert.startDate.replace(" ", "T");
        const formattedEnd = alert.endDate.replace(" ", "T");
        // Convert to Date object
        const startDate = new Date(formattedStart);
        const endDate = new Date(formattedEnd);
        
        console.log(`Alert ${alert.databaseId}: ${startDate} <= ${now} <= ${endDate}`);
        
        // Check if current date is within the start and end date
        return startDate <= now && endDate >= now;
    });
    
    console.log("Alerts within date range:", alertsWithinDates.length);
    return alertsWithinDates;
};