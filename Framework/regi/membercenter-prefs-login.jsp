<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="p" uri="ptag"%>
<jp:userSession var="userSession" />
<jsp:include page="eom$configurationURI/Framework/regi/common/header.jsp"/>
<c:set var="regipath" value="${portalContext.publicBaseUrl}/eom$configurationURI/Framework/regi" />
  
<body> 
	<meta name="WT.cg_n" content="Member Center" /> 
	<meta name="WT.cg_s" content="Member Center" /> 
	<meta name="ti" content="Registration form" /> 
	<meta name="WT.si_n" content="newMember" /> 
	<meta name="WT.si_x" content="1" /> 
 
	<div id="container"> 
    	<div id="containerBorder"> 
 
			<div id="header">
	        	<div class="member-header"> 
	        		<div class="bcom-globe-logos"> 
	            		<a href="http://www.boston.com"></a> 
	          		</div> 
	          		<div class="member-header-inner"> 
	            		<h1> 
	              			<img src="http://cache.boston.com/universal/regi/images/member_center_icon.png"> 
	              			<img src="http://cache.boston.com/universal/regi/images/member_center_text.png"> 
	            		</h1> 
	            		<p></p> 
	          		</div> 
	          		<div class="member-header-right"> 
	            		<p><a href="http://services.bostonglobe.com/subscribers/custserv.aspx?id=5274">Boston Globe Services account &raquo;</a></p> 
	          		</div> 
				</div><!-- /end .member-header -->
     		</div><!-- /end #header -->

			<div id="content" class="half">
		        <div id="Col1" class="half-page-split">
					<h3>Please log in with your account to continue</h3> 
					<div class="member-login"> 

                       <form name="loginForm" method="post" action="<c:url value="/Login" />"> 
						
					   <input type="hidden" name="redirect" value="${regipath}/membercenter-redirect.jsp?update=login">
				       <input type="hidden" name="onerror" value="${regipath}/login-error.jsp?errorurl=${regipath}/login.jsp?error=true"> 
													
				        <input type="hidden" name="mode" value="edit"> 
						<input type="hidden" name="validate" value="false"> 
						<input type="hidden" name="loadLists" value="true"> 
						<input type="hidden" name="regType" value="loginmc"> 
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
			                	<input type="hidden" name="dispatch" value="Login"/> 
			                  	<input type="submit" value="Login" class="form-button"> 
			                </span> 
			                <span class="form-message"> 
			                	<a href="forgot-password-step1.jsp">Forgot your password?</a> 
			                </span> 
						</div> 
            
		              	<p class="login-footer">If you have already created an account with Boston Globe Services, you may login with that e-mail and password.</p> 

		              	<div class="regi-login-login-problems"> 
		              		<h3 class="regi-icon regi-icon-login-problems">Login issue?</h3> 
			                <p>Having trouble logging in? Already registered but being asked to log in again?</p> 
			                <p class="footer"><a href="http://www.boston.com/help/feedback/">Let us know &raquo;</a></p> 
		              	</div>              
					</form> 
				
					</div> <!-- /end .member-login -->
        
				</div> <!-- /end #Col1 -->
				<div id="Col2" class="half-page-split"></div> 
		        <div id="Col3"></div> 
				<div class="cf"></div> 
	      	</div> <!-- /end #content -->
	
			<jsp:include page="eom$configurationURI/Framework/regi/common/footer.jsp"/>
			<jsp:include page="eom$configurationURI/Framework/regi/common/facebook_handler.jsp"/> 

    </div><!-- /end #containerBorder --> 
  </div> <!-- /end #container -->
 
	 
	<!-- SiteCatalyst code version: H.19.3 Copyright 1997-2003 Omniture, Inc. More info available at http://www.omniture.com -->
	<%@ include file="/eom$configurationURI/Framework/global/user_state_bcom.jsp" %>
	<script language="JavaScript" src="//cache.boston.com/omniture/hcode/s_code_latest.js"></script>
	 
	<script language="JavaScript"><!--
	s.pageName='Member Center | BCom Registration | Member Center Preferences log-in challenge page',s.channel='Member Center',s.prop1='Member Center | BCom Registration';
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
