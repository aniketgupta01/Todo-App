let todoName = document.getElementById('name');
let todoDescription = document.getElementById('description');
let myForm = document.getElementById('my-form');
let pendingTask = document.getElementById('pending');
let doneTask = document.getElementById('done');
myForm.addEventListener('submit',createList);

function createList(e){
    e.preventDefault();

    let myObj = {
        name:todoName.value,
        description:todoDescription.value,
        isDone:false
    }

    axios.post('https://crudcrud.com/api/be706a25d2c04f7d849019ef3195e7dc/todoData',myObj).
    then((res) =>{
        showonPending(res.data);
    }).catch((err)=>{
        console.log(err);

    })

    
}
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/be706a25d2c04f7d849019ef3195e7dc/todoData')
    .then((res)=>{
        for(let i=0;i<res.data.length;i++){
            if(res.data[i].isDone==false){
                showonPending(res.data[i])
            }
            else{
                showonDone(res.data[i]._id);
            }
        }
    }).catch((err)=>{
        console.log(err);
    })
})

function showonPending(obj){
    let name = obj.name;
    let des = obj.description;
    let id = obj._id;

    let list = `<li id="${id}"> ${name}: ${des} 
                 <button class="done" onclick=showonDone('${id}')>Done</button>
                 <button class="remove" onclick=removePending('${id}')>Remove</button></li> `

    pendingTask.innerHTML += list;             

}

function showonDone(id){
    axios.get(`https://crudcrud.com/api/be706a25d2c04f7d849019ef3195e7dc/todoData/${id}`).
    then((res)=>{
        let aaname=res.data.name;
        let aades = res.data.description;
        let list = `<li id="${id}"> ${aaname}: ${aades} 
        <button class="remove" onclick=removeDone('${id}')>Remove</button></li> `

doneTask.innerHTML += list;   



        axios.put(`https://crudcrud.com/api/be706a25d2c04f7d849019ef3195e7dc/todoData/${id}`,
        {
            "name":aaname,
            "description":aades,
            "isDone":true

        }).then((res)=>{
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err);
    })
    

    
    
    

              

    
}

function removePending(e){
    axios.delete(`https://crudcrud.com/api/be706a25d2c04f7d849019ef3195e7dc/todoData/${e}`).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
    let element  = document.getElementById("e")
    console.log(e)
}
function removeDone(e){

    axios.delete(`https://crudcrud.com/api/be706a25d2c04f7d849019ef3195e7dc/todoData/${e}`).then((res)=>{
        console.log(res.data);
    }).catch((err)=>{
        console.log(err)
    })
    
}

