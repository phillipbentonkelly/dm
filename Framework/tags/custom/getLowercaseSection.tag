<%@ include file="includes/init.inc" %>
<%@ attribute name="section" rtexprvalue="true" required="false"%>
<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"  %>

<c:choose>
<c:when test="${section eq '/'}">
	<p:out var="section" value="homepage" />
</c:when>
<c:otherwise>
	<p:out var="section" value="${fn:toLowerCase(fn:substring(section, 0, 1))}${fn:toLowerCase(fn:substring(section, 1, -1))}" />
</c:otherwise>
</c:choose>

<c:set var="currentValue" value="${section}"/>
<c:if test="${echo == 'true'}">
	${currentValue}
</c:if>

