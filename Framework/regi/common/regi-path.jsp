<%@ taglib prefix="fn" uri="jstlFunctions"%>
<!-- absolute url to registration for bostonglobe.com all redirects should use an absolute url -->
<c:set var="basepath" value="${portalContext.publicBaseUrl}" />
<c:set var="regipath" value="${fn:replace(portalContext.publicBaseUrl,'http:','https:')}/eom$configurationURI/Framework/regi" />
<%
String basepath=(String) pageContext.getAttribute("basepath");
String regipath=(String) pageContext.getAttribute("regipath");
%>
