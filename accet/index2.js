let globalTaskData = [];
taskContents = document.getElementById("taskContentsrow");

const addCard = () => {
    const newTaskDetails = {
        id: `${Date.now()}`,
        title: document.getElementById("taskTitle").value,
        url: document.getElementById("imageURL").value,
        description: document.getElementById("taskDescription").value
    };
    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));

    globalTaskData.push(newTaskDetails);
    saveToLocalStorage();
}

const generateTaskCard = ({id, url, title,  description}) => {
        return (`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
                            <i class="far fa-trash-alt" name=${id} onclick="deleteTask(this)"></i>
                        </button>
                    </div>
                </div>
                
                <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <img src=${url} class="card-img-top" alt="image"/>
                <p class="card-text">${description}</p>
                </div>
            </div>
        </div>`)
    }

    const saveToLocalStorage = () => {
        localStorage.setItem("ziyadtasks", JSON.stringify({ziyad: globalTaskData}));
    }

    const reloadTaskCard = () => {
        const localStorageCopy = JSON.parse(localStorage.getItem("ziyadtasks"));
        console.log(localStorageCopy);
        if(localStorageCopy) {
            globalTaskData = localStorageCopy["ziyad"];
        }
        console.log(globalTaskData)
        globalTaskData.map((cardData) => {
            taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
        })
    }
   
    const deleteTask = (e) => {
        const targetID = e.getAttribute("name");
        globalTaskData = globalTaskData.filter((cardData) => cardData.id!==targetID);
        saveToLocalStorage();
        window.location.reload();
   }

   const editTask = (e) => {
    console.log(e)
    console.log(e.parentNode)
    console.log(e.parentNode.parentNode.parentNode.childNodes)
    console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1])
    console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3])
    console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5])

    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "true")

    console.log(e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1])
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].style.setProperty("border", "1px solid red")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].style.setProperty("background", "blue")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "saveEditTask(this)")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES"
}

