// 1. Event Scheduling Logic
const events = [];
document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const eventTitle = document.getElementById('eventTitle').value;
    const startTime = new Date(document.getElementById('startTime').value);
    const endTime = new Date(document.getElementById('endTime').value);

    // Check if the year entered is exactly 4 digits
    if (!isValidYear(startTime) || !isValidYear(endTime)) {
        alert("Please enter a valid year (4 digits) for both start and end time.");
        return;
    }

    if (checkConflict(startTime, endTime)) {
        alert("This event conflicts with an existing event.");
        return;
    }

    const newEvent = { eventTitle, startTime, endTime };
    events.push(newEvent);
    displayEvents();
});

function isValidYear(date) {
    const year = date.getFullYear().toString();
    return year.length === 4; // Ensures the year is 4 digits
}

function checkConflict(startTime, endTime) {
    return events.some(event => startTime < event.endTime && endTime > event.startTime);
}

function displayEvents() {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '<ul>';
    events.forEach((event, index) => {
        eventList.innerHTML += `
            <li>
                <strong>${event.eventTitle}</strong><br>
                From: ${event.startTime.toLocaleString()}<br>
                To: ${event.endTime.toLocaleString()}<br>
                <button class="deleteEvent" data-index="${index}">Delete Event</button>
            </li>`;
    });
    eventList.innerHTML += '</ul>';

    // Add event listeners for delete buttons
    document.querySelectorAll('.deleteEvent').forEach(button => {
        button.addEventListener('click', function() {
            const eventIndex = this.getAttribute('data-index');
            deleteEvent(eventIndex);
        });
    });
}

function deleteEvent(index) {
    events.splice(index, 1);  // Remove the event from the array
    displayEvents();           // Re-render the event list
}

// 2. Budget Tracking Logic
let totalBudget = 0;
let expenses = [];
document.getElementById('budget').addEventListener('change', function() {
    totalBudget = parseFloat(this.value);
    document.getElementById('totalBudget').textContent = totalBudget.toFixed(2);
});

document.getElementById('addExpense').addEventListener('click', function() {
    const expenseAmount = parseFloat(prompt("Enter expense amount:"));
    if (!isNaN(expenseAmount)) {
        expenses.push(expenseAmount);
        totalBudget -= expenseAmount;
        document.getElementById('totalBudget').textContent = totalBudget.toFixed(2);
        updateExpenseList();
    }
});

function updateExpenseList() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `$${expense.toFixed(2)}`;
        expenseList.appendChild(li);
    });
}

// 3. Client Communication Logic
document.getElementById('sendMessage').addEventListener('click', function() {
    const message = document.getElementById('messageInput').value;
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        document.getElementById('chatBox').appendChild(messageElement);
        document.getElementById('messageInput').value = '';
    }
});

// 4. Vendor Management Logic
let selectedVendors = [];

document.getElementById('selectVendor').addEventListener('click', function() {
    const selectedVendor = document.getElementById('vendorSelect').value;
    if (!selectedVendors.includes(selectedVendor)) {
        selectedVendors.push(selectedVendor);
        displaySelectedVendors();
    } else {
        alert("Vendor already selected!");
    }
});

document.getElementById('addCustomVendor').addEventListener('click', function() {
    const customVendor = document.getElementById('customVendor').value;
    if (customVendor && !selectedVendors.includes(customVendor)) {
        selectedVendors.push(customVendor);
        displaySelectedVendors();
        document.getElementById('customVendor').value = '';
    } else {
        alert("Please enter a valid vendor name.");
    }
});

function displaySelectedVendors() {
    const vendorList = document.getElementById('selectedVendors');
    vendorList.innerHTML = '';
    selectedVendors.forEach(vendor => {
        const li = document.createElement('li');
        li.textContent = vendor;
        vendorList.appendChild(li);
    });
}

// Show input field and button to add custom vendor
document.getElementById('vendorSelect').addEventListener('change', function() {
    const vendorSelect = this.value;
    if (vendorSelect === "Other") {
        document.getElementById('customVendor').style.display = "block";
        document.getElementById('addCustomVendor').style.display = "block";
    } else {
        document.getElementById('customVendor').style.display = "none";
        document.getElementById('addCustomVendor').style.display = "none";
    }
});

// 5. Notifications Logic
document.getElementById('notify').addEventListener('click', function() {
    alert("Event has been scheduled and vendors have been notified!");
});
