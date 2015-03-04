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
		
		{   
			 
			var hasErrors = false;
			 
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			  
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
<body>
  <div id="container">
    <div id="containerBorder">
      <div id="header">
        <div class="regi-header">
        	<div class="bcom-globe-logos">
            <a href="http://www.boston.com"></a>
          </div>
          <div class="regi-header-inner">
            <h1>Forgot your password?</h1>
            <p></p>
          </div>
        </div>
      </div>

      <div id="content" class="section section95">
        <div id="Col1">
        	
        	<div class="regi-head-text">
	          <h3 class="set-font">Enter your e-mail address below.</h3>
				<p class="set-font">
					 We'll send you an e-mail with a link to reset your password.
				</p>
          	</div>
          
          <form action="forgot_password_action.jsp" method="post" onsubmit="return submitform()"  id="forgot-password">
          
          	<jsp:include page="eom$configurationURI/Framework/regi/common/errorcodes.jsp"/>

            <c:choose>
                <c:when test="${param.error == 'true'}">
                   <div class="form-error" id="form-error">E-mail address not found, please try again or contact customer service at 617-929-2233</div>
                </c:when>
            </c:choose>
            
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
           	
           	<div class="form-fieldset form-name-submit">
	        	<span class="form-fields">
	                 <input type="submit" value="Submit" class="form-button">
	            </span>
            </div>
             
          </form>
        </div>

        <div id="Col2"></div>
        <div id="Col3"></div>
        <div class="cf"></div>
      </div>

     <jsp:include page="eom$configurationURI/Framework/regi/common/footer.jsp"/> 

	<!-- SiteCatalyst code version: H.19.3 Copyright 1997-2003 Omniture, Inc. More info available at http://www.omniture.com -->
	<%@ include file="/eom$configurationURI/Framework/global/user_state_bcom.jsp" %>
	<script language="JavaScript" src="//cache.boston.com/omniture/hcode/s_code_latest.js"></script>
	<script language="JavaScript"><!--
	s.pageName='Member Center | BCom Registration | BCom Forgot password step 1 - Enter e-mail address',s.channel='Member Center',s.prop1='Member Center | BCom Registration';
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

	
	
    </div>
  </div>
</body>
</html>
