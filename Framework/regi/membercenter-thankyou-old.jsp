<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.net.URLDecoder"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="p" uri="ptag"%>
<jp:userSession var="userSession" />

<c:if test="${userSession == null}">
	 <c:redirect url="login.jsp" />
</c:if>

<jsp:include page="eom$configurationURI/Framework/regi/common/header.jsp"/> 

<c:set value="${cookie['pathUrl'].value}" var="pathURLRaw"/>
 
<%
	String sPathURLRaw = (String) pageContext.getAttribute("pathURLRaw");
	
	if ((sPathURLRaw != null) && (sPathURLRaw != "")) { 
		String pathURL = URLDecoder.decode(sPathURLRaw,"UTF-8"); 
		pageContext.setAttribute("pathURL",pathURL);
	} 
%> 
 

<body> 
	<meta name="WT.cg_n" content="Member Center" />
	<meta name="WT.cg_s" content="Member Center" />
	<meta name="ti" content="Registration form" />
	<meta name="WT.si_n" content="newMember" />
	<meta name="WT.si_x" content="1" />

	<c:set  value="${param.update}" var="submitPage" /> 
	
	<div id="container">
		<div id="containerBorder">
		
			<c:if test="${submitPage == 'email' or submitPage == 'profile'}">
				<div id="header">
					<div class="member-header">
						<div class="bcom-globe-logos"><a href="/"></a>
					</div>
					<div class="member-header-inner">
						<h1>
						<img src="http://cache.boston.com/universal/regi/images/member_center_icon.png">
						<img src="http://cache.boston.com/universal/regi/images/member_center_text.png">
						</h1>
						<p>Update your account information</p>
						
					</div>
		
					<div class="member-header-right">
						<p><a href="http://services.bostonglobe.com/subscribers/custserv.aspx?id=5274">Boston Globe Services account &raquo;</a></p>
					</div>
				</div>
			</c:if>
			
			<c:if test="${submitPage == 'signup' or submitPage == 'login' or submitPage == null or submitPage == ''}">
				 <div id="header">
					<div class="regi-header"> 
			       		<div class="bcom-globe-logos"><a href="http://www.boston.com"></a> 
			        </div> 
			        
			        <c:if test="${submitPage == 'signup'}">
				        <div class="regi-header-inner"> 
						  <h1>Thanks for signing up!</h1> 
						  <p></p> 
						</div> 
			        </c:if>
			        
			        <c:if test="${submitPage == 'login'}">
				       <div class="regi-header-inner">
							<h1>Welcome</h1>
							<p></p>
						</div>
			        </c:if> 
					
					<div class="regi-header-right"> 
			            <p> 
			              You may now continue to the page you requested
			            </p>
			            <c:choose>
			            	<c:when test="${pathURL == null}">
				            	<input type="submit" value="Continue" class="form-button grey" onclick="document.location='${portalContext.publicBaseUrl}'">
				            </c:when>
				            <c:when test="${pathURL == ''}">
				            	<input type="submit" value="Continue" class="form-button grey" onclick="document.location='${portalContext.publicBaseUrl}'">
				            </c:when>
				            <c:otherwise>
				           		<input type="submit" value="Continue" class="form-button grey" onclick="document.location='${pathURL}'">
				            </c:otherwise>
				        </c:choose>  
			          </div>  
			      </div>
			</c:if> 
		
			<c:if test="${submitPage == 'email'}">
	 			<div class="member-tabs">
					<ul>
						<li><a class="resend" href="membercenter-update-info.jsp">Update personal info</a></li>
						<li class="member-tabs-selected"><a href="membercenter-subs.jsp">E-mail newsletters</a></li> 
					</ul>
				</div>
			</c:if> 
			
			<c:if test="${submitPage == 'profile'}">
	 			<div class="member-tabs">
		          <ul>
		            <li class="member-tabs-selected"><a href="membercenter-update-info.jsp">Update personal info</a></li>
		            <li><a class="resend" href="membercenter-subs.jsp">E-mail newsletters</a></li>
		          </ul>
		        </div> 
			</c:if>  

	</div>

	<div id="content" class="section section95">
		<div id="Col1">
		
			<c:if test="${submitPage == 'email'}"> 
				<h3 class="regi-icon regi-icon-subs">
					<b>You successfully updated e-mail newsletters.</b>
				</h3>
			    <br>Click here to return to the Boston.com home page. 
			    <br>
			</c:if> 
			
			<c:if test="${submitPage == 'profile'}">
	 			<h3>
	              Thanks for updating your profile. 
	            </h3>
	            <br>
				Now let's get back to what you were doing... <br>
			</c:if>   
			
			<c:if test="${submitPage == 'login'}">
	 			<div class="login-success">
				<h3>You are now logged in to Boston.com</h3>
				<br>
				Now let's get back to what you were doing... <br>
			</c:if>
			
			<c:choose>
				<c:when test="${pathURL == null or pathURL ==''}">
					<input type="button" name="dispatch" value="Continue"  class="form-button grey" onclick="document.location='/'">
				</c:when>
				<c:otherwise>
					<input type="button" name="dispatch" value="Continue"  class="form-button grey" onclick="document.location='${pathURL}'">
				</c:otherwise>
			</c:choose> 
		</div>
	
		<div id="Col2"></div>

		<div id="Col3"></div>

		<div class="cf"></div>
	</div>
 
	<jsp:include page="eom$configurationURI/Framework/regi/common/footer.jsp"/> 
	<jsp:include page="eom$configurationURI/Framework/regi/common/facebook_handler.jsp"/> 
	
	</div>
</div>

<c:if test="${submitPage == 'login'}">
	<!-- SiteCatalyst code version: H.19.3 Copyright 1997-2003 Omniture, Inc. More info available at http://www.omniture.com -->
	<%@ include file="/eom$configurationURI/Framework/global/user_state_bcom.jsp" %>	
	<script language="JavaScript" src="http://cache.boston.com/omniture/hcode/s_code.js"></script>
	<script language="JavaScript">
	<!--
	s.pageName='Member Center | BCom Registration | BCom login success page',s.channel='Member Center',s.prop1='Member Center | BCom Registration';
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
</c:if>
<c:if test="${submitPage == 'signup'}">
	<!-- SiteCatalyst code version: H.19.3 Copyright 1997-2003 Omniture, Inc. More info available at http://www.omniture.com -->
	<%@ include file="/eom$configurationURI/Framework/global/user_state_bcom.jsp" %>
	<script language="JavaScript" src="http://cache.boston.com/omniture/hcode/s_code.js"></script>
	 
	<script language="JavaScript">
	<!--
	s.pageName='Member Center | BCom Registration | Thanks for signing up/e-mail sign-up success page',s.channel='Member Center',s.prop1='Member Center | BCom Registration';
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
</c:if>

</body> 
</html>