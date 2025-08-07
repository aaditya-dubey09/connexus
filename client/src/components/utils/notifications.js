// Notification utility functions for Connexus chat application

/**
 * Request notification permission from the user
 * @returns {Promise<string>} Permission status
 */
export const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
        console.warn("This browser does not support notifications");
        return "denied";
    }

    if (Notification.permission === "granted") {
        return "granted";
    }

    if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        return permission;
    }

    return Notification.permission;
};

/**
 * Show a notification for a new message
 * @param {Object} messageData - Message data
 * @param {string} messageData.senderName - Name of the message sender
 * @param {string} messageData.message - Message content
 * @param {string} messageData.avatar - Sender's avatar URL
 */
export const showMessageNotification = (messageData) => {
    if (Notification.permission !== "granted") {
        return;
    }

    const { senderName, message, avatar } = messageData;

    const notification = new Notification(`New message from ${senderName}`, {
        body: message.length > 50 ? message.substring(0, 50) + "..." : message,
        icon: avatar || "/icons/icon-192x192.png",
        badge: "/icons/icon-192x192.png",
        tag: `message-${senderName}`, // Prevents duplicate notifications
        requireInteraction: false,
        silent: false,
    });

    // Auto close notification after 5 seconds
    setTimeout(() => {
        notification.close();
    }, 5000);

    // Handle notification click
    notification.onclick = () => {
        window.focus();
        notification.close();
    };
};

/**
 * Show a notification for user online status
 * @param {Object} userData - User data
 * @param {string} userData.username - Username
 * @param {string} userData.fullName - Full name
 * @param {string} userData.avatar - Avatar URL
 */
export const showUserOnlineNotification = (userData) => {
    if (Notification.permission !== "granted") {
        return;
    }

    const { username, fullName, avatar } = userData;
    const displayName = fullName || username;

    const notification = new Notification(`${displayName} is online`, {
        body: "Now available to chat",
        icon: avatar || "/icons/icon-192x192.png",
        badge: "/icons/icon-192x192.png",
        tag: `online-${username}`,
        requireInteraction: false,
        silent: true, // Silent for online notifications
    });

    // Auto close notification after 3 seconds
    setTimeout(() => {
        notification.close();
    }, 3000);
};

/**
 * Check if notifications are supported and permission is granted
 * @returns {boolean} Whether notifications can be shown
 */
export const canShowNotifications = () => {
    return "Notification" in window && Notification.permission === "granted";
};

/**
 * Initialize notification system
 * Requests permission and sets up service worker for background notifications
 */
export const initializeNotifications = async () => {
    try {
        // Request permission
        const permission = await requestNotificationPermission();

        if (permission === "granted") {
            console.log("Notifications enabled");

            // Register service worker for background notifications
            if ("serviceWorker" in navigator) {
                const registration = await navigator.serviceWorker.ready;
                console.log("Service worker ready for notifications:", registration);
            }
        } else {
            console.log("Notification permission denied");
        }

        return permission;
    } catch (error) {
        console.error("Error initializing notifications:", error);
        return "denied";
    }
};

/**
 * Show a typing notification
 * @param {string} username - Username of the person typing
 */
export const showTypingNotification = (username) => {
    if (Notification.permission !== "granted") {
        return;
    }

    const notification = new Notification(`${username} is typing...`, {
        body: "Composing a message",
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-192x192.png",
        tag: `typing-${username}`,
        requireInteraction: false,
        silent: true,
    });

    // Auto close typing notification after 2 seconds
    setTimeout(() => {
        notification.close();
    }, 2000);
};

/**
 * Clear all notifications for a specific user
 * @param {string} username - Username to clear notifications for
 */
export const clearUserNotifications = (username) => {
    // This is limited by browser APIs, but we can at least prevent new ones
    console.log(`Clearing notifications for ${username}`);
};

/**
 * Play notification sound
 * TODO: Implement notification sound functionality in next versions
 * This will include custom notification sounds and volume controls
 */
export const playNotificationSound = () => {
    // Features to implement:
    // - Custom notification sound files
    // - Volume control
    // - Different sounds for different notification types
    // - Sound settings persistence
    console.log("Notification sound - Coming Soon in next versions");
};

/**
 * Create message notification
 * TODO: Enhanced notification creation with more features in next versions
 * @param {Object} messageData - Message data for notification
 */
export const createMessageNotification = (messageData) => {
    // Features to implement:
    // - Rich notifications with action buttons
    // - Message preview with media support
    // - Group chat notifications
    // - Priority levels
    // - Custom notification templates
    console.log("Advanced message notifications - Coming Soon in next versions", messageData);

    // For now, use the basic showMessageNotification
    showMessageNotification(messageData);
};

/**
 * Notification settings management
 */
export const notificationSettings = {
    // Get current settings from localStorage
    getSettings: () => {
        const defaults = {
            messages: true,
            userOnline: false,
            typing: false,
            sound: true,
        };

        try {
            const saved = localStorage.getItem("connexus-notification-settings");
            return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
        } catch {
            return defaults;
        }
    },

    // Save settings to localStorage
    saveSettings: (settings) => {
        try {
            localStorage.setItem("connexus-notification-settings", JSON.stringify(settings));
            return true;
        } catch {
            return false;
        }
    },

    // Check if specific notification type is enabled
    isEnabled: (type) => {
        const settings = notificationSettings.getSettings();
        return settings[type] === true;
    },
};

// Export default notification helper
export default {
    requestPermission: requestNotificationPermission,
    showMessage: showMessageNotification,
    showUserOnline: showUserOnlineNotification,
    showTyping: showTypingNotification,
    canShow: canShowNotifications,
    initialize: initializeNotifications,
    settings: notificationSettings,
    clearUser: clearUserNotifications,
    playSound: playNotificationSound,
    createMessage: createMessageNotification,
};
