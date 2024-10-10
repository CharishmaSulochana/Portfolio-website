document.addEventListener("DOMContentLoaded", () => {
    const taskDescriptionInput = document.getElementById("taskDescription");
    const dueDateInput = document.getElementById("dueDate");
    const addTaskButton = document.getElementById("addTaskButton");
    const clearCompletedButton = document.getElementById("clearCompletedButton");
    const taskList = document.getElementById("taskList");
  
    const tasks = [];
  
    function addTask(description, dueDate) {
      const task = {
        description,
        dueDate,
        completed: false,
      };
      tasks.push(task);
      renderTasks();
    }
  
    function renderTasks(filter = 'all') {
      taskList.innerHTML = ""; // Clear the current list
  
      const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true; // For 'all'
      });
  
      filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  
      filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = `${task.description} (Due: ${task.dueDate})`;
        li.classList.toggle("completed", task.completed);
  
        li.addEventListener("click", () => {
          task.completed = !task.completed;
          renderTasks();
        });
  
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", (event) => {
          event.stopPropagation();
          tasks.splice(index, 1);
          renderTasks();
        });
  
        li.appendChild(deleteButton);
        taskList.appendChild(li);
      });
    }
  
    function clearCompletedTasks() {
      for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].completed) {
          tasks.splice(i, 1);
        }
      }
      renderTasks();
    }
  
    function validateInput(description, dueDate) {
      const descriptionRegex = /^.{1,}$/; // At least one character
      const dueDateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
      return descriptionRegex.test(description) && dueDateRegex.test(dueDate);
    }
  
    addTaskButton.addEventListener("click", () => {
      const description = taskDescriptionInput.value.trim();
      const dueDate = dueDateInput.value.trim();
  
      if (!validateInput(description, dueDate)) {
        alert("Please enter a valid task description and due date.");
        return;
      }
  
      addTask(description, dueDate);
      taskDescriptionInput.value = ""; // Clear input
      dueDateInput.value = ""; // Clear input
    });
  
    clearCompletedButton.addEventListener("click", clearCompletedTasks);
  
    document.getElementById("filterAll").addEventListener("click", () => renderTasks('all'));
    document.getElementById("filterActive").addEventListener("click", () => renderTasks('active'));
    document.getElementById("filterCompleted").addEventListener("click", () => renderTasks('completed'));
  });
  