<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ page import="java.util.*" %>
<%@ page import="com.boston.registration.client.*" %>
<%@ page import="com.boston.registration.methode.*" %>
<%@ page import="com.boston.registration.model.db.impl.*" %>
<%@ page import="com.boston.registration.model.db.*" %>
<%@ page import="com.boston.registration.services.inside.errorhandler.*" %>
<%@ include file="common/regi-path.jsp" %>
<jp:userSession var="userSession" />

<c:if test="${userSession == null or userSession.email == null or userSession.authToken == null}">
	 <c:redirect url="login.jsp" />
</c:if>

<c:if test="${userSession != null}">  

	<c:set value="${userSession.userId}" var="userId" />  
	<c:set value="${portalContext.env.sitedomain}" var="siteDomain" />
	  
   	<c:if test="${userId != null}">
	
		<%
		    try 
			{
		    	String siteDomain = (String) pageContext.getAttribute("siteDomain");	
		    	
				InsideClient insideClient = new InsideClient(siteDomain);
	 
				String sUserId = (String) pageContext.getAttribute("userId");
				
				UserResponse userObject = insideClient.getById(sUserId);
				
				int status = userObject.status;
				pageContext.setAttribute("status",status);
				
				if(userObject.status == 0 ){ 
					//2011.08.05 - brett.berardinis@eidosmedia.com
					//Status Good! Populate Variables
					
					UserImpl uservar = userObject.getUser();
					
					Integer userid = uservar.getId();
					pageContext.setAttribute("userid",userid);
										
					DemographicList demographiclist = userObject.demographicList;
					
					if (demographiclist != null) {
						
						List arr = demographiclist.getDemographic(); 
												
						if (arr != null) {
											
							for (int i = 0; i < arr.size(); i++) {
								
								Demographic demographic_ele = (Demographic) arr.get(i);
								
								//Job Title
								if (demographic_ele.getDemographicPropertyKey() == 10){
									Integer jobId = demographic_ele.getPropNum();
									pageContext.setAttribute("jobId",jobId);  
								}							
								
								//Industry
								if (demographic_ele.getDemographicPropertyKey() == 20){
									Integer industryId = demographic_ele.getPropNum();
									pageContext.setAttribute("industryId",industryId);  
								}	
								
								//Income Range
								if (demographic_ele.getDemographicPropertyKey() == 30){
									Integer incomeId = demographic_ele.getPropNum();
									pageContext.setAttribute("incomeId",incomeId);  
								}	
														
								if (demographic_ele.getDemographicPropertyKey() == 40){
									boolean usresident = demographic_ele.getPropBool();
									pageContext.setAttribute("usresident",usresident);  
								}	
								 
								if (demographic_ele.getDemographicPropertyKey() == 50){
									Integer birthyear = demographic_ele.getPropNum();
									pageContext.setAttribute("birthyear",birthyear); 
								}
								
								if (demographic_ele.getDemographicPropertyKey() == 60){
									String gender = demographic_ele.getPropString();
									pageContext.setAttribute("gender",gender); 
								}
								
								//Zip Code
								if (demographic_ele.getDemographicPropertyKey() == 70){
									String zipcode = demographic_ele.getPropString();
									pageContext.setAttribute("zipcode",zipcode); 
								}
								
								//Readership
								if (demographic_ele.getDemographicPropertyKey() == 100){
									Integer readershipId = demographic_ele.getPropNum();
									pageContext.setAttribute("readershipId",readershipId); 
								}
								  
							}
						}
					}
					
					//out.println("5 <br />");
					
					String firstname = uservar.getFirstName();
					pageContext.setAttribute("firstname",firstname);
					
					String lastname = uservar.getLastName();
					pageContext.setAttribute("lastname",lastname);
					
					String email = uservar.getEmail() ;
					pageContext.setAttribute("email",email);
		
					String screenname = uservar.getAlias();
					pageContext.setAttribute("screenname",screenname);
					
					String authtoken = uservar.getAuthToken();
					pageContext.setAttribute("authtoken",authtoken);
					  
				}	
				else {	
					response.sendRedirect("regi-service-down.jsp"); 
				}
				 
			 } catch (Exception ex) {
//				 ex.printStackTrace();
				 response.sendRedirect("regi-service-down.jsp"); 
				 
			 }	
		 %> 
 	</c:if>
 </c:if>
 
<jsp:include page="eom$configurationURI/Framework/regi/common/header.jsp"/> 
 
<script>
 
		function loadForm()
		
		{   
			initForm(); 
			
			document.getElementById("regi_firstname").value = "${firstname}";
			document.getElementById("regi_lastname").value = "${lastname}";
			document.getElementById("regi_alias").value = "${screenname}";	
			document.getElementById("regi_email").value = "${email}";	
			document.getElementById("regi_zip").value = "${zipcode}";
			document.getElementById("regi_userid").value = "${userid}";
			document.getElementById("regi_authtoken").value = "${authtoken}";		
			 
			var screenname =  "${screenname}";
			 
			if (screenname  == '' || screenname  == null || screenname.match(/(user+[_-]|user+[_-]\d+)$/i)){
				document.getElementById("regi_alias").readOnly = false; 
			} else {
				document.getElementById("regi_alias").readOnly = true; 
				document.getElementById("regi_alias").style.backgroundColor = '#EEEEEE';
			}
		  
			var usresident =  "${usresident}"; 
			
			if (usresident == 'true'){ 
				document.getElementById("regi_outside_us").checked = false;
				document.getElementById("regi_outside_us").value = 'false';	 
				
			}else if (usresident == 'false') {
				document.getElementById("regi_zip").value  = "";
				document.getElementById("regi_zip").disabled = true; 
				document.getElementById("regi_outside_us").checked = true;
				document.getElementById("regi_outside_us").value = 'true';	
			}else{	
				document.getElementById("regi_zip").value  = "";		
				document.getElementById("regi_zip").disabled = false; 
				document.getElementById("regi_outside_us").checked = false;		
			} 
		
			var gender =  "${gender}"; 
		
			if (gender == 'M'){
				document.getElementById("regi_gender_M").checked  = true; 
			}else if (gender == 'F'){
				document.getElementById("regi_gender_F").checked  = true; 			
			}else {
				document.getElementById("regi_gender_F").checked  = false; 
				document.getElementById("regi_gender_M").checked  = false;
			}  
			
			document.getElementById("regi_birthyear").value = "${birthyear}";
		 
			document.getElementById("regi_industry_id").value = "${industryId}";
			document.getElementById("regi_job_id").value = "${jobId}";
			document.getElementById("regi_income_id").value = "${incomeId}";
			document.getElementById("regi_subscriber_id").value = "${readershipId}";
			
			//alert("DONE")
			 
		}
		
		function initForm()
	
		{
			//document.getElementById('form-error').style.visibility = 'hidden'; 
							 
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
			  
			document.getElementById("regi_industry_id").value = 0;
			document.getElementById("regi_job_id").value = 0;
			document.getElementById("regi_income_id").value = 0;
			document.getElementById("regi_subscriber_id").value = 0;
			     
		} 
 	 
 	
 		function submitform()		 
		{
			console.log('submit form'); 
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
			var minYear = (curYear - 100); // norlov@thumbtack.net: 150 replaced by 100 according to REGI-874
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
			 
			// Screen name (alias)
			var reg = /^[A-Za-z0-9\-]+$/;
			var element = 'regi_alias'; 
			var ele = document.getElementById(element).value; 
			var div = document.getElementById(element + "_form");
			var divOriginal = 'form-fieldset form-name-screenname';
			var divError = divOriginal + ' form-fieldset-error';			
		 	console.log('regi');
			if(ele != "")
			{ 	 
		  		if(reg.test(ele) == false || ele.length > 32) {
		  			div.className = divError;   
					document.getElementById(element + '_error').innerHTML = "<span class='form-message-bullet'>X</span>" +  "Screen names must be 32 characters or less and can only contain letters, numbers, and dashes.";
		  			hasErrors = true;
		  		} else {
		  			div.className = divOriginal;		   			
		  		}
			}
			
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
				document.getElementById("regi_outside_us").value = 'true';
				
			}else{
				 
				document.getElementById("regi_zip").disabled = false;
				document.getElementById("regi_outside_us").value = 'false';			
			} 
		}	
		  
		
</script>	 

<script>

		function DisplayError(errorcode)
	   	{ 
	   	 
	     	if (errorcode == '-100') {  
	     		
	     		var div = document.getElementById('regi_email_form');
				var divOriginal = 'form-fieldset form-name-email';
				var divError = divOriginal + ' form-required form-fieldset-error'; 
	     		
				div.className = divError; 
				document.getElementById('regi_email_error').innerHTML = "<span class='form-message-bullet'>X</span>" +  "E-mail already been registered."; 
			  		
			}
			 
	   	 
	     	if (errorcode == '-600') { 
	     		var div = document.getElementById('regi_alias_form');
				var divOriginal = 'form-fieldset form-name-screenname';
				var divError = divOriginal + ' form-required form-fieldset-error'; 
				 
				div.className = divError; 
				document.getElementById('regi_alias_error').innerHTML = "<span class='form-message-bullet'>X</span>" +  "User with this Screen Name already exists"; 
			 		
			}
			 
	   	}
		
</script>
 
<body onload="loadForm()">  
	  
	<div id="container"> 
		<div id="containerBorder"> 
		   
			<div id="header">
				<div class="member-header"> 
				  	<div class="bcom-globe-logos"> 
				      <a href="/"></a> 
				    </div> 
					<div class="member-header-inner"> 
			          <h1> 
			            <img src="//graphics.boston.com/universal/regi/images/member_center_icon.png"> 
			            <img src="//graphics.boston.com/universal/regi/images/member_center_text.png"> 
			          </h1> 
			          <p>Update your account information</p> 
			        </div> 
			        <div class="member-header-right"> 
			            <p><a href="http://services.bostonglobe.com/subscribers/custserv.aspx?id=5274">Boston Globe Services account &raquo;</a></p> 
			        </div> 
				</div> 
		        <div class="member-tabs">
		          <ul>
		            <li class="member-tabs-selected"><a href="membercenter-update-info.jsp">Update personal info</a></li>
		            <li><a class="resend" href="membercenter-subs.jsp">E-mail newsletters</a></li>
		          </ul>
		        </div> 
			</div> 
 
			<div id="content" class="section section95"> 
				<div id="Col1">
 
					<h3><b>Please update your personal information below:</b></h3> 
 
		          	<div class="dotted1px"><img src="//graphics.boston.com/universal/site_graphics/spcr.gif" class="spcrGif" alt="" /></div> 
          			
          			<!-- onsubmit="return submitform()" -->
          			
					<form name="loginForm" id="loginForm" onsubmit="return submitform()"  method="post" action="register_action.jsp" id="regi">
				 
						<input type="hidden" name="mode" value="profileUpdate"> 
						<input type="hidden" name="regType" value="edit"> 
						<input type="hidden" name="uid" value="xCzNhICqBv0="> 
						<input type="hidden" name="validate" value="true"> 
						<input type="hidden" name="loadLists" value="true">          
						<input type="hidden" name="username_l" value="">   
						
						<input type="hidden" name="regi_userid" id="regi_userid" > 
						<input type="hidden" name="regi_accountstatus" id="regi_accountstatus" value="10"> 
						
						<input type="hidden" name="regi_authtoken" id="regi_authtoken" value="">  
						
						<jsp:include page="eom$configurationURI/Framework/regi/common/errorcodes.jsp"/>

						<div class="form-fieldset form-name-firstname" id="regi_firstname_form" > 
							<label for="firstname"> 
							  <span class="form-legend"> 
							    First name*
							  </span> 
							  <span class="form-fields"> 
							    <input class="type-text"  type="text" name="regi_firstname" id="regi_firstname"   > 
							  </span> 
							</label> 
							<span class="form-message"> 
							  <span class="form-message-default"> 
							  </span> 
							  <span class="form-message-success"> 
							    <span class="form-message-bullet"><span>a</span></span> 
							    Success message.
							  </span> 
							  <span class="form-message-error" id="regi_firstname_error" >
							    <span class="form-message-bullet">X</span>
							   		This field is required
							  </span> 
							</span> 
						</div> 
						<div class="form-fieldset form-name-lastname" id="regi_lastname_form" >
			              <label for="regi_lastname"> 
			                <span class="form-legend"> 
			                  Last name*
			                </span> 
			                <span class="form-fields"> 
			                  <input class="type-text" type="text" name="regi_lastname" id="regi_lastname" > 
			                </span> 
			              </label> 
			              <span class="form-message"> 
			                <span class="form-message-default"> 
			                </span> 
			                <span class="form-message-success"> 
			                  <span class="form-message-bullet"><span>a</span></span> 
			                  Success message.
			                </span> 
			                <span class="form-message-error" id="regi_lastname_error">
			                  <span class="form-message-bullet">X</span>
							   		This field is required
			                </span> 
			              </span> 
			            </div> 
						<div class="form-fieldset form-name-screenname" id="regi_alias_form" >
							<label for="regi_screenname"> 
				            	<span class="form-legend"> 
				                  Screen name
				                </span> 
				                <span class="form-fields"> 
				                   	<input class="type-text" type="text"  id="regi_alias" name="regi_alias" >				
				                </span> 
				            </label> 
				              <span class="form-message"> 
				                <span class="form-message-default"> 
				                  <a href="#" onclick="window.open('http://www.boston.com/help/registration/screen_name_content/','content','width=375,height=475,resizable=yes,scrollbars=no,toolbar=no,location=no,menubar=no,status=no'); return false;" class="form-why">&nbsp;&nbsp;&laquo; What's this?</a> 
				                </span> 
				                <span class="form-message-success"> 
				                  <span class="form-message-bullet"><span>a</span></span> 
				                  Success message.
				                </span> 
				                <span class="form-message-error" id="regi_alias_error" >
				                  <span class="form-message-bullet">X</span>
							   		This field is required
				                </span> 
				              </span> 
						</div> 
						<div class="form-fieldset form-name-email" id="regi_email_form" >
				          <label for="regi_email"> 
				            <span class="form-legend"> 
				              E-mail*
				            </span> 
				            <span class="form-fields"> 
				              <input class="type-text" type="text" name="regi_email" id="regi_email"   > 
				            </span> 
				          </label> 
				          <span class="form-message"> 
				            <span class="form-message-default"> 
				              <span class="form-message-bullet">&#9668;</span> 
				              This will be your login to Boston.com <br>It must be a valid e-mail address.
				            </span> 
				            <span class="form-message-success"> 
				              <span class="form-message-bullet"><span>a</span></span> 
				              Success message.
				            </span> 
				            <span class="form-message-error" id="regi_email_error">
			                  <span class="form-message-bullet">X</span>
							   		This field is required
			                </span>
				          </span> 
				        </div> 
		            	<div class="form-fieldset form-name-password" id="regi_password_form" >
							<label for="regi_password"> 
							  <span class="form-legend"> 
							    Password*
							  </span> 
							  <span class="form-fields"> 
							    <input class="type-password" type="password"  maxlength="20"  name="regi_password" id="regi_password"  > 
							  </span> 
							</label> 
			              	<span class="form-message"> 
				                <span class="form-message-default"> 
				                  <span class="form-message-bullet">&#9668;</span> 
				                  At least six characters
				                </span> 
				                <span class="form-message-success"> 
				                  <span class="form-message-bullet"><span>a</span></span> 
				                  Success message with an inline <a href="#">sample link</a> and text that wraps onto another line.
				                </span> 
				                <span class="form-message-error" id="regi_password_error">
				                  <span class="form-message-bullet">X</span>
							   		This field is required
				                </span>
				      		</span> 
						</div> 
		            	<div class="form-fieldset form-name-password2" id="regi_password2_form" >
				              <label for="regi_password2"> 
				                <span class="form-legend"> 
				                  Confirm password*
				                </span> 
				                <span class="form-fields"> 
				                  <input class="type-password" type="password"  maxlength="20"  name="regi_password2" id="regi_password2" value=""> 
				                </span> 
				              </label> 
				              <span class="form-message"> 
				                <span class="form-message-default"> 
				                  <span class="form-message-bullet">&#9668;</span> 
				                  Please re-type your password
				                </span> 
				                <span class="form-message-success"> 
				                  <span class="form-message-bullet"><span>a</span></span> 
				                  Success message.
				                </span> 
				                <span class="form-message-error" id="regi_password2_error">
				                  <span class="form-message-bullet">X</span>
							   		This field is required
				                </span>
				              </span> 
			            </div> 
			            
		            	<div class="form-fieldset form-name-zip" id="regi_zip_form" >
			              <span class="form-legend"> 
			                <label for="regi_zip"> 
			                  ZIP/Postal Code*
			                </label> 
			              </span> 
			              <span class="form-fields"> 
			                <input class="type-text" type="text" name="regi_zip" id="regi_zip"  maxlength="5"   > 
			                &nbsp;
			                <label for="regi_outside_us"> 
			                  <input class="type-checkbox" onClick="disableZip()" type="checkbox" name="regi_outside_us" id="regi_outside_us"   > 
			                  Outside the US
			                </label> 
			              </span> 
			              <span class="form-message"> 
			                <span class="form-message-default"> 
			                </span> 
			                <span class="form-message-success"> 
			                  <span class="form-message-bullet"><span>a</span></span> 
			                  Success message.
			                </span> 
			                <span class="form-message-error" id="regi_zip_error" >
			                 <span class="form-message-bullet">X</span>
						   		This field is required
			                </span> 
			              </span> 
			            </div> 
			            
		            	<div class="form-fieldset form-name-gender" id="regi_gender_form" >
			              <span class="form-legend"> 
			                Gender*
			              </span> 
			              <span class="form-fields"> 				              
			              	<label for="regi_gender_M">  
			                  	<input class="type-radio" type="radio" name="regi_gender" id="regi_gender_M" value="M" >Male 
			                </label> 
			                &nbsp;
			                <label for="regi_gender_F"> 
			                  <input class="type-radio" type="radio" name="regi_gender" id="regi_gender_F" value="F">Female
			                </label> 
			              </span> 
			              <span class="form-message"> 
			                <span class="form-message-default">  
			                
			                </span> 
			                <span class="form-message-success"> 
			                  <span class="form-message-bullet"><span>a</span></span> 
			                  Success message.
			                </span> 
			                <span class="form-message-error" id="regi_gender_error" > 
			                  <span class="form-message-bullet">X</span>
						   		This field is required	
			                </span> 
			              </span> 
			            </div> 
		 				<div class="form-fieldset form-name-birthyear" id="regi_birthyear_form">
			              <label for="regi_birthyear"> 
			                <span class="form-legend"> 
			                  Year of birth*
			                </span> 
			                <span class="form-fields"> 
			                  <input size="4" maxlength="4" class="type-text" type="text" name="regi_birthyear" id="regi_birthyear"  > 
			                </span> 
			              </label> 
			              <span class="form-message"> 
			                <span class="form-message-default"> 
								<span class="form-message-bullet">&#9668;</span> 
								YYYY
			                </span> 
			                <span class="form-message-success"> 
			                  <span class="form-message-bullet"><span>a</span></span> 
			                  Success message.
			                </span> 
			                <span class="form-message-error" id="regi_birthyear_error">
			                 <span class="form-message-bullet">X</span>
							   		This field is required	
			                </span> 
			              </span> 
		            	</div> 
			    		<div class="form-fieldset form-name-industry">
			              <label for="regi_industry_id"> 
			                <span class="form-legend"> 
			                  Industry
			                </span> 
			                <span class="form-fields"> 
								<select name="regi_industry_id" id="regi_industry_id" size="1" >
									<option value="0" >--- Select one ---</option>
									<option value="35">Accounting</option>
									<option value="36">Aerospace/Defense</option>
									<option value="37">Agriculture/Mining</option>
									<option value="38">Architecture/Design</option>
									<option value="39">Arts/Entertainment</option>
									<option value="40">Automotive</option>
									<option value="41">Computers/Software/Technology</option>
									<option value="42">Construction</option>
									<option value="43">Consulting</option>
									<option value="44">Education/Schools/Academia</option>
									<option value="45">Energy/Utilities/Fuel/Chemicals</option>
									<option value="46">Engineering</option>
									<option value="47">Finance/Banking/Brokerage</option>
									<option value="48">Government/Diplomatic services</option>
									<option value="49">Health Care/Hospitals</option>
									<option value="50">Import/Export/Trade</option>
									<option value="51">Information Management/Library</option>
									<option value="52">Insurance</option>
									<option value="53">Legal</option>
									<option value="54">Manufacturing</option>
									<option value="55">Marketing/Advertising/Communications/PR</option>
									<option value="56">Media/Publishing/Broadcasting</option>
									<option value="57">Military</option>
									<option value="58">Non-profit/Associations</option>
									<option value="59">Pharmaceuticals/Biotech</option>
									<option value="60">Real Estate/Property Management</option>
									<option value="61">Recruiting/Staffing/Human Resources</option>
									<option value="62">Religious Institutions</option>
									<option value="63">Research and Development/Research</option>
									<option value="64">Retail</option>
									<option value="65">Social Services</option>
									<option value="66">Telecommunications</option>
									<option value="67">Transportation/Logistics</option>
									<option value="68">Travel/Hospitality/Service</option>
									<option value="69">Wholesale</option>
									<option value="70">Homemaker</option>
									<option value="71">Student</option>
									<option value="72">Retired</option>
									<option value="73">Other</option>
								</select> 
			                </span> 
			              </label> 
		            	</div> 
						<div class="form-fieldset form-name-job"> 
		              		<label for="regi_job_id"> 
				                <span class="form-legend"> 
				                  Job
				                </span> 
				                <span class="form-fields"> 
				   					<select name="regi_job_id" id="regi_job_id" size="1">
										<option value="0">--- Select one ---</option>
										<option value="1">Accountant/Auditor</option>
										<option value="2">Administrative/Clerical</option>
										<option value="3">Analyst</option>
										<option value="4">Artist/Musician/Actor/Entertainer</option>
										<option value="5">Architect</option>
										<option value="6">Broker/Trader/Advisor</option>
										<option value="7">CEO/President/Chairman</option>
										<option value="8">CFO, COO, CTO, CIO, CMO</option>
										<option value="9">Clergy</option>
										<option value="10">Computer professional/IT/IS</option>
										<option value="11">Consultant</option>
										<option value="12">Director</option>
										<option value="13">Physician</option>
										<option value="14">Educator/Teacher/Professor</option>
										<option value="15">Engineer</option>
										<option value="16">Self-Employed</option>
										<option value="17">Government official</option>
										<option value="18">Health Care Worker (other than physician)</option>
										<option value="19">Homemaker</option>
										<option value="20">Lawyer/Judge</option>
										<option value="21">Manager/Supervisor</option>
										<option value="22">Military</option>
										<option value="23">Partner/Principal/Owner</option>
										<option value="24">Researcher</option>
										<option value="25">Sales Manager/Account Executive</option>
										<option value="26">Skilled laborer</option>
										<option value="27">Scientist</option>
										<option value="28">Service provider</option>
										<option value="29">Student</option>
										<option value="30">Technician</option>
										<option value="31">Vice President/SVP/EVP</option>
										<option value="32">Writer/Editor</option>
										<option value="33">Other</option>
										<option value="34">Retired</option>
									</select> 
				                </span> 
				              </label> 		
		            	</div> 
						<div class="form-fieldset form-name-income"> 
		              		<label for="regi_income_id"> 
				                <span class="form-legend"> 
				                  Household Income
				                </span> 
				                <span class="form-fields"  > 
									<select name="regi_income_id" id="regi_income_id" size="1" >
										<option value="0">--- Select one ---</option>
										<option value="74" >$150,000 or more</option>
										<option value="75">$100,000 to $149,999</option>
										<option value="76">$75,000 to $99,999</option>
										<option value="77">$50,000 to $74,999</option>
										<option value="78">$25,000 to $49,999</option>
										<option value="79">Less than $25,000</option>
										<option value="80">Prefer not to say</option>
									</select>   
									
				                </span> 
				              </label>						
		            	</div> 
						<div class="form-fieldset form-name-subscriber" id="regi_subscriber_form">
			              <label for="regi_subscriber_id"> 
			                <span class="form-legend"> 
			                  Globe Subscriber*
			                </span> 
			                <span class="form-fields"> 
			                  <select name="regi_subscriber_id" id="regi_subscriber_id"> 
			                    <option value="0">--- Select one ---</option> 
			                    <option value="102">I subscribe</option> 
			                    <option value="103">I read it regularly, but don&#39;t subscribe </option> 
			                    <option value="104">I read it occasionally, but don&#39;t subscribe</option> 
			                    <option value="105">I rarely or never read it</option> 
			                  </select> 
			                </span> 
			              </label> 
						  <span class="form-message"> 
			                <span class="form-message-default"> 
			                  <span class="form-message-bullet">&#9668;</span> 
			                  <a href="#" onclick="window.open('http://www.boston.com/help/registration/subscriberbenefits/','popup','width=375,height=475,resizable=yes,scrollbars=yes,toolbar=no,location=no,menubar=no,status=no'); return false;" class="form-why">Why do we ask this?</a> 
			                </span> 
			                <span class="form-message-success"> 
			                  <span class="form-message-bullet"><span>a</span></span> 
			                  Success message.
			                </span> 
		
			                <span class="form-message-error"> 
			                  <span class="form-message-bullet">X</span>
			                  This field is required
			                </span> 
			              </span> 
			            </div> 
						<div class="form-callout"> 
			              <p style="font-size: 11px;"> 
			                Boston.com respects your privacy. Click <a href="http://www.boston.com/help/privacy_policy/" target="_blank">here</a> to learn more.
			              </p> 
			              <span style="color:#272727"> 
			                By clicking the Register button below, you agree to Boston.com's <a href="http://www.boston.com/help/memberagreement/" target="_blank">Member Agreement</a> 
			              </span> 
			            </div> 
		            	<div class="form-fieldset form-name-submit"> 
			              <span class="form-fields"> 
			              	<input type="hidden" name="dispatch" value="editprofilepage"> 
			                <input type="submit"  value="Update"  class="form-button"> 
			              </span> 
			            </div> 
					</form>  
		        </div><!-- /end #Col1 -->
				<div id="Col2"></div> 
				<div id="Col3"></div> 
				<div class="cf"></div>
			</div><!-- /end #content -->
 			
 			<jsp:include page="eom$configurationURI/Framework/regi/common/footer.jsp"/>
			<jsp:include page="eom$configurationURI/Framework/regi/common/facebook_handler.jsp"/> 
			
    	</div><!-- /end #containerBorder -->
  	</div> <!-- /end #container -->
 
	 
	<script> 
		var error = "${errorCode}"; 
	
		if (error != "")
		{
	  		DisplayError(error); 
		} 
	</script>
	
	<!-- Added Script for Alpha Numeric Validation-Start -->
	<script type="text/javascript">
		$('#regi_firstname').alphanumeric({allow:" -'"});
		$('#regi_lastname').alphanumeric({allow:" -'"});
		//$('#regi_alias').alphanumeric({allow:" "});
		$('#regi_email').alphanumeric({allow:"@.+-"});
		$('#regi_password').alphanumeric({allow:"~!@#$%&*."});
		$('#regi_password2').alphanumeric({allow:"~!@#$%&*."});
		$('#regi_zip').numeric();
		$('#regi_birthyear').numeric();
	</script>
	<!--  Added Script for Alpha Numeric Validation-End -->
	  
	 <!-- SiteCatalyst code version: H.19.3 Copyright 1997-2003 Omniture, Inc. More info available at http://www.omniture.com -->
	<%@ include file="/eom$configurationURI/Framework/regi/common/user_state_bcom.jsp" %>
	<script language="JavaScript" src="//cache.boston.com/omniture/hcode/s_code_latest.js"></script>
	<script language="JavaScript"><!--
	s.pageName='Member Center | BCom Registration | BCom update account: account information',s.channel='Member Center',s.prop1='Member Center | BCom Registration';
	s.server='',s.pageType='',s.prop2='',s.prop3='',s.prop4='',s.prop5='',s.prop6='BCom Registration Page',s.prop7='',s.prop8='',s.prop9='',s.prop10='',s.prop41='Boston.com',
	s.prop35='${loggedInOmniture}',s.eVar20='D=c35',s.prop42='${loginType}',s.eVar42='${loginType}';	
	/* E-commerce Variables */
	s.campaign='',s.state='',s.zip='',s.events='',s.products='',s.purchaseID='',s.eVar1='',s.eVar2='',s.eVar3='',s.eVar4='',s.eVar5='',s.eVar6='',s.eVar7='',s.eVar8='',s.eVar9='',s.eVar10='',s.eVar41='Boston.com';
	var s_code=s.t();if(s_code)document.write(s_code)
	//--></script>
	<script language="JavaScript" type="text/javascript"><!--
	if(navigator.appVersion.indexOf('MSIE')>=0)document.write(unescape('%3C')+'\!-'+'-')
	//--></script>
	<noscript><a href="http://www.omniture.com" title="Web Analytics"><img src="http://nytbglobe.112.2O7.net/b/ss/nytbglobe/1/H.19.3--NS/0" height="1" width="1" alt="" /></a></noscript><!--/DO NOT REMOVE/-->
	
	<!-- START Nielsen Online SiteCensus V6.0 -->
	<!-- COPYRIGHT 2010 Nielsen Online -->
	<script type="text/javascript"> 
	  (function () {
	    var d = new Image(1, 1);
	    d.onerror = d.onload = function () {
	      d.onerror = d.onload = null;
	    };
	    d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=us-604060h&cg=0&cc=1&si=", escape(window.location.href), "&rp=", escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
	  })();
	</script>
	<noscript>
	  <div>
	    <img src="//secure-us.imrworldwide.com/cgi-bin/m?ci=us-604060h&amp;cg=0&amp;cc=1&amp;ts=noscript" width="1" height="1" alt="" />
	  </div>
	</noscript>
	<!-- END Nielsen Online SiteCensus V6.0 -->
 
</body>   
</html>