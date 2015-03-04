<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ page import="java.util.*" %>
<%@include file="common/regi-client.jsp" %> 
<%@ page import="com.eidosmedia.portal.auth.UserSession" %>
<%@ page import="com.boston.registration.methode.RegiAuthenticationHandler" %>

<c:set value="${cookie['pathAuth'].value}" var="userToken"/>
<c:set value="${cookie['pathUrl'].value}" var="pathUrl"/> 

<jp:userSession var="userSession"/>		

<c:choose>
	<c:when test="${pathUrl != null}">
	    <c:set value="${pathUrl}" var="redirectURL" />
	</c:when>
	<c:otherwise>
		<c:set value="${portalContext.publicBaseUrl}" var="redirectURL" />
	</c:otherwise>
</c:choose>	  
<%
 	Object partialProfile=session.getAttribute("SESS_PARTIALPROFILE");
 	boolean update=false;
 	if ( RegiAuthenticationHandler.PARTIALPROFILECK != null && RegiAuthenticationHandler.PARTIALPROFILECK.equals("true") &&
 			null != partialProfile && partialProfile.equals(Boolean.TRUE) ) {
 		
 		update=true;
 	}
%> 

<%
	if (update) { 
		response.sendRedirect(regipath+"/update-account.jsp");
		//response.sendRedirect("/?hello=true");
	} else {
		response.sendRedirect((String)pageContext.getAttribute("redirectURL"));
	}
%>
   
 
 
