$(document).ready(() => {
$("#login-btn").click(() => {
 let token=$("#token").val();
if(token!="undefined"&&token!=""){
	$(".login").css("display", "none");
	$(".home").css("display","block");
	$(".aboutPage").css("display","block");
	$("#btn1").addClass("hover");
	$("#btn2").removeClass("hover");
	console.log("I am clicked");
	profile(token);

}
else{
	alert("Enter valid token");	
}

})
$("#btn2").click(()=>
{
	$(".aboutPage").css("display","none");
	$(".postpage").css("display","block");
	$("#btn2").addClass("hover");
	$("#btn1").removeClass("hover");
})

$("#btn1").click(()=>
{
	$(".aboutPage").css("display","block");
	$(".postpage").css("display","none");
	$("#btn1").addClass("hover");
	$("#btn2").removeClass("hover");
})

 $("#logout").click(()=>{
    	token=null;
    	 $(".login").css("display","block");
   	 $(".home").css("display","none");
   	 $(".postpage").css("display","none");
   	 $("#token").val("");
    });


});

let profile=(token) => {
	console.log("I have reach here");

			$.ajax(
			{	type:"get",
			   


				url: 'https://graph.facebook.com/me?fields=id,name,about,quotes,birthday,picture,education,cover,address,email,posts{created_time,type,full_picture,story,message,source,likes,comments,shares,actions},first_name,favorite_athletes,gender,hometown&access_token='+token,
				

				success:(response)=>{
					console.log(response);
					let username=response.name;
					let cover=response.cover.source;
					let prof=response.picture.data.url;
					let email=response.email;
					let gender=response.gender;
					let quotess=response.quotes;
					let bDate=response.birthday;
					let post= response.posts.data;
					if(prof != undefined && prof!= null )
						 $(".profile1").attr("src",""+prof+"");
							if(cover != undefined && cover!= null )
						 $(".cover").attr("src",""+cover+"");

						if(email != undefined && email != null )
						 $(".email").text(email);


                   if(username != undefined && username != null )
						 $(".name").text(username);


				   if(gender != undefined && gender != null )
						 $(".gender").text(gender);



					if(bDate != undefined && bDate != null )
						 $(".birthday").text(bDate);


						let n=post.length;
				


               

				  for(let p of post)	
				   { 
                      let content;

				   	  if(p.type == "photo"){
                            content = "<img src='" + p.full_picture + "'" +" class='img-responsive' alt='Smiley face' height='250vh' width='400vw' border=1px >";    
                        }
                        else if (p.type == "video"){
                            content = "<video controls src=" + "" + p.source + " " + "type= " + "video/mp4" + " height='250vh' width='400vw'></video>";          
                        }
                        else if (p.type == "link"){
                           content = "<a href='" + p.full_picture + "'> Visit this Post Here</a>" ;   
                        }                            
                        else if (p.type == "status"){
                            content = "<h6> Updated status </h5>";
                        } 
 
                  

                    { $(".postpg").append(`<div class="card postcard"> 
                     	                   <div class="card-header" style="background-color:#4267b2; color:white" >${p.message}</div>
                     	                    <div class="card-body"> <p  style="text-align: center;">${content}</p>
                     	                    </div>
                     	                    <div class="class-header" style="text-align: center;"><small class="card-title">created at: ${p.created_time}
                     	                    </small></div>
                     	`);

				   	 }
				   	
				   } 





				},
				error:(e)=>{
					alert("Use correct Token");
				}
			});

}
