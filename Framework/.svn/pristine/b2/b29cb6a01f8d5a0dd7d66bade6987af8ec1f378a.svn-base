<%--
{comments}
BDC-1918 Remove debug statements
{comments}
--%>

<%@ page contentType="text/xml" pageEncoding="UTF-8" %>
<%@ taglib prefix="bgm" uri="bgmtags" %>
<%@ taglib prefix="c" uri="jstlCore" %>
<%@ taglib prefix="p" uri="ptag" %>
<%@ taglib prefix="jp" uri="jptag" %>
<%@ taglib prefix="fn" uri="jstlFunctions" %>
<%@ taglib prefix="x" uri="jstlXml" %>

<bgm:import var="blogObj" url="${param.query}" />  
<c:if test="${not empty blogObj}">
	<%
		String blogObj = (String)pageContext.getAttribute("blogObj");
		String reg = "&(?!&#?[a-zA-Z0-9]{2,7};)";
		blogObj = blogObj.replaceAll(reg, "&amp;");
		pageContext.setAttribute("blogObj", blogObj);
	%>
	<x:parse var="doc" xml="${blogObj}" />
	<x:set var="blog_title" select="string($doc//channel/title/text())" />
	<x:set var="blog_link" select="string($doc//channel/link/text())" />
	
	<?xml version="1.0" encoding="utf-8"?>
	<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss">
	<channel>
	<author>
	<name>Boston Globe</name>
	<uri>http://www.boston.com</uri>
	</author>
	<title><p:out xvalue="$doc//channel/title" escape="xml" /></title>
	<updated><p:out xvalue="$doc//channel/lastBuildDate" escape="xml" /></updated>
	<rights>Copyright 2014 Boston Globe Media Partners, LLC</rights>
	
	<x:forEach var="item" select="$doc//item" varStatus="status" >
		<x:set var="link" select="string($item//link/text())" />
		<x:set var="description" select="string($item//description/text())" />
	    <x:set var="title" select="string($item//title/text())" />
	 	<p:out var="descSource" value="${fn:replace(link, 'html', 'xml')}" />
	 	
	 	<bgm:import var="postObj" url="${descSource}" />
	 	<c:if test="${not empty postObj}">
			<%
		 		String postObj = (String)pageContext.getAttribute("postObj");
				postObj = postObj.replaceAll(reg, "&amp;");
				pageContext.setAttribute("postObj", postObj);
			%>
			<x:parse xml="${postObj}" var="individualStory" />
		 	
		 	<p:out var="blogText" value="${fn:substringAfter(postObj, 'xhtml\">')}" />
		 	<p:out var="blogText" value="${fn:substringBefore(blogText, '</content>')}"/>
			<item>
				<title><p:out xvalue="$item//title" escape="xml" /></title>
				<link>${link}</link>
				<guid>${link}</guid>
				<author></author>
				<x:forEach var="encItem" select="$item//enclosure">
					<x:set select="string($encItem//@url)" var="encURL" />
					<x:set select="string($encItem//@length)" var="encLength" />
					<x:set select="string($encItem//@type)" var="encType" />
					<media:content medium="image" type="${encType}" url="${encURL}"/>
				</x:forEach>
				<description>${blogText}</description>
				<x:set select="string($item/category)" var="category" />
				<x:set select="string($item/pubDate)" var="pubDate" />
				<category>${category}</category>
				<pubDate>${pubDate}</pubDate>
			</item>
	 	</c:if>
	 </x:forEach>
	</channel>
	</rss>
</c:if>