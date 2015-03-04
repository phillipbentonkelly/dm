<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8" %>	

 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%> 
<%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml" %>
 <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
 <%@ taglib prefix="p" uri="ptag"%>
 <%@ taglib prefix="jp" uri="jptag" %>


<%@page import="java.util.*"%>
<%@page import="java.text.SimpleDateFormat"%>

<c:set var="stream" value="${param.stream}" />
<c:set var="filter" value="${param.filter}" />
<c:set var="limit" value="${param.limit}" />
<c:set var="startingdate" value="${param.startingdate}" />

<c:if test="${empty stream}"><c:set var="stream">empty-stream</c:set></c:if>
<c:if test="${empty filter}"><c:set var="filter">all</c:set></c:if>
<c:if test="${empty limit}"><c:set var="limit">50</c:set></c:if>

<%

	SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHmmssSS");
	format.setTimeZone(TimeZone.getTimeZone("GMT"));
	
    String tsDateStr = format.format(new Date());

	pageContext.setAttribute("timestamp", tsDateStr);

%>

<c:if test="${empty startingdate}"><c:set var="startingdate">${fn:substring(timestamp,0,14)}</c:set></c:if>
<% 
	String[] queryParams = new String[4];
	queryParams[0] = (String)pageContext.getAttribute("stream");
	queryParams[1] = (String)pageContext.getAttribute("filter");
	queryParams[2] = (String)pageContext.getAttribute("startingdate");
	queryParams[3] = (String)pageContext.getAttribute("limit");
    
	pageContext.setAttribute("queryParams", queryParams);
	

%>
<jp:getCollection path="$configurationURI/Framework/queries/bdc_stream.vquery" virtualParams="${queryParams}" var="q" />
{ "stream": "${stream}",
	"filter": "${filter}",
   "timestamp": "${timestamp}",
   "limit": "${limit}",
   "startingdate": "${startingdate}",
	"data": [
	<c:forEach items="${q.items}" var="i" begin="0" end="${limit}" varStatus="status">
		${i}
		<c:if test="${not status.last}">,
		</c:if>
	</c:forEach>
	
	]
}



