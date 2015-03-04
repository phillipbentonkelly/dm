<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ page import="java.util.*" %>
<%@ page import="com.boston.registration.client.*" %>
<%@ page import="com.boston.registration.methode.*" %>
<%@ page import="com.boston.registration.model.db.impl.*" %>
<%@ page import="com.boston.registration.services.inside.errorhandler.*" %>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="p" uri="ptag"%>
<jsp:include page="eom$configurationURI/Framework/regi/common/header.jsp"/>
<p:getObject path="$configurationURI/Framework/regi/boston-email-list.xml" var="EmailList" />
<p:object webObject="${EmailList}" content="email_list_content" />
 <body>
	<meta name="WT.cg_n" content="Member Center" /> 
	<meta name="WT.cg_s" content="Member Center" /> 
	<meta name="ti" content="Registration form" /> 
	<meta name="WT.si_n" content="newMember" /> 
	<meta name="WT.si_x" content="1" /> 
	 <style type="text/css">
		 <%-- <jsp:include page="eom$configurationURI/Framework/css/bcom-bootstrap.css"/> --%>
	</style>
  	 <div id="container"> 
    	<div id="containerBorder"> 
	  		<div id="header"> 
        		<div class="regi-header"> 
        			<div class="bcom-globe-logos"> 
            			<a href="http://www.boston.com"></a> 
          			</div> 
          			<div class="regi-header-inner"> 
          				<h1>Welcome, you are now a member</h1>
			            <p></p> 
			          </div> 
					 
        		</div> 
      		</div>  
		<div id="content"> 
        	<div id="">  
          		<h3 class="regi-icon regi-icon-subs" style="color:#E92"><b>Sign up for FREE e-mails from 

Boston.com</b>:</h3>
				<form name="loginForm" method="post" action="register_action_email_list.jsp" id="subs"> 
				<input type="hidden" name="mode" value="end-of-reg"> 
				<input type="hidden" name="regType" value=""> 
				<input type="hidden" name="uid" value="tx/32FHK5T0="> 
				<input type="hidden" name="validate" value="false"> 
				<input type="hidden" name="loadLists" value="false"> 
				<input type="hidden" name="regi_email"  >
				<input type="hidden" name="newUser" value="true">
				
				<input type="hidden" name="regi_token" value="<%=request.getParameter("authtoken")%>">
				
								
				<div id="member-newsletter-subscriptions"> 
							
					<div class="newsletter-subscribe"> 
						<div class="section-header"> 
			              <span class="newsletter-action"> 
			                Subscribe
			              </span> 
						</div>  
						 <ul class="columns double"> 
						<x:forEach select="$email_list_content//EmailList/EmailListElement" 

var="email_list_ele" varStatus="counter">  
							<c:set var="divID" value="subscribe_${counter.count}" />
							<c:set var="inputID" value="regi_email_subscribe_${counter.count}" 

/>
							<p:out xvalue="$email_list_ele//EmailListName" var="emailName" />	
							<p:out xvalue="$email_list_ele//EmailListID" var="emailID" /> 
							<p:out xvalue="$email_list_ele//EmailListDesc" var="emailDesc" /> 
							<p:out xvalue="$email_list_ele//EmailListSample" var="emailSample" 

/> 							 
							<p:out xvalue="$email_list_ele//ShowRegiNewsletter" var="show" />
							<%-- added subscribeByDefault parameter according with REGI-898 

--%>
							<p:out xvalue="$email_list_ele//SubscribeByDefault" 

var="subscribeByDefault" />
							<c:choose>
								<c:when test="${show == '1'}">
									<li>
									<div class="newsletter-subscribe-item" 

id="${divID}" > 
										<label for="${inputID}"> 
											<span class="newsletter-checkbox"> 
												<input class="type-

checkbox" type="checkbox" name="regi_email_subscribe" id="${inputID}" value="${emailID}"
													<c:if 

test="${subscribeByDefault == '1'}">
														

checked="checked"
													</c:if>
												> 
											</span> 
											<span class="newsletter-name"> 
											  <b>${emailName}</b>
											  <c:if test="${ not empty 

emailSample}">
											 	<a href="#" class="view-

sample" data-modalsrc="${emailSample }">See a sample</a>
											  </c:if>
											</span> 
											<span class="newsletter-

description"> 
												${emailDesc} 
											</span> 
										</label> 
									</div>
									</li>
								</c:when>
								<c:otherwise>
									<c:if test="${subscribeByDefault == '1'}">
										<input type="hidden" 

name="regi_email_subscribe" value="${emailID}">
									</c:if>
								</c:otherwise>	
						 	</c:choose>
						</x:forEach>  
						</ul>

					</div> 					
					<span class="member-update-newsletters">  
						<input type="hidden" name="dispatch" value="signup"> 
						<input type="submit" value="Continue" class="form-button">	           

                 
					</span> 
				</div>

          </form> 
          
        </div> 
 
        	<div id="Col2"></div>  
	        <div id="Col3"></div>  
	        <div class="cf"></div> 
      	</div> 
 
		 <jsp:include page="eom$configurationURI/Framework/regi/common/footer.jsp"/>
		<jsp:include page="eom$configurationURI/Framework/regi/common/facebook_handler.jsp"/> 
    </div> 
  </div> 
 
 
	<!-- SiteCatalyst code version: H.19.3 Copyright 1997-2003 Omniture, Inc. More info available at 

http://www.omniture.com -->
	<%@ include file="/eom$configurationURI/Framework/global/user_state_bcom.jsp" %>
	<script language="JavaScript" src="//cache.boston.com/omniture/hcode/s_code_latest.js"></script>
	 
	<script language="JavaScript"><!--
	if(typeof s !== 'undefined') {
	s.pageName='Member Center | BCom Registration | Welcome, you are now a member/e-mail sign-up 

page',s.channel='Member Center',s.prop1='Member Center | BCom Registration';
	s.server='',s.pageType='',s.prop2='',s.prop3='',s.prop4='',s.prop5='',s.prop6='BCom Registration 

Page',s.prop7='',s.prop8='',s.prop9='',s.prop10='',s.prop41='Boston.com',
	s.prop35='${loggedInOmniture}',s.eVar20='D=c35',s.prop42='${loginType}',s.eVar42='${loginType}';
	/* E-commerce Variables */
	

s.campaign='',s.state='',s.zip='',s.events='',s.products='',s.purchaseID='',s.eVar1='',s.eVar2='',s.eVar3='',s.eVar4='',s.

eVar5='',s.eVar6='',s.eVar7='',s.eVar8='',s.eVar9='',s.eVar10='',s.eVar41='Boston.com';
	var s_code=s.t();if(s_code)document.write(s_code);}
	//--></script>
	<script language="JavaScript" type="text/javascript"><!--
	if(navigator.appVersion.indexOf('MSIE')>=0)document.write(unescape('%3C')+'\!-'+'-')
	//--></script>
	<noscript><a href="http://www.omniture.com" title="Web Analytics"><img 

src="//nytbglobe.112.2O7.net/b/ss/nytbglobe/1/H.19.3--NS/0" height="1" width="1" alt="" /></a></noscript><!--/DO NOT 

REMOVE/-->
	
	<!-- START Nielsen Online SiteCensus V6.0 -->
	<!-- COPYRIGHT 2010 Nielsen Online -->
	<script type="text/javascript"> 
	  (function () {
	    var d = new Image(1, 1);
	    d.onerror = d.onload = function () {
	      d.onerror = d.onload = null;
	    };
	    d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=us-604060h&cg=0&cc=1&si=", escape(window.location.href), 

"&rp=", escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
	  })();
	</script>
	<noscript>
	  <div>
	    <img src="//secure-us.imrworldwide.com/cgi-bin/m?ci=us-604060h&amp;cg=0&amp;cc=1&amp;ts=noscript" width="1" 

height="1" alt="" />
	  </div>
	</noscript>
	<!-- END Nielsen Online SiteCensus V6.0 -->
	<jsp:include page="eom$configurationURI/Framework/skins/components/email_lists/common/email_list_js.jpt" />
 
</body> 
</html> 