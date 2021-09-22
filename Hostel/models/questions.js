var mongoose=require("mongoose");
var questionschema=new mongoose.Schema({
	text:String,
	Date_ques: String,
	Author: {
		id :{
		type: mongoose.Schema.Types.ObjectId ,
			ref:"User"
		},
		username: String,
		name: String
	},
	comments:[{
	type: mongoose.Schema.Types.ObjectId,
	ref: "Comment"
}
	]
	
});

module.exports=mongoose.model("question",questionschema);
