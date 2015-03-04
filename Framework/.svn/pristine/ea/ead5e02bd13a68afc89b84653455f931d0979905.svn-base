<script>

		function initForm()
		{
			document.getElementById('form-error').style.visibility = 'hidden'; 							 
			document.getElementById("regi_firstname").value = "";		 
			document.getElementById("regi_lastname").value = "";			 
			document.getElementById("regi_alias").value = "";	
			document.getElementById("regi_email").value  = "";  
			document.getElementById("regi_password").value  = "";
			document.getElementById("regi_password2").value  = "";
			document.getElementById("regi_zip").value  = "";	
			document.getElementById("regi_outside_us").checked  = false;
			document.getElementById("regi_gender_M").checked  = false;
			document.getElementById("regi_gender_F").checked  = false;
			document.getElementById("regi_birthyear").value = "";			  
			document.getElementById("regi_subscriber_id").value = 0;			     
		} 
		   
 		function submitform()		 
		{
			if (validateform() == false){
				return false;
			}else{ 
				return true;		 	
			}
			 
		} 
		 
		function validateform() 
		
		//This Function will validate the entire form
		
		{   
			 
			var hasErrors = false;
			
			var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			
			//Check First Name
			var element = 'regi_firstname'; 
			var ele = document.getElementById(element).value; 
			var div = document.getElementById(element + "_form");
			var divOriginal = 'form-fieldset form-name-firstname';
			var divError = divOriginal + ' form-required form-fieldset-error'; 
			 
			if(ele == "")
			{ 	 
				div.className = divError;
				hasErrors = true;
			}else{  
				div.className = divOriginal;
			}
			
			
			//Check Last Name
			var element = 'regi_lastname'; 
			var ele = document.getElementById(element).value; 
			var div = document.getElementById(element + "_form");
			var divOriginal = 'form-fieldset form-name-lastname';
			var divError = divOriginal + ' form-required form-fieldset-error'; 			
			 
			if(ele == "")
			{ 	 
				div.className = divError; 
				hasErrors = true;
						 
		  	}else{  
		  		div.className = divOriginal;
			}
			
			 
			//Check Email
			var element = 'regi_email'; 
			var ele = document.getElementById('regi_email').value; 
			var div = document.getElementById(element + "_form");
			var divOriginal = 'form-fieldset form-name-email';
			var divError = divOriginal + ' form-required form-fieldset-error';			
		 
			if(ele == "")
			{ 	 
				div.className = divError;    
				document.getElementById('regi_email_error').innerHTML = "<span class='form-message-bullet'>X</span>" +  "Email Cannot Be Blank"; 
				hasErrors = true;	 
		  	}else{
		  		if(reg.test(ele) == false) {
		  			div.className = divError;  
					document.getElementById('regi_email_error').innerHTML = "<span class='form-message-bullet'>X</span>" +  "Not A Valid Email Address";
		  			hasErrors = true;
		  		}else{
		  			div.className = divOriginal;		   			
		  		}
		  		 
			} 
			
			//Check Password
			var element1 = 'regi_password';
			var element2 = 'regi_password2';
			var password1 = document.getElementById('regi_password').value; 
			var password2 = document.getElementById('regi_password2').value; 
			var div1 = document.getElementById(element1 + "_form");
			var div2 = document.getElementById(element2 + "_form");
			var divOriginal1 = 'form-fieldset form-name-password';
			var divOriginal2 = 'form-fieldset form-name-password2';
			var divError1 = divOriginal1 + ' form-required form-fieldset-error'; 
			var divError2 = divOriginal2 + ' form-required form-fieldset-error';	
			var iError = 0;  
			 
			if  ((password1.length < 6 && password1.length != 0 ) || (password2.length < 6 && password2.length != 0) || ((password1 != password2) == true) )
			{	
				   
				if((password1.length < 6 && password1.length != 0 ) || (password2.length < 6 && password2.length != 0))
				{ 
					iError = 1;
				}	
				
				if((password1 != password2) == true)
				{ 
					iError = 2;
				}
				 
				switch (iError)
				{ 
					 
					case 1:
					{ 	 
						div1.className = divError1;
						div2.className = divError2;
						document.getElementById('regi_password_error').innerHTML =  "<span class='form-message-bullet'>X</span>" +  "Passwords Must Be More than 6 Characters";
						document.getElementById('regi_password2_error').innerHTML =  "<span class='form-message-bullet'>X</span>" + "Passwords Must Be More than 6 Characters";
					 	hasErrors = true;
					 	break;
					} 
					 
					case 2:
					{ 	 
						div1.className = divError1;
						div2.className = divError2;
						document.getElementById('regi_password_error').innerHTML =  "<span class='form-message-bullet'>X</span>" +  "Passwords Do Not Match";
						document.getElementById('regi_password2_error').innerHTML =  "<span class='form-message-bullet'>X</span>" +  "Passwords Do Not Match"; 
				 		hasErrors = true;
				 		break;
					}
												 
				  	default:
				  	{   
				  		div1.className = divOriginal1;
				  		div2.className = divOriginal2;
					} 
				} 
			}else{
		  		div1.className = divOriginal1;
				div2.className = divOriginal2;		   			
		  	} 
			
			//Check Zip
			var element = 'regi_zip'; 
			var ele = document.getElementById(element).value; 
			var div = document.getElementById(element + "_form");
			var divOriginal = 'form-fieldset form-name-zip';
			var divError = divOriginal + ' form-required form-fieldset-error'; 		
		
			var check = document.getElementById("regi_outside_us").checked;
				 
			if((ele == "" ||  ele.length < 5) && check == false)
			{ 	
				div.className = divError; 
				hasErrors = true; 
		  	}else{   
		  		div.className = divOriginal;
			} 
			
			
			//Gender 
			var genderM = document.getElementById('regi_gender_M').checked; 
			var genderF = document.getElementById('regi_gender_F').checked;  
			var div = document.getElementById("regi_gender_form");
			var divOriginal = 'form-fieldset form-name-gender';
			var divError = divOriginal + ' form-required form-fieldset-error'; 
			 
			if((genderM == false) && (genderF == false) )
			{ 	 
				div.className = divError; 
				hasErrors = true;
						 
		  	}else{  
		  		div.className = divOriginal;
			}
					 	
			//Birth Year 
			var ele = document.getElementById('regi_birthyear').value; 
			var div = document.getElementById("regi_birthyear_form");
			var divOriginal = 'form-fieldset form-name-birthyear';
			var divError = divOriginal + ' form-required form-fieldset-error'; 
			var iError = 0;  
			
			var curYear = new Date();
			curYear = curYear.getFullYear();
			var minYear = (curYear - 150);  // norlov.thumbtack.net: 150 replaced by 100 according to REGI-874
			var maxYear = (curYear - 13);
			  
			if((ele.length < 4) || (ele > curYear) || (ele > maxYear) || (ele < minYear) || (ele == "") )
			
			{
			
				if((ele == ""))
				{	  
					iError = 1;
				}
				
				if((ele > curYear) || (ele > maxYear))
				{  
					iError = 2;
				}	
				
				if((ele.length < 4) || (ele < minYear))
				{  
					iError = 3;
				}
				 
				switch (iError)
				{ 
					case 1:
					{ 	  
						div.className = divError;  
						document.getElementById('regi_birthyear_error').innerHTML = "<span class='form-message-bullet'>X</span>" +  "Please Enter a Year of Birth";
						hasErrors = true;
						break;
					 }
					
					case 2:
					{ 	  
						document.getElementById('form-error').innerHTML = 'Sorry, we can&#39;t complete your registration at this time. <br />' + 
						'If you have any questions please contact our <a href="http://boston.custhelp.com/app/ask/"> Customer Support Team</a>.';
						hasErrors = true;
					 	break;
					} 
					 
					case 3:
					{ 	  
						div.className = divError;  
						document.getElementById('regi_birthyear_error').innerHTML = "<span class='form-message-bullet'>X</span>" +  "Please Enter a Year of Birth";
						hasErrors = true;
				 		break;
					}
												 
				  	default:
				  	{   
				  		div.className = divOriginal;
					} 
				} 
			}else{
		  		div.className = divOriginal;	   			
		  	}
			  
			
			//Subscriber 
			var subscriber = document.getElementById('regi_subscriber_id').value; 
			var div = document.getElementById("regi_subscriber_form");
			var divOriginal = 'form-fieldset form-name-subscriber';
			var divError = divOriginal + ' form-required form-fieldset-error'; 
			    
			if((subscriber == "") || (subscriber == 0) )
			{ 	 
				div.className = divError; 
				hasErrors = true;
						 
		  	}else{  
		  		div.className = divOriginal;
			} 
			
			// Screen name (alias)
			var reg = /^[A-Za-z0-9\-]+$/;
			var element = 'regi_alias'; 
			var ele = document.getElementById(element).value; 
			var div = document.getElementById(element + "_form");
			var divOriginal = 'form-fieldset form-name-screenname';
			var divError = divOriginal + ' form-fieldset-error';			
		 	console.log('regi');
	  		if(reg.test(ele) == false || ele.length > 32) {
	  			div.className = divError;   
				document.getElementById(element + '_error').innerHTML = "<span class='form-message-bullet'>X</span>" +  "Screen names can't be empty, must be 32 characters or less and can only contain letters, numbers, and dashes.";
	  			hasErrors = true;
	  		} else {
	  			div.className = divOriginal;		   			
	  		}
			 
			//End - Check Errors
			if (hasErrors == true)			
			{ 
				document.getElementById('form-error').style.visibility = 'visible'; 
				return false;
			}else{ 
				document.getElementById('form-error').style.visibility = 'hidden';  
		  		return true; 
			}
		}
		
		function checkempty(element, divOriginal) 
		//This will validate certain fields on a lost focus
		{ 
			var ele = document.getElementById(element).value;
			var div = document.getElementById(element + "_form");
			//var divClass = div.className;
			var divError = divOriginal + ' form-required form-fieldset-error'; 
			   
			if(ele == "")  //text box was blank
			
			{ 			 
				div.className = divError; 
				return false;
				 
		   	}else{ 
		   		div.className = divOriginal;  
				return true; 
		 	}
		 	return true;
		 }
		 
		 
		function disableZip() 
		{ 
			var check = document.getElementById("regi_outside_us").checked;
			 
			if (check == true)
			{ 
				document.getElementById("regi_zip").value  = ""; 
				document.getElementById("regi_zip").disabled = true; 
				
			}else{
				document.getElementById("regi_zip").disabled = false;			
			} 
		}	
		
</script>	