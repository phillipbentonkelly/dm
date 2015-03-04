<%@ page contentType="text/xml" pageEncoding="UTF-8"%>
<%@ taglib prefix="bgm" uri="bgmtags"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml"%>

<jp:getCollection path="${param.query}" var="blogObj"/>
<?xml version="1.0" encoding="utf-8"?>
	<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss">
	<channel>
	<author>
	<name>Boston Globe</name>
	<uri>http://www.boston.com</uri>
	</author>
	<title><p:out xvalue="$doc//channel/title"/></title>
	<updated><p:out xvalue="$doc//channel/lastBuildDate"/></updated>
	<rights>Copyright 2014 Boston Globe Media Partners, LLC</rights>
	
<c:forEach items="${blogObj.items}" var="item" varStatus="status">
	
  	<p:getObject uuid="${item.uuid}" var="obj" />
  	<p:object webObject="${obj}" content="item-story" metadata="item-meta" />
	<p:url webObject="${obj}" var="link"/>
	
	<p:out var="itemTitle" xvalue="$item-story//doc/story/headlines/headline" />
	<p:out var="photoURL" xvalue="$item-story//doc/story/multimedia-container/photo-container/photogrp/photo/@fileref"/>
	<p:out var="photoURL" value="${fn:substringBefore(photoURL, '?uuid=')}" />
	<p:out var="pubDate" xvalue="$item-meta//ObjectMetadata/OnlineProducts/OnlineProduct/FirstPublicationDate"/>
	<p:out var="photoCredit" xvalue="$item-story//doc/story/multimedia-container/photo-container/photogrp/captiongrp/credit"/>
	<p:out var="photoCaption" xvalue="$item-story//doc/story/multimedia-container/photo-container/photogrp/captiongrp/caption"/>
	<p:out var="author" xvalue="$item-story//doc/story/text/byline/byname"/>
	<p:out var="itemDescription" xvalue="$item-story//doc/story/text/content"/>
	<%
		String itemDescription = (String)pageContext.getAttribute("itemDescription");
		String itemTitle = (String)pageContext.getAttribute("itemTitle");
		String reg = "&(?!&#?[a-zA-Z0-9]{2,7};)";
		itemDescription = itemDescription.replaceAll(reg, "&amp;");
		String closeYourTagsFFS = "(<img(\"[^\"]*\"|'[^']*'|[^'\">/])*)(>)";
		itemDescription = itemDescription.replaceAll(closeYourTagsFFS, "$1/>");
		itemTitle = itemTitle.replaceAll(reg, "&amp;");
		pageContext.setAttribute("itemDescription", itemDescription);
		pageContext.setAttribute("itemTitle", itemTitle);
	%>
	
	<item>
		<title>${itemTitle}</title>
		<pubDate>${pubDate}</pubDate>
		<link>${link}</link>
		<guid>${link}</guid>
		<author>${author}</author>
		<c:if test="${fn:trim(photoURL) != ''}">
			<media:content medium="image" type="image/jpg" url="${photoURL}">
				<media:credit role="author">${photoCredit}</media:credit>
				<media:title type="html">${photoCaption}</media:title>
			</media:content>
		</c:if>
		<description>${itemDescription}</description>
		<category></category>
	</item>
</c:forEach>
</channel>
</rss>