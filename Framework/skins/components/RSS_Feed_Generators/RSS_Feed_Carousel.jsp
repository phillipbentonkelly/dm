<%--
{comments}
BDC-1862 added file so newsletters can work again
{comments}
--%>

<%-- <%@ page contentType="text/xml" pageEncoding="UTF-8"%> --%>
<%@ taglib prefix="bgm" uri="bgmtags"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%--
	Whether or not we want to include all the channel information. 
	Allows us to include this feed generator within another.
--%>
<p:out var="isPartial" value="${cacheScope.isPartial}" />
<c:if test="${fn:trim(isPartial) eq ''}">
	<p:out var="isPartial" value="0" />
</c:if>

<%--
	The DWP object to get the carousel from, or the DWC object that is the actual carousel.
	If nothing is specified then default to the homepage. 
--%>

<p:out var="container" value="${cacheScope.container}" />
<c:if test="${empty container or fn:trim(container) eq ''}">
	<p:out var="container" value="/Boston/Production/BDC/WebPages/homepage.dwp" />
</c:if>
<p:getObject path="${container}" var="dwxObj" onError="ignore" />
<c:if test="${dwxObj != null}">
	<p:object webObject="${dwxObj}" metadata="dwxMeta" />
	
	<p:out var="templateName" xvalue="$dwxMeta//props/templateName" />
	<p:out var="isCarousel" value="no" />
	<c:if test="${fn:endsWith(templateName, '/carousel.dwc')}">
		<p:out var="isCarousel" value="yes" />
	</c:if>
	
	<c:choose>
		<c:when test="${isCarousel eq 'yes'}">
			<p:getPageZone name="main" var="zone" url="${container}" />
		</c:when>
		<c:otherwise>
			<p:getPageZone name="carousel" var="cZone" url="${container}" />
			<c:if test="${cZone.size > 0}">
				<c:forEach items="${cZone.items}" var="cz" begin="0" end="1">
					<p:getObject webObject="${cz}" var="czm" />
					<p:object webObject="${czm}" metadata="czm" />
					<p:out var="objectPath" xvalue="$czm//path" />
				</c:forEach>
				
				<p:getPageZone name="main" var="zone" url="${objectPath}" />
			</c:if>
		</c:otherwise>
	</c:choose>
	
	<fmt:parseNumber var="isPartial" value="${isPartial}" type="number" integerOnly="true" />
	
	<p:template contentType="text/xml" outputMode="raw"/> 
	<c:if test="${isPartial ne 1}">
		<?xml version="1.0" encoding="utf-8"?>
		<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss">
			<channel>
				<author>
					<name>Boston Globe</name>
					<uri>http://www.boston.com</uri>
				</author>
				
				<title></title>
				<updated></updated>
				<rights>Copyright 2014 Boston Globe Media Partners, LLC.</rights>
	</c:if>
	
	<c:forEach items="${zone.items}" var="item" varStatus="godHelpUs">
		<p:jspInclude eomdb="true" url="$configurationURI/Framework/skins/components/RSS_Feed_Generators/rss_item.jsp?uuid=${item.uuid}" />
	</c:forEach>
	
	<c:if test="${isPartial ne 1}">
			</channel>
		</rss>
	</c:if>

</c:if>