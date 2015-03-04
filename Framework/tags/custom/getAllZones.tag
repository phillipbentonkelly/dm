<%@ tag body-content="scriptless" import="
	java.util.*,
	java.net.*,
	java.io.*,
	java.lang.*,
	com.eidosmedia.eomcache.*,
	com.eidosmedia.portal.*,
	com.eidosmedia.eomcache.impl.*,
	com.eidosmedia.eomcache.impl.EOMCacheImpl.CacheReference,
	com.eidosmedia.eomcache.proxies.*,
	com.eidosmedia.eomcache.console.commands.*,
	com.eidosmedia.eomcache.proxies.data.*,
	com.eidosmedia.misc.*,
	com.eidosmedia.portal.util.*,
	com.eidosmedia.web.framework.*,
	com.eidosmedia.debug.*
" %>

<%-- Clone of the bg:getAllZones tag that is used in the generation of XML feeds from DWP content --%>

<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="fmt" uri="formatTags" %>
<%@ taglib prefix="x" uri="jstlXml" %>
<%@ taglib prefix="bg" tagdir="/WEB-INF/tags/eom/SysConfig/WebPortal/BostonGlobe/Framework/tags/custom" %>

<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false"%>
<%@ attribute name="echo" rtexprvalue="false" required="false"%>

<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"%>

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
	<c:otherwise>
		<p:getObject webObject="${currentObject}" var="obj"  />
	</c:otherwise>
</c:choose>

<%
 	PortalWebObjectWrapper dwc = (PortalWebObjectWrapper)jspContext.getAttribute("obj");
 	Map zones = (Map)dwc.getZonesMap();
	Object o[] = zones.keySet().toArray();
	ArrayList partPages = new ArrayList();
	for(int i =0;i<zones.size();i++){
		String zone = (String)o[i];	
		partPages.add(zone);
	}

	jspContext.setAttribute("partPages", partPages);
	
%>


<c:set var="currentValue" value="${ partPages }"/>

<c:if test="${echo == 'true'}">
	${currentValue}
</c:if>