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
	pageContext.setAttribute("paidSubscriber", paid); 	
	
	String referrer = (String)request.getHeader("referer");
	if ( null != referrer && referrer != "" ) {
		URL referrerURL = new URL(referrer);
		String referrerHost = referrerURL.getHost();
		pageContext.setAttribute("fromBostonCom", (referrerHost.indexOf("boston.com") >= 0));
	}	
%> 
<jp:out var="loggedIn" value="${userToken != null}" scope="request" />

<c:set value="false" var="throughFB"/>
<c:choose> 
	<c:when test="${loggedIn and (throughFB=='true')}"> 
		<jp:out value="logged in" var="loggedInOmniture"/>
		<jp:out value="facebook" var="loginType"/> 
	</c:when>
	<c:when test="${loggedIn and !(throughFB=='true')}"> 
		<jp:out value="logged in" var="loggedInOmniture"/>
		<jp:out value="Boston.com" var="loginType"/> 
	</c:when>
	<c:otherwise>
		<jp:out value="logged out" var="loggedInOmniture"/> 
		<jp:out value="n/a" var="loginType"/>
	</c:otherwise>
</c:choose>
