export const createNotification = (message: string) => {
    if (Notification.permission === 'granted') {
        new Notification(message, {
            body: message
        })
    }
}