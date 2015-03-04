<script>

		function DisplayError(errorcode)
	   	{ 
	   	 
	     	if (errorcode == '-100') {  
	     		
	     		var div = document.getElementById('regi_email_form');
				var divOriginal = 'form-fieldset form-name-email';
				var divError = divOriginal + ' form-required form-fieldset-error'; 
	     		
				div.className = divEmailError; 
				document.getElementById('regi_email_error').innerHTML = "<span class='form-message-bullet'>X</span>" +  "E-mail already been registered."; 
			  		
			} 
	   	 
	     	if (errorcode == '-600') { 
	     		var div = document.getElementById('regi_alias_form');
				var divOriginal = 'form-fieldset form-name-screenname';
				var divError = divOriginal + ' form-required form-fieldset-error'; 
				 
				div.className = divError; 
				document.getElementById('regi_alias_form').innerHTML = "<span class='form-message-bullet'>X</span>" +  "E-mail already been registered."; 
			 		
			}
			 
	   	}
		
</script>	