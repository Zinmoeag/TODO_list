const input = document.querySelector("#userInput");
const placeholder = document.querySelector(".placeholde");
const addListBtn = document.querySelector("#addListbtn");
const userInput = document.querySelector("#userInput");
const taskContainer = document.querySelector(".task-list");
const resetBtn = document.querySelector(".resetBtn");



// ------ date





let localObj;
let recordId,editCondition,editId;



window.onload = () =>{
	editCondition=false;
	recordId = Object.keys(localStorage).length;
	deleteItemNo = 0;
	displayTask();
	resetBtnAni();

};





function displayTask(){

	localObj = Object.keys(localStorage);
	localObj.sort(function(a, b){return a-b});

	for(i in localObj){

		let id = localObj[i];
		let deleteValue = JSON.parse(localStorage.getItem(id)).delete;
		let task = JSON.parse(localStorage.getItem(id)).task;
		let el = document.createElement("div");

		if(deleteValue === false){
			el.className ="task";
			el.id = "task_"+id;
			el.setAttribute("data-id",id);
			el.innerHTML = `
							<div class="fill-width">
								<h4 class="task-display">${task}</h4>
								<i class="bi bi-trash trash-btn" ></i>
								<i class="bi bi-pencil edit-btn"></i>

								<div class="circle"></div>
							</div>`;	
		}else{
			el.style.display = "none";
		}

		taskContainer.append(el);

		
	}

// delete btn ------ 
	let deleteBtn = document.querySelectorAll(".trash-btn");
	deleteBtn.forEach(btn=>{
		btn.onclick =()=>{
			let parent = btn.parentElement.parentElement;
			let id = parent.getAttribute("data-id");

		//taskout animation-------
			parent.classList.add("taskExit");

		// deleteTask(id) --------
			add(id,"deleted",true);
		}
	});



//edit btn -------
	let editStatus = false;
	let editBtn = document.querySelectorAll(".edit-btn");
	editBtn.forEach(btn=>{
		btn.onclick=()=>{

			// animation -------------
			let parent = btn.parentElement.parentElement;
			let text = parent.firstElementChild.firstElementChild;

			
			if(editStatus === false){
					editStatus = true;
					parent.classList.add("active");
					text.style.color="#7496d6";
					text.style.paddingLeft="10px";
					parent.firstElementChild.style.backgroundColor="#d1f6ff";

			}else if(editStatus === true){

				if(parent.classList.contains("active")){
					editStatus = false;
					parent.classList.remove("active");
					text.style.color="black";
					text.style.paddingLeft="0px";
					parent.firstElementChild.style.backgroundColor="white";
				}else{
					let activeTaker = document.querySelector(".task-list .active");
					activeTaker.classList.remove("active");
					activeTaker.firstElementChild.firstElementChild.style.color="black";
					activeTaker.firstElementChild.firstElementChild.style.paddingLeft="0px";
					activeTaker.firstElementChild.style.backgroundColor="white";

					parent.classList.add("active");
					text.style.color="#7496d6";
					text.style.paddingLeft="10px";
					parent.firstElementChild.style.backgroundColor="#d1f6ff";
				}
			};

			//text edit-----------

			if(editCondition === false){
				editCondition = true;
			}else{
				editCondition=false;
			}
			


			editId = parent.getAttribute("data-id");
			
			// add(id,)

		
		}
	});
}


const add = (id,task,deleteStatus)=>{

	if(deleteStatus === true){
		let deleteObj = {task:task,delete:true};
		let jsonDeleteTask = JSON.stringify(deleteObj);
		localStorage.setItem(id,jsonDeleteTask);
	}else{
		let valueObj = {task:task,delete:deleteStatus};
		let jsontask = JSON.stringify(valueObj);
		localStorage.setItem( id,jsontask);
	}

	// if(deleteCondition === true){
	// 	let key = deleteItemNo+id;
	// 	localStorage.setItem( key,jsontask);
	// }else{
	// 	localStorage.setItem(id,jsontask);
	// }

};



const resetBtnAni=()=>{
	if(Object.keys(localStorage).length > 0){
		resetBtn.style.opacity= "1";	
	}else{
		resetBtn.style.opacity= "0";	
	}
}


addListbtn.onclick=()=>{
	let value = userInput.value;
	recordId = Object.keys(localStorage).length+1;

	let deleteStatus = false;

	if(value === ""){
		window.alert("task must be filled")
	}else{
		//for selected task for edit
		if(editCondition === true){
			add(editId,value,deleteStatus)
			editCondition = false;
			userInput.value = "";
			taskContainer.innerHTML="";
			displayTask();

			//edit task comiming animation -----------
			document.getElementById("task_"+editId).classList.add("taskComing");
  


		}else{

			add(recordId,value,deleteStatus);
			userInput.value = "";
			taskContainer.innerHTML="";
			displayTask();
			resetBtnAni();

		// taskcommingAni---- adding animation class
			let lasttask = taskContainer.lastElementChild;
			lasttask.classList.add("taskComing");

		}
		
	}	
};


resetBtn.onclick =()=>{
	reset();
	resetBtnAni();
};




// reset
const reset = ()=>{
	localStorage.clear();
	taskContainer.innerHTML="";
};


//delete
const deleteTask =(key)=>{
	localStorage.removeItem(key);
};

















