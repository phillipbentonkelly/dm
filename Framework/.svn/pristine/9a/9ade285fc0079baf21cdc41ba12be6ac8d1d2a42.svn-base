<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ page import="java.util.*" %>
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

<%-- Set user bean from input form --%>
<jsp:useBean id="email_list_subscribe_Bean" class="com.boston.registration.model.db.impl.UserImpl" scope="request">
	<jsp:setProperty name="email_list_subscribe_Bean" param="regi_email_subscribe" property="emailListId"/>
    <jsp:setProperty name="email_list_subscribe_Bean" param="regi_token" property="authToken"/> 
</jsp:useBean>

<jsp:useBean id="email_list_unsubscribe_Bean" class="com.boston.registration.model.db.impl.UserImpl" scope="request">
	<jsp:setProperty name="email_list_unsubscribe_Bean" param="regi_email_unsubscribe" property="emailListId"/>
</jsp:useBean>

<jsp:useBean id="email_list_unsubscribe_all_Bean" class="com.boston.registration.model.db.impl.UserImpl" scope="request">
	<jsp:setProperty name="email_list_unsubscribe_all_Bean" param="regi_email_unsubscribe_all" 

property="emailListId"/>
</jsp:useBean>

<c:set value="${userSession.email}" var="userEmail" />
<c:set value="${cookie['pathUrl'].value}" var="pathUrl" />

<c:choose>
	<c:when test="${userSession == null || userSession eq ''}">
		<%
		try {
			String siteDomain = (String) pageContext.getAttribute("siteDomain");
			InsideClient insideClient = new InsideClient(siteDomain);
			UserResponse userResp = insideClient.getUserByToken(email_list_subscribe_Bean.getAuthToken());
			pageContext.setAttribute("userEmail",userResp.getUser().getEmail());
		} catch (Exception ex) { 
			ex.printStackTrace(); 
		}
		%>
	</c:when>
	<c:otherwise>
		<%
		try {	
			String siteDomain = (String) pageContext.getAttribute("siteDomain");			    		

	    	
			InsideClient insideClient = new InsideClient(siteDomain);
		    String[] email_list_subscribe = email_list_subscribe_Bean.getEmailListId();
		    String[] email_list_unsubscribe = email_list_unsubscribe_Bean.getEmailListId();    
		    String[] email_list_unsubscribe_all = email_list_unsubscribe_all_Bean.getEmailListId();    
		    
			String emailaddress = (String) pageContext.getAttribute("userEmail");
			if (emailaddress==null) {
				UserResponse userResp = insideClient.getUserByToken

(email_list_subscribe_Bean.getAuthToken());
				emailaddress=userResp.getUser().getEmail();
			}
			
			String subscribevalues = Arrays.toString(email_list_subscribe);
		    String unsubscribevalues = Arrays.toString(email_list_unsubscribe);
		    String unsubscribeallvalues = Arrays.toString(email_list_unsubscribe_all); 
		    
		    if ((email_list_unsubscribe_all != null) && (email_list_unsubscribe_all.length > 0)){
		    	unsubscribeallvalues = unsubscribeallvalues.replaceAll("\\[","");
		    	unsubscribeallvalues = unsubscribeallvalues.replaceAll("\\]","");
		    	unsubscribeallvalues = unsubscribeallvalues.replaceAll(" ","");
		    	UserResponse userResp = insideClient.unsubscribeMailingList(emailaddress,unsubscribeallvalues); 
		    	
		    } else {
		    	if ((email_list_subscribe != null) && (email_list_subscribe.length > 0)) {
		        	subscribevalues = subscribevalues.replaceAll("\\[","");
		        	subscribevalues = subscribevalues.replaceAll("\\]","");
		        	subscribevalues = subscribevalues.replaceAll(" ","");
		        	UserResponse userResp = insideClient.subscribeMailingList(emailaddress,subscribevalues);  
		        }
		
		    	if ((email_list_unsubscribe != null) && (email_list_unsubscribe.length > 0)) {
		        	unsubscribevalues = unsubscribevalues.replaceAll("\\[","");
		        	unsubscribevalues = unsubscribevalues.replaceAll("\\]","");
		        	unsubscribevalues = unsubscribevalues.replaceAll(" ","");
		        	UserResponse userResp = insideClient.unsubscribeMailingList

(emailaddress,unsubscribevalues);         	
		        }
		    }
		    String pathUrl = (String) pageContext.getAttribute("pathUrl");
		    String newPathUrl = null;
		    String prevPathUrl = (String) session.getAttribute("prevPathUrl");
			if (prevPathUrl != null) {
				newPathUrl = prevPathUrl;
			} else if (pathUrl == null) {
				newPathUrl = basepath;
			}
			if (newPathUrl != null) {
				Cookie pathUrlCookie = new Cookie("pathUrl", newPathUrl);
				pathUrlCookie.setPath("/");
				pathUrlCookie.setDomain(".boston.com");
				pathUrlCookie.setMaxAge(-1);
				response.addCookie(pathUrlCookie);
			}
		} 
		catch (Exception ex) {
			ex.printStackTrace();
		}
		%>
	</c:otherwise>
</c:choose>

<c:set  value="${param.newUser}" var="newUser" /> 
<c:set  value="${param.dispatch}" var="dispatchPage" /> 
  
<%--New User is set in the regi-email-continue.jsp --%>
<c:choose>
	<c:when test="${newUser == 'true' }">
		<% response.sendRedirect(regipath + "/membercenter-thankyou.jsp?update=signup"); %>
	</c:when>
	<c:when test="${userSession != null}">
		<% response.sendRedirect(regipath + "/membercenter-thankyou.jsp?update=email"); %>
	</c:when>
 	<c:otherwise>
 		<% response.sendRedirect(regipath + "/"); %>
 	</c:otherwise>
</c:choose> 

