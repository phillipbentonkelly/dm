<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="p" uri="ptag"%>
<c:set var="regipath" value="${portalContext.publicBaseUrl}/eom$configurationURI/Framework/regi" />
<jp:userSession var="userSession" />
<jsp:include page="eom$configurationURI/Framework/regi/common/header.jsp"/>
<jsp:include page="eom$configurationURI/Framework/regi/common/registration_js.jsp"/> 

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
		   
   	}
		
</script>

  
<body id="regi_boston_deals_login">

	<meta name="WT.cg_n" content="Member Center" />
	<meta name="WT.cg_s" content="Member Center" />
	<meta name="ti" content="Registration form" />
	<meta name="WT.si_n" content="newMember" />
	<meta name="WT.si_x" content="1" />

	<div id="container">
      <div id="containerBorder">
		<div id="header">
	
        <div class="boston_deals_regi regi-header">
          <div class="regi-header-inner">
	          <!-- register -->
            <h1>Please register or log in to continue</h1>
          	<!-- login -->
            <!-- <h1>Already a Boston.com Member? Please login.</h1> -->
            <p></p>
          </div>
        </div>
	
      <div id="content" class="section section95">
        <div id="Col1"> 
			<div class="regi-head-text">
	          <h2><b>Register now for access to Boston.com:</b></h2>
	          <ul>
	            <li>Unlimited access to all free Boston.com content</li>
	            <li>Participation in forums and article comments</li>
	            <li>E-mail newsletters on topics ranging from breaking news and sports to shopping and local deals</li>
	          </ul>
			</div>
    
    		<div class="form-padding"></div>
          
			<form name="loginForm" method="post" onsubmit="return submitform()"  action="register_action.jsp" id="regi">
		          
				<input type="hidden" name="mode" value="register">			
				<input type="hidden" name="regType" value="">			
				<input type="hidden" name="uid" value="">			
				<input type="hidden" name="validate" value="true">			
				<input type="hidden" name="loadLists" value="false">			
				<input type="hidden" name="seamlesswebtag" value="">
				<input type="hidden" name="regi_email_subscribe" value="22">
				<input type="hidden" name="regi_email_subscribe" value="39">
		    	<input type="hidden" name="regi_userid" id="regi_userid"  value="0">
			 	<input type="hidden" name="regi_accountstatus" id="regi_accountstatus" value="10">
						
				<jsp:include page="eom$configurationURI/Framework/regi/common/errorcodes.jsp"/>
                        
	            <div class="form-fieldset form-name-firstname" id="regi_firstname_form" >
	              <label for="regi_firstname"> 
	                <span class="form-legend"> 
	                  First name*
	                </span> 
	                <span class="form-fields"> 
	                  <input class="type-text" type="text" name="regi_firstname" id="regi_firstname" value=""> 
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
	                  <input class="type-text" type="text" name="regi_lastname" id="regi_lastname" value=""> 
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
            
	            <div class="form-fieldset form-name-email"  id="regi_email_form" >
	              <label for="regi-email"> 
	                <span class="form-legend"> 
	                  E-mail*
	                </span> 
	                <span class="form-fields"> 
	                  <input class="type-text" type="text" name="regi_email" id="regi_email" value="" > 
	                </span> 
	              </label> 
	              <span class="form-message"> 
	                <span class="form-message-default"> 
	                  <span>&#9668;</span> 
	                  This will be your login to Boston.com. <br> 
	                  It must be a valid e-mail address.
	                </span> 
	                <span class="form-message-success"> 
	                  <span class="form-message-bullet"><span>a</span></span> 
	                  Success message.
	                </span> 
	                <span class="form-message-error" id="regi_email_error" >
	                  <span class="form-message-bullet">X</span>
	                  This field is required
	                </span> 
	              </span> 
	            </div> 
            
	            <div class="form-fieldset form-name-password" id="regi_password_form" >
	              <label for="regi-password"> 
	                <span class="form-legend"> 
	                  Password*
	                </span> 
	                <span class="form-fields"> 
	                  <input class="type-password" type="password"  maxlength="20"  name="regi_password" id="regi_password" value=""> 
	                </span> 
	              </label> 
	              <span class="form-message"> 
	                <span class="form-message-default"> 
	                  <span class="form-message-bullet">&#9668;</span> 
	                  At least six characters
	                </span> 
	                <span class="form-message-success"> 
	                  <span class="form-message-bullet"><span>a</span></span>  
	                </span> 
	                <span class="form-message-error" id="regi_password_error" >
	                  <span class="form-message-bullet">X</span>
	                  This field is required 
	                </span> 
	              </span> 
	            </div> 
            
	            <div class="form-fieldset form-name-password2" id="regi_password2_form" >
	              <label for="regi-password2"> 
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
	                  	
	                </span> 
	                <span class="form-message-error" id="regi_password2_error" >
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
	                  <input class="type-radio" type="radio" name="regi_gender" id="regi_gender_M" value="M"> 
	                  Male
	                </label> 
	                &nbsp;
	                <label for="regi_gender_F"> 
	                  <input class="type-radio" type="radio" name="regi_gender" id="regi_gender_F" value="F"> 
	                  Female
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
	              <label for="regi-birthyear"> 
	                <span class="form-legend"> 
	                  Year of birth*
	                </span> 
	                <span class="form-fields"> 
	                  <input class="type-text" type="text" name="regi_birthyear" id="regi_birthyear" size="4" maxlength="4"> 
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
				
				<!--<div class="form-fieldset form-name-contest">
	              <span class="form-fields">
	                <span>
	                  <label for="regi-contest">
	                    <input type="checkbox" name="contest" value="1" checked="checked">
	                    <b>Yes, enter me in the Registration Rewards Contest.</b>
	                  </label>
	                  <a href="#" class="contestlink">Learn more</a>
	                </span>
	              </span>
	            </div> --> 
						
				<script type="text/javascript"> 
	              $('.contestlink').click(function(){
	                $.openDOMWindow({
	                  width:580,
	                  height:480,
	                  loader:1,
	                  windowPadding:0,
	                  loaderHeight:16,
	                  loaderWidth:17,
	                  borderColor:'#000',
	                  overlayOpacity:70,
	                  windowSourceID:'#contestDetails'
	                });
	                return false;
	              });
	            </script> 
 
	            <div id="contestDetails" style="display:none;width:580px;"> 
	              	<div style="background-color:#000;height:15px;color:#fff;padding:10px;"> 
	                	<span style="float:left">Contest Details</span> 
	                	<a href="#" class="closeDOMWindow" style="float:right;color:#fff" >close X</a> 
	              	</div> 
      					<div style="overflow-x:hidden;overflow-y:scroll;width:580px;height:450px;"> 
	                	<img src="http://cache.boston.com/images/ads/regi/rewards.jpg" usemap="#Map" /> 
						<map name="Map" id="Map"> 
							<area shape="rect" coords="168,670,250,796" href="#" onclick="window.open('http://boston.com/advertisers/regi/rules/','RULES','width=500,height=300');" /> 
							<area shape="rect" coords="11,663,165,796" href="#" class="closeDOMWindow" alt="Go back" /> 
						</map>                 
					</div> 
				</div><!--/end #contestDetails --> 
 
            
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
	                <input type="submit" name="dispatch" value="Register" class="form-button"> 
	              </span> 
	              <span class="form-message"> 
	                <a href="http://www.boston.com/help/privacy_policy/" target="_blank">Privacy policy</a> |
	                <a href="http://www.boston.com/help/faq/" target="_blank">Member FAQ</a> 
	              </span> 
	            </div> 
            
			</form> 
          
        </div>

        <div id="Col2">
              
          <div id="login">
            <h3 class="regi-icon regi-icon-bcom">Log in with your account</h3>
            
				  <form name="loginForm" method="post" action="<c:url value="/Login" />"> 
					
					    <input type="hidden" name="redirect" value="${regipath}/boston-deals-register.jsp"> 
				       	<input type="hidden" name="onerror" value="${regipath}/login-error.jsp?errorurl=${regipath}/login.jsp?error=true"> 
											
						<input type="hidden" name="mode" value="register"> 
						<input type="hidden" name="validate" value="false"> 
						<input type="hidden" name="loadLists" value="true"> 
						<input type="hidden" name="regType" value="initial"> 
						<input type="hidden" name="seamlesswebtag" value=""> 
								
						<c:choose>
							<c:when test="${param.error == 'true'}">
							    <div class="form-error">Invalid e-mail or password. Try again or click the "Forgot your password?" link below.</div>
							</c:when>
							<c:otherwise>
								<div class="form-error" style="display:none">One or more required fields is missing.</div> 
							</c:otherwise>
						</c:choose>					  		              

	              <div class="form-fieldset form-required form-name-firstname"> 
	                <label for="login-email"> 
	                  <span class="form-legend"> 
	                    E-mail*
	                  </span> 
	                  <span class="form-fields"> 
			               <input class="type-text" type="text" 
			               name="username" id="username" value=""> 
	                  </span> 
	                </label> 
	              </div> 
 
		              <div class="form-fieldset form-required form-name-password"> 
		                <label for="login-password"> 
		                  <span class="form-legend"> 
		                    Password*
		                  </span> 
		                  <span class="form-fields"> 
				               <input class="type-password" type="password" 
				               name="password" id="password" value=""> 
		                  </span> 
		                </label> 
		              </div> 
							
					<span class="regi-rememberme"> 
			              <label for="regi-rememberme"> 
								<input class="type-checkbox" type="checkbox" name="remember" value="remember" checked>                    
			                  	Remember me on this computer.
			              </label> 
					</span> 
 
		              <div class="form-fieldset form-name-submit"> 
		                <span class="form-fields"> 
				             <input type="submit" name="dispatch" value="Login" class="form-button"> 
		                </span> 
                
					           <span class="form-message"> 
					             <a href="forgot-password-step1.jsp">Forgot your password?</a> 
					           </span> 
		              </div> 
              
		              <p class="login-footer">If you have already created an account with Boston Globe Services, you may log in with that e-mail and password.</p> 
              
		              <div class="regi-login-login-problems"> 
		              	<h3 class="regi-icon regi-icon-login-problems">Login issue?</h3> 
		                <p>Having trouble logging in? Already registered but being asked to log in again?</p> 
		                <p class="footer"><a href="http://www.boston.com/help/feedback/">Let us know &raquo;</a></p> 
		              </div>  
 
					  </form>				
          </div>
        </div>

        <div id="Col3"></div>

        <div class="cf"></div>
      </div>
	 	  	  	 
		<jsp:include page="eom$configurationURI/Framework/regi/common/footer.jsp"/>
		<jsp:include page="eom$configurationURI/Framework/regi/common/facebook_handler.jsp"/>       

    </div>
  </div>

</body>

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
	$('#regi_email').alphanumeric({allow:"@.+-"});
	$('#regi_password').alphanumeric({allow:"~!@#$%&*"});
	$('#regi_zip').numeric();
	$('#regi_birthyear').numeric();
</script>
<!--  Added Script for Alpha Numeric Validation-End -->  	

<!-- SiteCatalyst code version: H.20.3. Copyright 1997-2003 Omniture, Inc. More info available at http://www.omniture.com --> 
<script language="JavaScript" src="//cache.boston.com/omniture/hcode/s_code_latest.js"></script> 
 
<script language="JavaScript"><!--
s.pageName='Member Center | Registration | Registration/Login Form with Boston Deals Signup',s.channel='Member Center',s.prop1='Member Center | Registration';
s.server='',s.pageType='',s.prop2='',s.prop3='',s.prop4='',s.prop5='',s.prop6='',s.prop7='',s.prop8='',s.prop9='',s.prop10='';
/* E-commerce Variables */
s.campaign='',s.state='',s.zip='',s.events='',s.products='',s.purchaseID='',s.eVar1='',s.eVar2='',s.eVar3='',s.eVar4='',s.eVar5='',s.eVar6='',s.eVar7='',s.eVar8='',s.eVar9='',s.eVar10='';
var s_code=s.t();if(s_code)document.write(s_code)
//--></script> 
<script language="JavaScript" type="text/javascript"><!--
if(navigator.appVersion.indexOf('MSIE')>=0)document.write(unescape('%3C')+'\!-'+'-')
//--></script> 
<noscript><a href="http://www.omniture.com" title="Web Analytics"><img src="http://nytbglobe.112.2O7.net/b/ss/nytbglobe/1/H.19.3--NS/0" height="1" width="1" alt="" /></a></noscript><!--/DO NOT REMOVE/-->
 
</html>