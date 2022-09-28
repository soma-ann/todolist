//selectors
const todoInput=document.querySelector('.todo-input');
const todobtn=document.querySelector('.todo-button');
const todolist=document.querySelector('.todo-list');
const filter=document.querySelector(".filter-todo");



//event listeners
document.addEventListener("DOMContentLoaded",getTodos);
todobtn.addEventListener('click',addTodo);
todolist.addEventListener('click',deleteCheck);
filter.addEventListener('change',filterTodo);


//functions
function addTodo(event){
event.preventDefault()
if(todoInput.value.trim() === "") {
    return;
}



const todoDiv=document.createElement('div');
todoDiv.classList.add('todo');

const newTodo=document.createElement('li');
newTodo.innerText=todoInput.value;
newTodo.classList.add("todo-item")
todoDiv.appendChild(newTodo);
saveLocalTodos(todoInput.value)

const checked =document.createElement('button');
checked.innerHTML='<i class="fas fa-check"></i>'
checked.classList.add('complete-btn');
todoDiv.appendChild(checked);

const trashButton=document.createElement('button');
trashButton.innerHTML='<i class="fas fa-trash"></i>';
trashButton.classList.add('trash-btn');
todoDiv.appendChild(trashButton);

todolist.appendChild(todoDiv);

todoInput.value="";
}


function deleteCheck(e){
const item= e.target;
//delet todo
if(item.classList[0]==="trash-btn"){
    const todo=item.parentElement;
    todo.classList.add('fall');
    removeT(todo);
    todo.addEventListener('transitionend',function(){
todo.remove();
    });
}
if(item.classList[0]==="complete-btn"){
    const todo=item.parentElement;
    todo.classList.toggle('completed')
}
}

function filterTodo(e) {
    const todos = todolist.children;
    for(const todo of todos) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
      }
    };
  };
  
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}
function getTodos(){
let todos;
if(localStorage.getItem('todos')===null){
    todos=[]
}else{
    todos=JSON.parse(localStorage.getItem('todos'));
}
todos.forEach(function (todo) {
    const todoDiv=document.createElement('div');
todoDiv.classList.add('todo');

const newTodo=document.createElement('li');
newTodo.innerText=todo;
newTodo.classList.add("todo-item")
todoDiv.appendChild(newTodo);


const checked =document.createElement('button');
checked.innerHTML='<i class="fas fa-check"></i>'
checked.classList.add('complete-btn');
todoDiv.appendChild(checked);

const trashButton=document.createElement('button');
trashButton.innerHTML='<i class="fas fa-trash"></i>';
trashButton.classList.add('trash-btn');
todoDiv.appendChild(trashButton);

todolist.appendChild(todoDiv);
});
}
function removeT(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
const todoIndex = todo.children[0].innerText;
todos.splice(todos.indexOf(todoIndex), 1);
localStorage.setItem("todos",JSON.stringify(todos));
}






