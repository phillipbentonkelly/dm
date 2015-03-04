<%--
{comments}
BDC-1862 added file so newsletters can work again
{comments}
--%>

<%@ taglib prefix="bgm" uri="bgmtags"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml"%>

<p:out var="imgSrc" value=""/>
<p:getObject uuid="${param.uuid}" var="obj" />
<p:object webObject="${obj}" content="item-story" metadata="item-meta" />
<p:url webObject="${obj}" var="link"/>
<p:out var="webtype" xvalue="$item-meta//ObjectMetadata/OnlineProducts/OnlineProduct/WebType" />

<c:if test="${webtype != 'video' and webtype !='streamtease'}">

	<p:out var="itemTitle" xvalue="$item-story//doc/story/headlines/headline" />
	<p:out var="photoURL" xvalue="$item-story//doc/story/multimedia-container/photo-container/photogrp/photo/@fileref"/>
	<p:out var="photoURL" value="${fn:substringAfter(photoURL, '?uuid=')}" />
	<p:getObject var="imageObj" uuid="${photoURL}" onError="ignore" />
	<c:if test="${not empty imageObj}">
		<p:url var="imgSrc" webObject="${imageObj}" format="image_700w" type="resource" />
	</c:if>
	<p:out var="pubDate" xvalue="$item-meta//ObjectMetadata/OnlineProducts/OnlineProduct/FirstPublicationDate"/>
	<p:out var="photoCredit" xvalue="$item-story//doc/story/multimedia-container/photo-container/photogrp/captiongrp/credit"/>
	<p:out var="photoCaption" xvalue="$item-story//doc/story/multimedia-container/photo-container/photogrp/captiongrp/caption"/>
	<p:out var="author" xvalue="$item-story//doc/story/text/byline/byname"/>
	<p:out var="webTease" xvalue="$item-story//doc/story/web-tease"/>
	<p:out var="streamTease" xvalue="$item-story//doc/story/stream-tease"/>
	<p:out var="itemDescription" xvalue="$item-story//doc/story/text/content"/>
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
	<item>
		<title>${itemTitle}</title>
		<pubDate>${pubDate}</pubDate>
		<link>${portalContext.publicBaseUrl}${link}</link>
		<guid>${portalContext.publicBaseUrl}${link}</guid>
		<author>${fn:trim(author)}</author>
		<c:if test="${fn:trim(imgSrc) != ''}">
			<media:content medium="image" type="image/jpg" url="http:${imgSrc}">
				<media:credit role="author">${photoCredit}</media:credit>
				<media:title type="html">${photoCaption}</media:title>
			</media:content>
		</c:if>
		<description><p><c:out value="${fn:trim(itemDescription)}" escapeXml="false" /></p></description>
		<category></category>
	</item>
</c:if>