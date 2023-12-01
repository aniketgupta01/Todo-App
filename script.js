let todoName = document.getElementById("name");
let todoDescription = document.getElementById("description");
let myForm = document.getElementById("my-form");
let pendingTask = document.getElementById("pending");
let doneTask = document.getElementById("done");
myForm.addEventListener("submit", createList);

async function createList(e) {
  e.preventDefault();
  let myObj = {
    name: todoName.value.toUpperCase(),
    description: todoDescription.value.toUpperCase(),
    isDone: false,
  };
  todoName.value = "";
  todoDescription.value = "";

  let res = await axios.post("https://crudcrud.com/api/d24ed3f3ec344addbddda72ec0b69435/todoData",myObj)
    try {
      
      showonPending(res.data);
    }
    catch(err){
      console.log(err);
    }
}


window.addEventListener("DOMContentLoaded", async() => {
  let res = await axios.get("https://crudcrud.com/api/d24ed3f3ec344addbddda72ec0b69435/todoData")
    try {
      for (let i = 0; i < res.data.length; i=i+1) {
        if (res.data[i].isDone == false) {
          showonPending(res.data[i]);
        } else {
          
          showonDone(res.data[i]._id);
        }
      }
    }
    catch(err){
      console.log(err);
    }
});



 function showonPending(obj) {
  let name = obj.name;
  let des = obj.description;
  let id = obj._id;

  let list = `<li id="${id}"> <span class="task">${name}</span> : (<span class="description">${des}</span>) 
                 <button class="donebtn" onclick=makeitDone('${id}')>Done</button>
                 <button class="removebtn" onclick=removePending('${id}')>Remove</button></li> `;

  pendingTask.innerHTML += list;
}

async function makeitDone(id) { 
  let res = await axios.get(`https://crudcrud.com/api/d24ed3f3ec344addbddda72ec0b69435/todoData/${id}`)
    try {
      let aaname = res.data.name;
      let aades = res.data.description;
      let list = `<li id="${id}"> <span class="task">${aaname}</span> : (<span class="description">${aades}</span>)
        <button class="removebtn" onclick=removeDone('${id}')>Remove</button></li> `;

      doneTask.innerHTML += list;

      let res2 = await axios.put(`https://crudcrud.com/api/d24ed3f3ec344addbddda72ec0b69435/todoData/${id}`,
          {
            name: aaname,
            description: aades,
            isDone: true,
          }
        )
        try{
          console.log();
        }
        catch(err){
          console.log(err);
        }
    }
    catch(err){
      console.log(err);
    }
    let removed = document.getElementById(id);
    removed.parentElement.removeChild(removed);
}

 function removePending(e) {
  let removed = document.getElementById(e);
  removed.parentElement.removeChild(removed);
  axios.delete(
    `https://crudcrud.com/api/d24ed3f3ec344addbddda72ec0b69435/todoData/${e}`
  );
}
function removeDone(e) {
  let removed = document.getElementById(e);
  removed.parentElement.removeChild(removed);

  axios.delete(
    `https://crudcrud.com/api/d24ed3f3ec344addbddda72ec0b69435/todoData/${e}`
  );
}

async function showonDone(id){

  let res = await axios.get(`https://crudcrud.com/api/d24ed3f3ec344addbddda72ec0b69435/todoData/${id}`)
  try{
    let aaname = res.data.name;
      let aades = res.data.description;
      let list = `<li id="${id}"> <span class="task">${aaname}</span> : (<span class="description">${aades}</span>)
        <button class="removebtn" onclick=removeDone('${id}')>Remove</button></li> `;

      doneTask.innerHTML += list;

  }
  catch(err){
    console.log(err)
  }
  


}


