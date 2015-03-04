<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="c" uri="jstlCore"%>

<%@ taglib prefix="fn" uri="jstlFunctions"%>
<!-- absolute url to registration for bostonglobe.com all redirects should use an absolute url -->
<c:set var="regipath" value="${fn:replace(portalContext.publicBaseUrl,'http:','https:')}/eom$configurationURI/Framework/regi" />
<%
String regipath=(String) pageContext.getAttribute("regipath");
%>
<p:out var="secureBaseUrl" value="${fn:replace(portalContext.publicBaseUrl,'http:','https:')}"></p:out> 
<p:out var="loginUrl" value="${secureBaseUrl}/login"></p:out>