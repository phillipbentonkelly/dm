<%-- <%@ page contentType="text/xml" pageEncoding="UTF-8"%> --%>
<%@ taglib prefix="bgm" uri="bgmtags"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%-- For MT XML parsing --%>
<%@ page import="org.w3c.dom.Document" %>
<%@ page import="javax.xml.parsers.DocumentBuilder" %>
<%@ page import="javax.xml.parsers.DocumentBuilderFactory" %>
<%@ page import="org.xml.sax.InputSource" %>
<%@ page import="java.io.StringReader" %>

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
	
	<c:set var="now" value="<%=new java.util.Date()%>" />
	<p:out var="now" value="${now}" format="eomdate|GMT:EE, d MMM yyyy HH:mm:ss z" />
	
	<%
		java.util.Calendar cal = java.util.Calendar.getInstance();
		int copyrightYear = cal.get(java.util.Calendar.YEAR);
		pageContext.setAttribute("copyrightYear", copyrightYear);
	%>
	
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
				<pubDate>${now}</pubDate>
				<updated>${now}</updated>
				<rights>Copyright ${copyrightYear} Boston Globe Media Partners, LLC.</rights>
	</c:if>
	
	<c:forEach items="${zone.items}" var="item" varStatus="godHelpUs"> <%-- Totally forgot I named a variable this. Totally keeping it, though. --%>
		<p:object webObject="${item}" content="c" metadata="iMeta" webType="WT" channel="Boston.com" />
		<p:out var="provider" xvalue="$iMeta//ObjectMetadata/Reference/Provider" />
		<p:out var="mtUrl" xvalue="$c//xref" />
		
		<c:choose>
			<c:when test="${WT != 'video' and WT != 'streamtease' and provider != 'Moveable Type'}">
				<p:jspInclude eomdb="true" url="$configurationURI/Framework/feeds/rss/render_single_object.jsp?id=${item.uuid}" />			
			</c:when>
			<%-- jjf 20140628 prevent all mt entries until we can fix the errors thrown in the portal
			<c:when test="${WT == 'streamtease' and provider == 'Moveable Type'}">
			--%>
			<c:when test="${WT == 'streamtease' and provider == 'Moveable Type throws errors'}">
				<c:choose>
					<c:when test="${fn:contains(mtUrl, '.mobile.html')}">
						<p:out var="mtUrl" value="${fn:replace(mtUrl, '.mobile.html', '.xml')}" />
					</c:when>
					<c:otherwise>
						<p:out var="mtUrl" value="${fn:replace(mtUrl, '.html', '.xml')}" />
					</c:otherwise>
				</c:choose>
				
				<%-- Import MT XML --%>
				<c:import url="${mtUrl}" var="movableTypeXml" />
				<%
					// Works around the issue with c:import and x:parse, which do terrible awful things to the content of the MT xml
					// when used in conjunction with each other.
					
					String xmlAsString = (String)pageContext.getAttribute("movableTypeXml");
					DocumentBuilder db = DocumentBuilderFactory.newInstance().newDocumentBuilder();
					InputSource is = new InputSource();
					is.setCharacterStream(new StringReader(xmlAsString));
					
					Document doc = db.parse(is);
					pageContext.setAttribute("mtDoc", doc);
				%>
				
				<p:out var="mtTitle" xvalue="$mtDoc//entry/title" />
				<p:out var="mtPubDate" xvalue="$mtDoc//entry/published" />
				<p:out var="mtEntryId" xvalue="$mtDoc//entry/id" />
				<p:out var="mtImg" xvalue="$mtDoc//entry//enclosure/@url" />
				<p:out var="mtAuthor" xvalue="$mtDoc//entry/author" />
				
				<item>
					<title><![CDATA[${mtTitle}]]></title>
					<pubDate>${mtPubDate}</pubDate>
					<link>${mtEntryId}</link>
					<guid>${mtEntryId}</guid>
					<author>${mtAuthor}</author>
					
					<c:if test="${not empty mtImg and fn:trim(mtImg) != ''}">
						<media:content medium="image" type="image/jpeg" url="${mtImg}"></media:content>
					</c:if>
					
					<description><![CDATA[<p:out xvalue="$mtDoc//entry/content" xslt="$configurationURI/Framework/feeds/rss/feed_cleanup_mt.xslt" />]]></description>
				</item>
			</c:when>
			<c:otherwise>
				<%-- Ignore everything else --%>
			</c:otherwise>
		</c:choose>
	
	</c:forEach>
	
	<c:if test="${isPartial ne 1}">
			</channel>
		</rss>
	</c:if>

</c:if>