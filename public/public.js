// API CONFIG
const API_BASE = 'http://localhost:3000/api';

//Getting dom elements:
const appContainer = document.getElementById('app');

function frontendUI() {

// create sections
const html = `
    <section id="clients-section">
    <h2>Clients </h2> 

    <div class="form-group">
       <input type="text" id="client-name" placeholder="Client Name" >
    </div>

    <div class="form-group">
       <input type="email" id="client-email" placeholder="Client Email" >
    </div>

    <div class="form-group">
       <input type="text" id="client-company" placeholder="Client Company" >
    </div>

    <button id="add-client-btn"> Add Client </button>

    < <div id="clients-list" class="mt-20"></div>
    </section>


    <section id="tasks-section" >
    <h2> Tasks </h2>

    <div class="form-group">
       <select id="task-client-select" >
          <option value=""> Select Client  </option>
       </select
    </div>


    <div class="form-group">
        <input type="text" id="task-title" placeholder="Task Title" >
    </div>

   

    <div class="form-group">
        <textarea id="task-description" placeholder="Description" rows="3"></textarea>
    </div>

    <div class="form-group">
        <input type="date" id="task-due-date">
    </div>

    <button id="add-task-btn">Add Task</button>

    <div id="tasks-list" class="mt-20"></div>
    </section>

    <section id="overdue-section">
        <h2>Overdue Tasks</h2>
            <div id="overdue-list"></div>
    </section>
    `;

    appContainer.innerHTML = html;
}



// get the new elements:
let clientsList, tasksList, overdueList;
let clientName, clientEmail, clientCompany, addClientBtn;
let taskClientSelect, taskTitle, taskDescription, taskDueDate, addTaskBtn;



function getElements() {
    // Clients elements
    clientsList = document.getElementById('clients-list');
    clientName = document.getElementById('client-name');
    clientEmail = document.getElementById('client-email');
    clientCompany = document.getElementById('client-company');
    addClientBtn = document.getElementById('add-client-btn');
    
    // Tasks elements
    taskClientSelect = document.getElementById('task-client-select');
    taskTitle = document.getElementById('task-title');
    taskDescription = document.getElementById('task-description');
    taskDueDate = document.getElementById('task-due-date');
    addTaskBtn = document.getElementById('add-task-btn');
    
    // Lists
    tasksList = document.getElementById('tasks-list');
    overdueList = document.getElementById('overdue-list');
}



// api functions:
        // 1.client api
async function fetchClients() {
    try{
        const response = await fetch(`${API_BASE}/clients`);
        const clients = await response.json();
      return clients;
    } catch(error){
        console.error('Error fetching clients:', error);
    }
    
}

async function createClient(clientdata) {
    try{
        const response = await fetch(`${API_BASE}/clients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientdata)
        });
        return await response.json();
    } catch(error) {
        console.error('Error creating client:', error);
    }
}


async function deleteClient(clientId) {
    try{
        await fetch(`${API_BASE}/clients/${clientId}`, {
            method:'DELETE'
        });
        return response.ok;
    } catch(error) {
        console.log('Error deleting client:', error);
    }
    
}


          //  2. Task api 
async function fetchTasks() {
    try{
        const response = await fetch (`${API_BASE}/tasks`);
        return await  response.json();
    }catch(error) {
        console.error('Error fetching tasks:', error);
    }
}

async function fetchTasksByClient(clientId) {
    try {
        const response = await fetch(`${API_BASE}/tasks/client/${clientId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching client tasks:', error);        
    }
   
}


async function fetchOverdueTasks() {
    try {
        const response = await fetch(`${API_BASE}/tasks/overdue`);
        return await response.json();      
    } catch (error) {
        return [];
    }
    
}


async function createTasks(taskData) {
    try {
        console.log('Sending task data:', taskData);

        const response = await fetch(`${API_BASE}/tasks`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
    return await response.json();

    } catch (error) {
        console.error('Error creating task:', error);
    }   
}



async function updateTaskStatus(taskId, status) {
    try {
        const url = `${API_BASE}/tasks/${taskId}/status`;
            console.log('calling URL:', url);

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        console.log('Response status:', response.status);

        return await response.json();
    } catch (error) {
        console.error('Error updating task:', error);
    }
    
}



async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
            method: 'DELETE'
        });
        return response.ok;
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}





// RENDER FUNCTIONS:
async function renderClients() {
    const clients = await fetchClients();
    
    if (clients.length === 0) {
        clientsList.innerHTML = '<p>No clients yet. Add your first client above.</p>';
        return;
    }
    
    let html = '';
    clients.forEach(client => {
        html += `
            <div class="card" data-client-id="${client.id}">
                <h3>${client.name}</h3>
                <p>Email: ${client.email || 'Not provided'}</p>
                <p>Company: ${client.company || 'Not provided'}</p>
                <p class="text-small">Created: ${new Date(client.created_at).toLocaleDateString()}</p>
                <button class="delete" onclick="handleDeleteClient(${client.id})">Delete Client</button>
                <button onclick="viewClientTasks(${client.id})">View Tasks</button>
            </div>
        `;
    });
    
    clientsList.innerHTML = html;
}

async function renderTasks() {
    const tasks = await fetchTasks();
    
    if (tasks.length === 0) {
        tasksList.innerHTML = '<p>No tasks yet.</p>';
        return;
    }
    
    let html = '';
    tasks.forEach(task => {
        const isOverdue = task.status !== 'Completed' && new Date(task.due_date) < new Date();
        const overdueClass = isOverdue ? 'overdue' : '';
        
        html += `
            <div class="card ${overdueClass}" data-task-id="${task.id}">
                <h3>${task.title}</h3>
                <p>Client: ${task.client.name || 'Unknown'}</p>
                <p>${task.description || 'No description'}</p>
                <p>Due: ${new Date(task.due_date).toLocaleDateString()}</p>
                <p>
                    Status: 
                    <span class="status status-${task.status.toLowerCase()}">${task.status}</span>
                </p>
                ${task.status !== 'Completed' ? 
                    `<button class="complete" onclick="handleCompleteTask(${task.id})">Mark Complete</button>` : 
                    ''}
                <button class="delete" onclick="handleDeleteTask(${task.id})">Delete Task</button>
            </div>
        `;
    });
    
    tasksList.innerHTML = html;
}

async function renderOverdueTasks() {
    const tasks = await fetchOverdueTasks();
    
    if (tasks.length === 0) {
        overdueList.innerHTML = '<p>No overdue tasks. Good job!</p>';
        return;
    }
    
    let html = '';
    tasks.forEach(task => {
        html += `
            <div class="card overdue">
                <h3>${task.title}</h3>
                <p>Client: ${task.client_name}</p>
                <p>Due: ${new Date(task.due_date).toLocaleDateString()}</p>
                <button class="complete" onclick="handleCompleteTask(${task.id})">Mark Complete</button>
            </div>
        `;
    });
    
    overdueList.innerHTML = html;
}

async function renderClientSelect() {
    const clients = await fetchClients();
    
    let options = '<option value="">Select Client</option>';
    clients.forEach(client => {
        options += `<option value="${client.id}">${client.name}</option>`;
    });
    
    taskClientSelect.innerHTML = options;
}



//EVENT HANDLERS:
// Add Client Handler
async function handleAddClient() {
    const name = clientName.value.trim()// to read the actual value
    const email = clientEmail.value.trim();
    const company = clientCompany.value.trim();
    

    if (!name || !email) { // element not found
    console.error('client inputs missing');
    return;
}
    
    const clientData = { name, email, company };
    
    // Remove empty values
    if (!email) delete clientData.email;
    if (!company) delete clientData.company;
    
    const result = await createClient(clientData);
    
    if (result) {
        // Clear form
        clientName.value = '';
        clientEmail.value = '';
        clientCompany.value = '';
        
        // Refresh all displays
        await renderClients();
        await renderClientSelect();
        await renderTasks();
        await renderOverdueTasks();
        
        alert('Client created successfully with default tasks!');
    } else {
        alert('Failed to create client');
    }
}

// Add Task Handler
async function handleAddTask() {
    const client_id = taskClientSelect.value;
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const due_date = taskDueDate.value;
    
    if (!client_id) {
        alert('Please select a client');
        return;
    }
    
    if (!title) {
        alert('Task title is required');
        return;
    }
    
    if (!due_date) {
        alert('Due date is required');
        return;
    }
    
    const taskData = {
        client_id: parseInt(client_id),
        title,
        description,
        due_date
    };
    
    const result = await createTasks(taskData);
    
    if (result) {
        // Clear form
        taskClientSelect.value = '';
        taskTitle.value = '';
        taskDescription.value = '';
        taskDueDate.value = '';
        
        // Refresh displays
        await renderTasks();
        await renderOverdueTasks();
        
        alert('Task created successfully!');
    } else {
        alert('Failed to create task');
    }
}

// Delete Client Handler (make it global)
window.handleDeleteClient = async function(clientId) {
    if (confirm('Delete this client and all their tasks?')) {
        const success = await deleteClient(clientId);
        
        if (success) {
            await renderClients();
            await renderClientSelect();
            await renderTasks();
            await renderOverdueTasks();
            alert('Client deleted successfully');
        } else {
            alert('Failed to delete client');
        }
    }
};

// Delete Task Handler (make it global)
window.handleDeleteTask = async function(taskId) {
    if (confirm('Delete this task?')) {
        const success = await deleteTask(taskId);
        
        if (success) {
            await renderTasks();
            await renderOverdueTasks();
            alert('Task deleted successfully');
        } else {
            alert('Failed to delete task');
        }
    }
};

// Complete Task Handler (make it global)
window.handleCompleteTask = async function(taskId) {
    const result = await updateTaskStatus(taskId, 'Completed');
    
    if (result) {
        await renderTasks();
        await renderOverdueTasks();
        alert('Task marked as complete!');
    } else {
        alert('Failed to update task');
    }
};

// View Client Tasks (make it global)
window.viewClientTasks = async function(clientId) {
    const tasks = await fetchTasksByClient(clientId);
    
    if (tasks.length === 0) {
        alert('No tasks for this client');
        return;
    }
    
    // Create a simple alert with tasks (you can make this fancier)
    let message = 'Tasks for this client:\n\n';
    tasks.forEach(task => {
        message += `• ${task.title} (${task.status}) - Due: ${new Date(task.due_date).toLocaleDateString()}\n`;
    });
    
    alert(message);
};




// start/initialize prog:
async function  init() {
    frontendUI();
    getElements();

    addClientBtn.addEventListener('click', handleAddClient);
    addTaskBtn.addEventListener('click', handleAddTask);

    //load initial data:
    await renderClients();
    await renderClientSelect();
    await renderTasks();
    await renderOverdueTasks();
    
}

document.addEventListener('DOMContentLoaded', init);

