let day = document.querySelector(".day");
let month = document.querySelector(".month");
let year = document.querySelector(".year")




function GetDate(){
	this.dd =  new Date().getDate();
	this.mm = new Date().getMonth()+1;
	this.yy = new Date().getFullYear();
}

day.innerHTML= new GetDate().dd;
month.innerHTML=new GetDate().mm;
year.innerHTML=new GetDate().yy;