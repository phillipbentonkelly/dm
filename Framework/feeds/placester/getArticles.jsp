<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8" %>	

<%@ taglib prefix="bgm" uri="bgmtags"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="bgm" uri="bgmtags" %>
<%@ taglib prefix="bdc" tagdir="/WEB-INF/tags/eom/SysConfig/WebPortal/BDC/Framework/tags/custom/" %>


<%@page import="java.util.*"%>
<%@page import="java.text.SimpleDateFormat"%>
<% 
//DM 219
response.setHeader("Access-Control-Allow-Origin","*");
response.setHeader("Access-Control-Allow-Headers","If-Match");

String requestHeaderIfMatch =  (String)request.getHeader("If-Match");
String requestMode = (String)request.getParameter("mode");
String requestFormat = (String)request.getParameter("format");
String requestID = (String)request.getParameter("id");
String JSONCallback = (String)request.getParameter("JSONCallback");
String keywords = (String)request.getParameter("keywords");


if (requestFormat == null || requestFormat.isEmpty()) {
	requestFormat="json";
}

if (requestMode == null || requestMode.isEmpty()) {
	requestMode="checksum";
}

if (keywords == null || keywords.isEmpty()) {
	keywords = "";
}
pageContext.setAttribute("requestMode",requestMode);
pageContext.setAttribute("requestID",requestID);
pageContext.setAttribute("JSONCallback",JSONCallback);
pageContext.setAttribute("keywords",keywords);


if (!(requestID == null || requestID.isEmpty()) && !(requestHeaderIfMatch == null || requestHeaderIfMatch.isEmpty())) { 
	%>
	<p:getObject loid="${requestID}" var="obj" />
	<c:if test="${not empty obj}">
		<p:object webObject="${obj}" content="item-story" metadata="item-meta" channel="Boston.com"/>
		<p:out var="storyText" xvalue="$item-story//doc"/>
		<p:out var="metaText" xvalue="$item-meta//ObjectMetadata"/>
		<bdc:getMD5Checksum var="storyMD5" content="${storyText}${requestID}" />
		<bdc:getMD5Checksum var="metaMD5" content="${metaText}${requestID}" />
		<p:out var="checksum" value="${metaMD5}${storyMD5}"/>
		<%
		//Return the right status
		String checksum = (String)pageContext.getAttribute("checksum");
		if (checksum.equals(requestHeaderIfMatch)) {
			response.setHeader("Etag",checksum);
			response.setStatus(response.SC_NOT_MODIFIED);
		}%>
	</c:if>
	
	<c:if test="${empty obj}">
	<%
		response.setHeader("Etag","NONE");
		response.setStatus(response.SC_NOT_FOUND);
	%>
	</c:if> 
	<%
}
%>
<% if (requestFormat.equals("json")) { %>
	<jp:include url="/SysConfig/WebPortal/BDC/Framework/feeds/placester/data/getArticlesJSON.jsp?mode=${requestMode}&id=${requestID}&JSONCallback=${JSONCallback}&keywords=${keywords}"/>
<%}%>