let todoName = document.getElementById("name");
let todoDescription = document.getElementById("description");
let myForm = document.getElementById("my-form");
let pendingTask = document.getElementById("pending");
let doneTask = document.getElementById("done");
myForm.addEventListener("submit", createList);

function createList(e) {
  e.preventDefault();
  let myObj = {
    name: todoName.value.toUpperCase(),
    description: todoDescription.value.toUpperCase(),
    isDone: false,
  };
  todoName.value = "";
  todoDescription.value = "";

  axios
    .post(
      "https://crudcrud.com/api/ee1282e9b8e247f2890cc1bdecfed2a3/todoData",
      myObj
    )
    .then((res) => {
      showonPending(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/ee1282e9b8e247f2890cc1bdecfed2a3/todoData")
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].isDone == false) {
          showonPending(res.data[i]);
        } else {
          showonDone(res.data[i]);
        }
      }
    })
    .catch((err) => {
      //console.log(err);
    });
});

function showonPending(obj) {
  let name = obj.name;
  let des = obj.description;
  let id = obj._id;

  let list = `<li id="${id}"> <span class="task">${name}</span> : (<span class="description">${des}</span>) 
                 <button class="donebtn" onclick=showonDone('${id}')>Done</button>
                 <button class="removebtn" onclick=removePending('${id}')>Remove</button></li> `;

  pendingTask.innerHTML += list;
}

function showonDone(e) {
  let id = e._id;
  

  axios
    .get(
      `https://crudcrud.com/api/ee1282e9b8e247f2890cc1bdecfed2a3/todoData/${id}`
    )
    .then((res) => {
      let aaname = res.data.name;
      let aades = res.data.description;
      let list = `<li id="${id}"> <span class="task">${aaname}</span> : (<span class="description">${aades}</span>)
        <button class="removebtn" onclick=removeDone('${id}')>Remove</button></li> `;

      doneTask.innerHTML += list;

      axios
        .put(
          `https://crudcrud.com/api/ee1282e9b8e247f2890cc1bdecfed2a3/todoData/${id}`,
          {
            name: aaname,
            description: aades,
            isDone: true,
          }
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
    let removed = document.getElementById(id);
  removed.parentElement.removeChild(removed);
}

function removePending(e) {
  let removed = document.getElementById(e);
  removed.parentElement.removeChild(removed);
  axios.delete(
    `https://crudcrud.com/api/ee1282e9b8e247f2890cc1bdecfed2a3/todoData/${e}`
  );
}
function removeDone(e) {
  let removed = document.getElementById(e);
  removed.parentElement.removeChild(removed);

  axios.delete(
    `https://crudcrud.com/api/ee1282e9b8e247f2890cc1bdecfed2a3/todoData/${e}`
  );
}
