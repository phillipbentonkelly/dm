<%@ include file="includes/init.inc"%>
<%@ tag import="com.eidosmedia.portal.render.PortalCollection,
                com.eidosmedia.portal.util.PortalWebObjectWrapper" %>
                
<%@ attribute name="format" rtexprvalue="true" required="false"%>
<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>

<%@ variable name-from-attribute="var" alias="output" scope="AT_END"%>

<c:if test="${empty webObject}">
  <c:set var="webObject" value="${currentObject}" />
</c:if>

<p:object webObject="${webObject}" content="story" metadata="meta" webType="webType" />
  
<c:choose>
	<c:when test="${fn:toLowerCase(webType) == 'streamtease'}">
		<p:out var="feed" xvalue="$meta//Reference/WireFeed/text()" />
		<p:getCollection var="defaultQuery" path="$configurationURI/Framework/queries/bdc_default_streamtease.vquery"  virtualParams="${feed}"/>
	</c:when>
	
	<c:otherwise>
		<p:out var="section" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/CanonicalData/SectionPath/text()" />
		<p:getCollection var="defaultQuery" path="$configurationURI/Framework/queries/bdc_default_story.vquery"  virtualParams="${section}"/>
	</c:otherwise>
</c:choose>

<c:if test="${not empty defaultQuery && fn:length(defaultQuery.items) > 0}">
	<%
		PortalCollection query = (PortalCollection) jspContext.getAttribute("defaultQuery");
		if (!query.isEmpty()) jspContext.setAttribute("output", query.get(0));
	%>
</c:if>
