var mongoose = require("mongoose");
var questions = require("./models/questions");
var Comment   = require("./models/comment");

var data = [
    {
        text: "Where to start coding?", 
        
    },
    {
        text: "What is jquery?", 
       
    },
    {
        text: "reading documenation or youtube video which is better?", 
        
    }
]

function seedDB(){
   //Remove all campgrounds
  questions.remove({}, function(err){
	  console.log("removed");
       /* if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                questions.create(seed, function(err, questions){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
						console.log(questions);
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                   console.log(comment); questions.comments.push(comment);
                                    questions.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    */}); 
    //add a few comments
}

module.exports = seedDB;