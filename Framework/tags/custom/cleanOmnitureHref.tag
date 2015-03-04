<%-- 
	{comments}
	DM-43: Handle omniture tags in links with anchor tags.
	{comments}
 --%>

<%@ include file="includes/init.inc" %>

<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="url" rtexprvalue="true" required="true" %>
<%@ attribute name="omnitureTags" rtexprvalue="true" required="true" %>

<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END" %>

<p:out var="urlAnchorTag" value="" />

<c:choose>
	<c:when test="${fn:contains(url, '#')}">
		<p:out var="urlAnchorTag" value="${fn:substringAfter(url, '#')}" />
		<p:out var="url" value="${fn:substringBefore(url, '#')}" />
		<p:out var="url" value="${url}${omnitureTags}\#${urlAnchorTag}" />
	</c:when>
	<c:otherwise>
		<p:out var="url" value="${url}${omnitureTags}" />
	</c:otherwise>
</c:choose>


<p:out var="currentValue" value="${url}" />