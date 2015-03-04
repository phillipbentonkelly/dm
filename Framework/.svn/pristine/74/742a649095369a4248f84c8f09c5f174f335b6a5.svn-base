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


<p:object webObject="${obj}" text="componentItem-text" content="componentItem-doc" metadata="componentItem-meta" channel="Boston.com" />
<p:out var="componentItemId" value="${obj.loid}" />
<p:out var="componentItemText" xvalue="$componentItem-text" />
<p:out var="componentItemDoc" xvalue="$componentItem-doc" />
<p:out var="componentItemMeta" xvalue="$componentItem-meta" />


<% String keywords = ""; %>
<x:forEach select="$componentItem-meta//ObjectMetadata/Categorization/Keywords/Keyword" var="keyword_item" varStatus="status">
	<p:out var="componentItemStoryKeyword" xvalue="$keyword_item//."/>
	<% keywords = keywords + "\"" + (String)jspContext.getAttribute("componentItemStoryKeyword") + "\","; %>
</x:forEach>
<% 
	if (!keywords.equals("")) {
		keywords = keywords.substring(0,keywords.lastIndexOf(',')); 
	}
	%>
	
<bdc:getMD5Checksum var="componentItemDocMD5"
	content="${componentItemDoc}${obj.loid}" />
<bdc:getMD5Checksum var="componentItemMetaMD5"
	content="${componentItemMeta}${obj.loid}" />


<p:out var="componentItemXref" xvalue="$componentItem-doc//story/xref" />



<p:out var="componentItemType"	xvalue="$componentItem-meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/WebType" />

<p:out var="componentItemTitle" xvalue="$componentItem-meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/Title" />
<p:out var="componentItemStoryTitle"  xvalue="$componentItem-doc//doc/story/headlines/headline" />
<p:out var="componentItemLeadIn" xvalue="$componentItem-meta//Editorial/LeadIn" />

<p:out var="componentItemStoryBody" xvalue="$componentItem-doc//text/content" xslt="$configurationURI/Framework/xslt/bdc_story_default_new.xslt"></p:out>
<p:out var="componentItemStoryWebTease" xvalue="$componentItem-doc//doc/story/web-tease"/>
<p:out var="componentItemStoryStreamTease" xvalue="$componentItem-doc//doc/story/stream-tease"/>
<c:if test="${fn:trim(componentItemStoryBody) == ''}">
	<p:out var="componentItemStoryBody" value="${componentItemStoryWebTease}"/>
	<c:if test="${fn:trim(componentItemStoryWebTease) == ''}">
		<p:out var="componentItemStoryBody" value="${componentItemStoryStreamTease}"/>
	</c:if>
</c:if>		



<p:out var="componentItemMedia" xvalue="$componentItem-meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/MediaName" />


<p:out var="componentItemSource" xvalue="$componentItem-meta//ObjectMetadata/Source" />

<p:out var="componentItemMegaMenuSectionName" value="${obj.path}" />

<p:url var="componentItemStoryMainImageURL" xvalue="$componentItem-doc//photogrp[@class='main-web-images']/photo[@fileref!='']/@fileref" type="resource" baseDomain="http://devedit.boston.com" />
<p:out var="componentItemStoryMainImageClass" xvalue="$componentItem-doc//photogrp[@class='main-web-images']/@class" />
<p:out var="componentItemStoryMainImageCaption" xvalue="$componentItem-doc//photogrp[@class='main-web-images']/captiongrp[../photo-inline]/caption/p" />
<p:out var="componentItemStoryMainImageCredit"  xvalue="$componentItem-doc//photogrp[@class='main-web-images']/captiongrp[../photo-inline]/credit/p" />
<c:if test="${empty componentItemStoryMainImageCaption or componentItemStoryMainImageCaption == ''}">
	<p:out var="componentItemStoryMainImageCaption" xvalue="$componentItem-doc//photogrp[@class='main-web-images']/captiongrp/caption/p" />
</c:if>
<p:out var="componentItemStoryMainImageFormat" xvalue="$componentItem-doc//photogrp[@class='main-web-images']/photo[@fileref!='']/@name" />

<p:url webObject="${obj}" var="componentItemStoryLink"/>

<p:out var="componentItemDFPAdPosition" xvalue="$componentItem-meta//DfpAdPosition" />


<p:out var="componentItemGalleryTitle" xvalue="$componentItem-doc//gallery-container/headlines/headline"/>
<p:url var="componentItemGalleryMainImageURL" xvalue="$componentItem-doc//photogrp[@class='photo-gallery-tease']/photo[@fileref!='']/@fileref" type="resource"/>
<p:out var="componentItemGalleryMainImageClass" xvalue="$componentItem-doc//photogrp[@class='photo-gallery-tease']/@class" />
<p:out var="componentItemGalleryMainImageCaption" xvalue="$componentItem-doc//photogrp[@class='photo-gallery-tease']/captiongrp[../photo-inline]/caption/p" />
<p:out var="componentItemGalleryMainImageCredit"  xvalue="$componentItem-doc//photogrp[@class='photo-gallery-tease']/captiongrp[../photo-inline]/credit/p" />

<p:out var="componentItemSEOInformationSummary" xvalue="$componentItem-meta//ObjectMetadata/SEOInformation/Summary"/>
<p:out var="componentItemSEOInformationHeadline" xvalue="$componentItem-meta//ObjectMetadata/SEOInformation/Headline"/>


<%

	Map componentItem = new HashMap();
	ArrayList<Map> componentItemZoneItems = new ArrayList<Map>();
	
	
	String componentItemId = (String)jspContext.getAttribute("componentItemId");
	String componentItemDoc = (String)jspContext.getAttribute("componentItemDoc");
	String componentItemMeta = (String)jspContext.getAttribute("componentItemMeta");
	String componentItemText = (String)jspContext.getAttribute("componentItemText");
	String componentItemStoryLink = (String)jspContext.getAttribute("componentItemStoryLink");
	String componentItemXref = (String)jspContext.getAttribute("componentItemXref");

	String componentItemSEOInformationSummary = (String)jspContext.getAttribute("componentItemSEOInformationSummary");
	String componentItemSEOInformationHeadline = (String)jspContext.getAttribute("componentItemSEOInformationHeadline");
	
	componentItemSEOInformationSummary = componentItemSEOInformationSummary.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");

	componentItemSEOInformationHeadline = componentItemSEOInformationHeadline.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");
	
	
	componentItemXref = componentItemXref.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");
	String componentItemMegaMenuSectionName = (String)jspContext.getAttribute("componentItemMegaMenuSectionName");
	
	String[] componentItemMegaMenuSectionNameArray1 = componentItemMegaMenuSectionName.split("/",-1); 
	componentItemMegaMenuSectionName = (String)componentItemMegaMenuSectionNameArray1[componentItemMegaMenuSectionNameArray1.length-1];
	
	String[] componentItemMegaMenuSectionNameArray2 = componentItemMegaMenuSectionName.split("\\.",-1);
	componentItemMegaMenuSectionName = (String)componentItemMegaMenuSectionNameArray2[0];
	
	componentItemText = componentItemText.replaceAll("\\n|\\r","")
		.replaceAll("\\\"","\\\\\"")
		.replaceAll("\\\t","    ");
	
	
	String componentItemDocMD5 = (String)jspContext.getAttribute("componentItemDocMD5");
	String componentItemMetaMD5 = (String)jspContext.getAttribute("componentItemMetaMD5");
	
	String componentItemChecksum = componentItemDocMD5 + componentItemMetaMD5;
	
	String componentItemZone = (String)jspContext.getAttribute("zoneName");
	String componentItemParentZone = (String)jspContext.getAttribute("parentZoneName");
	String componentItemParentType = (String)jspContext.getAttribute("parentType");
	
	String componentItemType = "";

	String componentItemTitle = (String)jspContext.getAttribute("componentItemTitle");
	String componentItemLeadIn = (String)jspContext.getAttribute("componentItemLeadIn");
	String componentItemStoryTitle = (String)jspContext.getAttribute("componentItemStoryTitle");

	componentItemStoryTitle = componentItemStoryTitle.replaceAll("\\n|\\r","");
	componentItemStoryTitle = componentItemStoryTitle.replaceAll("\\\"","\\\\\"");
	componentItemStoryTitle = componentItemStoryTitle.replaceAll("\\\t","    ");

	String componentItemStoryMainImageURL = (String)jspContext.getAttribute("componentItemStoryMainImageURL");
	String componentItemStoryMainImageClass = (String)jspContext.getAttribute("componentItemStoryMainImageClass");
	String componentItemStoryMainImageCaption = (String)jspContext.getAttribute("componentItemStoryMainImageCaption");
	String componentItemStoryMainImageCredit = (String)jspContext.getAttribute("componentItemStoryMainImageCredit");
	String componentItemStoryMainImageFormat = (String)jspContext.getAttribute("componentItemStoryMainImageFormat");
	
	componentItemStoryMainImageCaption = componentItemStoryMainImageCaption.replaceAll("\\n|\\r","")
		.replaceAll("\\\"","\\\\\"")
		.replaceAll("\\\t","    ");

	componentItemStoryMainImageCredit = componentItemStoryMainImageCredit.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");

	String componentItemStoryBody = (String)jspContext.getAttribute("componentItemStoryBody");
	componentItemStoryBody = componentItemStoryBody.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");

	
	String componentItemDFPAdPosition = (String)jspContext.getAttribute("componentItemDFPAdPosition");
	String componentItemMedia = (String)jspContext.getAttribute("componentItemMedia");
	String componentItemSource = (String)jspContext.getAttribute("componentItemSource");
	

	componentItem.put("id",componentItemId);
	componentItem.put("checksum",componentItemChecksum);
	componentItem.put("zone",componentItemZone);
	componentItem.put("keywords",keywords);
	componentItem.put("hasImage","false");
	componentItem.put("hasSubItems","false");
	componentItem.put("xRef",componentItemXref);
	
	componentItem.put("SEOInformationSummary",componentItemSEOInformationSummary);
	componentItem.put("SEOInformationHeadline",componentItemSEOInformationHeadline);
	
	//For Gallery Only
	String componentItemGalleryTitle = (String)jspContext.getAttribute("componentItemGalleryTitle");
	String componentItemGalleryMainImageURL = (String)jspContext.getAttribute("componentItemGalleryMainImageURL");
	String componentItemGalleryMainImageClass = (String)jspContext.getAttribute("componentItemGalleryMainImageClass");
	String componentItemGalleryMainImageCaption = (String)jspContext.getAttribute("componentItemGalleryMainImageCaption");
	String componentItemGalleryMainImageCredit = (String)jspContext.getAttribute("componentItemGalleryMainImageCredit");
	String componentItemGalleryMainImageFormat = (String)jspContext.getAttribute("componentItemGalleryMainImageFormat");
	
	componentItemGalleryMainImageCaption = componentItemGalleryMainImageCaption.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");


	componentItemGalleryMainImageCredit = componentItemGalleryMainImageCredit.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");

	componentItemGalleryTitle = componentItemGalleryTitle.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");

	
	String componentOut = (String)jspContext.getAttribute("componentOut");
	
	
	String _componentItemType = (String)jspContext.getAttribute("componentItemType");
	if (_componentItemType.equals("dwc_placester_listings_widget")) {
		componentItemType="listings";
		componentItem.put("type",componentItemType);
		componentItem.put("title",componentItemTitle);
		componentItem.put("source",componentItemSource);

	} else if (_componentItemType.equals("dwc_placester_content_tile")) {
		componentItemType="content_tile";
		componentItem.put("type",componentItemType);
		componentItem.put("title",componentItemTitle);
		componentItem.put("source",componentItemSource);
	} else if (_componentItemType.equals("story") && componentItemMedia.equals("html")) {
		//Story on the right panel should be rendered as it is.
		componentItemType="story_html";
		componentItem.put("type",componentItemType);
		componentItem.put("title",componentItemLeadIn);
		componentItem.put("content",componentItemText);
	} else if ((_componentItemType.equals("story") && !componentItemMedia.equals("html")) ||
			_componentItemType.equals("summarystory") ||
			_componentItemType.equals("streamtease") ) {
		//Story on the right panel should be rendered as it is.
		componentItemType="story";
		componentItem.put("type",_componentItemType );
		componentItem.put("title",componentItemStoryTitle );
		componentItem.put("content",componentItemStoryBody );
		
		if (!(componentItemStoryMainImageURL == null ) && !componentItemStoryMainImageURL.isEmpty()) {
			componentItem.remove("hasImage");
			componentItem.put("hasImage","true");
			componentItem.put("mainImageURL",componentItemStoryMainImageURL);
			componentItem.put("mainImageClass",componentItemStoryMainImageClass);
			componentItem.put("mainImageCredit",componentItemStoryMainImageCredit);
			componentItem.put("mainImageCaption",componentItemStoryMainImageCaption);
			componentItem.put("mainImageFormat",componentItemStoryMainImageFormat);
			componentItem.put("link",componentItemStoryLink);
		} else if (componentItemParentType.equals("dwc_placester_content_tile")){
			componentItem.remove("hasImage");
			componentItem.put("hasImage","true");
			componentItem.put("mainImageURL",componentItemStoryMainImageURL);
			componentItem.put("mainImageClass",componentItemStoryMainImageClass);
			componentItem.put("mainImageCredit",componentItemStoryMainImageCredit);
			componentItem.put("mainImageCaption",componentItemStoryMainImageCaption);
			componentItem.put("mainImageFormat",componentItemStoryMainImageFormat);
			componentItem.put("link",componentItemStoryLink);
			
		}
	} else if (_componentItemType.equals("dwc_dfp_ad_position")) {
		//Story on the right panel should be rendered as it is.
		componentItemType="ad";
		componentItem.put("type",componentItemType);
		componentItem.put("source",componentItemDFPAdPosition );
	} else if (_componentItemType.equals("gallery")) {
		componentItem.put("type","gallery");
		componentItem.put("title",componentItemGalleryTitle);
		componentItem.put("source",componentItemSource);
		componentItem.put("content",componentItemStoryBody);
		
		componentItem.put("link",componentItemStoryLink);
		componentItem.remove("hasImage");
		componentItem.put("hasImage","true");
		componentItem.put("mainImageURL",componentItemGalleryMainImageURL);
		componentItem.put("mainImageClass",componentItemGalleryMainImageClass);
		componentItem.put("mainImageCredit",componentItemGalleryMainImageCredit);
		componentItem.put("mainImageCaption",componentItemGalleryMainImageCaption);
		componentItem.put("mainImageFormat",componentItemGalleryMainImageFormat);


	} else {
		componentItemType=_componentItemType;
		componentItem.put("type",componentItemType);
	}

		

	jspContext.setAttribute("componentItem",componentItem);
	
%>
<c:set var="output" value="${componentItem}" />