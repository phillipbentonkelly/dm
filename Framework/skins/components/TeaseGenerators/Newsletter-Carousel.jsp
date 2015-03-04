<%-- <%@ page contentType="text/xml" pageEncoding="UTF-8"%> --%>
<%@ taglib prefix="bgm" uri="bgmtags"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%--
	The DWP object to get the carousel from, or the DWC object that is the actual carousel.
	If nothing is specified then default to the homepage. 
--%>

<p:out var="bulleted" value="${cacheScope.bulleted}" />
<p:out var="container" value="${cacheScope.container}" />
<p:out var="firstArticle" value="1" />

<c:if test="${empty container or fn:trim(container) eq ''}">
	<p:out var="container" value="/Boston/Production/BDC/WebPages/homepage.dwp" />
</c:if>
<p:getObject path="${container}" var="dwxObj" onError="ignore" />

<c:if test="${dwxObj != null}">
	<p:object webObject="${dwxObj}" metadata="dwxMeta" />
	
	<p:out var="templateName" xvalue="$dwxMeta//props/templateName" />
	<p:out var="isCarousel" value="no" />
	<c:if test="${fn:endsWith(templateName, '/carousel.dwc')}">
		<p:out var="isCarousel" value="yes" />
	</c:if>
	
	<c:choose>
		<c:when test="${isCarousel eq 'yes'}">
			<p:getPageZone name="main" var="zone" url="${container}" />
		</c:when>
		<c:otherwise>
			<p:getPageZone name="carousel" var="cZone" url="${container}" />
			<c:if test="${cZone.size > 0}">
				<c:forEach items="${cZone.items}" var="cz" begin="0" end="1">
					<p:getObject webObject="${cz}" var="czm" />
					<p:object webObject="${czm}" metadata="czm" />
					<p:out var="objectPath" xvalue="$czm//path" />
				</c:forEach>
				
				<p:getPageZone name="main" var="zone" url="${objectPath}" />
			</c:if>
		</c:otherwise>
	</c:choose>
	
	<c:forEach items="${zone.items}" var="item" varStatus="godHelpUs">
		<p:jspInclude eomdb="true" url="$configurationURI/Framework/skins/components/TeaseGenerators/Newsletter-item.jsp?uuid=${item.uuid}&firstArticle=${firstArticle}&bulleted=${bulleted}" />
		<p:out var="firstArticle" value="0" />
	</c:forEach>
</c:if>