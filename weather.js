/* Student Last Name: GIRI, SUNITA 
    Student_id: 1001339980
     Project name:weather web application
     Project_no: 1
     Project due_date :18th october 2016
     API key:0a1cb49a2749f50f5e989ecdd3e12a7b
      */



var api_key = "0a1cb49a2749f50f5e989ecdd3e12a7b";


function sendRequest () {


   //var div = document.getElementById("tablediv");
   //if (div.style.display == 'none') {
     //div.style.display = '';
   //}


    var xhr = new XMLHttpRequest();
   // var method = "artist.getinfo";
    var city = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?q="+city+"&appid="+  api_key +"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
      
        var temp="temp";
        var pressure="pressure";
        var humidity="humidity";
        var temp_min="temp_min";
        var temp_max="temp_max";
        var all="all";
        var description="description";
        var lon="lon";
        var lat="lat";
        var sunset="sunset";
        var sunrise="sunrise";
       
    
        document.getElementById("city").innerHTML =city;
        document.getElementById("lon").innerHTML = json.coord[lon];
        document.getElementById("lat").innerHTML = json.coord[lat];

        var unix_sunset=json.sys[sunset];
        var unix_sunrise=json.sys[sunrise];

    function formattedtime(unix_time){

        var date = new Date(unix_time*1000);
        var hours = date.getHours();

        var minutes = "0" + date.getMinutes();

        var seconds = "0" + date.getSeconds();

        var formattedtime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            return formattedtime
    }

       var sunset1= formattedtime(unix_sunset);
       var sunrise1= formattedtime(unix_sunrise);

        document.getElementById("sunset").innerHTML = sunset1;
        document.getElementById("sunrise").innerHTML = sunrise1;
        document.getElementById("humidity").innerHTML = json.main[humidity];
        document.getElementById("pressure").innerHTML = json.main[pressure];

        var k_temp=json.main[temp];
        var k_maxt=json.main[temp_max];
        var k_mint=json.main[temp_min];


      
        function formattedtemp(kelvintemp){
            var  farentemp=(( kelvintemp - 273.15) * 9/5) + 32;
           // alert(formattedtemp);
            return farentemp;
        }

            var ftemp=formattedtemp(k_temp);
            var fmax=formattedtemp(k_maxt);
            var fmin=formattedtemp(k_mint);

         document.getElementById("temp").innerHTML = ftemp.toFixed(2);
         document.getElementById("temp_min").innerHTML = fmax.toFixed(2);
         document.getElementById("temp_max").innerHTML = fmin.toFixed(2);

         var cloud= json.clouds[all];


         var dayweather=json.weather[0].main;
      

       
        document.getElementById("all").innerHTML = json.clouds[all];
        //document.getElementById("description").innerHTML = json.weather[0].description;

       var visibility;
       var greeting;


            if((dayweather=="clouds") ||(dayweather=="Clouds")) {
              
                  greeting="cloudy day , have umbrella with you";
                 visibility="okay(clouds)";


            }
           
            else if((dayweather=="clear") || (dayweather="Clear")){
                
                   greeting="clear day, plan for a picnic";
                  visibility="good(all clear )";


            }
            
            else if((dayweather=="snow") || (dayweather=="Snow")) {
              
                 greeting="snow on the way, be prepared for it";
                 visibility="bad(snow)";

            }
              else if((dayweather=="Rain") || (dayweather=="rain")) {
              
                 greeting="Rain on the way, be prepared for it";
                 visibility="bad(rain)";


            }
              else if((dayweather=="foggy") || (dayweather=="Foggy")) {
              
                 greeting="Foggy day";
                 visibility="bad(fog)";


            }
              else if((dayweather=="Extream") || (dayweather=="extream")) {
              
                 greeting="weather is too extrem be prepared accordingly";
                 visibility="okay(extreme)";
                 

            }
             document.getElementById("description").innerHTML = visibility;
             document.getElementById("greeting").innerHTML = greeting;

 
       
        var greeting1;

          if(ftemp<=65){
               greeting1="chilly outside get your jacket"
             document.getElementById("greeting1").innerHTML = greeting1;
        }
        else if((ftemp>65)&&(ftemp<=90)){
            greeting1="moderate temperature. Enjoy your day";
             document.getElementById("greeting1").innerHTML = greeting1;

        }
        else if(ftemp>90){
            greeting1="hot temperature, carry shades and stay cool";
            document.getElementById("greeting1").innerHTML = greeting1;
        }


        }
    };
    xhr.send(null);
}
