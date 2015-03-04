<%--
{comments}
BDC-1558 - Add current section highlight to megamenu
{comments}
--%>

<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="bdc"
	tagdir="/WEB-INF/tags/eom/SysConfig/WebPortal/BDC/Framework/tags/custom/"%>
<%@ attribute name="nav" rtexprvalue="false" required="true"%>
<%@ attribute name="menu" rtexprvalue="false" required="true"%>

<%@ attribute name="webObject" rtexprvalue="true" required="false"%>
<%@ attribute name="imageFormat" rtexprvalue="true" required="false"%>
<%@ attribute name="leadCount" rtexprvalue="true" required="false"%>
<%@ attribute name="teaserCount" rtexprvalue="true" required="false"%>
<%@ attribute name="section" rtexprvalue="true" required="false"%>
<%@ attribute name="homepageOverride" rtexprvalue="true" required="false"%>

<%@ variable name-from-attribute="nav" alias="navOutput" scope="AT_END"%>
<%@ variable name-from-attribute="menu" alias="menuOutput"
	scope="AT_END"%>

<%@ include file="includes/init.inc"%>

<p:currentObject metadata="meta"/>
  
<jsp:useBean id="navOutput" class="java.util.ArrayList" scope="page" />
<jsp:useBean id="menuOutput" class="java.util.ArrayList" scope="page" />
<jsp:useBean id="includeSections" class="java.util.ArrayList"
	scope="page" />

<x:forEach
	select="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/NavConfig/Shortcuts/Shortcut"
	var="sc" varStatus="loopStatus">

	<p:out var="tag" xvalue="$sc//OmnitureTag" />
	<p:out var="navType" xvalue="$sc//NavigationDisplay" />
	<p:out var="url" xvalue="$sc//ShortcutUrl" />
	<p:out var="highlight" xvalue="$sc//ShortcutHighlight" />
	<p:out var="sectionPath" xvalue="$sc//NavigationSection" />
	<p:out var="megaOnHome" xvalue="$sc//NavigationShowOnHomepage" />
	<p:out var="widgetClickthrough" xvalue="$sc//NavigationWidgetClickthrough" />
	
	<bdc:getSectionNameFromPath path="${sectionPath}" var="sectionName" />

	<%-- if we don't have a label, use the section name. if we don't have
			     that either, skip this link --%>
	<p:out var="label" xvalue="$sc//ShortcutName" />
	<c:if test="${empty label && not empty sectionPath}">
		<c:if test="${not empty sectionName}">
			<p:out var="label" value="${sectionName}" />
		</c:if>
	</c:if>

	<c:if test="${not empty label}">

		<%-- navbar link classes --%>
		<p:out var="linkClass" value="page-nav__link" />

		<c:if test="${highlight eq 'True'}">
			<p:out var="linkClass" value="${linkClass} page-nav__link--red" />
		</c:if>

		<%-- set class for selector in frontend JS --%>
		<p:out var="navClass" value="page-nav__item" />

		<%-- megamenu enabled class --%>
		<c:if test="${!(cacheScope.isHomepage == 'True' && megaOnHome == 'False')}">
			<p:out var="navClass" value="${navClass} js-has-menu" />
			<c:if test="${widgetClickthrough == 'True'}">
				<p:out var="navClass" value="${navClass} js-nav-clickthrough" />
			</c:if>
		</c:if>

	
		
        <%-- selected section highlight.  --%>
        <c:if test="${not empty section && not empty sectionPath && 
                      section != '/' && section != '/homepage' && 
                      fn:indexOf(section, sectionPath) == 0}">
          	<%-- allow more specific section names to override our resolved section --%>
          	<c:if test="${fn:length(section) > fn:length(selectedSectionName)}">
              <p:out var="selectedSectionName" value="${sectionPath}" />
              <p:out var="selectedSectionIdx" value="${loopStatus.index}" />
            </c:if>
        </c:if>
          
        <%-- responsive classes --%>
		<c:choose>
			<c:when test="${navType eq 'Desktoponly'}">
				<p:out var="navClass" value="${navClass} page-nav__item--tertiary" />
			</c:when>
			<c:when test="${navType eq 'DesktopandTablet'}">
				<p:out var="navClass" value="${navClass} page-nav__item--secondary" />
			</c:when>
		</c:choose>

		<%-- use URL if specified, otherwise use section URL. if we have neither, skip this link.--%>
		<p:out var="url" xvalue="$sc//ShortcutUrl" />
		<c:if test="${empty url}">
			<p:out var="url" xvalue="$sc//NavigationSection" />
		</c:if>
		
		<%-- a blank URL == homepage. we should add this to Sections_Boston.xml, but I dont know the potential impact --%>
		<c:if test="${empty url}">
			<p:out var="url" value="/" />
			<p:out var="sectionName" value="Homepage" />
		</c:if>
	
		<%-- convert space to dash for data-section tag --%>
		<bdc:regexReplace var="sectionName" value="${sectionName}" regex="\s" replace="-" />

		<%-- omniture tagging --%>
		<c:if test="${not empty tag}">
			<p:out var="url" value="${url}?${tag}" />
			<c:if test="${cacheScope.isHomepage}">
				<p:out var="url" value="${url}_hp" />
			</c:if>
		</c:if>
		


		<% 
			Map<String, String> link = new HashMap<String, String>();
			link.put("section", (String) jspContext.getAttribute("sectionName"));
			link.put("url", (String) jspContext.getAttribute("url"));
			link.put("navClass", (String) jspContext.getAttribute("navClass"));
			link.put("linkClass", (String) jspContext.getAttribute("linkClass"));
			link.put("label", (String) jspContext.getAttribute("label"));
			
			navOutput.add(link);
		%>

		<%-- widget area clickthrough --%>
		<c:if test="${widgetClickthrough == 'True'}">
		
		</c:if>
	</c:if>
</x:forEach>

          <c:if test="${not empty selectedSectionName}">
	<% 
       int idx = Integer.parseInt((String)jspContext.getAttribute("selectedSectionIdx"));
       Map<String, String> active = (Map <String, String>) navOutput.get(idx);
  	   active.put("navClass", active.get("navClass") + " page-nav__item--current");
 	%>
  		
</c:if>
          
                                        
<p:getPageZone name="megamenu_sections" var="sections" />

<c:forEach items="${sections}" var="container">
	<!--  SECTION ${container} -->
	<% 
		PortalWebObjectWrapper container = (PortalWebObjectWrapper) jspContext.getAttribute("container");
		menuOutput.add(container);
	%>
</c:forEach>

