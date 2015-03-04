<%@ include file="includes/init.inc"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>

<c:if test="${empty webObject}">
  <c:set var="webObject" value="${currentObject}" />
</c:if>
<p:object webObject="${webObject}" content="story" metadata="meta" />

<p:out var="pubDate"
	xvalue="$meta//ObjectMetadata/OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/LastPublicationDate" />
<c:if test="${empty pubDate}">
	<p:out var="pubDate"
		xvalue="$meta//ObjectMetadata/OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/FirstPublicationDate" />
</c:if>

<c:if test="${not empty pubDate}">
	<jsp:doBody />
</c:if>