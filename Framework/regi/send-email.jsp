<%@ page pageEncoding="UTF-8" %>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ page import="java.util.*" %>
<%@ page import="com.boston.registration.client.*" %>
<%@ page import="com.boston.registration.model.db.impl.*" %>
<%@ page import="com.boston.registration.services.inside.errorhandler.*" %>

<%@ include file="common/regi-client.jsp" %>

<%	//default email for debuging
	String emailTo="dev@boston.com";
	String emailSubject="";
	String emailBody="";
%>

<%
response.setContentType("application/json");
try {
    emailTo=request.getParameter("emailTo");
    emailSubject=request.getParameter("subject");
    emailBody=request.getParameter("body");
} catch (Exception ex) {
	response.getWriter().write("{\"status\":\"false\"}");
}


EmailTemplateImpl emailTemplate=new EmailTemplateImpl(3,emailTo,new String[]{
		"name=Elie Fossi",
		"emailaddr="+emailTo,
		"FirstName=Elie",
		"LastName=Fossi"
				} );
Object result;
try{
	result=insideClient.sendMessage(emailTemplate,"bgstormpost");
}catch(Exception ex){
	response.getWriter().write("{\"status\":\"false\"}");
}
//response.getWriter().write(result); 
response.getWriter().write("{\"status\":\"true\"}");

%>
