var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var path = require('path');
const fetch = require('node-fetch');
const request=require('request');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/data",function(req,res)

{

    
  pin =localStorage.getItem("pincodeS");
   console.log(pin);

    var today = new Date();
    var dd = today.getDate();
        var mm = today.getMonth() + 1;
  
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = dd + '-' + mm + '-' + yyyy;
        
     var pin=110001;
 const url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode='+pin+'&date='+today;

    request({url : url },(error,response)=>
    
    {
    
      
        
      
       //console.log(data.sessions[0].name);
     res.json({data: response.body});


        //console.log(data);
        
        
    });
    


});

app.get("/",function(req,res){

   
        


//http://localhost:8000/data
fetch('http://localhost:8000/data')
    .then(res => res.json())
    .then(json => {
        console.log("First user in the array:");
        console.log(json.sessions);
        console.log(json);
        const data=JSON.parse(json.data);
        console.log(data);
        if(data.sessions==null || data.sessions=="" )
        {
            res.render("cowin.ejs",{
                name: "No slots available",
                pincode: "NA",
                center_id: "NA",
                vaccine_type:"NA" ,
                dose1: "NA",
                dose2: "NA",
                age: "NA"

            })
        }
else{

    res.render("cowin.ejs",{data:data.sessions
    

        /*name: data.sessions[0].name,
        pincode: data.sessions[0].pincode,
        center_id: data.sessions[0].center_id,
        vaccine_type: data.sessions[0].vaccine,
        dose1: data.sessions[0].available_capacity_dose1,
        dose2: data.sessions[0].available_capacity_dose2,
        age: data.sessions[0].min_age_limit
*/
    }
    
    );}

});
});


app.listen(8000,function(){
    console.log("Server has started");
});
/*function get_content() {
    var html = document.getElementById("savepin").innerHTML;
    console.log(html);
   return html;
  }*/