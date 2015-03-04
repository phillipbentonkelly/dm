<%--
{comments}
BDC-1720 Remove the article a user is currently reading from "We think you'll like".
{comments}
--%>

<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="fmt" uri="formatTags" %>
<%@ taglib prefix="x" uri="jstlXml" %>
<%@ include file="includes/bdc.inc" %>
<%@ tag body-content="scriptless" import="
        java.util.*,
        java.io.*,
        java.lang.*,
        com.eidosmedia.eomcache.ObjectId,
        com.eidosmedia.portal.util.PortalWebObjectWrapper,
        org.apache.commons.lang.StringUtils
" %>

<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ attribute name="varStatus" rtexprvalue="true" required="false"%>
<%@ attribute name="begin" rtexprvalue="true" required="false"%>
<%@ attribute name="end" rtexprvalue="true" required="false"%>
<%@ attribute name="step" rtexprvalue="true" required="false"%>
<%@ attribute name="zones" rtexprvalue="true" required="false"%>
<%-- nested scope allows us to pass this value to evaluated fragment in jsp:doBody --%>
<%@ variable name-from-attribute="var" alias="output" scope="NESTED" %>  

<c:if test="${empty zones}">
 	<bdc:getAllZones var="zoneList"/>
 	
 	<% 
 		ArrayList<String> zones = (ArrayList<String>) jspContext.getAttribute("zoneList"); 		
 		jspContext.setAttribute("zones", StringUtils.join(zones.toArray(), ","));
 	%>
</c:if>

<% LinkedHashSet stories = new LinkedHashSet(); %>

<c:forTokens items="${zones}" delims="," var="zone">
	<p:getPageZone var="coll" name="${zone}" />
	<p:getPageZone name="${zone}" var="well" webObject="${container}"/>
	<c:forEach items="${well.items}" var="story">
		<%
			stories.add((PortalWebObjectWrapper) jspContext.getAttribute("story"));
		%>		
	</c:forEach>	
</c:forTokens>

<% jspContext.setAttribute("stories", stories); %>

<c:if test="${empty begin}">
	<c:set var="begin" value="0"/>
</c:if>

<c:if test="${empty end}">
	<c:set var="end" value="${fn:length(stories)}"/>
</c:if>

<c:if test="${empty step}">
	<c:set var="step" value="1"/>
</c:if>

<% Object requestContext = jspContext.getAttribute("com.eidosmedia.portal.jsp.PortalSupport.REQUEST_CONTEXT");
jspContext.setAttribute("req", this.getClass().getSuperclass().getName(), PageContext.REQUEST_SCOPE); %>

<c:forEach var="output" items="${stories}" varStatus="status" begin="${begin}" end="${end}" step="${step}">
	<% // sigh, why does variable name-from-attribute require rtexprvalue = false? 
       String varStatus = (String) jspContext.getAttribute("varStatus");
	   if (varStatus != null)
       		jspContext.setAttribute(varStatus, jspContext.getAttribute("status"), PageContext.REQUEST_SCOPE);
    %>
	   
	<jsp:doBody/>
	
</c:forEach>
