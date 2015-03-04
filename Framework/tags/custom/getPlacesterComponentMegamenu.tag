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


<p:object webObject="${obj}" text="componentSubItem-text" content="componentSubItem-doc" metadata="componentSubItem-meta" channel="Boston.com" />
<p:out var="componentSubItemId" value="${obj.loid}" />
<p:out var="componentSubItemText" xvalue="$componentSubItem-text" />
<p:out var="componentSubItemDoc" xvalue="$componentSubItem-doc" />
<p:out var="componentSubItemMeta" xvalue="$componentSubItem-meta" />

<bdc:getMD5Checksum var="componentSubItemDocMD5"
	content="${componentSubItemDoc}${obj.loid}" />
<bdc:getMD5Checksum var="componentSubItemMetaMD5"
	content="${componentSubItemMeta}${obj.loid}" />





<p:out var="componentSubItemType"	xvalue="$componentSubItem-meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/WebType" />

<p:out var="componentSubItemTitle" xvalue="$componentSubItem-meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/Title" />
<p:out var="componentSubItemStoryTitle"  xvalue="$componentSubItem-doc//doc/story/headlines/headline" />
<p:out var="componentSubItemLeadIn" xvalue="$componentSubItem-meta//Editorial/LeadIn" />

<p:out var="componentSubItemStoryBody" xvalue="$componentSubItem-doc//text/content" xslt="$configurationURI/Framework/xslt/bdc_story_default_new.xslt"></p:out>
<p:out var="componentSubItemStoryWebTease" xvalue="$componentSubItem-doc//doc/story/web-tease"/>
<p:out var="componentSubItemStoryStreamTease" xvalue="$componentSubItem-doc//doc/story/stream-tease"/>
<c:if test="${fn:trim(componentSubItemStoryBody) == ''}">
	<p:out var="componentSubItemStoryBody" value="${componentSubItemStoryWebTease}"/>
	<c:if test="${fn:trim(componentSubItemStoryWebTease) == ''}">
		<p:out var="componentSubItemStoryBody" value="${componentSubItemStoryStreamTease}"/>
	</c:if>
</c:if>		


<p:out var="componentSubItemMedia" xvalue="$componentSubItem-meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/MediaName" />


<p:out var="componentSubItemSource" xvalue="$componentSubItem-meta//ObjectMetadata/Source" />

<p:out var="componentSubItemMegaMenuSectionName" value="${obj.path}" />

<p:url var="componentSubItemStoryMainImageURL" xvalue="$componentSubItem-doc//photogrp[@class='main-web-images']/photo[@fileref!='']/@fileref" type="resource" baseDomain="http://devedit.boston.com" />
<p:out var="componentSubItemStoryMainImageClass" xvalue="$componentSubItem-doc//photogrp[@class='main-web-images']/@class" />
<p:out var="componentSubItemStoryMainImageCaption" xvalue="$componentSubItem-doc//photogrp[@class='main-web-images']/captiongrp[../photo-inline]/caption/p" />
<p:out var="componentSubItemStoryMainImageCredit"  xvalue="$componentSubItem-doc//photogrp[@class='main-web-images']/captiongrp[../photo-inline]/credit/p" />
<c:if test="${empty componentSubItemStoryMainImageCaption or componentSubItemStoryMainImageCaption == ''}">
	<p:out var="componentSubItemStoryMainImageCaption" xvalue="$componentSubItem-doc//photogrp[@class='main-web-images']/captiongrp/caption/p" />
</c:if>
<p:out var="componentSubItemStoryMainImageFormat" xvalue="$componentSubItem-doc//photogrp[@class='main-web-images']/photo[@fileref!='']/@name" />


<p:out var="componentSubItemDFPAdPosition" xvalue="$componentSubItem-meta//DfpAdPosition" />

<%

	Map componentSubItem = new HashMap();
	ArrayList<Map> componentSubItemZoneItems = new ArrayList<Map>();
	ArrayList<Map> menuItems = new ArrayList<Map>();
	
	String componentSubItemId = (String)jspContext.getAttribute("componentSubItemId");
	String componentSubItemDoc = (String)jspContext.getAttribute("componentSubItemDoc");
	String componentSubItemMeta = (String)jspContext.getAttribute("componentSubItemMeta");
	String componentSubItemText = (String)jspContext.getAttribute("componentSubItemText");
	
	String componentSubItemMegaMenuSectionName = (String)jspContext.getAttribute("componentSubItemMegaMenuSectionName");
	
	String[] componentSubItemMegaMenuSectionNameArray1 = componentSubItemMegaMenuSectionName.split("/",-1); 
	componentSubItemMegaMenuSectionName = (String)componentSubItemMegaMenuSectionNameArray1[componentSubItemMegaMenuSectionNameArray1.length-1];
	
	String[] componentSubItemMegaMenuSectionNameArray2 = componentSubItemMegaMenuSectionName.split("\\.",-1);
	componentSubItemMegaMenuSectionName = (String)componentSubItemMegaMenuSectionNameArray2[0];
	
	componentSubItemText = componentSubItemText.replaceAll("\\n|\\r","")
		.replaceAll("\\\"","\\\\\"")
		.replaceAll("\\\t","    ");
	
	
	String componentSubItemDocMD5 = (String)jspContext.getAttribute("componentSubItemDocMD5");
	String componentSubItemMetaMD5 = (String)jspContext.getAttribute("componentSubItemMetaMD5");
	
	String componentSubItemChecksum = componentSubItemDocMD5 + componentSubItemMetaMD5;
	
	String componentSubItemZone = (String)jspContext.getAttribute("zoneName");
	String componentSubItemParentZone = (String)jspContext.getAttribute("parentZoneName");
	String componentSubItemParentType = (String)jspContext.getAttribute("parentType");
	
	String componentSubItemType = "";

	String componentSubItemTitle = (String)jspContext.getAttribute("componentSubItemTitle");
	String componentSubItemLeadIn = (String)jspContext.getAttribute("componentSubItemLeadIn");
	String componentSubItemStoryTitle = (String)jspContext.getAttribute("componentSubItemStoryTitle");

	componentSubItemStoryTitle = componentSubItemStoryTitle.replaceAll("\\n|\\r","");
	componentSubItemStoryTitle = componentSubItemStoryTitle.replaceAll("\\\"","\\\\\"");
	componentSubItemStoryTitle = componentSubItemStoryTitle.replaceAll("\\\t","    ");

	String componentSubItemStoryMainImageURL = (String)jspContext.getAttribute("componentSubItemStoryMainImageURL");
	String componentSubItemStoryMainImageClass = (String)jspContext.getAttribute("componentSubItemStoryMainImageClass");
	String componentSubItemStoryMainImageCaption = (String)jspContext.getAttribute("componentSubItemStoryMainImageCaption");
	String componentSubItemStoryMainImageCredit = (String)jspContext.getAttribute("componentSubItemStoryMainImageCredit");
	String componentSubItemStoryMainImageFormat = (String)jspContext.getAttribute("componentSubItemStoryMainImageFormat");
	
	componentSubItemStoryMainImageCaption = componentSubItemStoryMainImageCaption.replaceAll("\\n|\\r","")
		.replaceAll("\\\"","\\\\\"")
		.replaceAll("\\\t","    ");

	componentSubItemStoryMainImageCredit = componentSubItemStoryMainImageCredit.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");

	String componentSubItemStoryBody = (String)jspContext.getAttribute("componentSubItemStoryBody");
	componentSubItemStoryBody = componentSubItemStoryBody.replaceAll("\\n|\\r","")
	.replaceAll("\\\"","\\\\\"")
	.replaceAll("\\\t","    ");

	
	String componentSubItemDFPAdPosition = (String)jspContext.getAttribute("componentSubItemDFPAdPosition");
	String componentSubItemMedia = (String)jspContext.getAttribute("componentSubItemMedia");
	String componentSubItemSource = (String)jspContext.getAttribute("componentSubItemSource");
	

	componentSubItem.put("id","hi: " + componentSubItemId);
	componentSubItem.put("checksum",componentSubItemChecksum);
	componentSubItem.put("zone",componentSubItemZone);
	componentSubItem.put("hasImage","false");
	componentSubItem.put("hasSubItems","false");
	
	
	
	String _componentSubItemType = (String)jspContext.getAttribute("componentSubItemType");
	if (_componentSubItemType.equals("dwc_placester_listings_widget")) {
		componentSubItemType="listings";
		componentSubItem.put("type",componentSubItemType);
		componentSubItem.put("title",componentSubItemTitle);
		componentSubItem.put("source",componentSubItemSource);

	} else if (_componentSubItemType.equals("dwc_placester_content_tile")) {
		componentSubItemType="content_tile";
		componentSubItem.put("type",componentSubItemType);
		componentSubItem.put("title",componentSubItemTitle);
		componentSubItem.put("source",componentSubItemSource);
	
	} else {
		componentSubItemType=_componentSubItemType;
		componentSubItem.put("type",componentSubItemType);
	}

	jspContext.setAttribute("componentSubItem",componentSubItem);
	
%>
<c:set var="output" value="${componentSubItem}" />