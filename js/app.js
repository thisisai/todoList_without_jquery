
var addButton = document.getElementsByTagName('button')[0];
var addItemTextArea = document.getElementById('new-task');
var incompleteTasks = document.getElementById('incomplete-tasks');
var completeTasks = document.getElementById('completed-tasks');

var createTaskElement = function(itemString){
  var newItem = document.createElement('li');
  
  //checkbox
  var checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  
  //label
  var label = document.createElement('label');
  label.innerText = itemString;
  
  //edit input
  var editInput = document.createElement('input');
  editInput.type = "text";
  
  //edit button
  var editButton = document.createElement('button');
  editButton.innerText = "Edit";
  editButton.classList.add("edit");
  
  //delete button
  var deleteButton = document.createElement('button');
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete");
  
  //start append
  newItem.appendChild(checkbox);
  newItem.appendChild(label);
  newItem.appendChild(editInput);
  newItem.appendChild(editButton);
  newItem.appendChild(deleteButton);
  
  //return the combined newItem
  return newItem;
};

var addTask = function (){ 
  var inputVal = addItemTextArea.value;
  var listItem = createTaskElement(inputVal);
  incompleteTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  addItemTextArea.value = "";
};

var editTask = function(){
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');
  
  //if it is in edit mode , label get the input's value
  if( listItem.classList.contains('editMode') ){
    label.innerText = editInput.value;
    this.innerText = "Edit";
  }else{
    //else the input get the label's text
    editInput.value = label.innerText;
    this.innerText = "Save";
  }
  
  //toggle the class
  listItem.classList.toggle('editMode');
};

var deleteTask = function(){
  var listItem = this.parentNode;
  listItem.remove();
};

var taskCompleted = function(){
  //when the checkbox is clicked, append the list to completeList
  var listItem = this.parentNode;
  completeTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskIncompleted);
};

var taskIncompleted = function(){
  //when the checkbox is clicked, append the list to incompleteList
  var listItem = this.parentNode;
  incompleteTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var someAjaxCall = function(){
  console.log("this is a AJAX call!");
};

//Add task, 使用addEventListener可以在同一個button上做多個監聽事件（.onclick只能聽一個事件）
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', someAjaxCall);

var bindTaskEvents = function(taskListItem, checkboxEventHandler){
  //每一個可以跟使用者互動的元件都要綁定動作上去
  //select taskitem's children  
  var checkbox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');
  
  //bind the edit button with the editTask
  editButton.onclick = editTask;
  
  //bind the delete button with the deleteTask
  deleteButton.onclick = deleteTask;
  
  //bind completeTask to checkbox
  checkbox.onchange = checkboxEventHandler;
}



//cycle the listItems in the incompleteTasks
for(var i = 0 ; i < incompleteTasks.children.length ; i++){
  //for each list, bind the 'edit' & 'delete' event
  bindTaskEvents(incompleteTasks.children[i], taskCompleted);
}
    
for(var i = 0 ; i < completeTasks.children.length ; i++){
  //for each list, bind the 'edit' & 'delete' event
  bindTaskEvents(completeTasks.children[i], taskIncompleted);
}
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    