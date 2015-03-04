<%--
Changed login link
for Boston Globe
BGLOBE-4011
--%>

<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="p" uri="ptag"%>
<jp:userSession var="userSession" />

<jsp:include page="eom$configurationURI/Framework/regi/common/header.jsp"/>
<body> 
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
        </div>
      </div>

      <div id="content">
        <div id="Col1">
          
          <div class="create-password-success">
            <h1>Your password was successfully created</h1>
						
			<p>
			  To continue to boston.com, please <a href="login.jsp">log in here</a><br/>
			  To continue to bostonglobe.com, please <a href="https://www.bostonglobe.com/eom/SysConfig/WebPortal/BostonGlobe/Framework/regi/final-login.jsp">log in here</a>.
			</p>
          </div>
          
        </div>


		<div id="Col2" class="half-page-split"></div> 
        <div id="Col3"></div> 
        <div class="cf"></div>
      </div> 
      	<jsp:include page="eom$configurationURI/Framework/regi/common/footer.jsp"/>
        
        <div class="cf"></div>
      </div>

    </div>
  </div>
	<!-- SiteCatalyst code version: H.19.3 Copyright 1997-2003 Omniture, Inc. More info available at http://www.omniture.com -->
	<%@ include file="/eom$configurationURI/Framework/global/user_state_bcom.jsp" %>
	<script language="JavaScript" src="//cache.boston.com/omniture/hcode/s_code_latest.js"></script>
	<script language="JavaScript"><!--
	s.pageName='Member Center | BCom Registration | BCom password reset Step 2 - Password successfully created',s.channel='Member Center',s.prop1='Member Center | BCom Registration';
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
