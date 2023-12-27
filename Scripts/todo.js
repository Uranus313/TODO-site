let list1=[];
function save(list,to,deleteButton,editButton){
        localStorage.setItem("todo"+list.length,JSON.stringify(to));
        console.log("todo"+list.length);
        list.push(to);
        console.log(list.length);     
        deleteButton.onclick = function(){
            deleteTodo(list,to);
        }
        editButton.onclick = function(){
            editTodo(list,to,editButton.parentElement,editButton);
        }    
}
function editTodo(list,to,father,editButton){
    let p = father.firstChild;
    let editField = document.createElement('input');
    editField.type = 'text';
    editField.placeholder = 'new text';
    p.style = 'display : none;';
    p.after(editField);
    editButton.innerHTML = 'done';
    editButton.onclick = editDone;
    function editDone(){
        to.text = editField.value;
        p.innerHTML = editField.value;
        let n = list.indexOf(to);
        localStorage.setItem("todo"+n,JSON.stringify(to));
        editButton.innerHTML = 'edit';
        editButton.onclick = function(){
            editTodo(list,to,father,editButton);
        };
        p.style = 'display : block;';
        father.removeChild(editField);
    }
}

function deleteTodo(list,to){
    console.log('done');
    let n = list.indexOf(to);
    list.splice(n,1);
    console.log("todo"+n);
    localStorage.removeItem("todo"+n);
    n++;
    while(localStorage.getItem("todo"+n)){
        let y =JSON.parse(localStorage.getItem("todo"+n));
        let x = new todo(y.text,new Date(y.date));
        localStorage.setItem("todo"+(n-1),JSON.stringify(x));
        n++;
        show();
    }
    localStorage.removeItem("todo"+(n-1));
}; 
function f(){
    const father = document.createElement('div');
    let x= new todo(document.getElementById('todo-textField').value,document.getElementById('date-picker').valueAsDate);
    document.getElementById('todo-textField').value = '';
    const child = document.createElement('p');
    const child2 = document.createElement('p');
    child.innerHTML = x.text;
    child2.innerHTML = x.date.toISOString().slice(0,10);
    father.appendChild(child);
    father.appendChild(child2);
    const childButton = document.createElement('button');
    childButton.innerHTML="delete todo";
    father.appendChild(childButton);
    const childButton2 = document.createElement('button');
    childButton2.innerHTML="edit todo";
    father.appendChild(childButton2);    
    const parent =document.getElementById('div2');
    console.log(parent.hasChildNodes());
    if(parent.hasChildNodes()){
        parent.insertBefore(father,parent.firstChild)
    }else{
        parent.appendChild(father);
    }
    save(list1,x,childButton,childButton2);   
}
function load(){
    let i=0;
    console.log(11);
    while(localStorage.getItem("todo"+i)){
        console.log("todo"+i);
        let y =JSON.parse(localStorage.getItem("todo"+i));
        let x = new todo(y.text,new Date(y.date));
        list1.push(x);
        i++;
    }
}
function show(){
    let i=0;
    const parent =document.getElementById('div2');
    const divs = [];
    parent.innerHTML='';
    list1.forEach(myFunction);
    function myFunction(value){
        const father = document.createElement('div');
        const child = document.createElement('p');
        const child2 = document.createElement('p');
        const childButton = document.createElement('button');
        const childButton2 = document.createElement('button');
        childButton2.innerHTML="edit todo";
        child.innerHTML = value.text;
        child2.innerHTML = value.date.toISOString().slice(0,10);
        childButton.innerHTML="delete todo";
        father.appendChild(child);
        father.appendChild(child2);
        father.appendChild(childButton);
        father.appendChild(childButton2);
        childButton.onclick = function(){
            deleteTodo(list1,value);
        }
        childButton2.onclick = function(){
            editTodo(list1,value,childButton2.parentElement,childButton2);
        }
        divs.push(father);
        // console.log(parent.hasChildNodes());
        // if(parent.hasChildNodes()){
        //     parent.insertBefore(child,parent.firstChild)
        // }else{
        //     parent.appendChild(child);
        // }
    };
    const sortedDivs = divs.sort((div1,div2) => ( new Date(div1.lastChild.innerHTML) > new Date(div2.lastChild.innerHTML) ? 1 : new Date(div1.lastChild.innerHTML) < new Date(div2.lastChild.innerHTML) ? -1 : 0 ));
    const sorted = divs.sort((div1,div2) => {
        let date1 = new Date(div1.childNodes[1].innerHTML);
        let date2 = new Date(div2.childNodes[1].innerHTML);
        console.log(date2);
        console.log(date1.getTime - date2.getTime);
        return -(date1.getTime() - date2.getTime());
    } );
    sorted.forEach(myFunction2);
    function myFunction2(value){
        parent.appendChild(value);
    }

    // while(localStorage.getItem("todo"+i)){
    //     let y =JSON.parse(localStorage.getItem("todo"+i));
    //     let x = new todo(y.text,new Date(y.date));
    //     list1.push(x);
    //     const child = document.createElement('p');
    //     const childButton = document.createElement('button');
    //     child.innerHTML = list1[i].text+"<br>"+list1[i].date.toISOString().slice(0,10);
    //     childButton.innerHTML="delete todo";
    //     child.appendChild(childButton);
    //     const parent =document.getElementById('div2');
    //     console.log(parent.hasChildNodes());
    //     if(parent.hasChildNodes()){
    //         parent.insertBefore(child,parent.firstChild)
    //     }else{
    //         parent.appendChild(child);
    //     }
    //     i++;
    // }
}

function clearTodos(){
    localStorage.clear();
    list1=[];
    const parent =document.getElementById('div2');
    parent.innerHTML="";
}
class todo{
    constructor(text,date){
        this.text=text;
        this.date = date
    }
}
load();
document.getElementById('date-picker').valueAsDate = new Date();

document.getElementById('add-button').onclick= f;
document.getElementById('show-button').onclick= show;
document.getElementById('clear-button').onclick = clearTodos;