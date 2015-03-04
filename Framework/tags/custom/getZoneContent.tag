<%@ include file="includes/init.inc" %>
<%@ tag body-content="scriptless" import="
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
" %>

<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="c" uri="jstlCore"%>

<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object" %>
<%@ attribute name="zoneName" rtexprvalue="true" required="false"%>

<%@ variable name-from-attribute="var" alias="output" scope="AT_END"%>
  
<jsp:useBean id="contentData" class="java.util.HashMap"/>
  
<c:choose>
	<c:when test="${not empty path}">
		<p:getObject path="${path}" var="obj" onError="ignore" />
	</c:when>
	<c:when test="${not empty uuid}">
		<p:getObject uuid="${uuid}" var="obj" onError="ignore" />
	</c:when>
	<c:when test="${not empty webObject}">
		<p:getObject webObject="${webObject}" var="obj"  />
	</c:when>
	<c:otherwise>
		<p:getObject webObject="${currentObject}" var="obj"  />
	</c:otherwise>
</c:choose>

	<p:out var="objZones" value="${zones}"/>

<% 


	Map content = new HashMap();
	
	WebObject container=(WebObject) jspContext.getAttribute("obj");

	String zoneName = (String) jspContext.getAttribute("zoneName");
	
	List<WebObject> contents = new ArrayList<WebObject>();
	//List<WebObject> content = new ArrayList<WebObject>();
	
	Map<String, Map> zonesMap = container.getZonesMap();
	Map zone = zonesMap.get(zoneName);
	int linksCount = Integer.parseInt(zone.get("linksCount").toString());
  	for (int linkedObjectIndex = 0; linkedObjectIndex < linksCount; linkedObjectIndex++) {
  		WebObject linked = (WebObject)zone.get("" + linkedObjectIndex);
		contents.add(linked);	
  	}			
   	
  	content.put("items",contents);
  		
	jspContext.setAttribute("content",content);
	jspContext.setAttribute("contents",contents);

%>

<c:set target="${contentData}" property="items" value="${contents}"/>
<c:set var="output" value="${contentData}"/>