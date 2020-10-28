var express=require("express");
var app= express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/student_info",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var candidateSchema=new mongoose.Schema({
    name:String,
    email:String,
    first_round:Number,
    second_round:Number,
    third_round:Number,
    avg_score:Number
});

var Candidate=mongoose.model("Candidate",candidateSchema);

//Candidate.create(
   // {
     //   name:"Amber Kumar",email:"amberkumar37@gmail.com",first_round:10,second_round:9,third_round:9
    //},
    //function(err,candidate){
      //  if(err){
        //    console.log(err);
    //    }
      //  else{
        //    console.log("Candidate added to DB");
        //}
//    }
//);

app.get("/",function(req,res){
    res.render("Landing");
});

app.get("/result",function(req,res){
    Candidate.find({},function(err,allCandidates){
        if(err){
            console.log(err);
        }
        else{
            res.render("show",{scoreOfCandidates:allCandidates});
        }
    });
});

app.post("/result",function(req,res){
    var name=req.body.name;
    var first=Number(req.body.f1);
    var second=Number(req.body.f2);
    var third=Number(req.body.f3);
    var eId=req.body.eId;
    var sum=first+second+third;
    var avg_score=sum/3;
    var newCandidate={name:name,eId:eId,first_round:first,second_round:second,third_round:third,avg_score:avg_score};
    Candidate.create(newCandidate,function(err,candidate){
        if(err){
            console.log(err);
        }
        else{
            console.log(candidate);
        }
    });
    res.redirect("/result");
});

app.listen(process.env.PORT,process.env.Ip,function(){
   console.log("SERVER STARTED"); 
});