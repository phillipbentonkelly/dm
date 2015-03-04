<%@ taglib prefix="bgm" uri="bgmtags" %>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.lang.String"%>

<%@ page import="org.w3c.dom.Document" %>
<%@ page import="javax.xml.parsers.DocumentBuilder" %>
<%@ page import="javax.xml.parsers.DocumentBuilderFactory" %>
<%@ page import="org.xml.sax.InputSource" %>
<%@ page import="java.io.StringReader" %>

<p:out var="container" value="${cacheScope.container}" />
<p:out var="isMT" value="${cacheScope.isMT}" />
<p:out var="showCarousel" value="${cacheScope.showCarousel}" />
<p:out var="stream" value="${cacheScope.query}" />
<p:out var="filter" value="${cacheScope.streamFilter}" />
<p:out var="limit" value="${cacheScope.limit}" /> 
<p:out var="status" value="${cacheScope.status}" />
<p:out var="startingdate" value="${cacheScope.startingdate}" />

<c:if test="${fn:trim(container) eq ''}">
	<p:out var="container" value="" />
</c:if>

<c:if test="${fn:trim(isMT) eq ''}">
	<p:out var="isMT" value="0" />
</c:if>

<c:if test="${fn:trim(showCarousel) eq ''}">
	<p:out var="showCarousel" value="0" />
</c:if>

<%-- mock homepage to news for dev testing --%>
<c:if test="${stream == 'homepage'}"><c:set var="stream">news</c:set></c:if>

<c:if test="${empty stream}"><c:set var="stream">not-specified</c:set></c:if>
<c:if test="${empty filter}"><c:set var="filter">all</c:set></c:if>
<c:if test="${empty limit}"><c:set var="limit">25</c:set></c:if>
<c:if test="${empty status}"><c:set var="status">Approved</c:set></c:if>

<%--  if not specified, use a maximum date value cannot pass seem to pass a value of <qm:TMaxDateTime/>  into the query  --%>
<c:if test="${empty startingdate}"><c:set var="startingdate" value="99991231235900"/></c:if>

<% 
	String[] queryParams = new String[5];
	queryParams[0] = (String)pageContext.getAttribute("stream");
	queryParams[1] = (String)pageContext.getAttribute("filter");
	queryParams[2] = (String)pageContext.getAttribute("startingdate");
	queryParams[3] = (String)pageContext.getAttribute("limit");
 	queryParams[4] = (String)pageContext.getAttribute("status");
    
	pageContext.setAttribute("queryParams", queryParams);
%>
<fmt:parseNumber var="isMT" value="${isMT}" type="number" integerOnly="true" />
<fmt:parseNumber var="showCarousel" value="${showCarousel}" type="number" integerOnly="true" />

<c:choose>
	<c:when test="${isMT eq 1}">
		<p:getCollection path="$configurationURI/Framework/queries/bdc_stream_mt.vquery" virtualParams="${queryParams}" var="q" />	
	</c:when>
	<c:otherwise>
		<p:getCollection path="$configurationURI/Framework/queries/bdc_stream_filterkey.vquery" virtualParams="${queryParams}" var="q" />
	</c:otherwise>
</c:choose>

<%
	java.util.Calendar cal = java.util.Calendar.getInstance();
	int copyrightYear = cal.get(java.util.Calendar.YEAR);
	pageContext.setAttribute("copyrightYear", copyrightYear);
%>

<p:template contentType="text/xml" outputMode="raw"/> 
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<atom:link href="http://www.boston.com/partners/methode/RSS/${param.query}" rel="self" type="application/rss+xml" />
		<title>${param.query}</title>
		<description>${param.query}</description>
		<link>http://www.boston.com/partners/methode/RSS/${param.query}</link>
		<copyright>Copyright ${copyrightYear} Boston Globe Media Partners, LLC</copyright>
		
		<c:if test="${showCarousel eq 1}">
			<p:include url="$configurationURI/Framework/feeds/rss/carousel.jsp">
				<p:param name="isPartial" value="1"/>
				<p:param name="container" value="${container}"/>
			</p:include>
		</c:if>
	
		<c:forEach items="${q.items}" var="i" begin="0" end="${limit}" varStatus="status">
		
			<p:getObject webObject="${i}" var="storyobj" />
			<p:object webObject="${storyobj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com" />
			
			<p:out var="provider" xvalue="$meta//ObjectMetadata/Reference/Provider"/>
			<p:out var="mtUrl" xvalue="$c//doc/story/xref"/>
			<p:out var="webtype" value="${WT}" />
		
			<%-- jjf 20140628 remove mt to stop portal throwing errors
			<c:if test="${provider == 'Moveable Type'}">
			 --%>
			<c:if test="${provider == 'Moveable Type throws errors'}">
				
				<c:choose>
					<c:when test="${fn:contains(mtUrl, '.mobile.html')}">
						<p:out var="mtXml" value="${fn:replace(mtUrl, '.mobile.html', '.xml')}" />
					</c:when>
					<c:otherwise>
						<p:out var="mtXml" value="${fn:replace(mtUrl, '.html', '.xml')}" />
					</c:otherwise>
				</c:choose>
				<p:out var="pubDate" xvalue="$meta//ObjectMetadata/Reference/DatePublished"/>
			 	
				<%-- handle the importing of MT XML --%>
				<c:import url="${mtXml}" var="movableTypeXml" />
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
			 	
			</c:if>
				
			<c:choose>
<%-- jjf 20140628 remove mt to stop portal throwing errors
				<c:when test="${webtype != 'video' and webtype != 'streamtease' and provider != 'Moveable Type'}">
--%>
				<c:when test="${webtype != 'video' and webtype != 'streamtease' and provider != 'Moveable Type throws errors'}">
					<p:include url="$configurationURI/Framework/feeds/rss/render_single_object.jsp">
						<p:param name="id" value="${i.uuid}" />
					</p:include>
				</c:when>
				<c:when test="${provider == 'Moveable Type' and webtype == 'streamtease'}">
					<p:out var="mtTitle" xvalue="$mtDoc//entry/title" />
					<p:out var="mtPubDate" xvalue="$mtDoc//entry/published" />
					<p:out var="mtEntryId" xvalue="$mtDoc//entry/id" />
					<p:out var="mtImg" xvalue="$mtDoc//entry//enclosure/@url" />
					<p:out var="mtAuthor" xvalue="$mtDoc//entry/author" />
				
					<item>
						<title>${mtTitle}</title>
						<pubDate>${mtPubDate}</pubDate>
						<link>${mtEntryId}</link>
						<guid>${mtEntryId}</guid>
						<author>${mtAuthor}</author>
						
						<c:if test="${fn:trim(mtImg) != ''}">
							<media:content medium="image" type="image/jpg" url="${mtImg}">
							</media:content>
						</c:if>
						<description><![CDATA[<p:out xvalue="$mtDoc//entry/content" xslt="$configurationURI/Framework/feeds/rss/feed_cleanup_mt.xslt" />]]></description>
					</item>
				</c:when>
				<c:otherwise><%-- Ignore everything else --%></c:otherwise>	
			</c:choose>
			
		</c:forEach>
	</channel>
</rss>