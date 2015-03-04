<%@ include file="includes/init.inc" %>

<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="edition" rtexprvalue="true" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>
<%@ attribute name="facet" rtexprvalue="true" required="false"%>
<%@ attribute name="format" rtexprvalue="true" required="false"%>
<%@ attribute name="echo" rtexprvalue="false" required="false"%>
<%@ attribute name="xsltFile" rtexprvalue="false" required="false"%>
<%@ attribute name="wordCount" rtexprvalue="true" required="false"%>
<%@ attribute name="priority" rtexprvalue="true" required="false" %>
<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"  %>

<%--
<p:out var="webTease" value="${fn:trim(webTease)}" />
<c:if test="${empty webTease or webTease == ''}">
	<p:out var="webTease" xvalue="$story//summary/p" />
	<p:out var="webTease" value="${fn:trim(webTease)}" />
	<c:if test="${empty webTease or webTease == ''}">
		<p:out var="webTease" xvalue="$story//text/content/*[1]" />
	</c:if>
</c:if>
--%>

<p:out var="xslt_default" value="/SysConfig/WebPortal/BDC/Framework/xslt/story_default.xslt" />
<c:choose>
	<c:when test="${not empty xsltFile}">
		<p:out var="xslt_file" value="${xsltFile}" />
	</c:when>
	<c:otherwise>
		<p:out var="xslt_file" value="${xslt_default}" />
	</c:otherwise>
</c:choose>

<c:choose>
	<c:when test="${not empty edition}">
		<p:out var="channel" value="Boston.com/${edition}"/>
	</c:when>
	<c:otherwise>
		<bdc:getCurrentSection var="channel" />
	</c:otherwise>
</c:choose>	

<c:if test="${empty wordCount}">
	<p:out var="workCount" value="0" />
</c:if>
	
<c:choose>
	<c:when test="${not empty path}">
		<p:getObject path="${path}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<c:choose>
				<c:when test="${not empty channel}">
					<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="${channel}"/>
				</c:when>
				<c:otherwise>
					<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com" />
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
					<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com" />
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
				<p:object webObject="${webObject}" content="c" metadata="meta" channel="Boston.com" />
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
				<p:currentObject content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com"/>
			</c:otherwise>
		</c:choose>
		<p:out var="obj" value="${currentObject}" />
		<p:out var="objType" xvalue="$meta//sys/type" scope="page"/>
	</c:otherwise>
</c:choose>

<c:if test="${empty StoryID}">
	<p:out xvalue="$meta//uuid" var="StoryID"/>
</c:if>

<c:choose>
	<c:when test="${objType eq 'EOM::MediaGallery'}">
		<c:choose>
			<c:when test="${priority eq 'feature_stack'}">
				<p:out var="fsTease" xvalue="$c/doc/story/multimedia-container/gallery-container/feature-stack-tease" xslt="${xslt_file}" />
				<p:out var="currentValue" value="${fn:trim(fsTease)}" />
				<c:if test="${empty currentValue or currentValue == ''}">
					<p:out var="carouselTease" xvalue="$c/doc/story/multimedia-container/gallery-container/web-tease[@channel='Boston.com']" xslt="${xslt_file}" />
					<p:out var="currentValue" value="${fn:trim(carouselTease)}" />
					<c:if test="${empty currentValue or currentValue == ''}">
						<p:out var="summary" xvalue="$c/doc/story/multimedia-container/gallery-container/summary" xslt="${xslt_file}"/>
						<p:out var="currentValue" value="${fn:trim(summary)}" />
					</c:if>
				</c:if>
			</c:when>
			<c:when test="${priority eq 'carousel'}">
				<p:out var="carouselTease" xvalue="$c/doc/story/multimedia-container/gallery-container/carousel-tease" xslt="${xslt_file}" />
				<p:out var="currentValue" value="${fn:trim(carouselTease)}" />
				<c:if test="${empty currentValue or currentValue == ''}">
					<p:out var="carouselTease" xvalue="$c/doc/story/multimedia-container/gallery-container/feature-stack-tease" xslt="${xslt_file}" />
					<p:out var="currentValue" value="${fn:trim(carouselTease)}" />
					<c:if test="${empty currentValue or currentValue == ''}">
						<p:out var="summary" xvalue="$c/doc/story/multimedia-container/gallery-container/summary" xslt="${xslt_file}"/>
						<p:out var="currentValue" value="${fn:trim(summary)}" />
					</c:if>
				</c:if>
			</c:when>
			<c:otherwise>
				<p:out var="webTease" xvalue="$c/doc/story/multimedia-container/gallery-container/web-tease" xslt="${xslt_file}"/>		
				<p:out var="currentValue" value="${fn:trim(webTease)}" />	
				<c:if test="${empty currentValue or currentValue == ''}">
					<p:out var="summary" xvalue="$c/doc/story/multimedia-container/gallery-container/summary" xslt="${xslt_file}"/>
					<p:out var="currentValue" value="${fn:trim(summary)}" />
				</c:if>	
			</c:otherwise>
		</c:choose>
	</c:when>
	
	<%-- As of 12/3/13 videostories do not have the updated fields, because reasons. --%>
	<%-- As of 3/4/14 videostores do have the updated fields, because of hard work and dedication --%>
	<%--
	<c:when test="${objType eq 'VideoStory'}">	
		<p:out var="webTease" xvalue="$c/doc/story/web-tease[@channel='Boston.com']" xslt="${xslt_file}"/>	
		<p:out var="currentValue" value="${fn:trim(webTease)}" />	
		<c:if test="${empty currentValue or currentValue == ''}">
			<p:out var="summary" xvalue="$c/doc/story/summary" xslt="${xslt_file}"/>
			<p:out var="currentValue" value="${fn:trim(summary)}" />
			<c:if test="${empty currentValue or currentValue == ''}">
				<p:out var="currentValue" xvalue="$story//video-container/videogrp/captiongrp/caption/*[1]" xslt="${xslt_file}"/>
			</c:if>
		</c:if>
	</c:when>	
	--%>
	
	<c:when test="${objType eq 'EOM::Story' or objType eq 'VideoStory' or objType eq 'EOM::CompoundStory' or objType eq 'TextAsset' or objType eq 'WireStory' or objType eq 'StreamTease' or objType eq 'Web'}">
		<p:out var="shortenTease" value="1"/>
		
		<c:choose>
			<c:when test="${priority eq 'feature_stack'}">
				<p:out var="fsTease" xvalue="$c/doc/story/feature-stack-tease" xslt="${xslt_file}" />
				<p:out var="currentValue" value="${fn:trim(fsTease)}" />
				<c:if test="${empty currentValue or currentValue == ''}">
					<p:out var="carouselTease" xvalue="$c/doc/story/web-tease" xslt="${xslt_file}" />
					<p:out var="currentValue" value="${fn:trim(carouselTease)}" />
					
					<c:if test="${empty currentValue or currentValue == ''}">
						<p:out var="summary" xvalue="$c/doc/story/summary" xslt="${xslt_file}" />
						<p:out var="currentValue" value="${fn:trim(summary)}" />
						
						<c:if test="${empty currentValue or currentValue == ''}">
							<p:out var="shortenTease" value="1"/>
							<p:out var="currentValue" xvalue="$c/doc/story/text/content/*[1]" xslt="${xslt_file}"/>
						</c:if>
					</c:if>
				</c:if>
			</c:when>
			<c:when test="${priority eq 'carousel'}">
				<p:out var="carouselTease" xvalue="$c/doc/story/carousel-tease" xslt="${xslt_file}" />
				<p:out var="currentValue" value="${fn:trim(carouselTease)}" />
				<c:if test="${empty currentValue or currentValue == ''}">
					<p:out var="fsTease" xvalue="$c/doc/story/feature-stack-tease" xslt="${xslt_file}" />
					<p:out var="currentValue" value="${fn:trim(fsTease)}" />
					
					<c:if test="${empty currentValue or currentValue == ''}">
						<p:out var="webtease" xvalue="$c/doc/story/web-tease" xslt="${xslt_file}" />
						<p:out var="currentValue" value="${fn:trim(webtease)}" />
						
						<c:if test="${empty currentValue or currentValue == ''}">
							<p:out var="summary" xvalue="$c/doc/story/summary" xslt="${xslt_file}" />
							<p:out var="currentValue" value="${fn:trim(summary)}" />
							
							<c:if test="${empty currentValue or currentValue == ''}">
								<p:out var="shortenTease" value="1"/>
								<p:out var="currentValue" xvalue="$c/doc/story/text/content/*[1]" xslt="${xslt_file}"/>
							</c:if>
						</c:if>
					</c:if>
				</c:if>
			</c:when>
			<c:when test="${priority eq 'stream'}">
				<p:out var="streamTease" xvalue="$c/doc/story/stream-tease" xslt="${xslt_file}" />
				<p:out var="currentValue" value="${fn:trim(streamTease)}" />
				<c:if test="${empty currentValue or currentValue == ''}">
					<p:out var="summary" xvalue="$c/doc/story/summary" xslt="${xslt_file}" />
					<p:out var="currentValue" value="${fn:trim(summary)}" />
						
					<c:if test="${empty currentValue or currentValue == ''}">
						<p:out var="shortenTease" value="1"/>
						<p:out var="currentValue" xvalue="$c/doc/story/text/content/*[1]" xslt="${xslt_file}"/>
					</c:if>
				</c:if>
			</c:when>
			<c:otherwise>
				<p:out var="webTease" xvalue="$c/doc/story/web-tease" xslt="${xslt_file}"/>
				<p:out var="currentValue" value="${fn:trim(webTease)}" />
				<c:if test="${empty currentValue or currentValue == ''}">
					<p:out var="shortenTease" value="1"/>
					<p:out var="summary" xvalue="$c/doc/story/summary" xslt="${xslt_file}"/>
					<p:out var="currentValue" value="${fn:trim(summary)}" />
					<c:if test="${empty currentValue or currentValue == ''}">
						<p:out var="shortenTease" value="1"/>
						<p:out var="currentValue" xvalue="$c/doc/story/text/content/*[1]" xslt="${xslt_file}"/>
					</c:if>
				</c:if>
			</c:otherwise>
		</c:choose>
		
		<c:if test="${shortenTease == '1' and wordCount > '0'}">
			<c:set var="descSplit" value="${fn:split(currentValue, ' ')}" />
		 	<c:set var="descWordCount" value="" />
		 	<c:forEach items="${descSplit}" var="item" varStatus="status" begin="0" end="${wordCount-1}">
		 		<c:choose>
					<c:when test="${fn:trim(descWordCount) == ''}">
						<p:out var="descWordCount" value="${item}" />
					</c:when>
					<c:otherwise>
						<c:if test="${status.index == wordCount-1 }" >
							<c:if test="${fn:substring(item, fn:length(item)-1, fn:length(item)) == ',' || fn:substring(item, fn:length(item)-1, fn:length(item)) == ';'}" >
								<c:set var="item" value="${fn:substring(item, 0, fn:length(item)-1)}" />
							</c:if>	
						</c:if>
						<c:set var="descWordCount" value="${descWordCount} ${item}" />
					</c:otherwise>
				</c:choose>
			</c:forEach>
			<c:set var="descWordCount" value="${descWordCount}..." />
			<p:out var="currentValue" value="${descWordCount}"/>
			<!-- currentValue is ${currentValue} shortenTease ${shortenTease}-->
		</c:if>
	</c:when>	
	<c:otherwise>
		<c:set var="currentValue" value="System Type Not Accounted for"/>
	</c:otherwise>
</c:choose>
<c:if test="${echo == 'true'}">
	${currentValue}
</c:if>
