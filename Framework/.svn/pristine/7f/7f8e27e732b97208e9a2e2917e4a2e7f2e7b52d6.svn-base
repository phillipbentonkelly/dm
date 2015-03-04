<%@ include file="includes/init.inc" %>

<%@ attribute name="var"		rtexprvalue="false"	required="true" %>
<%@ attribute name="webObject"	rtexprvalue="true"	required="true"	type="java.lang.Object" %>
<%@ attribute name="format"		rtexprvalue="true"	required="false" %>

<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END" %>

<c:set var="imageFormat" value="${format}" />
<c:if test="${empty format or fn:trim(format) eq ''}">
	<c:set var="imageFormat" value="image_1024c635" />
</c:if>

<p:object webObject="${webObject}" content="gallery" metadata="meta" />

<p:out var="objectType" xvalue="$meta//WebType" />

<%
	ArrayList<Map> galleryData = new ArrayList<Map>();
%>

<c:choose>
	<c:when test="${fn:endsWith(objectType, 'picturestory') or fn:endsWith(objectType, 'gallery')}">
		<x:forEach var="photoGroup" select="$gallery//doc/story/multimedia-container/gallery-container/photogrp" varStatus="loop">
			<p:out var="source" xvalue="$photoGroup/photo/@fileref/text()" />
			<p:out var="sourceId" value="${fn:substringAfter(source, '?uuid=')}" />
			
			<p:getObject uuid="${sourceId}" var="imageObject" />
			<c:choose>
				<c:when test="${not empty imageObject}">
					<p:url var="imageSrc" webObject="${imageObject}" format="${imageFormat}" type="resource" baseDomain="httpCache" public="true" />
					<p:out var="headline"	xvalue="$photoGroup/headlines/headline/p" />
					<p:out var="subHead"	xvalue="$photoGroup/headlines/subheadline/p" />
					<p:out var="altText"	xvalue="$photoGroup/captiongrp/alt-text/p" />
					<%-- The /p will be checked within the XSL transform; this is necessary to prevent BS markup from sneaking in --%>
					<p:out var="caption"	xvalue="$photoGroup/captiongrp/caption" xslt="$configurationURI/Framework/xslt/bdc_story_default_new.xslt" />
					<p:out var="credit"		xvalue="$photoGroup/captiongrp/credit/p" />
					
					<c:if test="${fn:trim(altText) eq ''}">
						<p:out var="altText" xvalue="$photoGroup/captiongrp/caption/p" />
					</c:if>
					
					<c:choose>
						<c:when test="${not loop.last}">
							<p:out var="caption" value="${fn:replace(caption, '[[SLIDE]]', 'Next')}" />
						</c:when>
						<c:otherwise>
							<p:out var="caption" value="${fn:replace(caption, '[[SLIDE]]', 'Back to the beginning')}" />
						</c:otherwise>
					</c:choose>
					
					<%
						Map gallery = new HashMap();
							gallery.put("imageSrc", (String)jspContext.getAttribute("imageSrc"));
							gallery.put("format", (String)jspContext.getAttribute("format"));
							gallery.put("altText", (String)jspContext.getAttribute("altText"));
							gallery.put("caption", (String)jspContext.getAttribute("caption"));
							gallery.put("credit", (String)jspContext.getAttribute("credit"));
							gallery.put("headline", (String)jspContext.getAttribute("headline"));
							gallery.put("subHead", (String)jspContext.getAttribute("subHead"));
							gallery.put("errorMessage", "");
						galleryData.add(gallery);
					%>
				</c:when>
				<c:otherwise>
					<%
						String imageID = (String)jspContext.getAttribute("sourceId");
						Map gallery = new HashMap();
							gallery.put("imageSrc", "");
							gallery.put("format", "");
							gallery.put("altText", "");
							gallery.put("caption", "");
							gallery.put("credit", "");
							gallery.put("headline", "");
							gallery.put("subHead", "");
							gallery.put("errorMessage", "Could not find image with ID " + imageID);
						galleryData.add(gallery);
					%>
				</c:otherwise>
			</c:choose>
			<%
				//galleryData.add(gallery);
				//gallery.clear(); // empty the map so we can use it again
			%>		
		</x:forEach>
		<%
			jspContext.setAttribute("currentValue", galleryData);
		%>
	</c:when>
	
	<c:otherwise>
		<%
			String webType = (String)jspContext.getAttribute("objectType");
			Map gallery = new HashMap();
				gallery.put("imageSrc", "");
				gallery.put("format", "");
				gallery.put("altText", "");
				gallery.put("caption", "");
				gallery.put("credit", "");
				gallery.put("headline", "");
				gallery.put("subHead", "");
				gallery.put("errorMessage", webType + " is not of type gallery");
			
			galleryData.add(gallery);
			jspContext.setAttribute("currentValue", galleryData);
		%>
	</c:otherwise>
</c:choose>