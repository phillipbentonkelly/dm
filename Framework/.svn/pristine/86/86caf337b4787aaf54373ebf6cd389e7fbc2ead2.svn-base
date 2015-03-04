<%@ include file="includes/init.inc" %>
<%@ attribute name="var" required="false" %>
<%@ attribute name="periodName" rtexprvalue="true" required="true"%>
<%@ attribute name="echo" rtexprvalue="false" required="false"%>
<%--<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"--%>

<c:set var="nth" value="th" />
<c:if test="${not empty periodName}">
	<c:if test="${periodName == 1}">
		<c:set var="nth" value="st" />
	</c:if>
	<c:if test="${periodName == 2}">
		<c:set var="nth" value="nd" />
	</c:if>
	<c:if test="${periodName == 3}">
		<c:set var="nth" value="rd" />
	</c:if>
</c:if>


<c:choose>
	<c:when test="${not empty var}">
		<%
			String test = (String) jspContext.getAttribute("nth");;
			jspContext.setAttribute(var,test,PageContext.REQUEST_SCOPE);
		%>
	</c:when>
	<c:otherwise>
		<p:out value="${nth}"/>
	</c:otherwise>
</c:choose>

<%--
<c:set var="currentValue" value="${nth}"/>
<c:if test="${echo == 'true'}">
	${currentValue}
</c:if>
--%>