<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fmt" uri="formatTags" %>

<c:set var="now" value="<%=new java.util.Date()%>" />
<fmt:formatDate var="nowPath" pattern="M/d/yyyy" value="${now}" timeZone="US/Eastern"/>
<fmt:formatDate var="day" pattern="EEEE" value="${now}" timeZone="US/Eastern"/>
<fmt:formatDate var="hour" pattern="hh" value="${now}" timeZone="US/Eastern"/>
<fmt:formatDate var="minute" pattern="mm" value="${now}" timeZone="US/Eastern"/>
<fmt:formatDate var="second" pattern="ss" value="${now}" timeZone="US/Eastern"/>

server time:&nbsp; ${day}, ${nowPath}&nbsp; ${hour}:${minute}:${second}