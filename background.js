chrome.alarms.create('fetchMessages', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'fetchMessages') {
    fetchMessages();
  }
});

async function fetchMessages() {
  try {
    const response = await fetch('https://demo2498142.mockable.io/api/notif');
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    const data = await response.json();
    const messages = data.messages;

    // Process messages
    messages.forEach((message) => {
      console.log(`Message ID: ${message.id}`);
      console.log(`Content: ${message.content}`);
      console.log(`Priority: ${message.priority}`);
      console.log(`Timestamp: ${message.timestamp}`);
      console.log(`Read: ${message.read}`);
    });
  } catch (error) {
    console.error('Unable to fetch messages:', error);
    alert('Unable to fetch messages. Please try again later.');
  }
}

function updateBadge(messages) {
  const unreadCount = messages.filter(message => !message.read).length;
  chrome.action.setBadgeText({ text: unreadCount.toString() });
  chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
}

function notifyHighPriorityMessages(messages) {
  const highPriorityMessages = messages.filter(message => message.priority === 'high' && !message.read);
  highPriorityMessages.forEach(message => {
    chrome.notifications.create(message.id, {
      type: 'basic',
      iconUrl: 'assets/icons/icon128.svg',
      title: 'High Priority Message',
      message: message.content,
      priority: 2
    });
  });
}