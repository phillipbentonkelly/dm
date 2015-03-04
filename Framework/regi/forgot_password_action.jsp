<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ page import="java.util.*" %>
<%@ page import="com.boston.registration.client.*" %>
<%@ page import="com.boston.registration.methode.*" %>
<%@ page import="com.boston.registration.model.db.impl.*" %>
<%@ page import="com.boston.registration.services.inside.errorhandler.*" %>
<c:set value="${portalContext.env.sitedomain}" var="siteDomain" />

<%-- Set user bean from input form --%>
<jsp:useBean id="userBean" class="com.boston.registration.model.db.impl.UserImpl" scope="request">
	<jsp:setProperty name="userBean" param="regi_email" property="email"/>
</jsp:useBean>

<%
    try {    	
    	String siteDomain = (String) pageContext.getAttribute("siteDomain");    	
		InsideClient insideClient = new InsideClient(siteDomain);
		
		//call the forgot password service to get an email for reset
		UserResponse result = insideClient.forgotPassword(userBean.getEmail());
		
		//success 
		if (result.status >= 0)
			response.sendRedirect("forgot-password-step2.jsp");
		else 
			response.sendRedirect("forgot-password-step1.jsp?error=true");
		
	} catch (Exception ex) {
    	response.sendRedirect("regi-service-down.jsp");
    	ex.printStackTrace();
    }
%>	