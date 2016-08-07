 
 Images = new Mongo.Collection("images");
if(Meteor.isServer){
	Meteor.startup(function(){
			 if(Images.find().count() == 0 ){
			 	 for (var i = 1; i <= 5; i++) {
			 	 	Images.insert(
				{
					img_src:"img"+i+".jpg",
	 				img_alt:"slika "+i
	 			}
	 				);
			 	 } 


				
		 }
	});
}

 