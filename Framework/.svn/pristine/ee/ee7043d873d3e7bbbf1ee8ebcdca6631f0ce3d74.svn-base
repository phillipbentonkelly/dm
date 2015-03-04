<%@ tag body-content="scriptless" import="java.util.Map,java.util.HashMap,java.util.ArrayList,java.util.Collection" %>
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



<jsp:useBean id="contentData" class="java.util.HashMap"/>

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



<c:choose>
	<c:when test="${objType eq 'VideoStory'}">	
		
		<%-- video data --%>
		<p:out var="provider" xvalue="$meta//Reference/Provider" />
		<p:out var="videoUrl" xvalue="$c/doc/story/video-container/videogrp/video/a/@href"/>	
		<c:if test="${empty videoUrl or videoUrl eq ''}">
			<p:out var="videoUrl" xvalue="$c/doc/story/video-container/videogrp/video//a"/>			
		</c:if>				
		<p:out var="videoHeadline" xvalue="$c/doc/story/video-container/headline/p"/>
		<p:out var="videoCaption" xvalue="$c/doc/story/video-container/videogrp/captiongrp/caption/p" />
		<p:out var="videoCredit" xvalue="$c/doc/story/video-container/videogrp/captiongrp/credit/p" />
		<p:out var="videoThumb" xvalue="$c/doc/story/video-container/videogrp/thumbnail/@fileref"/>
		
		<c:choose>
			<c:when test="${provider eq 'Brightcove'}">
				<p:out var="videoId" value="${fn:substringAfter(videoUrl, 'videoId=')}"/>
				<p:out var="videoListId" value="${fn:substringAfter(videoUrl, 'videoList=')}"/>
				<c:choose>
					<c:when test="${not empty videoListId}">
						<p:out var="divId" value="brightcove_video_with_ads" />
						<p:out var="dataPlayer" value="article" />
						<p:out var="dataSchema" value="1" />
					</c:when>
					<c:otherwise>
						<p:out var="divId" value="brightcove_playlist" />
						<p:out var="dataPlayer" value="multiclip" />
						<p:out var="dataSchema" value="1" />
					</c:otherwise>
				</c:choose>
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
			
		</c:choose>
		<%-- /.video data --%>
		
		<%-- section data --- do we need this? --%>
		<p:out var="videoSection" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='BostonGlobe.com']/Sections/Section/SectionName" />
		<%-- /.section data --%>
		
		<c:set target="${contentData}" property="provider" value="${provider}" />
		<c:set target="${contentData}" property="videoSection" value="${videoSection}"/>
		<c:set target="${contentData}" property="videoPath" value="${videoPath}"/>
		<c:set target="${contentData}" property="videoHeadline" value="${videoHeadline}"/>
		<c:set target="${contentData}" property="videoCaption" value="${videoCaption}"/>
		<c:set target="${contentData}" property="videoCredit" value="${videoCredit}"/>
		<c:set target="${contentData}" property="videoThumb" value="${videoThumb}"/>
		<c:set target="${contentData}" property="videoId" value="${videoId}"/>
		<c:set target="${contentData}" property="videoUrl" value="${videoUrl}"/>
		<c:set target="${contentData}" property="videoListId" value="${videoListId}"/>
		<c:set target="${contentData}" property="divId" value="${divId}"/>
		<c:set target="${contentData}" property="dataPlayer" value="${dataPlayer}"/>
		<c:set target="${contentData}" property="dataSchema" value="${dataSchema}"/>
	
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







