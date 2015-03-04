<%@ page contentType="text/xml" pageEncoding="UTF-8"%>
<%@ taglib prefix="bgm" uri="bgmtags"%>
<%@ taglib prefix="bdc" tagdir="/WEB-INF/tags/eom$configurationURI/Framework/tags/custom/" %>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml"%> 

<c:choose>
	<c:when test="${not empty param.id}">
		<p:out var="objectID" value="${param.id}" />
	</c:when>
	<c:otherwise>
		<p:out var="objectID" value="${cacheScope.id}" />
	</c:otherwise>
</c:choose>
  
<p:getObject uuid="${objectID}" var="obj" />
<p:object webObject="${obj}" content="item-story" metadata="item-meta" />
<p:url webObject="${obj}" var="link"/>
<p:out var="webtype" xvalue="$item-meta//ObjectMetadata/OnlineProducts/OnlineProduct/WebType" />

<%-- We need to determine what the content type actually is so that we can pull from the proper fields --%>
<p:out var="isGallery" value="no" />
<c:if test="${fn:endsWith(webtype, 'picturestory') or fn:endsWith(webtype, 'gallery')}">
	<p:out var="isGallery" value="yes" />
</c:if>

<bdc:getHeadlines webObject="${obj}" var="itemHeadline" xsltFile="$configurationURI/Framework/sandbox/krawczyk/rss/feed_cleanup.xslt" />

<c:if test="${webtype != 'video' and webtype != 'streamtease'}">

	<p:out var="itemTitle" xvalue="$item-story//headline/p" />
	<p:out var="photoURL" xvalue="$item-story//doc/story/multimedia-container/photo-container/photogrp/photo/@fileref"/>
	<p:out var="photoURL" value="${fn:substringAfter(photoURL, '?uuid=')}" />
	<p:getObject var="imageObj" uuid="${photoURL}" onError="ignore" />
	<p:object webObject="${imageObj}" metadata="imageObjMeta" />
	<c:if test="${not empty imageObj}">
		<p:url var="imgSrc" webObject="${imageObj}" public="true" format="image_609w" type="resource" baseDomain="httpCache" />
	</c:if>
	<p:out var="pubDate" xvalue="$item-meta//ObjectMetadata/OnlineProducts/OnlineProduct/FirstPublicationDate"/>
	<p:out var="photoCredit" xvalue="$item-story//doc/story/multimedia-container/photo-container/photogrp/captiongrp/credit"/>
	<p:out var="photoCaption" xvalue="$item-story//doc/story/multimedia-container/photo-container/photogrp/captiongrp/caption"/>
	<p:out var="author" xvalue="$item-story//doc/story/text/byline/byname"/>
	<p:out var="webTease" xvalue="$item-story//doc/story/web-tease"/>
	<p:out var="streamTease" xvalue="$item-story//doc/story/stream-tease"/>
	<p:out var="itemDescription" xvalue="$item-story//doc/story/text/content"/>
	<c:if test="${fn:trim(itemDescription) == ''}">
		<p:out var="itemDescription" value="${webTease}"/>
		<c:if test="${fn:trim(webTease) == ''}">
			<p:out var="itemDescription" value="${streamTease}"/>
		</c:if>
	</c:if>
	
	<item>
		<title><![CDATA[${itemTitle}]]></title>
		<pubDate><p:out value="${pubDate}" format="eomdate|GMT:EE, d MMM yyyy HH:mm:ss z" /></pubDate>
		<link>${portalContext.publicBaseUrl}${link}</link>
		<guid>${portalContext.publicBaseUrl}${link}</guid>
		<author><![CDATA[${fn:trim(author)}]]></author>
		
		<c:if test="${not empty imgSrc and fn:trim(imgSrc) != ''}">
			<p:out var="imgType" xvalue="$imageObjMeta//Reference/ImageType" />
			<p:out var="imgType" value="${fn:toLowerCase(imgType)}" />
		
			<media:content medium="image" type="image/${imgType}" url="${imgSrc}">
				<media:credit role="author"><![CDATA[${photoCredit}]]></media:credit>
				<media:title type="html"><![CDATA[${photoCaption}]]></media:title>
			</media:content>
		</c:if>
		
		<c:if test="${isGallery eq 'yes'}">
			<x:forEach var="photoGroup" select="$item-story//doc/story/multimedia-container/gallery-container/photogrp" varStatus="loop">
				<p:out var="photoHeadline" xvalue="$photoGroup/headlines/headline/p" />
				<p:out var="photo" xvalue="$photoGroup/photo/@fileref/text()" />
				<p:out var="photoID" value="${fn:substringAfter(photo, '?uuid=')}" />
				
				<p:getObject uuid="${photoID}" var="photoObject" />
				<p:object webObject="${photoObject}" content="imageData" metadata="imageMeta" />
				<p:url var="photoSrc" webObject="${photoObject}" format="image_1024c635" public="true" type="resource" baseDomain="httpCache" />
				
				<p:out var="pcaption" xvalue="$photoGroup/captiongrp/caption" />
				<p:out var="pcredit" xvalue="$photoGroup/captiongrp/credit" />
				
				<p:out var="photoFormat" xvalue="$imageMeta//Reference/ImageType" />
				<p:out var="photoFormat" value="${fn:toLowerCase(photoFormat)}" />
				
				<media:content medium="image" type="image/${photoFormat}" width="1024" url="${photoSrc}">
					<media:title><![CDATA[${photoHeadline}]]></media:title>
					<media:credit><![CDATA[${pcredit}]]></media:credit>
					<media:description type="html"><![CDATA[${pcaption}]]></media:description>
				</media:content>
			</x:forEach>
		</c:if>
		
		<description><![CDATA[<p:out xvalue="$item-story//text/content" xslt="$configurationURI/Framework/sandbox/krawczyk/rss/feed_cleanup.xslt" />]]></description>
		<category></category>
	</item>
</c:if>