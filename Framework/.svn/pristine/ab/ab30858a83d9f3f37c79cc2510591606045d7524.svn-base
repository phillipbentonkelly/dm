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
		<x:forEach select="$gallery//multimedia-container/gallery-container/*[name() = 'photogrp' or name() = 'video-container' or name() = 'externalgrp']" var="compoundItem" varStatus="loop">
			<p:out var="itemType" xvalue="name($compoundItem)" />
			<c:choose>
				<%-- ///////////////////////////////////// PHOTO GALLERY ITEM ///////////////////////////////////// --%>
				<c:when test="${itemType eq 'photogrp'}">
					<p:out var="source" xvalue="$compoundItem/photo/@fileref/text()" />
					<p:out var="sourceId" value="${fn:substringAfter(source, '?uuid=')}" />
					
					<p:getObject uuid="${sourceId}" var="imageObject" />
					
					<%
						Map gallery = new HashMap();
							gallery.put("type", "Photo");
					%>
					
					<c:choose>
						<c:when test="${not empty imageObject}">
							<p:url var="imageSrc" webObject="${imageObject}" format="${imageFormat}" type="resource" baseDomain="httpCache" public="true" />
							<p:out var="headline"	xvalue="$compoundItem/headlines/headline/p" />
							<p:out var="subHead"	xvalue="$compoundItem/headlines/subheadline/p" />
							<p:out var="altText"	xvalue="$compoundItem/captiongrp/alt-text/p" />
							
							<p:out var="caption"	xvalue="$compoundItem/captiongrp/caption" xslt="$configurationURI/Framework/xslt/bdc_story_default_new.xslt" />
							<p:out var="credit"		xvalue="$compoundItem/captiongrp/credit/p" />
							
							<c:if test="${fn:trim(altText) eq ''}">
								<p:out var="altText" xvalue="$compoundItem/captiongrp/caption/p" />
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
								gallery.put("imageSrc", (String)jspContext.getAttribute("imageSrc"));
								gallery.put("format", (String)jspContext.getAttribute("format"));
								gallery.put("altText", (String)jspContext.getAttribute("altText"));
								gallery.put("caption", (String)jspContext.getAttribute("caption"));
								gallery.put("credit", (String)jspContext.getAttribute("credit"));
								gallery.put("headline", (String)jspContext.getAttribute("headline"));
								gallery.put("subHead", (String)jspContext.getAttribute("subHead"));
								gallery.put("errorMessage", "");
							%>
						</c:when>
						<c:otherwise>
							<%
								gallery.put("errorMessage", "Could not find image with ID " + (String)jspContext.getAttribute("sourceId"));
							%>
						</c:otherwise>
					</c:choose>
					
					<%
						galleryData.add(gallery);
					%>
					
				</c:when>
				
				<%-- ///////////////////////////////////// VIDEO ITEM ///////////////////////////////////// --%>
				<c:when test="${itemType eq 'video-container'}">
					<p:out var="source" xvalue="$compoundItem/@href/text()" />
					<p:out var="sourceId" value="${fn:substringAfter(source, '?uuid=')}" />
					<p:out var="sourceId" value="${fn:substringBefore(sourceId, '&')}" />
					
					<p:out var="headline" xvalue="$compoundItem/headline/p" />
					<p:out var="videoLink" xvalue="$compoundItem/videogrp/a/text()" />
					<p:out var="credit" xvalue="$compoundItem/captiongrp/credit/p" />
					<p:out var="caption" xvalue="$compountItem/captiongrp/caption" xslt="$configurationURI/Framework/xslt/bdc_story_default_new.xslt" />
				
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
							gallery.put("type", "Video");
							gallery.put("id", (String)jspContext.getAttribute("sourceId"));
							gallery.put("headline", (String)jspContext.getAttribute("headline"));
							gallery.put("videoLink", (String)jspContext.getAttribute("videoLink"));
							gallery.put("credit", (String)jspContext.getAttribute("credit"));
							gallery.put("caption", (String)jspContext.getAttribute("caption"));
							gallery.put("errorMessage", "");
						galleryData.add(gallery);
					%>
				</c:when>
				
				<%-- ///////////////////////////////////// EXTERNAL GALLERY ITEM ///////////////////////////////////// --%>
				<c:when test="${itemType eq 'externalgrp'}">
					<p:out var="source"	xvalue="$compoundItem/@source/text()" />
					<p:out var="headline" xvalue="$compoundItem/headlines/headline/p" />
					<p:out var="fragment" xvalue="$compoundItem/fragment" />
					<p:out var="thumbnail" xvalue="$compoundItem/thumbnail/@fileref" />
					<p:out var="caption" xvalue="$compoundItem/captiongrp/caption" xslt="$configurationURI/Framework/xslt/bdc_story_default_new.xslt" />
					<p:out var="credit" xvalue="$compoundItem/captiongrp/credit/p" />
					
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
							gallery.put("type", "External");
							gallery.put("source", (String)jspContext.getAttribute("source"));
							gallery.put("headline", (String)jspContext.getAttribute("headline"));
							gallery.put("fragment", (String)jspContext.getAttribute("fragment"));
							gallery.put("thumbnail", (String)jspContext.getAttribute("thumbnail"));
							gallery.put("caption", (String)jspContext.getAttribute("caption"));
							gallery.put("credit", (String)jspContext.getAttribute("credit"));
							gallery.put("errorMessage", "");
						galleryData.add(gallery);
					%>
				</c:when>
			</c:choose>
		</x:forEach>
		<%
			jspContext.setAttribute("currentValue", galleryData);
		%>
	</c:when>
	
	<c:otherwise>
		<%
			String webType = (String)jspContext.getAttribute("objectType");
			Map gallery = new HashMap();
				gallery.put("type", webType);
				gallery.put("errorMessage", webType + " is not of type gallery");
			
			galleryData.add(gallery);
			jspContext.setAttribute("currentValue", galleryData);
		%>
	</c:otherwise>
</c:choose>