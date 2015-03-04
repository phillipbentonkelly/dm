<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ page import="java.util.*" %>
<%@ page import="com.boston.registration.client.*" %>
<%@ page import="com.boston.registration.methode.*" %>
<%@ page import="com.boston.registration.model.db.impl.*" %>
<%@ page import="com.boston.registration.model.db.*" %>
<%@ page import="com.boston.registration.services.inside.errorhandler.*" %>

<c:set value="${param.errorurl}" var="errurl" />
<c:set value="${portalContext.env.sitedomain}" var="siteDomain" />
<c:set var="regipath" value="${fn:replace(portalContext.publicBaseUrl,'http:','https:')}/eom$configurationURI/Framework/regi" />
	 	  
<%
	try {
		String siteDomain = (String) pageContext.getAttribute("siteDomain");			    	
		InsideClient insideClient = new InsideClient(siteDomain);		
		String sUserEmail = (String) session.getAttribute( "SESS_REGI_USERNAME" );
		UserResponse userObject = insideClient.getByEmail(sUserEmail);
				
		if (!(userObject.isAccountProfileCompleted())) {
			pageContext.setAttribute("completeprofile","false");
		} else {
			pageContext.setAttribute("completeprofile","true");
		}
				
	} catch (Exception ex) {
		//System.out.println("ERROR " + ex);
		//ex.printStackTrace();
		pageContext.setAttribute("completeprofile","true");				 
	}	
%> 
 
 <c:choose>
	<c:when test="${completeprofile == 'false'}">
		<c:redirect url="${regipath}/update-account.jsp" />
	</c:when>
 	<c:otherwise>        	        
 		<c:redirect url="${errurl}"/>
 	</c:otherwise>
</c:choose> 