<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ page import="java.util.*" %>
<%@ page import="com.boston.registration.client.*" %>
<%@ page import="com.boston.registration.methode.*" %>
<%@ page import="com.boston.registration.model.db.impl.*" %>
<%@ page import="com.boston.registration.services.inside.errorhandler.*" %>
<c:set value="${portalContext.env.sitedomain}" var="siteDomain" />

<%-- Set forgot password bean from input form --%>
<jsp:useBean id="forgotpasswordBean" class="com.boston.registration.model.db.impl.ForgotPasswordRecordImpl" scope="request">
	<jsp:setProperty name="forgotpasswordBean" param="regi_forgottoken" property="passwordToken"/>
</jsp:useBean>

<%-- Set password bean from input form --%>
<jsp:useBean id="passwordBean" class="com.boston.registration.model.db.impl.PasswordImpl" scope="request">
	<jsp:setProperty name="passwordBean" param="regi_password" property="newPassword"/>
	<jsp:setProperty name="passwordBean" param="regi_password2" property="confirmNewPassword"/>
</jsp:useBean>

<%
    try {    	    		    
    	String siteDomain = (String) pageContext.getAttribute("siteDomain");    	
		InsideClient insideClient = new InsideClient(siteDomain);
		UserResponse user = insideClient.getUserByPwdToken(forgotpasswordBean.getPasswordToken());		
		
		System.out.println("user.status: "+user.status);
		
		if (user.status==0) {
			UserResponse obj = new UserResponse();
			
			System.out.println("user.getUser().getEmail(): "+user.getUser().getEmail());
			
		    passwordBean.setEmail(user.getUser().getEmail());
			obj.setPassword(passwordBean);  
			UserResponse result = insideClient.changePassword(obj);
			
			System.out.println("result.status: "+result.status);
			
			//success 
			if (result.status==0)
				response.sendRedirect("password-reset-confirmation.jsp");		
			else
				response.sendRedirect("create-password.jsp?error=true&pwdToken="+forgotpasswordBean.getPasswordToken());
		
		} else {
			response.sendRedirect("create-password.jsp?error=true&pwdToken="+forgotpasswordBean.getPasswordToken());
		}
		
	} catch (Exception ex) {
    	response.sendRedirect("regi-service-down.jsp");
    	ex.printStackTrace();
    }
%>	