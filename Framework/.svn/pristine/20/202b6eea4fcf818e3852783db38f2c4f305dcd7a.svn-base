<%-- 
	{comments}
	DM-43: Handle omniture tags in links with anchor tags.
	{comments}
 --%>

<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="bdc"
	tagdir="/WEB-INF/tags/eom/SysConfig/WebPortal/BDC/Framework/tags/custom/"%>

<%@ tag body-content="scriptless" import="
    java.util.List,
    com.eidosmedia.wa.render.WebObject
" %>
  
<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false"%>
<%@ attribute name="imageFormat" rtexprvalue="true" required="false"%>
<%@ attribute name="leadCount" rtexprvalue="true" required="false"%>
<%@ attribute name="teaserCount" rtexprvalue="true" required="false"%>

<%@ variable name-from-attribute="var" alias="output" scope="AT_END"%>
<%@ include file="includes/init.inc"%>

<c:choose>
	<c:when test="${not empty webObject}">
		<p:getObject var="obj" webObject="${webObject}" onError="ignore" />
	</c:when>
	<c:otherwise>
		<p:getObject var="obj" webObject="${currentObject}" />
	</c:otherwise>
</c:choose>
 
<jsp:useBean id="leads" class="java.util.ArrayList" scope="page" />
<jsp:useBean id="teasers" class="java.util.ArrayList" scope="page" />
<jsp:useBean id="links" class="java.util.ArrayList" scope="page" />
<jsp:useBean id="output" class="java.util.HashMap" />
<jsp:useBean id="map" class="java.util.HashMap" />

<p:object webObject="${obj}" metadata="megaMeta" />

<p:out var="sectionPath" xvalue="$megaMeta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/NavigationSection" />
<bdc:getSectionNameFromPath var="sectionName" path="${sectionPath}" />
<p:out var="storyHeader" xvalue="$megaMeta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/NavigationStoryHeader" />
<p:out var="linksHeader" xvalue="$megaMeta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/NavigationLinksHeader" />

<%-- blank section name == homepage --%>
<c:if test="${empty sectionName}">
	<p:out var="sectionName" value="Homepage"/>
</c:if>

<%-- metadata option to disable this navlink on the homepage --%>
<p:out var="displayOnHome" xvalue="$megaMeta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/NavigationShowOnHomepage" />
<c:choose>
	<c:when test="${displayOnHome == 'False' && cacheScope.isHomepage == 'True'}">
		<p:out var="menuEnabled" value="False" />
	</c:when>
	<c:otherwise>
		<p:out var="menuEnabled" value="True" />
	</c:otherwise>
</c:choose>

<p:out var="widgetClickthrough" xvalue="$megaMeta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/NavigationWidgetClickthrough" />

<%-- strip leading / from section path to get edition --%>
<bdc:regexReplace var="edition" value="${sectionPath}" regex="^/" replace="" />

<bdc:getStories var="stories" count="${leadCount + teaserCount + 50}" backfillQuery="bdc_section_approved.vquery" backfillQueryParams="${sectionPath}" backfillWhenEmpty="false" />
  
<c:forEach items="${stories}" var="story">
        
  	<c:if test="${fn:length(leads) < leadCount || fn:length(teasers) < teaserCount}">
		
      	<bdc:imagesWithCaptionCredit webObject="${story}" var="teaserImage" format="${imageFormat}" />
		<c:set var="imageUrl" value="${teaserImage.src}" />
        
        <bdc:getHeadlines webObject="${story}" var="title" edition="${edition}" />
		<bdc:url var="storyUrl" webObject="${story}" />
		
		<%-- init to empty keeps  --%>
		<p:out var="urlAnchorTag" value=""/>		
		<c:if test="${fn:contains(storyUrl, '#') == 'true'}">
			<p:out var="urlAnchorTag" value="${fn:substringAfter(storyUrl, '#')}" />
			<p:out var="storyUrl" value="${fn:substringBefore(storyUrl, '#')}" />						
		</c:if>

      	<p:object webObject="${story}" loidEx="loid" />
      
      	<%
         	WebObject storyObj = (WebObject) jspContext.getAttribute("story");
        %>
          
		<%-- Create a new HashMap for each story --%>
		<%	map = new HashMap(); %>

		<c:choose>

			<%-- Fill out leads array first if a leadCount was specified. teasers with no images are not candidates.
		     	Leads use feature stack headline. Leads use the "main" suffix for omniture tagging. --%>
		
			<c:when	test="${(fn:length(leads) lt leadCount) && (not empty teaserImage.src)}">
				<c:set var="headline" value="${title.featureStackHeadline}" />
				<c:set var="omniType" value="main" />
              	<% leads.add(map); %>
			</c:when>

			<%-- If we have enough leads, or the story had no image, it goes in the teasers array.
				teasers use carousel headline. teasers use the "latest" suffix for omniture tagging. --%>
              
			<c:otherwise>
				<c:if test="${fn:length(teasers) lt teaserCount}">
                  	<c:set var="headline" value="${title.carouselHeadline}" />
					<c:set var="omniType" value="latest" />
					<% teasers.add(map); %>	
                </c:if>
            </c:otherwise>

		</c:choose>
	
        <% map.put("headline", jspContext.getAttribute("headline")); %>

		<%-- omniture tagging --%>
		<p:out var="storyUrl" value="${storyUrl}?p1=menu_${fn:toLowerCase(sectionName)}_${omniType}" />
		
		<c:if test="${cacheScope.isHomepage}">
			<p:out var="storyUrl" value="${storyUrl}_hp" />
		</c:if>
		
		<%-- if there's an anchor tag, append it --%>
		<c:if test="${not empty urlAnchorTag}">
			<p:out var="storyUrl" value="${storyUrl}\#${urlAnchorTag}" />
		</c:if>
		


		<%
			map.put("url", jspContext.getAttribute("storyUrl"));
			map.put("imageUrl", jspContext.getAttribute("imageUrl"));
		%>
 
	</c:if>


</c:forEach>

<%-- Populate shortcuts for 'more in ________' section. --%>
<x:forEach var="sc" select="$megaMeta//NavConfig/Shortcuts/Shortcut">

	<%-- let shortcut url override section url --%>
	<p:out var="url" xvalue="$sc//ShortcutUrl" />
	<c:if test="${empty url}">
		<p:out var="url" xvalue="$sc//NavigationSection" />
	</c:if>

	<%-- let shortcut title override section title --%>
	<p:out var="title" xvalue="$sc//ShortcutName" />
	<c:if test="${empty title}">
		<bdc:getSectionNameFromPath var="title" path="${url}" />
	</c:if>

	<%-- strip non-alpha chars for omniture tag --%>
	<bdc:regexReplace var="omniTitle" value="${title}" regex="[^A-Za-z]" replace="" />

	<%-- omniture tagging --%>
	<p:out var="url" value="${url}?p1=menu_${fn:toLowerCase(sectionName)}_more_${fn:toLowerCase(omniTitle)}" />

	<%-- homepage omniture tagging --%>
	<c:if test="${cacheScope.isHomepage}">
		<p:out var="url" value="${url}_hp" />
	</c:if>

	<%-- add anchor tags --%>
	<p:out var="anchor" xvalue="$sc//ShortcutAnchor" />
	<c:if test="${not empty anchor}">
		<bdc:regexReplace var="anchor" value="${anchor}" regex="[^A-Za-z]" replace="" />
		<!--  no idea why this is necessary... -->
		<p:out var="hash" value="#" />
		<p:out var="url" value="${url}${hash}${anchor}" />
	</c:if>
	
	<%-- build map and add to links array --%>
	<%
		map = new HashMap();
		map.put("url", jspContext.getAttribute("url"));
		map.put("title", jspContext.getAttribute("title"));
		links.add(map);	
	%>

</x:forEach>

<%-- set default values for submenu headers if they were not supplied --%>
<c:if test="${empty storyHeader}">
	<p:out var="storyHeader" value="Must Reads" />
</c:if>

<c:if test="${empty linksHeader}">
	<p:out var="linksHeader" value="${sectionName}" />
</c:if>


<%-- strip spaces from section name for data-section attribute --%>
<bdc:regexReplace var="sectionName" value="${sectionName}" regex="\s" replace="-" />

<%-- <c:set target="${output}" property="subsections" --%>

<c:if test="${empty sectionPath}">
	<p:out var="sectionPath" value="/" />
</c:if>

<p:out var="sectionLink" value="${sectionPath}?p1_menu_${fn:toLowerCase(sectionName)}_main${cacheScope.isHomePage == 'True' ? '_hp' : ''}" />

<c:set target="${output}" property="menuEnabled" value="${menuEnabled}" />
<c:set target="${output}" property="widgetClickthrough" value="${widgetClickthrough}" />
<c:set target="${output}" property="sectionId" value="${sectionName}" />
<c:set target="${output}" property="sectionPath" value="${sectionPath}" />
<c:set target="${output}" property="sectionLink" value="${sectionLink}" />
<c:set target="${output}" property="storyHeader" value="${storyHeader}" />
<c:set target="${output}" property="linksHeader" value="${linksHeader}" />
<c:set target="${output}" property="leads" value="${leads}" />
<c:set target="${output}" property="teasers" value="${teasers}" />
<c:set target="${output}" property="links" value="${links}" />
