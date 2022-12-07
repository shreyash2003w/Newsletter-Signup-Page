const express= require("express");
const bodyParser= require("body-parser");
const request = require("request");
var https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){
    var Name = req.body.name;
    var Email = req.body.email;
    var Password = req.body.password;
    

    var data={
        members: [{
            email_address:Email,
            status:"subscribed",
            merge_field:{
                FNAME: Name
            }
        }]
    };
   const jsonData = JSON.stringify(data);
   
   var url = "https://us14.api.mailchimp.com/3.0/lists/688ecdfe0f"

   const options ={
    method:"POST",
    auth:"ShreyashWaghmare:577d43cc1f46c576d84072bebe5202e5-us14"
   }
   const request = https.request(url,options,function(response){

    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");

    }
    else{
        res.sendFile(__dirname+"/failure.html");

    }
response.on("data",function(data){
    console.log(JSON.parse(data));
});
    });
    request.write(jsonData);
    request.end();


app.post("/failure",function(req,res){
    res.redirect("/");
});

    
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running ");
});