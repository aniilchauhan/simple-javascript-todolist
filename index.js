let inputEle = document.getElementById("todoInput");
let addButton = document.getElementById("addList");
let newTodo = document.getElementById("newTodo");
let todoCount = document.getElementById("todoCount");
let clearButton = document.getElementById("clearButton");
let errorMsg = document.getElementById("errorMsg");
let listArr = [];
let todoEmpty = document.createElement("p");

todoEmpty.classList = "todo-empty";
todoEmpty.id = "todoEmpty";
todoEmpty.innerText = "Your todo list is empty";
todoEmpty.style.fontSize = "25px";
let count = 0;

function addTodo(e) {
    // console.log(e.target);
    let todoTxt = document.createElement("p");
    todoTxt.innerText = inputEle.value;
    todoTxt.className = "new-todo-item";
    todoTxt.id = `todoItem-${count}`
    todoEmpty.remove();
    if (inputEle.value !== "") {
        newTodo.appendChild(todoTxt);
        listArr.push(todoTxt.innerText);
        inputEle.value = "";
        count++;
        errorMsg.innerText = "";
        console.log(listArr);
    }
    else {
        errorMsg.innerText = "please enter something";
    }
    if (newTodo.childElementCount > 3) {
        newTodo.classList.add("todo-overflow");
    }
    localStorage.setItem("listArr", JSON.stringify(listArr));
    todoCount.innerHTML = count;
};
function clearTodo(e) {
    let newList = document.querySelectorAll(".new-todo-item");
    newList.forEach(element => {
        element.remove();
        count = 0;
        todoCount.innerHTML = count;
        localStorage.clear();
        listArr = [];
    });
    newTodo.appendChild(todoEmpty);
    newTodo.classList.remove("todo-overflow");
}
let countArr = [];
let islistItem = "no";
newTodo.addEventListener("click", (e) => {
    let listItem = e.target;
    if (listItem.style.textDecoration !== 'line-through') {
        count--;
        listItem.style.textDecoration = "line-through";
    } else {
        count++;
        listItem.style.textDecoration = "none";
    }
    todoCount.innerHTML = count;
    console.log(countArr);
});
window.addEventListener("load", showTodo);
function showTodo(e) {
    let listItems = JSON.parse(localStorage.getItem("listArr"));
    if (listItems != null) {
        listItems.forEach((element) => {
            count++;
            let todoTxt = document.createElement("p");
            todoTxt.innerText = element;
            todoTxt.className = "new-todo-item";
            todoTxt.id = `todoItem-${count}`

            newTodo.appendChild(todoTxt);
        })
    }
    else {
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(json => {
                for (let i = 1; i <= 4; i++) {
                    let todoTxt1 = document.createElement("p");
                    todoTxt1.innerText = json[Math.floor(Math.random() * 10)]["title"];
                    todoTxt1.className = "new-todo-item";
                    todoTxt1.id = "todoItem1";
                    newTodo.appendChild(todoTxt1);
                }
            })
        count = 4;
    }
    if (newTodo.childElementCount > 2) {
        newTodo.classList.add("todo-overflow");
    }
    todoCount.innerHTML = count;
}