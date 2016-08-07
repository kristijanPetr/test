/* 
 
if(Meteor.isServer){
	Meteor.startup(function(){
			 if(Images.find().count() == 0 ){
				Images.insert(
				{
					img_src:"img1.jpg",
	 				img_alt:"slika 1"
	 			}
	 		);
		 }
	});
}*/