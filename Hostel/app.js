var express = require("express");
var app= express();
var passport=require("passport");
var LocalStrategy=require("passport-local");
var User=require("./models/user");
var bodyParser=require("body-parser");
var methodOveride=require("method-override");
var mongoose=require("mongoose");
var question=require("./models/questions");
var seedDB=require("./seeds");
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
var comment=require("./models/comment");
//var comment = require("./models/answers");
//var user=require("./models/users");
//Passport configuration
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOveride("_method"));

app.use(require("express-session")({
		secret: "nish",
	resave: false,
	saveUnitialized: false
		}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost/thoughtdb", { useNewUrlParser: true , useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
});

//Schema setup

/*question.create(
{name:"How to fix the error in depreciation?"
},function(err,Question){
	if(err){console.log(err);}
	else{
		console.log("New question created");
		console.log(Question);
	}
});*/

//Ask Questions


app.get("/",function(req,res){
	res.render("landing");
	//passing to landing.ejs
});

/*app.get("/topics",function(req,res)
	   {
	
	var topics=[{name:"Technical",image:"https://d1c0rs04n1r7r4.cloudfront.net/wp-content/uploads/2018/04/10184439/HS6251-TECHNICAL-ENGLISH-2-Important-Questions-Anna-University-2013-regulation.jpg"},
			   {name:"Health",image:"https://blog.ipleaders.in/wp-content/uploads/2020/01/Health-Insurance.jpg"},
			   {name:"General",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0keWepxBaQyV-lDiMyfpvNLOS_yhO-ybgLw&usqp=CAU"},
			   {name:"Academics",image:"https://ctl.stanford.edu/sites/default/files/styles/widescreen_small/public/2019-04/academic-skills-coaching.jpg?itok=Sd_aBhbC"},
			   {name:"Personality Development",image:"https://sudhirmemorialinstituteliluah.com/wp-content/uploads/2020/03/Personality-Development-of-Child.jpg"},
			   ]
	
	res.render("topics",{topics:topics});
	
});*/
app.get("/topics/tech",function(req,res)
	   {//Get all question from mongodb
	question.find({text:{$exists: true}},function(err,allquestions)
				 {
		if(err){
			console.log(err);
		}else{
		res.render("questions/tech",{questions:allquestions,currentUser:req.user});	
		}
		
		
		
	});
	
	   });

app.get("/askques",function(req,res)
	   {
	
	res.render("questions/askques");
});

app.post("/askques",isLoggedIn,function(req,res)
		{
	var editor = new FroalaEditor();

	var check =req.body.text;
	
            if (check) { 
             
            var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
	console.log(today);
	console.log(req.body)
				var text=req.body.text   
				
				var author= {
		id: req.user._id,
		name: req.user.name
	}
				var newpostarr={text:text,
				   Date_ques:today,
				   Author:author 
								
				   }
				question.create(newpostarr,function(err,newques)
				   {
		if(err){
			console.log(err)
		}
		else{
			res.redirect("/askques");
		}
			
	});
            } else { 
				 res.render("/topics/tech");
            } 
       
	console.log(text);
	
	//Create new question and save to database
	
		/*var q = req.body.search;
		console.log(req.query.q);
		
		question.find({ text: { $regex: q , $options: "i" } }, function(err, docs) {
		console.log("Partial Search Begins");
		console.log(docs);
		res.render("questions/tech",{docs : docs})
		

});
*/
	
	//get data from form and add to campgrouds array
});

app.get("/topics/tech/:id",function(req,res)
	   {
	//find the question with provided ID
	//show answers
	question.findById(req.params.id).populate("comments").exec(function(err,foundques)
					  {if(err){
			console.log(err);
		}			else
	{
		console.log(foundques);
		res.render("questions/question",{questions:foundques});
	}
});
	
});
//comments routes
app.get("/topics/tech/:id/comments/",isLoggedIn,function(req,res)
	   {
	//find comment by findById
	question.findById(req.params.id,function(err,question)
					  {
		if(err){console.log(err);}
		else{
			res.render("comments/new",{question:question});
		}
	});

});

app.post("/topics/tech/:id/comments",isLoggedIn,function(req,res)
{
	//lookup question using ID
	question.findById(req.params.id,function(err,question)
					 {
		if(err){
			console.log(err);
			res.redirect('/topics/tech/');
		}
		else{
			comment.create(req.body.comment,function(err,comment)
						  {if(err){
							  console.log(err);
						  }else
						  {
							  comment.author.id=req.user._id;
							  comment.author.name=req.user.name;
							  comment.save();
							  question.comments.push(comment);
							  question.save();
							  res.redirect('/topics/tech/'+ question._id);
						  }})
			//Comment.cr
		}
	});
	//
});
//AUTH ROUTES

app.get("/register",function(req,res)
	   {res.render("register");
	   });

app.post("/register",function(req,res)
		{
	var newUser= new User({username: req.body.username , name:req.body.name,gmail: req.body.email});
	console.log(req.body.name);
	
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register")
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/topics/tech")
		})
	});
});
//Show login
app.get("/login",function(req,res){
	res.render("login_page");
});
app.post("/login",passport.authenticate("local",{successRedirect: "/topics/tech",failureRedirect:"/login"}),function(req,res){
	
});
		
//logout routes
app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");});

//EDIT Questions route
app.get("/topics/:id/edit",function(req,res){
	res.render("question_edit");
});

//delete question


//SEARCH QUESTIONS


function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
app.listen(5000,function(){
	console.log("Here my thoughtzzz server starts!!!");
	//starting my homepageP
});
