<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="jp" uri="jptag"%>
<jp:userSession var="userSession" />
<%@ include file="common/regi-path.jsp" %>
<jsp:include page="eom$configurationURI/Framework/regi/common/header.jsp"/>

<body>
	<meta name="WT.cg_n" content="Member Center" />
	<meta name="WT.cg_s" content="Member Center" />
	<meta name="ti" content="Registration form" />
	<meta name="WT.si_n" content="newMember" />
	<meta name="WT.si_x" content="1" />

	<div id="container"> 
		<div id="containerBorder">
			<div class="regi-header">
				<div class="bcom-globe-logos">
					<a href="${basepath}"></a>
				</div>
				<div class="regi-header-inner">
					<!--  norlov@thumbtack.net: "We haven't seen you in a while!" removed according to BCOM-9404 -->
					<h1>Log in to continue your free membership with Boston.com</h1> 
				</div>
			</div><!--/end .regi-header -->
		<div id="content" class="section section95">
			<div id="Col1-login"> 
				<div class="fb-login"> 
					<h3 class="fb-login-header"><span class = fb-login-header-inner>Log in with Facebook</span></h3>
					<p class="fb-login-text">
						Use your Facebook account to get full access to Boston.com.
						<span class="fb-login-button">
							<img src="//graphics.boston.com/images/registration/truste2007/fb-login-button.png" onclick="javascript:FB.login(fbSessionHandler, {scope:'user_birthday,email'});">
						</span>
					</p>
				</div>
				<div id="login"> 
					<h3 class="regi-icon regi-icon-bcom">Log in with your account</h3>
					<form name="loginForm" method="post" action="<c:url value="/Login" />">
						<input type="hidden" name="redirect" value="<jp:url type='context' public='secure' value='/eom$configurationURI/Framework/regi/membercenter-redirect.jsp'/>?update=login" />
						<input type="hidden" name="onerror" value="<jp:url type='context' public='secure' value='/eom$configurationURI/Framework/regi/login-error.jsp' />?errorurl=<jp:url type='context' public='secure' value='/eom$configurationURI/Framework/regi/login.jsp' />?error=true" />
						<input type="hidden" name="mode" value="login" />
						<input type="hidden" name="validate" value="false" />
						<input type="hidden" name="loadLists" value="true" />
						<input type="hidden" name="regType" value="" />
						<input type="hidden" name="seamlesswebtag" value="" />
						<c:choose>
							<c:when test="${param.error == 'true'}">
								<div class="form-error">Invalid e-mail or password. Try again or click the "Forgot your password?" link below.</div>
							</c:when>
							<c:otherwise>
								<div class="form-error" style="display:none">One or more required fields is missing.</div>
							</c:otherwise>
						</c:choose>
						<div class="form-fieldset form-required form-name-firstname">
							<label for="login_email">
								<span class="form-legend">E-mail*</span>
								<span class="form-fields">
									<input class="type-text" type="text" name="username" id="username" value="" />
								</span>
							</label>
						</div>
						<div class="form-fieldset form-required form-name-password">
							<label for="login-password">
								<span class="form-legend">Password*</span>
								<span class="form-fields">
									<input class="type-password" type="password" autocomplete="off" name="password" id="password" value="">
								</span>
							</label>
						</div>
						<span class="regi-rememberme">
							<label for="regi-rememberme">
								<input class="type-checkbox" type="checkbox" name="remember" value="remember" checked />
								Remember me on this computer.
							</label>
						</span>
						<div class="form-fieldset form-name-submit">
							<span class="form-fields">
								<input type="submit" name="dispatch" value="Login" class="form-button" />
							</span>
							<span class="form-message">
								<a href="${regipath}/forgot-password-step1.jsp">Forgot your password?</a>
							</span>
						</div>
						<p class="login-footer">If you have already created an account with Boston Globe Services, you may login with that e-mail and password.</p>
						<div class="regi-login-login-problems">
							<h3 class="regi-icon regi-icon-login-problems">Login issue?</h3>
							<p>Having trouble logging in? Already registered but being asked to log in again?</p>
							<p class="footer"><a href="http://www.boston.com/help/feedback/">Let us know &raquo;</a></p> 
						</div>
					</form>
				</div><!--/end #login -->
			</div><!--/end #Col1-login -->
			<div id="Col2-login">
				<div id="memberText">
					<h1>Not signed up yet? Not to worry - it's still FREE!</h1>
					<h2>Benefits of membership:</h2>
					<ul>
						<li>Unlimited access to the entire Boston.com site</li> 
						<li>Share your comments on articles and join the conversation</li> 
						<li>Newsletters on topics of your choice, from breaking news and sports to shopping and local deals</li> 
					</ul>
					<div class="register-button-container">
						<div class="register-button">
							<input type="button" name="dispatch" value="Register now!" onClick="parent.location='/eom$configurationURI/Framework/regi/regi-login-register.jsp'" class="form-button">
						</div>
					</div>
				</div> 
			</div>
			<script type="text/javascript" language="JavaScript">
			/* $('.contestlink').click(function(){
				$.openDOMWindow({width:580,height:480,loader:1,windowPadding:0,loaderHeight:16,loaderWidth:17,borderColor:'#000',overlayOpacity:70,windowSourceID:'#contestDetails'});
				return false;
			}); */
			</script>
			<div id="contestDetails" style="display:none;width:580px;"> 
				<div style="background-color:#000;height:15px;color:#fff;padding:10px;">
					<span style="float:left">Contest Details</span>
					<a href="#" class="closeDOMWindow" style="float:right;color:#fff" >close X</a>
				</div>
				<div style="overflow-x:hidden;overflow-y:scroll;width:580px;height:450px;">
					<img src="//graphics.boston.com/images/ads/regi/rewards.jpg" usemap="#Map" />
					<map name="Map" id="Map">
						<area shape="rect" coords="168,670,250,796" href="#" onclick="window.open('http://boston.com/advertisers/regi/rules/','RULES','width=500,height=300');" />
						<area shape="rect" coords="11,663,165,796" href="#" class="closeDOMWindow" alt="Go back" />
					</map>
				</div>
			</div>
			<div id="Col3"></div>
			<div class="cf"></div>
		</div>
		<jsp:include page="eom$configurationURI/Framework/regi/common/footer.jsp"/>
		<jsp:include page="eom$configurationURI/Framework/regi/common/facebook_handler.jsp"/>
	</div> <!--/end #containerBorder -->
	</div>
	<!-- SiteCatalyst code version: H.19.3 Copyright 1997-2003 Omniture, Inc. More info available at http://www.omniture.com -->
	<%@ include file="/eom$configurationURI/Framework/regi/common/user_state_bcom.jsp" %>
	<script language="JavaScript" src="//graphics.boston.com/omniture/hcode/s_code.js"></script> 
	<script language="JavaScript"><!--
	s.pageName='Member Center | BCom Registration | BCom Already a member? login challenge page',s.channel='Member Center',s.prop1='Member Center | BCom Registration';
	s.server='',s.pageType='',s.prop2='',s.prop3='',s.prop4='',s.prop5='',s.prop6='BCom Registration Page',s.prop7='',s.prop8='',s.prop9='',s.prop10='',s.prop41='Boston.com',
	s.prop35='${loggedInOmniture}',s.eVar20='D=c35',s.prop42='${loginType}',s.eVar42='${loginType}';
	/* E-commerce Variables */
	s.campaign='',s.state='',s.zip='',s.events='',s.products='',s.purchaseID='',s.eVar1='',s.eVar2='',s.eVar3='',s.eVar4='',s.eVar5='',s.eVar6='',s.eVar7='',s.eVar8='',s.eVar9='',s.eVar10='',s.eVar41='Boston.com';
	var s_code=s.t();if(s_code)document.write(s_code)
	//--></script>
	<script language="JavaScript" type="text/javascript"><!--
	if(navigator.appVersion.indexOf('MSIE')>=0)document.write(unescape('%3C')+'\!-'+'-')
	//--></script>
	<noscript><a href="http://www.omniture.com" title="Web Analytics"><img src="//nytbglobe.112.2O7.net/b/ss/nytbglobe/1/H.19.3--NS/0" height="1" width="1" alt="" /></a></noscript><!--/DO NOT REMOVE/-->
	
	<!-- START Nielsen Online SiteCensus V6.0 -->
	<!-- COPYRIGHT 2010 Nielsen Online -->
	<script type="text/javascript">
	(function () {
		var d=new Image(1, 1);
		d.onerror=d.onload=function(){d.onerror=d.onload=null;};
		d.src=["//secure-us.imrworldwide.com/cgi-bin/m?ci=us-604060h&cg=0&cc=1&si=",escape(window.location.href),"&rp=",escape(document.referrer),"&ts=compact&rnd=",(new Date()).getTime()].join('');
	})();
	</script>
	<noscript>
		<div><img src="//secure-us.imrworldwide.com/cgi-bin/m?ci=us-604060h&amp;cg=0&amp;cc=1&amp;ts=noscript" width="1" height="1" alt="" /></div>
	</noscript>
	<!-- END Nielsen Online SiteCensus V6.0 -->
	<!-- Chartbeat, GO! -->
	<script type="text/javascript" src="/js/tracking/bcom-chartbeat.js"></script> 
</body>
</html>
