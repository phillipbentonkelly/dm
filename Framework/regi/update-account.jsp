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

<c:set value="${portalContext.env.sitedomain}" var="siteDomain" />
	
		<%
		    try 
			{
				String siteDomain = (String) pageContext.getAttribute("siteDomain");			    	
				InsideClient insideClient = new InsideClient(siteDomain);
				String sUserEmail = (String) session.getAttribute( "SESS_REGI_USERNAME" );
				UserResponse userObject = insideClient.getByEmail(sUserEmail);

				int status = userObject.status;
				pageContext.setAttribute("status",status);
				
				if(userObject.status == 0 ){ 
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
					  
				}	
				else {	
					response.sendRedirect("login.jsp");
					return;
				}
				 
			 } catch (Exception ex) {
				 response.sendRedirect("login.jsp");
				 return;
			 }	
		 %> 

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
			document.getElementById("regi_subscriber_id").value = "${readershipId}";												
		}
		
</script>	 

<jsp:include page="eom$configurationURI/Framework/regi/common/validation_update_partial.jsp"/>
<body onload="loadForm();validateform();">

  <div id="container">
    <div id="containerBorder">
      <div id="header">
        <div class="regi-header">
        	<div class="bcom-globe-logos">
            <a href="http://www.boston.com"></a>
          </div>
          <div class="regi-header-inner">
            <h1>Update my account</h1>
            <p></p>
          </div>
        </div>
      </div>

      <div id="content" class="section section95">
        <div id="Col1">
          <h2>We have a new registration system to better serve you! Please take a minute to update your information and continue enjoying all of Boston.com's free content and features.</h2>
          
          <div class="form-padding"></div>
					<form name="loginForm" id="loginForm" onsubmit="return submitform()"  method="post" action="register_action.jsp" id="regi">
						<jsp:include page="eom$configurationURI/Framework/regi/common/errorcodes.jsp"/>

						<input type="hidden" name="mode" value="partialprofileUpdate"> 
						<input type="hidden" name="regType" value="edit"> 
						<input type="hidden" name="uid" value="xCzNhICqBv0="> 
						<input type="hidden" name="validate" value="true"> 
						<input type="hidden" name="loadLists" value="true">          
						<input type="hidden" name="username_l" value="">   
						
						<input type="hidden" name="regi_userid" id="regi_userid" > 
						<input type="hidden" name="regi_accountstatus" id="regi_accountstatus" value="10">      

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
				                   	<input class="type-text" type="text" id="regi_alias" name="regi_alias" >				
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
							    <input class="type-password" type="password"  autocomplete="off" maxlength="20"  name="regi_password" id="regi_password"  > 
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
				                  <input class="type-password" type="password" autocomplete="off" maxlength="20"  name="regi_password2" id="regi_password2" value=""> 
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
						<div class="form-fieldset form-name-subscriber" id="regi_subscriber_form"> 
		              		<label for="regi_subscriber"> 
				                <span class="form-legend"> 
				                  Globe Subscriber
				                </span> 
				                <span class="form-fields"> 
				                	<select name="regi_subscriber_id" id="regi_subscriber_id"  size="1" >
										<option value="0">--- Select one ---</option>
										<option value="102" >I subscribe</option>
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
									Please tell us how you read The Boston Globe
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
			                <input type="submit" name="dispatch"   value="Update" class="form-button"> 
			              </span> 
			            </div> 
					</form>  
		        </div>

        <div id="Col2"> </div>

        <div id="Col3"></div>

        <div class="cf"></div>
      </div>

      <jsp:include page="eom$configurationURI/Framework/regi/common/footer.jsp"/>
		
    </div>
  </div>
</body> 
	<jsp:include page="eom$configurationURI/Framework/regi/common/omniture.jsp"/>
</html>