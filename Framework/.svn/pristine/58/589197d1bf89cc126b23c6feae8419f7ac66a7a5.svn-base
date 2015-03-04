<%@ tag import="
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
	com.eidosmedia.debug.*,
	com.eidosmedia.wa.render.*" 
	trimDirectiveWhitespaces="true" %>

<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="b" tagdir="/WEB-INF/tags/eom/SysConfig/WebPortal/tags/custom" %>

<%@ attribute name="echo" rtexprvalue="false" required="false"%>
<%@ attribute name="path" rtexprvalue="true" required="true"%>
<%@ attribute name="var" rtexprvalue="false" required="true"%>

<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"%>

<%--
	Accept the path to a web container (DWP, DWC ) via query string and return the list of zones and their items
	including any item template applied in this container.
	Combine some values from the content and metadata with the zone information
--%>

<p:out var="listposition" value=""/>
<p:out var="counter" value="0" />
			 
<p:getObject path="${path}" onError="ignore" var="dwxObj" />

<c:if test="${dwxObj != null}">
    <p:object webObject="${dwxObj}" metadata="container_meta" content="container_content" />
    
    <%-- getAllZones leaves a partPages array --%>
    <b:getAllZones var="partPages" webObject="${dwxObj}" echo="false"/>
    <c:set var="dwpZones" value="${partPages}"/>
    
	<c:forEach items="${dwpZones}" var="partName">
		<p:getPageZone name="${partName}" var="zone" webObject="${dwxObj}" />  
		<c:if test="${zone.size > 0}">
			<p:out var="counter" value="${counter + 1}" />
			<%-- gather the templateName assigned to each item in the zone into an array --%>
			<%-- would like to use getZone("name") but it always returned null --%>
			<%
			   ArrayList zoneTemplates = new ArrayList();
			   try {
			   
				 	PortalWebObjectWrapper pwebObj = (PortalWebObjectWrapper)jspContext.getAttribute("dwxObj");
				 	WebObject dwc = pwebObj.getWebObject();
				 	WebContainer dwcCont = dwc.getContainer();
				 	
				 	Map zones = dwcCont.getNameToZoneMap();
				 	WebZone wZone =(WebZone)zones.get( (String)jspContext.getAttribute("partName") );
				 	WebLink links[] = wZone.getLinks();
			 	
					for(int i =0;i<links.length;i++){
						String strZone = ( (String)links[i].getTemplateName() != null) ? (String)links[i].getTemplateName() : "";
						zoneTemplates.add(strZone);
					}
					
				} catch (Exception e) {
					//out.println("<error>Error processing zone item templates: " + e.toString() + "</error>");
				}
				jspContext.setAttribute("zoneTemplates", zoneTemplates);
			%>		
			
			<%-- check to see that it is of webtype dfp --%>
			<c:forEach items="${zone.items}" var="x">
				<p:getObject webObject="${x}" var="dwcObj" />
				<c:if test="${dwcObj != null}">
					<p:object webObject="${dwcObj}" metadata="meta" content="content" />
					<p:out var="position" xvalue="$meta//DfpAdPosition"/>
					<c:if test="${counter == 1}">
						<p:out var="listposition" value="'${position}'"/>
					</c:if>
					<c:if test="${counter > 1}">
						<p:out var="listposition" value="'${position}',${listposition}"/>
					</c:if>
				</c:if>
			</c:forEach>
		</c:if>
	</c:forEach>
</c:if>

<c:set var="currentValue" value="${listposition}"/>
<c:if test="${echo == 'true'}">
	${currentValue}
</c:if>
