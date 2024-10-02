// Function to save options to Chrome storage
function saveOptions() {
	const notificationSound = document.getElementById('notificationSound').checked;
	const messagePriority = document.getElementById('messagePriority').value;
  
	chrome.storage.sync.set({
	  notificationSound,
	  messagePriority
	}, () => {
	  const status = document.getElementById('status');
	  status.textContent = 'Options saved.';
	  setTimeout(() => {
		status.textContent = '';
	  }, 1000);
	});
  }
  
  // Function to restore options from Chrome storage
  function restoreOptions() {
	chrome.storage.sync.get({
	  notificationSound: false,
	  messagePriority: 'all'
	}, (items) => {
	  document.getElementById('notificationSound').checked = items.notificationSound;
	  document.getElementById('messagePriority').value = items.messagePriority;
	});
  }
  
  // Event listeners for DOM content loaded and save button click
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);