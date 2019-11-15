const express=require('express')
const bodyParser=require('body-parser')
const request=require('request')

const app=express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html')
})

app.post('/',(req,res)=>{
    firstName=req.body.fName
    lastName=req.body.lName
    email=req.body.email
    // console.log(firstName+lastName+email)


    var data={
        members:[
            {email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
            }
        ]
    }
    var jsonData=JSON.stringify(data)
    var options={
        url:"https://us5.api.mailchimp.com/3.0/lists/ce4d50315e",
        method:"POST",
        headers:{
            "Authorization":"semih217706 d257aa3e59349da002228967ad2ee0e9-us5"
        },
       body:jsonData
    }
    request(options,function(error,response,body){
if(error){
   res.sendFile(__dirname+"/failure.html")
    
}else{
    if(response.statusCode===200){
// res.send("That is successful")
          res.sendFile(__dirname+"/success.html")
          console.log(response.statusCode)
    }else{
        res.sendFile(__dirname+"/failure.html")
    }
    
}
    });

})
app.post('/failure',(req,res)=>{
    res.redirect('/')
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

//API KEY
//d257aa3e59349da002228967ad2ee0e9-us5

//Mailchimp ID
//ce4d50315e