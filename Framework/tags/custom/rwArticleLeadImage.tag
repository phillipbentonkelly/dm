<%@ include file="includes/init.inc" %>

<%@ attribute name="var"		rtexprvalue="false"	required="true" %>
<%@ attribute name="galleryFormat" rtexprvalue="true" required="false" %>
<%@ attribute name="webObject"	rtexprvalue="true"	required="false" type="java.lang.Object" %>

<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END" %>

<jsp:useBean id="contentData" class="java.util.HashMap" />

<c:set var="attMMC" value="" />
<c:set var="attSrc" value="" />
<c:set var="attImageFormat" value="" />
<c:set var="attAltText" value="" />
<c:set var="attCaption" value="" />
<c:set var="attCredit" value="" />
<c:set var="attOrientation" value="" />

<c:if test="${not empty webObject}">

	<p:object webObject="${webObject}" content="content" metadata="meta" />
	<p:out var="firstMMC" xvalue="local-name($content//multimedia-container/*[1])" />
	
	<c:set var="attMMC" value="${firstMMC}" />
	
	<c:choose>
		<c:when test="${firstMMC eq 'photo-container'}">
			<p:out var="mainImage" xvalue="$content//doc/story/multimedia-container/photo-container/photogrp[@class='main-web-images']/photo/@fileref" />
			<c:if test="${not empty mainImage and fn:trim(mainImage) != ''}">
				<p:out var="imageID" value="${fn:substringAfter(mainImage, '?uuid=')}" />
				<p:getObject var="imgObj" uuid="${imageID}" onError="ignore" />
				<c:if test="${not empty imgObj}">
				
					<p:out var="imageAltText"	xvalue="$content//doc/story/multimedia-container/photo-container/photogrp[@class='main-web-images']/captiongrp/alt-tag/p" escape="xml" />
					<p:out var="imageCaption"	xvalue="$content//doc/story/multimedia-container/photo-container/photogrp[@class='main-web-images']/captiongrp/caption/p" escape="xml" />
					<p:out var="imageCredit"	xvalue="$content//doc/story/multimedia-container/photo-container/photogrp[@class='main-web-images']/captiongrp/credit/p" escape="xml" />
					
					<c:if test="${fn:trim(imageAltText) eq ''}">
						<p:out var="imageAltText" value="${imageCaption}" />
					</c:if>
				
					<p:object webObject="${imgObj}" metadata="imgMeta" />
					<p:out var="orientation" xvalue="$imgMeta//ObjectMetadata/Reference/Orientation" />
					<c:choose>
						<c:when test="${orientation eq 'Landscape'}">
							<p:out var="format" value="image_700w" />
							<c:set var="attOrientation" value="horizontal" />
						</c:when>
						<c:otherwise>
							<p:out var="format" value="image_360w" />
							<p:out var="attOrientation" value="vertical" />
						</c:otherwise>
					</c:choose>
					
					<p:url var="imageURL" webObject="${imgObj}" format="${format}" type="resource" baseDomain="httpCache" />
					
					<c:set var="attSrc" value="${imageURL}" />
					<c:set var="attImageFormat" value="${format}" />
					<c:set var="attAltText" value="${imageAltText}" />
					<c:set var="attCaption" value="${imageCaption}" />
					<c:set var="attCredit" value="${imageCredit}" />
					
				</c:if>
			</c:if>
		</c:when>
		
		<c:when test="${firstMMC eq 'gallery-container'}">
			<p:out var="mainImage" xvalue="$content//doc/story/multimedia-container/gallery-container/photogrp[$galleryIndex]/photo[1]/@fileref" />
			<c:if test="${not empty mainImage and fn:trim(mainImage) ne ''}">
				<p:out var="imageID" value="${fn:substringAfter(mainImage, '?uuid=')}" />
				<p:getObject var="imgObj" uuid="${imageID}" onError="ignore" />
				<c:if test="${not empty imgObj}">
				
					<p:out var="imageAltText"	xvalue="$content//doc/story/multimedia-container/gallery-container/photogrp[$galleryIndex]/captiongrp/alt-tag/p" escape="xml" />
					<p:out var="imageCaption"	xvalue="$content//doc/story/multimedia-container/gallery-container/photogrp[$galleryIndex]/captiongrp/caption/p" escape="xml" />
					<p:out var="imageCredit"	xvalue="$content//doc/story/multimedia-container/gallery-container/photogrp[$galleryIndex]/captiongrp/credit/p" escape="xml" />
					
					<c:if test="${fn:trim(imageAltText) eq ''}">
						<p:out var="imageAltText" value="${imageCaption}" />
					</c:if>
					
					<p:object webObject="${imgObj}" metadata="imgMeta" />
					<c:choose>
						<c:when test="${fn:trim(galleryFormat) ne ''}">
							<p:out var="format" value="${fn:trim(galleryFormat)}" />
						</c:when>
						<c:otherwise>
							<p:out var="format" value="image_1024c635" />
						</c:otherwise>
					</c:choose>
					
					<p:url var="imageURL" webObject="${imgObj}" format="${format}" type="resource" baseDomain="httpCache" />
					
					<c:set var="attSrc" value="${imageURL}" />
					<c:set var="attImageFormat" value="${format}" />
					<c:set var="attAltText" value="${imageAltText}" />
					<c:set var="attCaption" value="${imageCaption}" />
					<c:set var="attCredit" value="${imageCredit}" />
					<c:set var="debug" value="gallery index ${galleryIndex}; main image = ${mainImage}" />
				
				</c:if>
			</c:if>
		</c:when>
		
		<c:when test="${firstMMC eq 'video-container'}">
		</c:when>
	</c:choose>

</c:if>

<%-- Set the defaults --%>
<c:set target="${contentData}" property="MMC" value="${attMMC}" />
<c:set target="${contentData}" property="src" value="${attSrc}" />
<c:set target="${contentData}" property="imageFormat" value="${attImageFormat}" />
<c:set target="${contentData}" property="altText" value="${attAltText}" />
<c:set target="${contentData}" property="caption" value="${attCaption}" />
<c:set target="${contentData}" property="credit" value="${attCredit}" />
<c:set target="${contentData}" property="debug" value="${debug}" />
<c:set target="${contentData}" property="orientation" value="${attOrientation}" />

<%-- Return --%>
<c:set var="currentValue" value="${contentData}" />