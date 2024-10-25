//유저가 값을 입력한다
//+버튼을 클릭하면, 할일이 추가된다
//delete버튼을 누르면, 할일이 삭제된다.
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1. check버튼을 클릭하는 순간, false -> true
//2. true이면 끝난걸로 간주하고, 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고, 그대로
//not done, done 탭을 누르면, 언더바가 이동한다
//not done탭은 진행중인 아이템만, done탭은 끝난 아이템만
//all탭을 누르면, 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("input-area");
let addButton = document.getElementById("add-button");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div");
let mode = 'all';
let filterList = [];

addButton.addEventListener("click", addTask);

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let list = [];
    if(mode === "all"){
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    }
    let resultHTML = '';
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete === true){
            resultHTML += `<div class="task">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">check</button>
                        <button onclick="deleteTask('${list[i].id}')">delete</button>
                    </div>
                </div>`
        }else{
            resultHTML += `<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">check</button>
                        <button onclick="deleteTask('${list[i].id}')">delete</button>
                    </div>
                </div>`
        }
        
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    render();
}

function filter(event){
    mode = event.target.id;
    filterList = [];
    if(mode === "all"){
        render();
    }else if(mode === "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중",filterList)
    }else if(mode === "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

let underLine = document.getElementById("under-line");

console.log(tabs);

tabs.forEach(menu=>menu.addEventListener("click",(e)=>lineIndicator(e)))

function lineIndicator(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}