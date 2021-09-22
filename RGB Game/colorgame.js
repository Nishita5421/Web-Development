 var colors = generateRandomColors(6);
 var squares = document.querySelectorAll(".square");
 var pickedColor = pickedColors();
var colordisplay = document.getElementById("colordisplay");
var messagedisplay = document.querySelector("#message");
var h=document.querySelector("h2");
var resetbut=document.querySelector("#reset");
var hard=document.querySelector("#hard");
var easy=document.querySelector("#easy");
var cl=false;
easy.addEventListener("click",easyfun);
function easyfun()
{
	hard.classList.remove("selected");
	easy.classList.add("selected");
	colors = generateRandomColors(3);
	pickedColor=pickedColors();
	colordisplay.textContent=pickedColor;
    for(var i=0;i<squares.length; i++)
	{
		if(colors[i]){
		squares[i].style.backgroundColor=colors[i];}
		else{
			squares[i].style.display = "none";
		}
	}
h.style.backgroundColor="#232323";
messagedisplay.textContent="";
cl=true;
}

hard.addEventListener("click",function()
{
	hard.classList.add("selected");
	easy.classList.remove("selected");
	colors = generateRandomColors(6);
	pickedColor=pickedColors();
	colordisplay.textContent=pickedColor;
    for(var i=0;i< squares.length; i++)
	{
		
		squares[i].style.backgroundColor=colors[i];
		squares[i].style.display = "block";
	}
	
	h.style.backgroundColor="#232323";
	messagedisplay.textContent="";
	
});
resetbut.addEventListener("click",function()
{
	if(cl){easyfun();

	}
	else{
	colors = generateRandomColors(6);
	pickedColor = pickedColors();
	colordisplay.textContent=pickedColor;

	for(var i=0;i<squares.length;i++)
	{
		squares[i].style.background = colors[i];
	}
}
easy.disabled=false;
 hard.disabled=false;
h.style.backgroundColor="#232323";
resetbut.textContent="NEW COLOR";
messagedisplay.textContent="";
});
colordisplay.textContent = pickedColor;

 for(var i=0;i<squares.length;i++)
 {
 	squares[i].style.backgroundColor = colors[i];

 	squares[i].addEventListener("click",function()
 	{

 		var clickedcolor = this.style.backgroundColor;
 		if(clickedcolor===pickedColor)
 		{

 			
 			h.style.backgroundColor=pickedColor;
 			easy.disabled=true;
 			hard.disabled=true;
 			resetbut.textContent="PLAY AGAIN ?"
 			messagedisplay.textContent="Correct";
 			changecolors(clickedcolor);}
 			
 		else{
 			this.style.backgroundColor = "#232323";
 			messagedisplay.textContent = "Try Again";
 			

 		}
 	});
 }

 function changecolors(color)
 {
 	for(var i=0;i<colors.length;i++)
 	{
 		squares[i].style.backgroundColor = color;
 	}
 }
 	
 function pickedColors()
 {
 	var random = Math.floor(Math.random() * colors.length);
 	
 	return colors[random];

 }
function generateRandomColors(num)
{
var arr=[]
for(var i=0;i<num;i++)
{
arr.push(randomColor())
}

return arr;
}
function randomColor()
{
var R=Math.floor(Math.random() * 256)
var G= Math.floor(Math.random() * 256)
var B =Math.floor(Math.random() * 256)

return "rgb("+ R+", "+G+", "+B+")";
}