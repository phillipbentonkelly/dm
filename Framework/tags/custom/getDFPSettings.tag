<%@ taglib prefix="bgm" uri="bgmtags"%>

<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml"%>

<%@ include file="includes/init.inc" %>

<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="edition" rtexprvalue="true" required="false"%>
<%@ attribute name="templateName" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="xsltFile" rtexprvalue="false" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>
<%@ attribute name="echo" rtexprvalue="false" required="false"%>
<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"  %>

<p:out var="xslt_default" value="$configurationURI/Framework/xslt/story_new.xslt" />
<c:choose>
	<c:when test="${xsltFile != null and xsltFile != ''}">
		<p:out var="xslt_file" value="${xsltFile}" />
	</c:when>
	<c:otherwise>
		<p:out var="xslt_file" value="${xslt_default}" />
	</c:otherwise>
</c:choose>	

<jsp:useBean id="contentData" class="java.util.HashMap"/>

<c:choose>
	<c:when test="${not empty edition}">
		<p:out var="channel" value="Boston.com/${edition}"/>
	</c:when>
	<c:otherwise>
		<p:out var="channel" value="Boston.com"/>
	</c:otherwise>
</c:choose>

<c:choose>
	<c:when test="${not empty path}">
		<p:getObject path="${path}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" content="story" metadata="meta" webType="WT" uuid="StoryID" channel="${channel}"/>
		</c:if>
	</c:when>
	<c:when test="${not empty uuid}">
		<p:getObject uuid="${uuid}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" content="story" metadata="meta" webType="WT" channel="${channel}"  />
			<p:out var="StoryID" value="${uuid}" />
			<p:out var="objType" xvalue="$meta//sys/type" scope="page"/>
		</c:if>
	</c:when>
	<c:when test="${not empty webObject}">
		<p:object webObject="${webObject}" content="story" metadata="meta" channel="${channel}" />
		<p:out var="StoryID" xvalue="$meta//uuid" />
		<p:out var="objType" xvalue="$meta//sys/type" scope="page"/>
	</c:when>
	<c:otherwise>
		<p:currentObject content="story" metadata="meta" webType="WT" uuid="StoryID" channel="${channel}" />
		
		
	</c:otherwise>
</c:choose>

<c:if test="${empty StoryID}">
	<p:out xvalue="$meta//uuid" var="StoryID"/>
</c:if>




<p:getObject path="/SysConfig/Classify/Data/TaxonomySectionsMap_BDC.xml" var="mapsTaxonomy" />
<p:out var="baseDomain" xvalue="$mapsTaxonomy/maps/@baseDomain" />
<p:out var="eomType" xvalue="$meta//sys/type"/>
<p:out var="adPageType" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/AdPageType"/>
<p:out var="pageType" value=""/>

<p:out var="adFrequency" value="${cacheScope.adFrequency}" />
<c:if test="${empty adFrequency}">
	<p:out var="adFrequency" value="5"/>
</c:if>

<c:if test="${eomType eq 'EOM::MediaGallery'}">
	<p:out var="galleryRefreshRate" xvalue="$meta//AdRefreshRate" />
	<p:out var="galleryAdFrequency" xvalue="$meta//GalleryAdFrequency" />
	<c:if test="${empty galleryRefreshRate}">
		<p:out var="galleryRefreshRate" value="4"/>
	</c:if>
	<c:if test="${empty galleryAdFrequency}">
		<p:out var="galleryAdFrequency" value="5"/>
	</c:if>
</c:if>

<%-- get the current page url --%>
<c:choose>
	<c:when test="${fn:startsWith(WT, 'dwp_') or WT == 'SectionPage'}">
		<p:out var="pageUrl" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/CanonicalUrl"/>
	</c:when>
	<c:otherwise>
		<p:url webObject="${obj}" var="pageUrl"/>
	</c:otherwise>
</c:choose>

<%-- make a unique id based off of the page's url --%>
<p:out var="pageUrl" value="${fn:replace(pageUrl, 'http://www.boston.com','')}"/>	
<p:out var="replace" value="_" />
<p:out var="pageUrl" value="${fn:replace(pageUrl, '/',replace)}"/>
<p:out var="pageUrl" value="${fn:replace(pageUrl, '.',replace)}"/>
 
<c:choose>
	<c:when test="${fn:startsWith(WT, 'dwp_') or WT == 'BlogPage'}">
		<c:choose>
			<c:when test="${WT == 'BlogPage'}">
				<p:blogId var="blogId" />
				<p:getBlog blogId="${blogId}" var="blog" />
				<p:object webObject="${blog.webObject}" metadata="m" />
				<p:out var="container_path" xvalue="$m//Page/ContainerPath"/>
				<p:getObject path="${container_path}" var="dwp" />
				<p:object webObject="${dwp}" content="story" metadata="meta" channel="Boston.com"/>
				<p:out var="section" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/BlogPostMetadata/BlogAdTagGenericPage"/>
				<p:out var="pageType" value="blog"/>
			</c:when>
			<c:otherwise>
				<p:out var="section" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/Sections/Section/SectionAdTagIndexPage"/>
				<p:out var="sectionGeneric" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/Sections/Section/SectionAdTagGenericPage"/>
			    <c:choose>
			        <c:when test="${WT == 'dwp_forumpage' || WT == 'dwp_userprofile'}">
			        	<p:out var="pageType" value="${adPageType}"/>
			        	<p:out var="section" value="${sectionGeneric}"/>
			        </c:when>
		        	<c:when test="${fn:contains(fn:substringAfter(sectionGeneric,'/'),'/')}">
		        		<p:out var="pageType" value="subsectfront"/>
		        	</c:when>
		        	<c:otherwise>
		        		<p:out var="pageType" value="sectfront"/>
		        	</c:otherwise>
       			</c:choose>  
			</c:otherwise>
		</c:choose>

		<%-- SET dfp_sitepage --%>
    <p:out var="dfp_sitepage" value=""/>
    <p:out var="dfp_sitepage" value="${baseDomain}${section}"/>
    <p:out var="dfp_sitepage" value="${dfp_sitepage}" scope="request"/>
        
	</c:when>
	<c:otherwise>
		<p:out var="pageType" value="${adPageType}"/>
		<%-- override mode --%>
		<p:out var="lowestRank" value="" />
		<x:forEach var="taxonomyValues" select="$meta//Categorization/Taxonomies/Taxonomy" >
			<p:out var="taxonomyValue" xvalue="$taxonomyValues"/>
			<p:out var="rank" xvalue="$mapsTaxonomy//map[@taxonomy=$taxonomyValue]/@rank" />
			<fmt:parseNumber value="${rank}" integerOnly="true" var="rank"/>
			<c:if test="${rank < lowestRank or empty lowestRank}">
				<p:out var="lowestRank" value="${rank}"/>
				<p:out var="taxonomy" xvalue="$mapsTaxonomy//map[@taxonomy=$taxonomyValue]/@taxonomy"/>
				<p:out var="section" xvalue="$mapsTaxonomy//map[@taxonomy=$taxonomyValue]/@section"/>
				<p:out var="legacyOasTag" xvalue="$mapsTaxonomy//map[@taxonomy=$taxonomyValue]/@legacyOasTag"/>
			</c:if>
		</x:forEach>
		<%-- lowestRank: ${lowestRank} taxonomy: ${taxonomy} --%>
		
		<c:if test="${empty section}">
			<p:out var="section" value="/news"/>
		</c:if>
	
		<%-- SET dfp_sitepage --%>
		<x:if select="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/Sections/Section/SectionAdTagGenericPage/@mode" >
		  <p:out var="mode" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/Sections/Section/SectionAdTagGenericPage/@mode" />
		</x:if>
		
		<c:choose>
			<c:when test="${mode == 'user'}">
				<p:out var="dfp_sitepage" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/Sections/Section/SectionAdTagGenericPage"/>
				<p:out var="dfp_sitepage" value="${dfp_sitepage}"/>
			</c:when>
			<c:when test="${mode == 'blog' or WT == 'BlogStory'}">
				<p:out var="dfp_sitepage" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/Sections/Section/SectionAdTagGenericPage"/>
				<p:out var="dfp_sitepage" value="${baseDomain}${dfp_sitepage}"/>
			</c:when>
			<c:otherwise>
				<c:choose>
					<c:when test="${not empty legacyOasTag}">
						<p:out var="dfp_sitepage" value="${baseDomain}${legacyOasTag}"/>
					</c:when>
					<c:otherwise>
						<p:out var="sectionGeneric" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/Sections/Section/SectionAdTagGenericPage"/>
						<c:if test="${empty sectionGeneric}">
							<p:out var="sectionGeneric" value="/news"/>
						</c:if>
						<p:out var="dfp_sitepage" value="${baseDomain}${sectionGeneric}"/>
					</c:otherwise>
				</c:choose>
				<c:if test="${adPageType != 'section'}">
					<c:if test="${not empty adPageType}">
						<p:out var="dfp_sitepage" value="${dfp_sitepage}"/>
					</c:if>
				</c:if>
			</c:otherwise>
		</c:choose>
		
		<c:if test="${dfp_sitepage == 'boston.com/business/innovation'}">
			<p:out var="dfp_sitepage" value="betaboston.com"/>
		</c:if>
		
		<%-- SET dfp_sitepage --%>
		<p:out var="dfp_sitepage" value="${dfp_sitepage}" scope="request"/>
		
		<%-- SET dfp_listpos --%>
		  
	</c:otherwise>
</c:choose>

	<%-- grab the SectionAdTagOverride, which is where a client user would force a different ad unit --%>
	<%-- if it exists, it's our new ad_unit/sitepage --%>
	<p:out var="adUnitOverride" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/SectionAdTagOverride"/>
	<c:if test="${not empty adUnitOverride}">
		<p:out var="dfp_sitepage" value="${adUnitOverride}" />
	</c:if>
	
	<%-- if we haven't gotten a sitepage yet, just use this default one --%>
	<c:if test="${empty fn:trim(dfp_sitepage)}">
		<p:out var="dfp_sitepage" value="${boston.com/news}" />
	</c:if>

	<p:out var="s1" value="${fn:split(dfp_sitepage,'/')[0]}" />
	<p:out var="s2" value="${fn:split(dfp_sitepage,'/')[1]}" />
	<p:out var="s3" value="${fn:split(dfp_sitepage,'/')[2]}" />
	<p:out var="s4" value="${fn:split(dfp_sitepage,'/')[3]}" />
	<p:out var="s5" value="${fn:split(dfp_sitepage,'/')[4]}" />
	
	<p:out var="meta_values" value=""/>
	
	<c:catch>
		<p:out var="mKeyWord" xvalue="$meta//Categorization/Keywords/Keyword" />
		<c:if test="${not empty mKeyWord}">
			<x:forEach var="metaKeyWord" select="$meta//Categorization/Keywords/Keyword" varStatus="status">
				<p:out var="temp" xvalue="$metaKeyWord/text()"/>
				<p:out var="meta_values" value="${meta_values}${temp}"/>
					<c:if test="${status.last ne true}">
							<p:out var="meta_values" value="${meta_values},"/>
					</c:if>
			</x:forEach>
	   </c:if>
	</c:catch>
 
   <p:out var="replace" value="_" />
   <p:out var="meta_values" value="${fn:replace(meta_values, '/',replace)}"/>
   <p:out var="meta_values" value="${fn:replace(meta_values, '.',replace)}"/>
   <p:out var="meta_values" value="${fn:replace(meta_values, ' ',replace)}"/>
   <p:out var="meta_values" value="${meta_values}" escape="javascript"/>
   

	<c:choose>
		<c:when test="${WT == 'dwp_forumpage' || WT == 'dwp_userprofile'}">
			<p:out var="dfp_listpos" value="'ad_lead1','ad_toprightslot','ad_featurestack1','ad_lead2','ad_wallpaper','ad_outofpage1'"/>
		</c:when>
		<c:when test="${WT == 'BlogPage'}">
			<p:out var="dfp_listpos" value="'ad_toprightslot','ad_outofpage3','ad_outofpage2','ad_outofpage1','ad_lead1','ad_stream1'" />
		</c:when>
		<c:when test="${WT == 'dwp_page_not_found'}">
			<p:out var="dfp_listpos" value="'ad_lead1','ad_toprightslot','ad_lead2'"/>
		</c:when>
		<c:when test="${WT == 'BlogStory'}">
			<%-- Since there is currently not a blog ad layer, we're doing this until there is --%>
			<bdc:getAdLayer var="layer" webType="story"/>  
			<p:getBlogId var="blogId"/>
			<%--<bdc:inheritBlogLayer var="dwpPath" blogId="${blogId}" layer="${layer}" />--%>
			<bdc:inheritStoryLayer var="dwpPath" section="${section}" layer="${layer}" />
			<bdc:getListPositions var="dfp_listpos" path="${dwpPath}" />
		</c:when>
		<c:when test="${WT == 'dwp_classifieds'}">
			<p:out var="dfp_listpos" value="'ad_lead1', 'ad_bigbox1', 'ad_bigbox2', 'ad_bigbox3','ad_lead2','ad_wallpaper','ad_pencil','ad_outofpage','ad_text1','ad_text2','ad_text3','ad_featurepartner1', 'ad_featurepartner2', 'ad_featurepartner3', 'ad_featuredadvertiser', 'ad_showcase','ad_showcasebanner', 'ad_sky', 'ad_spotlight1','ad_spotlight2','ad_spotlight3','ad_spotlight4', 'ad_t6'"/>
		</c:when>
		<c:when test="${eomType == 'EOM::WebPage'}">
			<bdc:getAdLayer var="layer" webType="${WT}"/>
			<bdc:inheritStoryLayer var="dwpPath" section="${section}" layer="${layer}" />
			<bdc:getListPositions var="dfp_listpos" path="${dwpPath}" />
		</c:when>
		<c:otherwise>
			<bdc:getAdLayer var="layer" webType="${WT}"/>
			<bdc:inheritStoryLayer var="dwpPath" section="${section}" layer="${layer}" />
			<bdc:getListPositions var="dfp_listpos" path="${dwpPath}" />
			
 		</c:otherwise>
	</c:choose>	
<%--	
<script> 
	// DFP JS
	var googletag = googletag || {};
	googletag.cmd = googletag.cmd || [];
	(function() {
		var gads = document.createElement("script");
		gads.async = true;
		gads.type = "text/javascript";
		var useSSL = "https:" == document.location.protocol;
		gads.src = (useSSL ? "https:" : "http:") +
		"//www.googletagservices.com/tag/js/gpt.js";
		var node = document.getElementsByTagName("script")[0];
		node.parentNode.insertBefore(gads, node);
		})();

</script>
--%>

<p:out var="cityName"  xvalue="$meta//ObjectMetadata/Location/City/text()" />
<%
		
		Map keyValuePairs = new HashMap();
		keyValuePairs.put("location",(String)jspContext.getAttribute("cityName"));
		keyValuePairs.put("s1",(String)jspContext.getAttribute("s1"));
		keyValuePairs.put("s2",(String)jspContext.getAttribute("s2"));
		keyValuePairs.put("s3",(String)jspContext.getAttribute("s3"));
		keyValuePairs.put("s4",(String)jspContext.getAttribute("s4"));
		keyValuePairs.put("s5",(String)jspContext.getAttribute("s5"));
		keyValuePairs.put("pageType",(String)jspContext.getAttribute("pageType"));
		keyValuePairs.put("pageURL",(String)jspContext.getAttribute("pageUrl"));
		keyValuePairs.put("meta",(String)jspContext.getAttribute("meta_values"));
		keyValuePairs.put("streamCount",(String)"1");

		jspContext.setAttribute("keyValuePairs",keyValuePairs);
%>
<c:set target="${contentData}" property="networkCode" value="61381659"/>
<c:set target="${contentData}" property="adUnit" value="${dfp_sitepage}"/>
<c:set target="${contentData}" property="adSlots" value="${dfp_listpos}"/>
<c:set target="${contentData}" property="adFrequency" value="${adFrequency}"/>
<c:set target="${contentData}" property="galleryAdFrequency" value="${galleryAdFrequency}"/>
<c:set target="${contentData}" property="cityName" value="${cityName}"/>
<c:set target="${contentData}" property="galleryAdFrequency" value="${galleryAdFrequency}"/>
<c:set target="${contentData}" property="keyValuePairs" value="${keyValuePairs}"/>

<c:set var="currentValue" value="${contentData}"/>

<c:if test="${echo == 'true'}">
	${currentValue}
</c:if>