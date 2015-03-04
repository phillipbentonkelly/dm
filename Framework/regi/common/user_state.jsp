<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ page import="java.net.*" %>
<%@ page import="com.eidosmedia.portal.auth.UserSession" %>

<jp:out value="${cookie['pathAuth'].value}" var="userToken"  scope="request"/>
<jp:userSession var="userSession"/>
<%
	// this logic duplicates Paywall.subscribe - may conside moving into portal hook
	UserSession userSession = (UserSession)pageContext.getAttribute("userSession");	
	boolean paid = (userSession != null && 
				( userSession.getPortalCategory() != null && ! 
				userSession.getPortalCategory().equals("")));
	pageContext.setAttribute("paid", paid); 	
	
	String referrer = (String)request.getHeader("referer");
	if ( null != referrer && referrer != "" ) {
		URL referrerURL = new URL(referrer);
		String referrerHost = referrerURL.getHost();
		pageContext.setAttribute("fromBCom", (referrerHost.indexOf("boston.com") >= 0));
	}	
%> 
<jp:out var="loggedIn" value="${userToken != null}" scope="request" />
<jp:out var="paidSubscriber" value="${paid}" scope="request"/>
<jp:out var="fromBostonCom" value="${fromBCom}" scope="request"/>

<c:choose> 
	<c:when test="${loggedIn}"> 
		<jp:out value="logged in" var="loggedInOmniture"/>
		<jp:out value="BostonGlobe.com" var="loginType"/> 
	</c:when>
	<c:otherwise>
		<jp:out value="logged out" var="loggedInOmniture"/> 
		<jp:out value="n/a" var="loginType"/>
	</c:otherwise>
</c:choose>
<%-- 
page context variables:
paidSubscriber - true/false
fromBostonCom - true/false
loggedIn - true/false

also from portal hook:
stubView - yes/no
firstclick - yes/no	
 --%>
