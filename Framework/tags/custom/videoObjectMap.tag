<%@ tag body-content="scriptless" import="java.util.Map,java.util.HashMap,java.util.ArrayList,java.util.Collection,java.lang.Object" %>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>
<%@ attribute name="facet" rtexprvalue="true" required="false"%>
<%@ attribute name="format" rtexprvalue="true" required="false"%>
<%@ attribute name="echo" rtexprvalue="false" required="false"%>
<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"  %>

<c:choose>
	<c:when test="${not empty path}">
		<p:getObject path="${path}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com"/>
		</c:if>
	</c:when>
	<c:when test="${not empty uuid}">
		<p:getObject uuid="${uuid}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" channel="Boston.com"  />
			<p:out var="StoryID" value="${uuid}" />
			<p:out var="videoPath" value="${obj.path}" scope="page" />
			<p:out var="objType" xvalue="$meta//sys/type" scope="page"/>
		</c:if>
	</c:when>
	<c:when test="${not empty webObject}">
		<p:object webObject="${webObject}" content="c" metadata="meta" />
		<p:out var="StoryID" xvalue="$meta//uuid" />
		<p:out var="videoPath" value="${webObject.path}" scope="page" />
		<p:out var="objType" xvalue="$meta//sys/type" scope="page"/>
	</c:when>
	<c:otherwise>
		<p:currentObject content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com" />
		<p:out var="obj" value="${currentObject}" />
		
	</c:otherwise>
</c:choose>

<c:if test="${empty StoryID}">
	<p:out xvalue="$meta//uuid" var="StoryID"/>
</c:if>

<%-- URL data --%>
<p:out var="isXREF" value="${1==2}" />
<c:choose>
	<c:when test="${WT == 'promostory' || WT == 'textAsset'}">
		<p:out var="isXREF" value="${1==1}" />
	</c:when>
	
	<c:otherwise>
		<p:out var="isXREF" value="${1==2}" />
	</c:otherwise>
</c:choose>

<x:if select="$c//xref">
		<p:out var="isXREF" value="${1==1}" />
</x:if>
<c:choose>
	<c:when test="${isXREF}">
		<p:url var="storyURL" xvalue="$c//xref" type="context"/>
		<c:if test="${empty storyURL}">
			<p:url var="storyURL" webObject="${obj}"/>
		</c:if>
	</c:when>
	<c:otherwise>
		<c:choose>
			<c:when test="${not empty facet}">
				<p:url var="storyURL" webObject="${obj}" facet="${facet}" />
			</c:when>
			<c:when test="${not empty webObject}">
				<p:url var="storyURL" webObject="${webObject}"/>
			</c:when>
			<c:otherwise>
				<p:url var="storyURL" webObject="${obj}"/>
			</c:otherwise>
		</c:choose>
	</c:otherwise>
</c:choose>
<%-- URL data --%>

<c:choose>
	<c:when test="${objType eq 'VideoStory'}">	
		<%-- headlines data --%>
		<p:out var="overline" xvalue="$c//headlines/overline/p" />
		<p:out var="videoHeadline" xvalue="$c//headlines/headline/p" />
		<p:out var="shortheadline" xvalue="$c//headlines/shortheadline/p" />
		<p:out var="subheadline" xvalue="$c//headlines/subheadline/p" />
		<p:out var="secondSubheadline" xvalue="$c//headlines/subheadline2/p" />
		<%-- /.headlines data --%>
		
		<%-- URL data --%>
		<p:out var="gigyaCanonical" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/CanonicalUrl" />
		<p:out var="gigyaShortURL" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/ShortUrl" />
		<p:out var="gigyaHeadline" xvalue="$meta//SEOInformation/Headline" />
		<p:out var="gigyaDescription" xvalue="$meta//SEOInformation/Summary" />
		<%-- /.URL data --%>
		
		
		<%-- publication date --%>
		<p:out var="pubDate" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/PublicationStartDate" />
		
		<%-- summary data --%>
		<p:out var="summary" xvalue="$c//summary/p" />
		<p:out var="webtease" xvalue="$c//web-tease/p" />	
		<%-- /.summary data --%>
		
		<%-- related links data --%>
		<x:if select="$c//related-links">	
			<%
				ArrayList<String> relatedLinksArray = new ArrayList<String>();
			%>
		
			<x:forEach varStatus="status" var="link" select="$c//related-links/related-link/a">
				<p:out var="linkText" xvalue="$link" />
				<p:out var="linkURL" xvalue="$link/@href" />
				<c:choose>
					<c:when test="${fn:startsWith(linkURL,'relative:')}">
						<p:out var="linkURL" value="${fn:substringAfter(linkURL,'relative:')}" />
					</c:when>
					<c:when test="${fn:startsWith(linkURL,'http://')}">
						<p:out var="linkURL" value="${linkURL}" />
					</c:when>
					<c:otherwise>
						<p:url var="linkURL" value="${linkURL}" type="page" />
					</c:otherwise>
				</c:choose>
				<p:out var="hyperLink" value='<a href="${linkURL}">${linkText}</a>' />
				<%
					String hyperLink = (String)jspContext.getAttribute("hyperLink");
					relatedLinksArray.add(hyperLink);
				%>		
			</x:forEach>
			<%
				jspContext.setAttribute("relatedLinksArray",relatedLinksArray);
			%>	
		</x:if>
		<%-- /.related links data --%>
		
		<%-- video data --%>
		<p:out var="provider" xvalue="$meta//Reference/Provider" />
		<p:out var="videoUrl" xvalue="$c//video-container/videogrp/video/a/@href"/>	
		<c:if test="${empty videoUrl or videoUrl eq ''}">
			<p:out var="videoUrl" xvalue="$c//video-container/videogrp/video//a"/>			
		</c:if>				
		<%--<p:out var="videoHeadline" xvalue="$c//video-container/headline/p"/>--%>
		<p:out var="videoCaption" xvalue="$c//video-container/videogrp/captiongrp/caption/p" />
		<p:out var="videoCredit" xvalue="$c//video-container/videogrp/captiongrp/credit/p" />
		<p:out var="videoThumb" xvalue="$c//video-container/videogrp/thumbnail/@fileref"/>
		
		<c:choose>
			<c:when test="${provider eq 'Brightcove'}">
				<%--<p:out var="videoId" value="${fn:substringAfter(videoUrl, 'videoId=')}"/>--%>
				<p:out var="videoId" xvalue="$meta//Reference/TransmissionReference" />
				<p:out var="videoListId" value="${fn:substringAfter(videoUrl, 'videoList=')}"/>
				<p:out var="divId" value="brightcove_video_with_ads" />
				<p:out var="dataPlayer" value="article" />
				<p:out var="dataSchema" value="1" />
			</c:when>
			<c:when test="${provider eq 'NDN'}">
				<%
					String source = (String)jspContext.getAttribute("videoUrl");
					int index = source.indexOf('=');
					int indexEnd = index + 9;
					int indexStart = index + 1;
					String id = source.substring(indexStart,indexEnd);
					jspContext.setAttribute("videoId", id);
				%>
				<p:out var="divId" value="ndn_video" />
				<p:out var="dataPlayer" value="clicktoplay" />
				<p:out var="dataSchema" value="2" />
			</c:when>
			<c:when test="${provider eq 'CineSport'}">
				<p:out var="videoId" xvalue="$meta//Reference/TransmissionReference" />
				<p:out var="divId" value="cinesport_video" />
				<p:out var="dataSchema" value="3" />
			</c:when>
			<c:when test="${provider eq 'Perform'}">
				<x:forEach var="keywords" select="$meta//Categorization/Keywords/Keyword">
					<x:set var="keyword" select="string($keywords/text())" />
					<c:choose>
						<c:when test="${keyword eq 'NBA'}">
							<p:out var="performSport" value="NBA" />
						</c:when>
						<c:when test="${keyword eq 'US MLB'}">
							<p:out var="performSport" value="MLB" />
						</c:when>
						<c:when test="${keyword eq 'NHL'}">
							<p:out var="performSport" value="NHL" />
						</c:when>
						<c:when test="${keyword eq 'NFL'}">
							<p:out var="performSport" value="NFL" />
						</c:when>
					</c:choose>
				</x:forEach>
				<p:out var="videoId" xvalue="$meta//Reference/TransmissionReference" />
			</c:when>
			
		</c:choose>
		<%-- /.video data --%>
		
		<%-- section data --%>
		<p:out var="videoSection" xvalue="$meta//Categorization/Taxonomies/Taxonomy" />
		<%-- /.section data --%>
		
		<jsp:useBean id="contentData" class="java.util.HashMap"/>
		<c:set target="${contentData}" property="StoryID" value="${StoryID}"/>
		<c:set target="${contentData}" property="storyURL" value="${storyURL}"/>
		<c:set target="${contentData}" property="isXREF" value="${isXREF}"/>
		<c:set target="${contentData}" property="provider" value="${provider}" />
		<c:set target="${contentData}" property="videoSection" value="${videoSection}"/>
		<c:set target="${contentData}" property="videoPath" value="${videoPath}"/>
		<c:set target="${contentData}" property="videoHeadline" value="${videoHeadline}"/>
		<c:set target="${contentData}" property="videoCaption" value="${videoCaption}"/>
		<c:set target="${contentData}" property="videoCredit" value="${videoCredit}"/>
		<c:set target="${contentData}" property="videoThumb" value="${videoThumb}"/>
		<c:set target="${contentData}" property="performSport" value="${performSport}"/>
		<c:set target="${contentData}" property="videoId" value="${videoId}"/>
		<c:set target="${contentData}" property="videoUrl" value="${videoUrl}"/>
		<c:set target="${contentData}" property="videoListId" value="${videoListId}"/>
		<c:set target="${contentData}" property="overline" value="${overline}"/>
		<c:set target="${contentData}" property="headline" value="${headline}"/>
		<c:set target="${contentData}" property="shortheadline" value="${shortheadline}"/>
		<c:set target="${contentData}" property="subheadline" value="${subheadline}"/>
		<c:set target="${contentData}" property="pubDate" value="${pubDate}"/>
		<c:set target="${contentData}" property="secondSubheadline" value="${secondSubheadline}"/>
		<c:set target="${contentData}" property="summary" value="${summary}"/>
		<c:set target="${contentData}" property="webtease" value="${webtease}"/>
		<c:set target="${contentData}" property="urlMap" value="${urlMap}"/> 
		<c:set target="${contentData}" property="divId" value="${divId}"/> 
		<c:set target="${contentData}" property="dataPlayer" value="${dataPlayer}"/> 
		<c:set target="${contentData}" property="dataSchema" value="${dataSchema}"/> 
		<c:set target="${contentData}" property="gigyaCanonical" value="${gigyaCanonical}"/> 
		<c:set target="${contentData}" property="gigyaShortURL" value="${gigyaShortURL}"/> 
		<c:set target="${contentData}" property="gigyaDescription" value="${gigyaDescription}"/> 
		<c:set target="${contentData}" property="gigyaHeadline" value="${gigyaHeadline}"/> 
		<c:set target="${contentData}" property="relatedLinksArray" value="${relatedLinksArray}"/>
		
		<c:set var="currentValue" value="${contentData}"/>
		
		<c:if test="${echo == 'true'}">
			${currentValue}
		</c:if>
	</c:when>
	<c:otherwise>
		<c:set var="currentValue" value="System Type Not Accounted for"/>
		<c:if test="${echo == 'true'}">
			${currentValue}
		</c:if>
	</c:otherwise>
</c:choose>








