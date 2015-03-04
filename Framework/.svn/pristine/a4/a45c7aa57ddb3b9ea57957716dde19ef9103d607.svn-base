<%@ page import="com.boston.registration.client.InsideClient" %>
<%@ page import="com.boston.registration.model.db.impl.Site" %>
<%@ page import="com.boston.registration.methode.*" %>
<%@ page import="com.boston.registration.model.db.*" %>
<%@ page import="com.boston.registration.model.db.impl.*" %>
<%@ page import="com.boston.registration.services.inside.errorhandler.*" %>
<%@ taglib prefix="c" uri="jstlCore"%>
<c:set value="${portalContext.env.sitedomain}" var="siteDomain" />

<%@include file="regi-path.jsp" %>

<%

String siteDomain = (String) pageContext.getAttribute("siteDomain");    	
InsideClient insideClient = new InsideClient(siteDomain,Site.boston);

%>
