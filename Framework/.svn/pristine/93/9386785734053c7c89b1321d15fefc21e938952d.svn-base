<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ page import="java.util.*" %>
<%@ page import="javax.servlet.http.Cookie" %>
<%@ page import="com.boston.registration.client.*" %>
<%@ page import="com.boston.registration.methode.*" %>
<%@ page import="com.boston.registration.model.db.impl.*" %>
<%@ page import="com.boston.registration.services.inside.errorhandler.*" %>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="jp" uri="jptag"%>
<jp:userSession var="userSession" />
<c:set value="${portalContext.env.sitedomain}" var="siteDomain" /> 

<%--2011.09.23 - brett.berardinis@eidosmedia.com
	- Written to pass a parameter of an email list ID to auto-register a user for a specific list
	- If the listID is 35, it will go to the Boston Deals page (boston-deals-register.jsp)
 --%>

<c:set value="${userSession.email}" var="userEmail" />
<c:set  value="${param.listid}" var="listID" />
<c:set value="${userSession.authToken}" var="authToken" /> 

<%-- REGI-650 --%>
<c:if test="${(userSession == null or userSession.email == null or userSession.authToken == null)}">
	<%
	String url = request.getRequestURL() + "?" + request.getQueryString();
	Cookie pathUrlCookie = Paywall.getPathUrlCookie(url, ".boston.com");
	response.addCookie(pathUrlCookie);
	%>
</c:if>
<%-- /REGI-650 --%>

		
		
<p>${serSession}</p>
<p>${userSession.email}</p>	
<p>${userSession.authToken}</p>		

	