<%@ page import="com.boston.registration.methode.RegiAuthenticationHandler" %>
<%@ page import="com.eidosmedia.portal.auth.UserSession" %>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="c" uri="jstlCore"%>

<jp:userSession var="userSession" />
<c:set value="${portalContext.env.userSession}" var="userSession" />

<%

RegiAuthenticationHandler handler=new RegiAuthenticationHandler();
UserSession userSession=(UserSession) pageContext.getAttribute("userSession");

handler.onSignOut(request,response,userSession);

if (session != null)
	session.invalidate();

String redirectTo=request.getParameter("redirect");

response.sendRedirect(redirectTo == null ? 
		"/" : redirectTo);


%>