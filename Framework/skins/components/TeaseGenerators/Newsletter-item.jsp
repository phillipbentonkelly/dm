<%@ taglib prefix="bgm" uri="bgmtags"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml"%>

<p:out var="imgSrc" value=""/>
<p:getObject uuid="${param.uuid}" var="obj" />
<p:out value="${param.firstArticle}" var="firstArticle" />
<p:out value="${param.bulleted}" var="bulleted" />
<p:object webObject="${obj}" content="item-story" metadata="item-meta" />
<p:url webObject="${obj}" var="link"/>
<p:out var="webtype" xvalue="$item-meta//ObjectMetadata/OnlineProducts/OnlineProduct/WebType" />


	<p:out var="itemTitle" xvalue="$item-story//doc/story/headlines/headline" />
	
	<p:out var="photoURL" xvalue="$item-story//doc/story/multimedia-container/photo-container/photogrp/photo/@fileref"/>
	<p:out var="photoURL" value="${fn:substringAfter(photoURL, '?uuid=')}" />
	<p:getObject var="imageObj" uuid="${photoURL}" onError="ignore" />
	<c:if test="${not empty imageObj}">
		<p:url var="imgSrc" webObject="${imageObj}" format="image_150x84" type="resource" />
	</c:if>
	
	<p:out var="pubDate" xvalue="$item-meta//ObjectMetadata/OnlineProducts/OnlineProduct/FirstPublicationDate"/>
	<p:out var="photoCredit" xvalue="$item-story//doc/story/multimedia-container/photo-container/photogrp/captiongrp/credit"/>
	<p:out var="photoCaption" xvalue="$item-story//doc/story/multimedia-container/photo-container/photogrp/captiongrp/caption"/>
	<p:out var="author" xvalue="$item-story//doc/story/text/byline/byname"/>
	<p:out var="webTease" xvalue="$item-story//doc/story/web-tease"/>
	<p:out var="streamTease" xvalue="$item-story//doc/story/stream-tease"/>
	<p:out var="itemDescription" xvalue="$item-story//doc/story/text/content"/>
	
	<p:out var="webtype" xvalue="$item-meta//ObjectMetadata/OnlineProducts/OnlineProduct/WebType" />
	
	<c:if test="${fn:trim(webtype) == 'carouselgallery'}">
		<p:out var="itemTitle" xvalue="$item-story//doc/story/multimedia-container/gallery-container/headlines/headline" />
		<p:out var="itemDescription" xvalue="$item-story//doc/story/multimedia-container/gallery-container/photogrp/captiongrp/caption"/>
	</c:if>
	<c:if test="${fn:trim(itemDescription) == ''}">
		<p:out var="itemDescription" value="${webTease}"/>
		<c:if test="${fn:trim(webTease) == ''}">
			<p:out var="itemDescription" value="${streamTease}"/>
		</c:if>
	</c:if>
	
	<%
		String itemDescription = (String)pageContext.getAttribute("itemDescription");
		String itemTitle = (String)pageContext.getAttribute("itemTitle");
		
		String reg = "&(?!&#?[a-zA-Z0-9]{2,7};)";
		itemDescription = itemDescription.replaceAll(reg, "&amp;");
		itemTitle = itemTitle.replaceAll(reg, "&amp;");
		
		String closeYourTagsFFS = "(<img(\"[^\"]*\"|'[^']*'|[^'\">/])*)(>)";
		itemDescription = itemDescription.replaceAll(closeYourTagsFFS, "$1/>");
		
		String formatYourLinksYouJerk = "(\"//)";
		itemDescription = itemDescription.replaceAll(formatYourLinksYouJerk, "\"http://");
		
		String async = "(async)";
		itemDescription = itemDescription.replaceAll(async, "");
		
		String allowfullscreen = "(allowfullscreen)";
		itemDescription = itemDescription.replaceAll(allowfullscreen, "");
		
		String thanksForTheNotesTag = "(<span class=\"@notes\"(\"[^\"]*\"|'[^']*'|[^'\"])*)(/span>)";
		itemDescription = itemDescription.replaceAll(thanksForTheNotesTag, "");
		
		itemDescription = itemDescription.replaceAll("\n", "</p><p>");
		
		pageContext.setAttribute("itemDescription", itemDescription);
		pageContext.setAttribute("itemTitle", itemTitle);
	%>
	<c:if test="${not empty itemTitle}">
		<c:choose>
			<c:when test="${firstArticle eq 1}">
				<div class="padBottom10">
					<c:choose>
						<c:when test="${bulleted eq 0}">
							<div class="featured" style="font-size:16px; font-weight:bold; line-height:28px; margin:0 0 15px 0;">
								<a style="color:#1d6ead; text-decoration:none;"href="${link}"
					     	    class="bold">${itemTitle}</a>
					       	</div>
						</c:when>
						<c:otherwise>
							<div class="featured" style="font-size:23px; font-weight:bold; line-height:28px; margin:0 0 15px 0;">
								<a style="color:#1d6ead; text-decoration:none;"href="${link}"
				     			class="bold">${itemTitle}</a>
					       	</div>
						</c:otherwise>
					</c:choose>
				</div>
				<p:out var="firstArticle" value="0" />
			</c:when>
			<c:otherwise>
				<c:choose>
					<c:when test="${bulleted eq 0}">
						<ul style="list-style-type:none; font-weight:bold color:#979797; line-height:18px; margin:0; padding:0px;"
						class="linklist">
							<li style="margin:0 0 10px 0;">
								<a style="color:#1d6ead; text-decoration:none;" href="${link}" class="bold">${itemTitle}</a>
							</li>
						</ul>
					</c:when>
					<c:otherwise>
						<ul style="list-style-type:square; color:#979797; font-size:14px; line-height:18px; margin:0; padding:0 0 0 16px;" class="linklist">
							<li style="margin:0 0 10px 0;">
								<a style="color:#1d6ead; text-decoration:none;" href="${link}" class="bold">${itemTitle}</a>
							</li>
						</ul>
					</c:otherwise>
				</c:choose>
			</c:otherwise>
		</c:choose>
	</c:if>
