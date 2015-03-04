<%@ include file="includes/init.inc" %>

<%@ attribute name="var"		rtexprvalue="false"	required="true" %>
<%@ attribute name="webObject"	rtexprvalue="true"	required="true"	type="java.lang.Object" %>

<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END" %>

<jsp:useBean id="galleryCounts" class="java.util.HashMap" />

<p:object webObject="${webObject}" content="gallery" metadata="meta" />
<p:out var="objectType" xvalue="$meta//WebType" />

<c:choose>
	<c:when test="${fn:endsWith(objectType, 'picturestory') or fn:endsWith(objectType, 'gallery')}">
		<p:out var="numPhotos"	xvalue="count($gallery//multimedia-container/gallery-container/photogrp)" />
		<p:out var="numVideo"	xvalue="count($gallery//multimedia-container/gallery-container/video-container)" />
		<p:out var="numExternal"	xvalue="count($gallery//multimedia-container/gallery-container/externalgrp)" />
		<p:out var="errorMessage"	value="" />
	</c:when>
	<c:otherwise>
		<p:out var="numPhotos"	value="0" />
		<p:out var="numVideo"	value="0" />
		<p:out var="numExternal"	value="0" />
		<p:out var="errorMessage"	value="Object is not of type gallery" />
	</c:otherwise>
</c:choose>

<fmt:parseNumber var="numPhotos" value="${numPhotos}" integerOnly="true" />
<fmt:parseNumber var="numVideo" value="${numVideo}" integerOnly="true" />
<fmt:parseNumber var="numExternal" value="${numExternal}" integerOnly="true" />

<c:choose>
	<c:when test="${numVideo > 0 or numExternal > 0}">
		<c:set target="${galleryCounts}" property="photoOnly" value="False" />
	</c:when>
	<c:otherwise>
		<c:set target="${galleryCounts}" property="photoOnly" value="True" />
	</c:otherwise>
</c:choose>

<c:set target="${galleryCounts}" property="photos" value="${numPhotos}" />
<c:set target="${galleryCounts}" property="video" value="${numVideo}" />
<c:set target="${galleryCounts}" property="external" value="${numExternal}" />
<c:set target="${galleryCounts}" property="errorMessage" value="${errorMessage}" />

<c:set var="currentValue" value="${galleryCounts}" />