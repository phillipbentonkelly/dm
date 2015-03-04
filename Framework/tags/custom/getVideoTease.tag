<%@ include file="includes/init.inc" %>
<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>
<%@ attribute name="echo" rtexprvalue="false" required="false"%>
<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"  %>

<c:choose>
	<c:when test="${not empty path}">
		<p:getObject path="${path}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<c:choose>
				<c:when test="${not empty channel}">
					<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="${channel}"/>
				</c:when>
				<c:otherwise>
					<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID"/>
				</c:otherwise>
			</c:choose>
		</c:if>
	</c:when>
	<c:when test="${not empty uuid}">
		<p:getObject uuid="${uuid}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<c:choose>
				<c:when test="${not empty channel}">
					<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="${channel}"  />
				</c:when>
				<c:otherwise>
					<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID"/>
				</c:otherwise>
			</c:choose>
			<p:out var="StoryID" value="${uuid}" />
			<p:out var="videoPath" value="${obj.path}" scope="page" />
			<p:out var="objType" xvalue="$meta//sys/type" scope="page"/>
		</c:if>
	</c:when>
	<c:when test="${not empty webObject}">
		<c:choose>
			<c:when test="${not empty channel}">
				<p:object webObject="${webObject}" content="c" metadata="meta" channel="${channel}"/>
			</c:when>
			<c:otherwise>
				<p:object webObject="${webObject}" content="c" metadata="meta"/>
			</c:otherwise>
		</c:choose>
		<p:out var="StoryID" xvalue="$meta//uuid" />
		<p:out var="videoPath" value="${webObject.path}" scope="page" />
		<p:out var="objType" xvalue="$meta//sys/type" scope="page"/>
	</c:when>
	<c:otherwise>
		<c:choose>
			<c:when test="${not empty channel}">
				<p:currentObject content="c" metadata="meta" webType="WT" uuid="StoryID" channel="${channel}" />
			</c:when>
			<c:otherwise>
				<p:currentObject content="c" metadata="meta" webType="WT" uuid="StoryID" />
			</c:otherwise>
		</c:choose>
	</c:otherwise>
</c:choose>
<p:out var="externalCheck" xvalue="$c//multimedia-container/video-container/@class"/>

<c:choose>
	<c:when test="${externalCheck eq 'external'}">
		<p:out var="isExternal" value="${1==1}" />
		<p:out var="externalVideoLink" xvalue="$c//multimedia-container/video-container[@class='external']/p" />
	</c:when>
	<c:otherwise>
		<p:out var="videoUrl" xvalue="$c//multimedia-container/video-container/videogrp/video/a/@href" />
		<c:choose>
			<c:when test="${fn:contains(videoUrl,'brightcove') or fn:contains(videoUrl,'avideos')}">
				<c:choose>
					<c:when test="${fn:contains(videoUrl,'brightcove')}">
						<p:out var="videoId" value="${fn:substringAfter(videoUrl,'videoId=')}" />
						<p:out var="provider" value="brightcove" />
					</c:when>
					<c:when test="${fn:contains(videoUrl,'avideos')}">
						<p:out var="videoUrl" xvalue="$c//multimedia-container/video-container/@href" />
						<p:out var="videoIdTemp" value="${fn:substringBefore(videoUrl,'.xml?')}" />
						<p:out var="videoId" value="${fn:substringAfter(videoIdTemp,'Videos/')}" />
						<p:out var="provider" value="brightcove" />
					</c:when>
				</c:choose>
			</c:when>
			<c:when test="${fn:contains(videoUrl,'newsinc')}">
				<p:out var="videoIdTemp" value="${fn:substringAfter(videoUrl,'vcid=')}" />
				<p:out var="videoId" value="${fn:substringBefore(videoIdTemp,'&freewheel')}" />
				<p:out var="provider" value="NDN" />
			</c:when>
			<c:when test="${fn:contains(videoUrl,'performgroup')}">
				<p:out var="videoUrl" xvalue="$c//multimedia-container/video-container/videogrp/thumbnail/@fileref" />
				<c:set var="vidUrlString">${videoUrl}</c:set>
				<p:out var="videoIdTemp" value="${fn:substringBefore(vidUrlString,'.jpg?')}" />
				
				<% 
					String vidurl = (String)jspContext.getAttribute("videoIdTemp");
					int index = vidurl.lastIndexOf('/');
					int indexEnd = vidurl.length();
					int indexStart = index + 1;
					String finalvidurl = vidurl.substring(indexStart,indexEnd);
					jspContext.setAttribute("videoIdTempNew", finalvidurl);
				%>
				
				<p:out var="videoId" value="${videoIdTempNew}" />
				<p:out var="provider" value="Perform" />
			</c:when>
			<c:when test="${fn:contains(videoUrl,'cinesport')}">
				<p:out var="videoUrlTemp" xvalue="$c//multimedia-container/video-container/@href" />
				<p:out var="videoIdTemp" value="${fn:substringAfter(videoUrlTemp,'CineSport-')}" />
				<p:out var="videoId" value="${fn:substringBefore(videoIdTemp,'.xml?')}" />
				<p:out var="provider" value="CineSport" />
			</c:when>
		</c:choose>
	</c:otherwise>
</c:choose>
<jsp:useBean id="contentData" class="java.util.HashMap"/>
<c:set target="${contentData}" property="isExternal" value="${isExternal}"/>
<c:set target="${contentData}" property="externalVideoLink" value="${externalVideoLink}"/>
<c:set target="${contentData}" property="videoId" value="${videoId}"/>
<c:set target="${contentData}" property="videoUrl" value="${videoUrl}"/>
<c:set target="${contentData}" property="provider" value="${provider}"/>
<c:set var="currentValue" value="${contentData}"/>
<c:if test="${echo == 'true'}">
	${currentValue}
</c:if>
