export function getTodayDate(time?: string | number | Date): string {
    let today: Date;
    try {
        if (!time) {
            throw new Error('No time provided');
        }
        today = new Date(time);
    } catch (err) {
        today = new Date(Date.now());
    }

    today.setUTCHours(today.getUTCHours() + 1); // Add 1 hour to get UTC+1 time
    today.setUTCHours(0, 0, 0, 0); // Set time to midnight
    const todayString = today.toISOString().split('T')[0]; // Convert to ISO string and get only the date

    return todayString;
}
