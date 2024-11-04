function buttonClicked(){
    var city = document.getElementById("city_input").value
    fetch(https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2)

    .then((response) => response.json())
    .then((data) => {
        var info = data
        console.log(info)
    });
}