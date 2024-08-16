var icon =document.getElementById("icon");

icon.onclick = function(){
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        icon.src = "assets/sun.png";
    }else{
        icon.src = "assets/moon.png";
    }
}
