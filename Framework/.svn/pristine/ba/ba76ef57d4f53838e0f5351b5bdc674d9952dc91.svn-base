<%@ include file="includes/init.inc" %>

<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="url" rtexprvalue="true" required="false" %>

<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END" %>
 
<p:out var="xref" value="${url}" />

<%--
<p:out var="xrefIsLocal" value="no" />
<c:if test="${fn:startsWith(xref, 'http://www.boston.com') or fn:startsWith(xref, 'http://boston.com') or fn:startsWith(xref, '/')}">
	<p:out var="xrefIsLocal" value="yes" />
</c:if>

<p:out var="xrefHtml" value="no" />
<c:if test="${fn:endsWith(fn:trim(xref), '.html')}">
	<p:out var="xrefHtml" value="yes" />
</c:if>

<c:if test="${xrefHtml eq 'yes' and xrefIsLocal eq 'yes'}">
	<p:out var="xref" value="${fn:substringBefore(xref, '.html')}.mobile.html" />
</c:if>
--%>

<p:out var="currentValue" value="${fn:trim(xref)}" />