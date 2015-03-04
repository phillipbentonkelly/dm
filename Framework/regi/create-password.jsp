<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="p" uri="ptag"%>
<jp:userSession var="userSession" />

<jsp:include page="eom$configurationURI/Framework/regi/common/header.jsp"/>

<script>
   
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
			 
			if  ((password1 == "") || (password2 == "") || (password1.length < 6) || (password2.length < 6) || ((password1 != password2) == true) )
			{	
				   
				if((password1 == "") || (password2 == ""))
				{	 
					iError = 1;
				}
				
				if((password1.length < 6) || (password2.length < 6))
				{ 
					iError = 2;
				}	
				
				if((password1 != password2) == true)
				{ 
					iError = 3;
				}
				 
				switch (iError)
				{ 
					case 1:
					{ 	 
						div1.className = divError1;
						div2.className = divError2;
						document.getElementById('regi_password_error').innerHTML =  "<span class='form-message-bullet'>X</span>" +  "Passwords Cannot Be Blank";
						document.getElementById('regi_password2_error').innerHTML =  "<span class='form-message-bullet'>X</span>" +  "Passwords Cannot Be Blank";  
						hasErrors = true;
						break;
					 }
					
					case 2:
					{ 	 
						div1.className = divError1;
						div2.className = divError2;
						document.getElementById('regi_password_error').innerHTML =  "<span class='form-message-bullet'>X</span>" +  "Passwords Must Be More than 6 Characters";
						document.getElementById('regi_password2_error').innerHTML =  "<span class='form-message-bullet'>X</span>" + "Passwords Must Be More than 6 Characters";
					 	hasErrors = true;
					 	break;
					} 
					 
					case 3:
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
		 
		
</script>

  <div id="container">
    <div id="containerBorder">
      <div id="header">
        <div class="regi-header">
          <div class="bcom-globe-logos">
            <a href="http://www.boston.com"></a>
          </div>
          <div class="regi-header-inner">
            <h1>Reset your password</h1>
            <p></p>
          </div>
          <div class="regi-header-right">
            <p></p>
          </div>
        </div>
      </div>

      <div id="content">
        <div id="Col1">
        	
          <div class="create-password-choose">
						
				<h3>
	            Please complete this form to reset your password. Enter your choice of a new password twice, then click "Submit."
	            </h3>
						
			   <form onsubmit="return submitform()" method="post"  action="create_password_action.jsp">
			   
			   <input type="hidden" name="regi_forgottoken" value=<%=request.getParameter("pwdToken")%> >

			 <c:choose>
				<c:when test="${param.error == 'true'}">
				    <div class="form-error">Invalid token or password. Try again or click the "Forgot your password?" link below to regenerate token.</div>
				</c:when>
				<c:otherwise>							 
				</c:otherwise>
			 </c:choose>				   
			   
			   <jsp:include page="eom$configurationURI/Framework/regi/common/errorcodes.jsp"/>
			     
	            <div class="form-fieldset form-name-password" id="regi_password_form" >
	              <label for="regi-password"> 
	                <span class="form-legend"> 
	                  Password*
	                </span> 
	                <span class="form-fields"> 
	                  <input class="type-password" type="password" autocomplete="off" maxlength="20"  name="regi_password" id="regi_password" value=""> 
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
						
				<div class="form-fieldset form-name-submit">
                <span class="form-fields">
                  <input type="submit" value="Submit" class="form-button">
						<span class="form-message"> 
						  <a href="forgot-password-step1.jsp">Forgot your password?</a> 
						</span>                   
                </span>
              	</div>
						
				</form>
						
          </div>          
        </div>

        <div id="Col2" class="half-page-split"></div>

        <div id="Col3"></div>

        <div class="cf"></div>
      </div>

      <jsp:include page="eom$configurationURI/Framework/regi/common/footer.jsp"/>

    </div>
  </div>
  
	<!-- SiteCatalyst code version: H.19.3 Copyright 1997-2003 Omniture, Inc. More info available at http://www.omniture.com -->
	<%@ include file="/eom$configurationURI/Framework/global/user_state_bcom.jsp" %>
	<script language="JavaScript" src="//cache.boston.com/omniture/hcode/s_code_latest.js"></script>
	<script language="JavaScript"><!--
	s.pageName='Member Center | BCom Registration | BCom password reset Step 1 - Please complete this form ...',s.channel='Member Center',s.prop1='Member Center | BCom Registration';
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
