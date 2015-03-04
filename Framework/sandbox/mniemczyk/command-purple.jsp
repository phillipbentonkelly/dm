<%@ page contentType="text/xml" pageEncoding="UTF-8"%>
<%@ taglib prefix="bgm" uri="bgmtags" %>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ page import="org.jsoup.Jsoup" %>
<%@ page import="org.jsoup.safety.Whitelist" %>
<%@page import="java.util.*"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.lang.String"%>


<%--<p:getContext var="stream"/>--%>
<p:out var="stream" value="${param.query}" />
<p:out var="filter" value="${cacheScope.streamFilter}" />
<p:out var="limit" value="${cacheScope.limit}" /> 
<p:out var="status" value="${cacheScope.status}" />
<p:out var="startingdate" value="${cacheScope.startingdate}" />

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
  
<p:getCollection path="$configurationURI/Framework/queries/bdc_stream_filterkey.vquery" virtualParams="${queryParams}" var="q" />

<?xml version="1.0" encoding="utf-8"?>
	<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
	<atom:link href="http://www.boston.com/partners/methode/RSS/${param.query}" rel="self" type="application/rss+xml" />
	<title>${param.query}</title>
	<description>${param.query}</description>
	<link>http://www.boston.com/partners/methode/RSS/${param.query}</link>
	<copyright>Copyright 2014 Boston Globe Media Partners, LLC</copyright>

<c:forEach items="${q.items}" var="i" begin="0" end="${limit}" varStatus="status">
	<p:getObject webObject="${i}" var="storyobj" />
	<p:out var="imgSrc" value="" />
	<p:object webObject="${storyobj}" content="c" metadata="m" />
	
	<bdc:getSummaryForSectionFront webObject="${storyobj}" var="webtease" wordCount="0"/>
	<p:out var="itemDescription" xvalue="$c//doc/story/text/content"/>
	<p:out var="webTease" xvalue="$c//doc/story/web-tease"/>
	<p:out var="streamTease" xvalue="$c//doc/story/stream-tease"/>
	<p:out var="photoURL" xvalue="$c//doc/story/multimedia-container/photo-container/photogrp/photo/@fileref"/>
	<p:out var="photoURL" value="${fn:substringAfter(photoURL, '?uuid=')}" />
	<p:getObject var="imageObj" uuid="${photoURL}" onError="ignore" />
	<c:if test="${not empty imageObj}">
		<p:url var="imgSrc" webObject="${imageObj}" format="image_700w" type="resource" />
	</c:if>
	
	<p:out var="pubDate" xvalue="$m//ObjectMetadata/OnlineProducts/OnlineProduct/LastPublicationDate"/>
	<p:out var="provider" xvalue="$m//ObjectMetadata/Reference/Provider"/>
	<p:out var="mtUrl" xvalue="$c//doc/story/xref"/>

	<%
		String pubDate = (String)pageContext.getAttribute("pubDate");
		SimpleDateFormat format = new SimpleDateFormat("EE, dd MMM yyyy hh:mm:ss ZZZ");
		format.setTimeZone(TimeZone.getTimeZone("GMT"));
		
	    pubDate = format.format(new Date());
		pageContext.setAttribute("pubDate", pubDate);
	%>
	
	
    <p:object webObject="${storyobj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com" />
	<p:getObject var="obj" webObject="${storyobj}" />
		<p:url webObject="${obj}" var="link"/>
		<p:out var="itemTitle" xvalue="$c//headlines/headline/p" />
		<p:out var="webtype" xvalue="$m//ObjectMetadata/OnlineProducts/OnlineProduct/WebType" />
		<p:out var="link" value="${portalContext.publicBaseUrl}${link}" />
		<p:out var="author" xvalue="$m//ObjectMetadata/Reference/WireFeed"/>
	link: ${link}	
	<c:if test="${provider == 'Moveable Type'}">
		
		<c:choose>
			<c:when test="${fn:contains(mtUrl, 'mobile.html')}">
				<p:out var="mtXml" value="${fn:replace(mtUrl, 'mobile.html', 'xml')}" />
			</c:when>
			<c:otherwise>
				<p:out var="mtXml" value="${fn:replace(mtUrl, 'html', 'xml')}" />
			</c:otherwise>
		</c:choose>
		
	 	
	 	<bgm:import var="postObj" url="${mtXml}" />
	 	
	 	<c:if test="${not empty postObj}">
			<p:out var="itemDescription" value="${fn:substringAfter(postObj, 'xhtml\">')}" />
		 	<p:out var="itemDescription" value="${fn:substringBefore(itemDescription, '</content>')}"/>
		 </c:if>
		<p:out var="link" value="${mtUrl}" />
	</c:if>
		
	<%
		String itemDescription = (String)pageContext.getAttribute("itemDescription");
		String itemTitle = (String)pageContext.getAttribute("itemTitle");
		
		//itemDescription = Jsoup.parse(itemDescription).text();
		
		Whitelist whitelist = Whitelist.none();
		//whitelist.addTags("script");
		//whitelist.addTags("iframe");
		itemDescription = Jsoup.clean(itemDescription, whitelist);
		itemTitle = Jsoup.clean(itemTitle, whitelist);
		
		String formatYourLinksYouJerk = "(&eacute;)";
		itemDescription = itemDescription.replaceAll(formatYourLinksYouJerk, "e");
		
		//String reg = "&(?!&#?[a-zA-Z0-9]{2,7};)";
		//itemDescription = itemDescription.replaceAll(reg, "&amp;");
		//itemTitle = itemTitle.replaceAll(reg, "&amp;");
			
		//String closeYourTagsFFS = "(<img(\"[^\"]*\"|'[^']*'|[^'\">/])*)(>)";
		//itemDescription = itemDescription.replaceAll(closeYourTagsFFS, "$1/>");
			
		//String formatYourLinksYouJerk = "(\"//)";
		//itemDescription = itemDescription.replaceAll(formatYourLinksYouJerk, "\"http://");
			
		//String async = "(async)";
		//itemDescription = itemDescription.replaceAll(async, "");
			
		//String allowfullscreen = "(allowfullscreen)";
		//itemDescription = itemDescription.replaceAll(allowfullscreen, "");
		
		//String blockquoteAssassin = "(<blockquote(\"[^\"]*\"|'[^']*'|[^'\"])*)(/blockquote>)";
		//itemDescription = itemDescription.replaceAll(blockquoteAssassin, "");
		
		//String cdataDestroyah = "(<![CDATA[)";
		//itemDescription = itemDescription.replaceAll(cdataDestroyah, "");
		
		//String cdataDestroyah2 = "(]]>)";
		//itemDescription = itemDescription.replaceAll(cdataDestroyah2, "");
		
		//String ndashKilla = "(&ndash;)";
		//itemDescription = itemDescription.replaceAll(ndashKilla, "--");
			
		//String thanksForTheNotesTag = "(<span class=\"@notes\"(\"[^\"]*\"|'[^']*'|[^'\"])*)(/span>)";
		//itemDescription = itemDescription.replaceAll(thanksForTheNotesTag, "");
			
		pageContext.setAttribute("itemDescription", itemDescription);
		pageContext.setAttribute("itemTitle", itemTitle);
	%>	
		
	<c:if test="${webtype != 'video'}">	
		<c:if test="${provider != 'BDCWire' and provider != 'BetaBoston'}">
			<item>
				<title>${itemTitle}</title>
				<pubDate>${pubDate}</pubDate>
				<link>${link}</link>
				<guid>${link}</guid>
				<c:if test="${fn:trim(imgSrc) != ''}">
					<media:content medium="image" type="image/jpg" url="http:${imgSrc}">
						<media:credit role="author">${photoCredit}</media:credit>
						<media:title type="html">${photoCaption}</media:title>
					</media:content>
				</c:if>
				<description><c:out value="${itemDescription}" escapeXml="false" /></description>
			</item>
		</c:if>
	</c:if>	
</c:forEach>
</channel>
</rss>