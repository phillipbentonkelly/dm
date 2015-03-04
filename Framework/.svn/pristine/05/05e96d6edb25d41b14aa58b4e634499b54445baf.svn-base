<%@ page pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jstlCore" %>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag" %>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%--
<p:out var="blogName" value="${cacheScope.blogName}" />
<p:out var="adFrequency" value="${cacheScope.adFrequency}" />
<script type="text/javascript" src="http://cache.boston.com/universal/js/movable_type_ad_catalog.js"></script>
<c:if test="${fn:trim(adFrequency) eq '' }" >
	<p:out var="adFrequency" value="5" />
</c:if>
<!-- <jp:getCollection path="${param.query}" var="blogQuery"/> -->

<jp:getCollection path="$configurationURI/blogs/queries/${blogName}" var="blogQuery"/>
  
  <p:out var="adCount" value=""/>
  <%
  		int adCount = 0;
  %>
  <c:forEach items="${blogQuery.items}" var="item" varStatus="status">
  	<p:out var="imgSrc" value=""/>
  	
  	<p:getObject uuid="${item.uuid}" var="obj" />
  	
	<p:object webObject="${obj}" content="item-story" metadata="item-meta" />
	<p:url webObject="${obj}" var="blog_post_url"/>
	<p:out var="headline" xvalue="$item-meta//SEOInformation/Headline"/>
	<!-- DEBUG: Status: ${status.count}, Object: ${item.uuid}, Instance: ${obj.uuid}, Headline: ${headline} -->
	<!--<p:out var="webTease" xvalue="$item-meta//SEOInformation/Web-Tease"/> -->
	<p:out var="webTease" xvalue="$item-story//doc/story/web-tease/p"/>
	<!--<p:out var="summary" xvalue="$item-meta//SEOInformation/Summary"/>  -->
	<p:out var="summary" xvalue="$item-story//doc/story/summary/p"/>
	<p:out var="blog_title" xvalue="$item-meta//ObjectMetadata/OnlineProducts/OnlineProduct/Title"/>
	<p:out var="photoURL" xvalue="$item-story//doc/story/multimedia-container/photo-container/photogrp/photo/@fileref"/>
	<p:out var="photoCaption" xvalue="$item-story//doc/story/multimedia-container/photo-container/captiongrp/caption"/>
	<p:out var="imageId" value="${fn:substringAfter(photoURL, '?uuid=')}" />
	<p:getObject var="imageObj" uuid="${imageId}" onError="ignore" />
	<c:if test="${not empty imageObj}">
		<p:url var="imgSrc" webObject="${imageObj}" format="image_150x84" type="resource" />
	</c:if>
	<p:out var="storyUrl" xvalue="$item-meta//OnlineProducts/OnlineProduct/CanonicalUrl" />
	<p:out var="storyTime" xvalue="$item-meta//OnlineProducts/OnlineProduct/FirstPublicationDate" />
  	
  	<div class="stream-item">
  	
  	<article class="quick-tz quick-tz-w-art " data-section="[object Object]">
	
	<c:if test="${not empty imgSrc}">
	<a class="quick-tz-img-mod art-bd" href="${blog_post_url}">
		<img data-where-clicked="image" class="tz-img" src="${imgSrc}" alt="${photoCaption}">
		<!--<div class="quick-tz-icon tz-icon tz-video-icon"></div> --1>
	</a>
	</c:if>	
		<p:out var="imgDiv" value="" />
		<c:if test="${not empty imgSrc}">
			<p:out var="imgDiv" value="quick-tz-bd txt-bd" />
		</c:if>
	
	
	<div class="${imgDiv}">
		<h3 class="quick-tz-h tz-title"><a data-where-clicked="headline" class="" href="${blog_post_url}">${headline}</a></h3>
		<p class="tz-txt quick-tz-txt">${summary}</p>

		<x:if select="$item-meta//OnlineProducts/OnlineProduct/Sections/Section/SubSections/SubSection/SubSectionName">
			<i class="cat-lister">
				<x:forEach var="cat" select="$item-meta//OnlineProducts/OnlineProduct/Sections/Section/SubSections/SubSection/SubSectionName">
					<x:set var="t" select="string($cat//text())" />
					<li class="tz-meta-item tz-category">
						<a href="${sectionPath}/blogs/${blogName}/category/${t}" class="blog-cat">${t}</a>
					</li>
				</x:forEach>
			</i>
		</x:if>
		<ul class="tz-meta quick-tz-meta">
			<li class="tz-meta-item tz-category">
				<a class="ups-refresh-page" href="${blogName}">${blog_title}</a>
			</li>
			<!--<li class="tz-meta-item tz-time">
				<a class="tz-time-link" href="article.html#">
					<i class="tz-time-icon tz-meta-icon"></i>
					<i class="tz-time-txt tz-meta-txt" data-timestamp="${storyTime}">${timestamp}</i>
					
        
				</a>
			</li>-->
			<li class="tz-meta-item tz-share">
  				<a class="tz-share-link popup-trigger" href="#mfp-share" data-canonical="${storyUrl}" data-shorturl="" data-headline="${headline}" data-thumbnail="" data-thumb_type="video">
					<i class="tz-share-icon tz-meta-icon"></i>
					<i class="tz-share-txt tz-meta-txt">Share</i>
				</a>
			</li> <!-- /.meta-share-list -->
		</ul> <!-- ./tz-meta -->
	</div> <!-- /.tz-bd -->
	</article> <!-- /.quick-tz -->

</div>
<c:if test="${(status.count mod adFrequency) == 0}">
	  	<%
	  		adCount++;
	  	
	  		pageContext.setAttribute("adCount", adCount);
	  	%>
	  		<!--<article class="quick-tz quick-tz-ad" id="ad_stream${adCount}"></article> -->
	  		<!--<div class="stream-item">
	  			<article class="quick-tz quick-tz-ad" id="ad_stream${adCount}"></article>
	  		</div> -->
	 </c:if>
  	
  
  </c:forEach>
    <a class="btn-strong load-stories-btn" href="#">Load More Stories</a>
    	 --%>
    