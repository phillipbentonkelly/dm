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
<%@ include file="common/regi-path.jsp" %>
<jp:userSession var="userSession" />
<c:set value="${portalContext.env.sitedomain}" var="siteDomain" /> 

<%--2011.09.23 - brett.berardinis@eidosmedia.com
	- Written to pass a parameter of an email list ID to auto-register a user for a specific list
	- If the listID is 35, it will go to the Boston Deals page (boston-deals-register.jsp)
 --%>

<c:set value="${userSession.email}" var="userEmail" />
<c:set  value="${param.listid}" var="listID" />
<c:set value="${userSession.authToken}" var="authToken" /> 

<c:choose>
	<%-- REGI-650 --%>
	<c:when test="${(userSession == null or userSession.email == null or userSession.authToken == null)}">
		<%
		String url = request.getRequestURL() + "?" + request.getQueryString();
		Cookie pathUrlCookie = Paywall.getPathUrlCookie(url, ".boston.com");
		response.addCookie(pathUrlCookie);
		%>
	</c:when>
	<%-- /REGI-650 --%>
	<%-- REGI-917 --%>
	<c:otherwise>
		<c:set var="pathUrlValue" value="${cookie['pathUrl'].value}" />
		<%
		String pathUrlValue = (String) pageContext.getAttribute("pathUrlValue");
		if (pathUrlValue != null && pathUrlValue.contains("register_action_email_list_param.jsp")){
			pathUrlValue = basepath;
		}
		Cookie pathUrlCookie = new Cookie("pathUrl", pathUrlValue);
		pathUrlCookie.setDomain(".boston.com");
		pathUrlCookie.setPath("/");
		response.addCookie(pathUrlCookie);
		%>
	</c:otherwise>	
	<%-- /REGI-917 --%>
</c:choose>	
		

<c:if test="${(userSession == null or userSession.email == null or userSession.authToken == null) and (listID == '35')}">
	 <c:redirect url="deals-regi-page.jsp" />
</c:if>
  
<c:if test="${userSession == null or userSession.email == null or userSession.authToken == null or listID == null}">
	 <c:redirect url="login.jsp" />
</c:if>  

<%-- Set user bean from input form --%>
<jsp:useBean id="email_list_subscribe_Bean" class="com.boston.registration.model.db.impl.UserImpl" scope="request">
	<jsp:setProperty name="email_list_subscribe_Bean" param="regi_email_subscribe" property="emailListId"/>
    <jsp:setProperty name="email_list_subscribe_Bean" param="regi_token" property="authToken"/> 
</jsp:useBean>

<jsp:useBean id="email_list_unsubscribe_Bean" class="com.boston.registration.model.db.impl.UserImpl" scope="request">
	<jsp:setProperty name="email_list_unsubscribe_Bean" param="regi_email_unsubscribe" property="emailListId"/>
</jsp:useBean>

<jsp:useBean id="email_list_unsubscribe_all_Bean" class="com.boston.registration.model.db.impl.UserImpl" scope="request">
	<jsp:setProperty name="email_list_unsubscribe_all_Bean" param="regi_email_unsubscribe_all" property="emailListId"/>
</jsp:useBean>
  
 
<c:if test="${userSession == null}">
	<%
	try {
		String authToken = (String) pageContext.getAttribute("authToken");
		String siteDomain = (String) pageContext.getAttribute("siteDomain");
		InsideClient insideClient = new InsideClient(siteDomain);
		UserResponse userResp = insideClient.getUserByToken(authToken);
		pageContext.setAttribute("userEmail",userResp.getUser().getEmail());
		
	} catch (Exception ex) { 
		ex.printStackTrace(); 
	}
	%>
</c:if>
  
<%
try {	 
		
		String authToken = (String) pageContext.getAttribute("authToken");
		String listID = (String) pageContext.getAttribute("listID");
		String siteDomain = (String) pageContext.getAttribute("siteDomain");			    			    	
		InsideClient insideClient = new InsideClient(siteDomain); 
		 	    
		String emailaddress = (String) pageContext.getAttribute("userEmail");
	  
		if (emailaddress==null) {
			UserResponse userResp = insideClient.getUserByToken(authToken);
			emailaddress=userResp.getUser().getEmail(); 
		}
		  
		if ((listID != null) && (emailaddress != null)) {
			listID = listID.replaceAll("\\[","");
			listID = listID.replaceAll("\\]","");
			listID = listID.replaceAll(" ",""); 
	       	UserResponse userResp = insideClient.subscribeMailingList(emailaddress,listID);
	       	
	    } 
   
%>  

 
<c:choose>	
	<c:when test="${listID == '35'}">
		<% response.sendRedirect(regipath + "/boston-deals-register.jsp"); %>
	</c:when>
	<c:when test="${listID == '35' and userSession == null }">
		<% response.sendRedirect(regipath + "/deals-regi-page.jsp"); %>
	</c:when>
	<c:when test="${userSession != null}">
		<% response.sendRedirect(regipath + "/membercenter-thankyou.jsp?update=email"); %>
	</c:when>
 	<c:otherwise>
 		<% response.sendRedirect(regipath + "/login.jsp"); %>
 	</c:otherwise>
</c:choose> 

<%  
} catch (Exception ex) {
	out.println(ex.toString());
	ex.printStackTrace();
}
%>

