<%-- gets uuids from all objects in named zone --%>
<%@ include file="includes/init.inc" %>
<%@ tag import="java.util.*" %>
<%@ attribute name="var"	rtexprvalue="false"	required="true"	%>
<%@ attribute name="zone"	rtexprvalue="true"	required="true" %>
<%@ attribute name="dwc"	rtexprvalue="true"	required="true" type="java.lang.Object" %>
<%@ attribute name="append" rtexprvalue="true"	required="false" %>
<%@ attribute name="array"	rtexprvalue="true"	required="false" %>

<%@	variable name-from-attribute="var"	alias="currentValue"	scope="AT_END" %>

<c:if test="${not empty append}">
	<p:out var="currentValue" value="${append}" />
</c:if>

<p:getPageZone name="${zone}" var="zoneData" webObject="${dwc}" />
<c:choose>
	<c:when test="${zoneData.size > 0}">
		<c:if test="${not empty currentValue}">
			<p:out var="currentValue" value="${currentValue}," />
		</c:if>
		<c:forEach items="${zoneData.items}" var="zi" varStatus="loop">
			<p:out var="del" value="" />
			<c:if test="${not loop.first}">
				<p:out var="del" value="," />
			</c:if>
			<c:set var="currentValue">${currentValue}${del}${zi.uuid}</c:set>
		</c:forEach>
	</c:when>
	<c:otherwise>
		<p:out var="currentValue" value="" /> <%-- Yes, this is deliberately empty --%>
	</c:otherwise>
</c:choose>

<c:if test="${not empty array}">
	<%
		String str = (String)jspContext.getAttribute("currentValue");
		List<String> items = Arrays.asList(str.split("\\s*,\\s*"));
		jspContext.setAttribute("idList", items);
	%>
	<p:out var="currentValue" value="${idList}" />
</c:if>