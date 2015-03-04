<%@ include file="includes/init.inc"%>
<%@ tag import="com.eidosmedia.portal.render.PortalCollection,
                com.eidosmedia.portal.util.PortalWebObjectWrapper" %>
                
<%@ attribute name="format" rtexprvalue="true" required="false"%>
<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>

<%@ variable name-from-attribute="var" alias="url" scope="AT_END"%>

<c:if test="${empty webObject}">
  <c:set var="webObject" value="${currentObject}" />
</c:if>

<p:object webObject="${webObject}" metadata="meta" webType="webType" />
<!--  FMT ${format} -->
<%-- Handle new "virtual" image sizes --%>
<%
	Map<String, String> aspect = new HashMap<String, String>();
	aspect.put("image_650x365", "aspect_16:9");
	aspect.put("image_540x304", "aspect_16:9");
	aspect.put("image_430x241", "aspect_16:9");
	aspect.put("image_320x242", "aspect_16:9");
	aspect.put("image_210x118", "aspect_16:9");
	aspect.put("image_650x488", "aspect_4:3");
	aspect.put("image_540x405", "aspect_4:3");
	aspect.put("image_430x322", "aspect_4:3");
	aspect.put("image_320x240", "aspect_4:3");
	aspect.put("image_210x157", "aspect_4:3");

	String origFormat = (String) jspContext.getAttribute("format");
	
	if (aspect.containsKey(origFormat)) {
		String aspectFormat = aspect.get(origFormat);
		jspContext.setAttribute("outputFormat", origFormat);
		jspContext.setAttribute("format", aspectFormat);		
	} else {
		jspContext.setAttribute("outputFormat", origFormat);
	} 
%>

<%--  Figure out correct image name and path --%>
<c:choose>
	<c:when test="${format == 'aspect_16:9'}">
		<p:out var="fileBase" value="wide" />
	</c:when>
	<c:otherwise>
		<p:out var="fileBase" value="normal" />
	</c:otherwise>
</c:choose>

<c:choose>
	<c:when test="${fn:toLowerCase(webType) == 'streamtease'}">
		<p:out var="feed" xvalue="$meta//Reference/WireFeed/text()" />
		<p:out var="pathBase" value="/Boston/Library/StoryDefaults/streamtease/${feed}/${fileBase}" />
	</c:when>

	<c:otherwise>
		<p:out var="section" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/CanonicalData/SectionPath/text()" />
		<p:out var="pathBase" value="/Boston/Library/StoryDefaults/story/${section}/${fileBase}" />
	</c:otherwise>
</c:choose>


<%-- Prefer PNG then fall back to JPG --%>
<p:getObject var="image" path="${pathBase}.png" />
<c:if test="${empty image}">
	<p:getObject var="image" path="${pathBase}.jpg" />
</c:if>

<!--  IMG ${image} FMT ${outputFormat} FMT ${format} -->
<c:if test="${not empty image}">
	<p:url var="url" webObject="${image}" type="resource" format="${outputFormat}" />
</c:if>
