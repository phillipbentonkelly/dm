<%@ include file="includes/init.inc" %>

<%@ attribute name="var"		rtexprvalue="false"	required="true" %>
<%@ attribute name="webObject"	rtexprvalue="true"	required="true"	type="java.lang.Object" %>

<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END" %>

<jsp:useBean id="contentData" class="java.util.HashMap" />

<p:object webObject="${webObject}" content="share" metadata="meta" channel="Boston.com" />

<p:url var="shareCanonical" webObject="${webObject}" public="true" />
<p:out var="shareCanonical" value="${shareCanonical}" scope="request" />
<p:out var="shareShortUrl" xvalue="$meta//ObjectMetadata/OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/ShortUrl" scope="request" />
<p:out var="shareHeadline" xvalue="$share//headlines/headline/p" scope="request" />
<p:out var="shareThumbType" value="image" scope="request" />
<p:out var="shareThumb" value="http://c.o0bc.com/img/bcom_logo_with_name.png" scope="request" />

<p:out var="commentsEnabled" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/CommentingEnabled" />
<p:out var="commentsEnabled" value="${fn:toLowerCase(commentsEnabled)}" scope="request" />

<bdc:rwArticleLeadImage var="mainImage" webObject="${webObject}" />
<c:if test="${not empty mainImage.src}">
	<p:out var="shareThumb" value="${mainImage.src}" scope="request" />
	<c:if test="${fn:startsWith(shareThumb, '//')}">
		<p:out var="shareThumb" value="http:${shareThumb}" scope="request" />
	</c:if>
</c:if>


<c:set target="${contentData}" property="canonical"	value="${shareCanonical}" />
<c:set target="${contentData}" property="shortUrl" 	value="${shareShortUrl}" />
<c:set target="${contentData}" property="headline" 	value="${shareHeadline}" />
<c:set target="${contentData}" property="thumbType" value="${shareThumbType}" />
<c:set target="${contentData}" property="thumb" 	value="${shareThumb}" />
<c:set target="${contentData}" property="comments"	value="${fn:toLowerCase(commentsEnabled)}" />


<c:set var="currentValue" value="${contentData}" />