<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.Arrays" %>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml"%>

<%--
<p:out var="blogName" value="${cacheScope.blogName}" />
<p:out var="category" value="${cacheScope.category}" />
<p:out var="ids" value="${cacheScope.ids}" />
<p:out var="ids" value="${fn:substringBefore(fn:substringAfter(ids, '['), ']')}" />
<p:out var="adFrequency" value="${cacheScope.adFrequency}" />

<c:if test="${fn:trim(adFrequency) eq '' }" >
	<p:out var="adFrequency" value="5" />
</c:if>

<p:out var="adCount" value=""/>
<p:out var="catStory" value=""/>
  <%
  		int adCount = 0;
  		int catStory = 0;
  
  %>
<c:forEach var="id" items="${ids}">
	<p:out var="id" value="${fn:trim(id)}" />
	<p:getObject loid="${id}" var="categoryDocObj" />
	
	<p:out var="currentValue" value="${categoryDocObj.path}"/>
	<p:object webObject="${categoryDocObj}" content="c" metadata="m" />
	<p:url webObject="${categoryDocObj}" var="blog_post_url"/>
	<p:out var="storyUrl" xvalue="$m//OnlineProducts/OnlineProduct/CanonicalUrl" />
	
	<p:out var="categories" value=" " />
	
	<x:forEach var="cat" select="$m//OnlineProducts/OnlineProduct/Sections/Section/SubSections/SubSection/SubSectionName">
		<x:set var="theCat" select="string($cat//text())" />
		<c:choose>
			<c:when test="${fn:trim(categories) == ''}">
				<p:out var="categories" value="${theCat}" />
			</c:when>
			<c:otherwise>
				<p:out var="categories" value="${categories},${theCat}" />
			</c:otherwise>
		</c:choose>
	</x:forEach>
	
	<%
		String theCats = (String)pageContext.getAttribute("categories");
		
		String[] cats_array = theCats.split(",");
		
		Arrays.sort(cats_array);
		
		String cats = "";
		
		for(int i=0;i < cats_array.length; i++)
		{
			if (cats == "")
			{
				cats = cats_array[i];
			}
			else
			{
				cats = cats +","+ cats_array[i];
			}
		}
		
		pageContext.setAttribute("categories", cats);
	%>
	<p:out var="catMatch" value="" />
	<c:forEach var="item" items="${fn:split(categories, ',')}">
		<p:out var="item" value="${fn:trim(item)}" />
			<c:if test="${item eq category}">
				<p:out var="catMatch" value="1" />
			</c:if>
	</c:forEach>
	<!--<p:out var="categories" xvalue="$m//OnlineProducts/OnlineProduct/Sections/Section/SubSections/SubSection/SubSectionName" /> -->
	<p:out var="overline" xvalue="$c//overline/p" />
	<p:out var="headline" xvalue="$m//SEOInformation/Headline" />
	<p:out var="summary" xvalue="$c//doc/story/summary/p" />
	<p:out var="photoURL" xvalue="$c//doc/story/multimedia-container/photo-container/photogrp/photo/@fileref"/>
	<p:out var="photoCaption" xvalue="$item-story//doc/story/multimedia-container/photo-container/captiongrp/caption"/>
	<p:out var="imageId" value="${fn:substringAfter(photoURL, '?uuid=')}" />
	<p:getObject var="imageObj" uuid="${imageId}" onError="ignore" />
	<c:if test="${not empty imageObj}">
		<p:url var="imgSrc" webObject="${imageObj}" format="image_150x84" type="resource" />
	</c:if>
	<p:out var="byname" xvalue="$c//doc/story/text/byline/byname" />
	<p:out var="bysource" xvalue="$c//doc/story/text/byline/bysource" />

	<c:if test="${catMatch eq 1}">
	
		<div class="stream-item">
		
		<%
			catStory++;
			pageContext.setAttribute("catStory", catStory);
		%>
		
		<article class="quick-tz quick-tz-w-art " data-section="[object Object]">
			<c:if test="${not empty imageObj}">
				<a class="quick-tz-img-mod art-bd" href="${blog_post_url}"> 
					<img data-where-clicked="image" class="tz-img" src="${imgSrc}"alt="${photoCaption}">	
				</a>
			</c:if> 
			
			<p:out var="imgDiv" value="" />
			<c:if test="${not empty imgSrc}">
				<p:out var="imgDiv" value="quick-tz-bd txt-bd" />
			</c:if>
			<div class="${imgDiv}">
				<h3 class="quick-tz-h tz-title"><a data-where-clicked="headline" class="" href="${blog_post_url}">${headline}</a></h3>
				<p class="tz-txt quick-tz-txt">${summary}</p>
				
				<i class="cat-lister"> 
					<x:forEach var="cat" select="$m//OnlineProducts/OnlineProduct/Sections/Section/SubSections/SubSection/SubSectionName">
						<x:set var="t" select="string($cat//text())" />
						<li class="tz-meta-item tz-category"><a
							href="${sectionPath}/blogs/${blogName}/category/${t}"
							class="blog-cat">${t}</a></li>
					</x:forEach> </i>
				
				<ul class="tz-meta quick-tz-meta">
					<li class="tz-meta-item tz-category"><a
						class="ups-refresh-page" href="${blogName}">${blogName}</a></li>
					<!--<li class="tz-meta-item tz-time">
					<a class="tz-time-link" href="article.html#">
						<i class="tz-time-icon tz-meta-icon"></i>
						<i class="tz-time-txt tz-meta-txt" data-timestamp="${storyTime}">${timestamp}</i>
					</a>
					</li> -->
					<li class="tz-meta-item tz-share"><a
						class="tz-share-link popup-trigger" href="#mfp-share"
						data-canonical="${storyUrl}" data-shorturl=""
						data-headline="${headline}" data-thumbnail=""
						data-thumb_type="video"> <i class="tz-share-icon tz-meta-icon"></i>
					<i class="tz-share-txt tz-meta-txt">Share</i> </a></li>
					<!-- /.meta-share-list -->
				</ul>
				<!-- ./tz-meta --></div>
				<!-- /.tz-bd --> </article> <!-- /.quick-tz -->
				
				<c:if test="${(catStory mod adFrequency) == 0}">
	  	<%
	  		adCount++;
	  	
	  		pageContext.setAttribute("adCount", adCount);
	  	%>
	  		<div class="quick-tz ad" id="ad_stream${adCount}"></div>
	  	</c:if>
		</div>
	</c:if>
</c:forEach>

<a class="btn-strong load-stories-btn" href="#">Load More Stories</a>
--%>