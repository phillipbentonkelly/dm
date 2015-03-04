<%@ include file="includes/init.inc"%>
<%@ tag body-content="scriptless"
	import="
    org.w3c.dom.Document, 
    java.util.ArrayList,
    java.util.LinkedHashSet,
    java.util.LinkedList,
    java.util.List,
    java.util.ListIterator,
    java.util.Map,
    com.eidosmedia.portal.PortalContext,
    com.eidosmedia.portal.util.PortalWebObjectWrapper,
    com.eidosmedia.portal.util.ObjectResolver,                                      
    com.eidosmedia.wa.render.WebObject,
    com.eidosmedia.wa.render.WebObjectImpl,
    com.eidosmedia.wa.render.WebType,
    com.eidosmedia.wa.render.WebZone,
    com.eidosmedia.wa.render.WebTypeTemplate,
    com.eidosmedia.eomcache.ObjectProxy,
    com.eidosmedia.eomcache.proxies.data.XMLData,
    com.eidosmedia.portal.render.impl.cached.MetaOutputBuilder,
    com.eidosmedia.misc.xpath.AbstractXPathHelper,
    org.apache.xerces.dom.AttrNSImpl
"%>

<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="c" uri="jstlCore"%>

<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="loid" rtexprvalue="true" required="false"%>
<%@ attribute name="zoneName" rtexprvalue="true" required="false"%>
<%@ attribute name="parentZoneName" rtexprvalue="true" required="false"%>
<%@ attribute name="parentType" rtexprvalue="true" required="false"%>

<%@ attribute name="webObject" rtexprvalue="true" required="false"
	type="java.lang.Object"%>


<%@ variable name-from-attribute="var" alias="output" scope="AT_END"%>

<jsp:useBean id="contentData" class="java.util.HashMap" />


<c:choose>
	<c:when test="${not empty path}">
		<p:getObject path="${path}" var="obj" onError="ignore" />
	</c:when>
	<c:when test="${not empty uuid}">
		<p:getObject uuid="${uuid}" var="obj" onError="ignore" />
	</c:when>
	<c:when test="${not empty webObject}">
		<p:getObject webObject="${webObject}" var="obj" />
	</c:when>
	<c:when test="${not empty loid}">
		<p:getObject loid="${loid}" var="obj" />
	</c:when>
	<c:otherwise>
		<p:getObject webObject="${currentObject}" var="obj" />
	</c:otherwise>
</c:choose>


<p:object webObject="${obj}" text="component-text" content="component-doc" metadata="component-meta" channel="Boston.com" />
<p:out var="componentId" value="${obj.loid}" />
<p:out var="componentText" xvalue="$component-text" />
<p:out var="componentDoc" xvalue="$zone-doc" />
<p:out var="componentMeta" xvalue="$zone-meta" />

<bdc:getMD5Checksum var="componentDocMD5"
	content="${componentDoc}${obj.loid}" />
<bdc:getMD5Checksum var="componentMetaMD5"
	content="${componentMeta}${obj.loid}" />




<p:out var="componentXref" xvalue="$component-doc//story/xref" />
<p:out var="componentType"
	xvalue="$component-meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/WebType" />
<p:out var="componentTitle"
	xvalue="$component-meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/Title" />
<p:out var="componentMedia"
	xvalue="$component-meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/MediaName" />

<p:out var="componentLeadIn"
	xvalue="$component-meta//Editorial/LeadIn" />

<p:out var="componentSource" xvalue="$component-meta//ObjectMetadata/Source" />


<p:out var="componentStoryTitle" xvalue="$component-doc//doc/story/headlines/headline"/>
<p:url webObject="${obj}" var="componentStoryLink"/>
<p:out var="componentStoryBody" xvalue="$component-doc//text/content" xslt="$configurationURI/Framework/xslt/bdc_story_default_new.xslt"></p:out>
<p:out var="componentStoryWebTeaser" xvalue="$component-doc//doc/story/web-tease"/>
<p:out var="componentStoryStreamTeaser" xvalue="$component-doc//doc/story/stream-tease"/>
<c:if test="${fn:trim(componentStoryBody) == ''}">
	<p:out var="componentStoryBody" value="${componentStoryWebTeaser}"/>
	<c:if test="${fn:trim(componentStoryWebTeaser) == ''}">
		<p:out var="componentStoryBody" value="${componentStoryStreamTeaser}"/>
	</c:if>
</c:if>		

<p:url var="componentStoryMainImageURL" xvalue="$component-doc//photogrp[@class='main-web-images']/photo[@fileref!='']/@fileref" type="resource"/>
<p:out var="componentStoryMainImageClass" xvalue="$component-doc//photogrp[@class='main-web-images']/@class" />
<p:out var="componentStoryMainImageCaption" xvalue="$component-doc//photogrp[@class='main-web-images']/captiongrp[../photo-inline]/caption/p" />
<p:out var="componentStoryMainImageCredit"  xvalue="$component-doc//photogrp[@class='main-web-images']/captiongrp[../photo-inline]/credit/p" />
<c:if test="${empty componentStoryMainImageCaption or componentStoryMainImageCaption == ''}">
	<p:out var="componentStoryMainImageCaption" xvalue="$component-doc//photogrp[@class='main-web-images']/captiongrp/caption/p" />
</c:if>
<p:out var="componentStoryMainImageFormat" xvalue="$component-doc//photogrp[@class='main-web-images']/photo[@fileref!='']/@name" />

	<% String keywords = ""; %>
	<x:forEach select="$component-meta//ObjectMetadata/Categorization/Keywords/Keyword" var="keyword_item" varStatus="status">
		<p:out var="componentStoryKeyword" xvalue="$keyword_item//."/>
		<% keywords = keywords + "\"" + (String)jspContext.getAttribute("componentStoryKeyword") + "\","; %>
	</x:forEach>
	<% 
		if (!keywords.equals("")) {
			keywords = keywords.substring(0,keywords.lastIndexOf(',')); 
		}%>

<p:out var="componentGalleryTitle" xvalue="$component-doc//gallery-container/headlines/headline"/>
<p:url var="componentGalleryMainImageURL" xvalue="$component-doc//photogrp[@class='photo-gallery-tease']/photo[@fileref!='']/@fileref" type="resource"/>
<p:out var="componentGalleryMainImageClass" xvalue="$component-doc//photogrp[@class='photo-gallery-tease']/@class" />
<p:out var="componentGalleryMainImageCaption" xvalue="$component-doc//photogrp[@class='photo-gallery-tease']/captiongrp[../photo-inline]/caption/p" />
<p:out var="componentGalleryMainImageCredit"  xvalue="$component-doc//photogrp[@class='photo-gallery-tease']/captiongrp[../photo-inline]/credit/p" />

<p:out var="componentSEOInformationSummary" xvalue="$component-meta//ObjectMetadata/SEOInformation/Summary"/>
<p:out var="componentSEOInformationHeadline" xvalue="$component-meta//ObjectMetadata/SEOInformation/Headline"/>

<%

	Map component = new HashMap();
	ArrayList<Map> componentZoneItems = new ArrayList<Map>();

	
	String componentId = (String)jspContext.getAttribute("componentId");
	String componentDoc = (String)jspContext.getAttribute("componentDoc");
	String componentMeta = (String)jspContext.getAttribute("componentMeta");
	String componentText = (String)jspContext.getAttribute("componentText");
	
	String componentSEOInformationSummary = (String)jspContext.getAttribute("componentSEOInformationSummary");
	String componentSEOInformationHeadline = (String)jspContext.getAttribute("componentSEOInformationHeadline");
	
	componentSEOInformationSummary = componentSEOInformationSummary.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");

	componentSEOInformationHeadline = componentSEOInformationHeadline.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");

	
	componentText = componentText.replaceAll("\\n|\\r","")
		.replaceAll("\\\"","\\\\\"")
		.replaceAll("\\\t","    ");
	
	
	String componentXref = (String)jspContext.getAttribute("componentXref");
	
	componentXref = componentXref.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");
	
	String componentDocMD5 = (String)jspContext.getAttribute("componentDocMD5");
	String componentMetaMD5 = (String)jspContext.getAttribute("componentMetaMD5");
	
	String componentChecksum = componentDocMD5 + componentMetaMD5;
	
	String componentZone = (String)jspContext.getAttribute("zoneName");
	String componentType = "";
	String componentTitle = (String)jspContext.getAttribute("componentTitle");
	String componentMedia = (String)jspContext.getAttribute("componentMedia");
	String componentLeadIn = (String)jspContext.getAttribute("componentLeadIn");
	String componentSource = (String)jspContext.getAttribute("componentSource");
	

	component.put("id",componentId);
	component.put("checksum",componentChecksum);
	component.put("zone",componentZone);
	component.put("keywords",keywords);
	component.put("hasSubItems","false");
	component.put("hasImage","false");
	component.put("xRef",componentXref);
	component.put("SEOInformationSummary",componentSEOInformationSummary);
	component.put("SEOInformationHeadline",componentSEOInformationHeadline);
	
	

	String componentStoryTitle = (String)jspContext.getAttribute("componentStoryTitle");
	
	componentStoryTitle = componentStoryTitle.replaceAll("\\n|\\r","")
		.replaceAll("\\\"","\\\\\"")
		.replaceAll("\\\t","    ");	
	

	String componentStoryBody = (String)jspContext.getAttribute("componentStoryBody");
	
	componentStoryBody = componentStoryBody.replaceAll("\\n|\\r","")
		.replaceAll("\\\"","\\\\\"")
		.replaceAll("\\\t","    ");	
	
	
	String componentStoryLink = (String)jspContext.getAttribute("componentStoryLink");
	
	componentStoryLink = componentStoryLink.replaceAll("\\n|\\r","")
		.replaceAll("\\\"","\\\\\"")
		.replaceAll("\\\t","    ");	

	String componentStoryMainImageURL = (String)jspContext.getAttribute("componentStoryMainImageURL");
	String componentStoryMainImageClass = (String)jspContext.getAttribute("componentStoryMainImageClass");
	String componentStoryMainImageCaption = (String)jspContext.getAttribute("componentStoryMainImageCaption");
	String componentStoryMainImageCredit = (String)jspContext.getAttribute("componentStoryMainImageCredit");
	String componentStoryMainImageFormat = (String)jspContext.getAttribute("componentStoryMainImageFormat");
	
	componentStoryMainImageCaption = componentStoryMainImageCaption.replaceAll("\\n|\\r","")
		.replaceAll("\\\"","\\\\\"")
		.replaceAll("\\\t","    ");

	componentStoryMainImageCredit = componentStoryMainImageCredit.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");

	
	//For Gallery Only
	String componentGalleryTitle = (String)jspContext.getAttribute("componentGalleryTitle");
	String componentGalleryMainImageURL = (String)jspContext.getAttribute("componentGalleryMainImageURL");
	String componentGalleryMainImageClass = (String)jspContext.getAttribute("componentGalleryMainImageClass");
	String componentGalleryMainImageCaption = (String)jspContext.getAttribute("componentGalleryMainImageCaption");
	String componentGalleryMainImageCredit = (String)jspContext.getAttribute("componentGalleryMainImageCredit");
	String componentGalleryMainImageFormat = (String)jspContext.getAttribute("componentGalleryMainImageFormat");
	
	componentStoryMainImageCaption = componentStoryMainImageCaption.replaceAll("\\n|\\r","")
		.replaceAll("\\\"","\\\\\"")
		.replaceAll("\\\t","    ");

	componentStoryMainImageCredit = componentStoryMainImageCredit.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");

	componentGalleryTitle = componentGalleryTitle.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");

	

	
	String _componentType = (String)jspContext.getAttribute("componentType");
	if (_componentType.equals("dwc_placester_listings_widget")) {
		componentType="listings";
		component.put("type",componentType);
		component.put("title",componentTitle);
		component.put("source",componentSource);
	} else if (_componentType.equals("gallery")) {
		component.put("type",_componentType);
		component.put("title",componentGalleryTitle);
		component.put("source",componentSource);
		component.put("content",componentStoryBody);
		
		component.put("link",componentStoryLink);
		component.remove("hasImage");
		component.put("hasImage","true");
		component.put("mainImageURL",componentGalleryMainImageURL);
		component.put("mainImageClass",componentGalleryMainImageClass);
		component.put("mainImageCredit",componentGalleryMainImageCredit);
		component.put("mainImageCaption",componentGalleryMainImageCaption);
		component.put("mainImageFormat",componentGalleryMainImageFormat);
	
		
	} else if (_componentType.equals("dwc_placester_content_tile")) {
		componentType="content_tile";
		component.put("type",componentType);
		component.put("title",componentTitle);
		component.put("source",componentSource);
		component.remove("hasSubItems");
		component.put("hasSubItems","true");

		//Now read all stories inside that specific title
		%>
		<bdc:getAllZones path="${obj.path}" var="componentItemZones"/>
		<c:forEach items="${componentItemZones}" var="componentItemZoneName" varStatus="zoneStatus">
			<bdc:getZoneContent var="componentZone" webObject="${obj}" zoneName="${componentItemZoneName}"/>
			<c:forEach items="${componentZone.items}" var="componentItemZoneObj" varStatus="zoStatus">
				
				<bdc:getPlacesterComponentItem loid="${componentItemZoneObj.loid}" zoneName="${componentItemZoneName}" parentZoneName="${zoneName}" parentType="${componentType}" var="componentItem"/>
				<%
					Map componentItem = (Map)jspContext.getAttribute("componentItem");
					componentZoneItems.add(componentItem);
					//component.put("zones",componentItem);
				%>
			
			</c:forEach>
		</c:forEach>
	<%
	} else if (_componentType.equals("dwc_placester_carousel")) {
		componentType="carousel";
		component.put("type",componentType);
		component.put("title",componentTitle);
		component.put("source",componentSource);
		component.put("link",componentStoryLink);
		component.remove("hasSubItems");
		component.put("hasSubItems","true");

		//Now read all stories inside that specific title
		%>
		<bdc:getAllZones path="${obj.path}" var="componentItemZones"/>
		<c:forEach items="${componentItemZones}" var="componentItemZoneName" varStatus="zoneStatus">
			<bdc:getZoneContent var="componentZone" webObject="${obj}" zoneName="${componentItemZoneName}"/>
			<c:forEach items="${componentZone.items}" var="componentItemZoneObj" varStatus="zoStatus">
				
				<bdc:getPlacesterComponentItem loid="${componentItemZoneObj.loid}" zoneName="${componentItemZoneName}" parentZoneName="${componentZone}" parentType="${componentType}" var="componentItem"/>
				<%
					Map componentItem = (Map)jspContext.getAttribute("componentItem");
					componentZoneItems.add(componentItem);
					//component.put("zones",componentItem);
				%>
			
			</c:forEach>
		</c:forEach>
	<%
	} else if (_componentType.equals("dwc_megamenu")) {
		componentType="mega_menu";
		component.put("type",componentType);
		component.put("title",componentTitle);
		component.put("source",componentSource);
		component.remove("hasSubItems");
		component.put("hasSubItems","true");

		//Now read all stories inside that specific title
		%>
		<bdc:getAllZones path="${obj.path}" var="componentItemZones"/>
		<c:forEach items="${componentItemZones}" var="componentItemZoneName" varStatus="zoneStatus">
			<bdc:getZoneContent var="componentZone" webObject="${obj}" zoneName="${componentItemZoneName}"/>
			<c:forEach items="${componentZone.items}" var="componentItemZoneObj" varStatus="zoStatus">
				
				<bdc:getPlacesterComponentItem loid="${componentItemZoneObj.loid}" zoneName="${componentItemZoneName}" parentZoneName="${componentZone}" parentType="${componentType}" var="componentItem"/>
				<%
					Map componentItem = (Map)jspContext.getAttribute("componentItem");
					componentZoneItems.add(componentItem);
					//component.put("zones",componentItem);
				%>
			
			</c:forEach>
		</c:forEach>
	<%	
	} else if (_componentType.equals("story") && componentMedia.equals("html")) {
		//Story on the right panel should be rendered as it is.
		componentType="story_html";
		component.put("type",componentType);
		component.put("title",componentLeadIn);
		component.put("content",componentText);
		component.put("link",componentStoryLink);
		
	} else if ((_componentType.equals("story") && !componentMedia.equals("html")) ||
			_componentType.equals("summarystory") || 
			_componentType.equals("streamtease") ) {
		//Story on the right panel should be rendered as it is.
		componentType="story";
		component.put("type",_componentType);
		component.put("title",componentStoryTitle);
		component.put("content",componentStoryBody);
		component.put("link",componentStoryLink);
		if (!(componentStoryMainImageURL == null ) && !componentStoryMainImageURL.isEmpty()) {
			component.remove("hasImage");
			component.put("hasImage","true");
			component.put("mainImageURL",componentStoryMainImageURL);
			component.put("mainImageClass",componentStoryMainImageClass);
			component.put("mainImageCredit",componentStoryMainImageCredit);
			component.put("mainImageCaption",componentStoryMainImageCaption);
			component.put("mainImageFormat",componentStoryMainImageFormat);
		}		
		
	} else {
		componentType=_componentType;
		component.put("type",componentType);
	}

	component.put("componentItems",componentZoneItems);

	jspContext.setAttribute("component",component);
	

%>
<c:set var="output" value="${component}" />