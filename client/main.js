import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


  Images = new Mongo.Collection("images");
 

 if(Meteor.isClient){
 	
 /*	var img_data = [{
 		img_src:"img1.jpg",
 		img_alt:"slika 1"
 		},
		{
			img_src:"img2.jpg",
			img_alt:"slika 2"
		},
		{
			img_src:"img3.jpg",
			img_alt:"slika 3"
		},
		{
			img_src:"img4.jpg",
			img_alt:"slika 4"
		}
 	];*/

 	Session.set("imageLimit",8);

 	lastScrollTop = 0; 
 	 
 	//test if we are near at the bottom of the window
 	$(window).scroll(function(event){
  		if($(window).scrollTop() + $(window).height() > $(document).height() - 100 ){
  			var scrollTop = $(this).scrollTop();
			console.log("Scrolling down!");
			
			//test if we are going down
			if(scrollTop > lastScrollTop){
				//checked going down
				Session.set("imageLimit",Session.get("imageLimit")+4);
				console.log("going down!")
			}
			lastScrollTop = scrollTop;
 		}
 		
 	})
 	Accounts.ui.config({
 	 
 		passwordSignupFields: 'USERNAME_AND_EMAIL' //  One of 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY', or 'EMAIL_ONLY' (default).
 	});
 
 	console.log("Client Side!");
 	console.log("Images counts " + Images.find().count());
 	//Template.images.helpers({images:img_data});

	Template.images.helpers({
		images:function(){
			if(Session.get("userFilter")){
				return Images.find({createdBy:Session.get("userFilter")},{sort:{createdOn:-1,rating:-1} })
			}else{
				return Images.find({},{sort:{createdOn:-1,rating:-1},limit:Session.get("imageLimit")  });
			}
		},
		filtering_images: function(event){
			if(Session.get("userFilter")){
				return true;
			}
			else{
				return false;
			}
		},
		getUser:function(user_id){
			var user = Meteor.users.findOne({_id:user_id});
			if(user){
				return user.username;
			}
			else{
				return 'anon';
			}
		},
		getFilterUser:function(user_id){
			if(Session.get("userFilter")){
				var user = Meteor.users.findOne({_id:Session.get("userFilter")});
				return user.username;
			}
			else{
				return "";
			}
		}
	});
	Template.body.helpers({username:function(){
		if(Meteor.user()){
	 
			return Meteor.user().username;
		}
		else{
			return "Not logged in";
		}
		
	}
	});


 	Template.images.events({
 		'click .js-image': function (event) {
 			//  $(event.target).css("width","100px");
 			  $("#din-img").attr('src',this.img_src);
 			  $("#image_popup").modal('show');
 			  console.log(this.img_src);
 		},
 		'click .js-del-image':function(event){
 			var image_id = this._id;
 			console.log(image_id);
 			$("#"+image_id).hide('slow',function(){
 				Images.remove({"_id":image_id} );
 			})
  		},
  		'click .js-rate-image':function(event){
  			var rating = $(event.currentTarget).data("userrating");
  			var image_id = this.id;
  			console.log(image_id);
  			Images.update({"_id":image_id},
  							{$set:{rating:rating}});
  		},
  		'click .js-show-image-form':function(event){
  			$("#image_add_form").modal('show');
  		},
  		'click .js-set-image-filter':function(event){
  			Session.set("userFilter", this.createdBy);
  		},
  		'click .js-remove-image-filter':function(event){
  			Session.set("userFilter",undefined);
  		}
 	});

 	Template.image_add_form.events({
 		'submit .js-add-image': function (event) {
 			 var img_src = event.target.img_src.value ;
 			 var img_alt = event.target.img_alt.value;
 			 console.log(img_src+" image "+ img_alt);
 			 Images.insert({
 			 	img_src: img_src,
 			 	img_alt: img_alt,
 			 	createdOn: new Date(),
 			 	createdBy:Meteor.user()._id
 			 } );
 			 $("#image_add_form").modal('hide');
 			 $("#image_add_form").reset();
 			 return false;
 		}
 	});


 }
 