<%-- 

This gets all of the headlines associated with a content object.
This can include: the headline, the feature stack headline, 
the carousel headline, stream headline, and any other permutations 

--%>


<%@ include file="includes/init.inc" %>

<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="xsltFile" rtexprvalue="true" required="false"%>
<%@ attribute name="edition" rtexprvalue="true" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>
<%@ attribute name="echo" rtexprvalue="false" required="false"%>
<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"  %>

<jsp:useBean id="contentData" class="java.util.HashMap"/>

<p:out var="xslt_default" value="$configurationURI/Framework/xslt/story_default.xslt" />
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

<c:if test="${empty StoryID}">
	<p:out xvalue="$meta//uuid" var="StoryID"/>
</c:if>


<%-- jjf removed : objType ${objType} --%>
<c:choose>
	<c:when test="${objType eq 'EOM::MediaGallery'}">
		<p:out var="overline" 	xvalue="$c/doc/story/multimedia-container[1]/gallery-container[1]/headlines[1]/overline/p" xslt="${xslt_file}"/>
		<p:out var="headline" 	xvalue="$c/doc/story/multimedia-container/gallery-container/headlines/headline/p" xslt="${xslt_file}"/>
		<p:out var="shortheadline"	xvalue="$c/doc/story/multimedia-container/gallery-container/headlines/shortheadline/p" xslt="${xslt_file}"/>
		<p:out var="subheadline"	xvalue="$c/doc/story/multimedia-container/gallery-container/headlines/subheadline/p" xslt="${xslt_file}"/>
		<p:out var="featureStack"	xvalue="$c/doc/story/multimedia-container/gallery-container/headlines/feature-stack-headline/p" xslt="${xslt_file}" />
		<p:out var="streamHeadline"	xvalue="$c/doc/story/multimedia-container/gallery-container/headlines/stream-headline/p" xslt="${xslt_file}" />
		<p:out var="carouselHeadline"	xvalue="$c/doc/story/multimedia-container/gallery-container/headlines/carousel-headline/p" xslt="${xslt_file}" />
		
		<c:if test="${empty featureStack or fn:trim(featureStack) == ''}">
			<c:set var="featureStack" value="${headline}" />
		</c:if>
		<c:if test="${empty streamHeadline or fn:trim(streamHeadline) == ''}">
			<c:set var="streamHeadline" value="${headline}" />
		</c:if>
		<c:if test="${empty carouselHeadline or fn:trim(carouselHeadline) == ''}">
			<c:set var="carouselHeadline" value="${headline}" />
		</c:if>
		
		<c:set target="${contentData}" property="overline" value="${overline}"/>
		<c:set target="${contentData}" property="headline" value="${headline}"/>
		<c:set target="${contentData}" property="shortheadline" value="${shortheadline}"/>
		<c:set target="${contentData}" property="subheadline" value="${subheadline}"/>
		<c:set target="${contentData}" property="featureStackHeadline" value="${fn:trim(featureStack)}" />
		<c:set target="${contentData}" property="streamHeadline" value="${fn:trim(streamHeadline)}" />
		<c:set target="${contentData}" property="carouselHeadline" value="${fn:trim(carouselHeadline)}" />
		<c:set var="currentValue" value="${contentData}"/>
	</c:when>
	<c:when test="${objType eq 'VideoStory'}">	
		<p:out var="overline" xvalue="$c/doc/story/headlines/overline/p" xslt="${xslt_file}"/>
		<p:out var="headline" xvalue="$c/doc/story/headlines/headline/p" xslt="${xslt_file}"/>
		<p:out var="shortheadline" xvalue="$c/doc/story/headlines/shortheadline/p" xslt="${xslt_file}"/>
		<p:out var="subheadline" xvalue="$c/doc/story/headlines/subheadline/p" xslt="${xslt_file}"/>
		<p:out var="secondSubheadline" xvalue="$c/doc/story/headlines/subheadline2/p" xslt="${xslt_file}"/>
		<p:out var="featureStack"		xvalue="$c/doc/story/headlines/feature-stack-headline/p" xslt="${xslt_file}" />
		<p:out var="streamHeadline"		xvalue="$c/doc/story/headlines/stream-headline/p" xslt="${xslt_file}" />
		<p:out var="carouselHeadline"	xvalue="$c/doc/story/headlines/carousel-headline/p" xslt="${xslt_file}" />
		
		<c:if test="${empty featureStack or fn:trim(featureStack) == ''}">
			<c:set var="featureStack" value="${headline}" />
		</c:if>
		<c:if test="${empty streamHeadline or fn:trim(streamHeadline) == ''}">
			<c:set var="streamHeadline" value="${headline}" />
		</c:if>
		<c:if test="${empty carouselHeadline or fn:trim(carouselHeadline) == ''}">
			<c:set var="carouselHeadline" value="${headline}" />
		</c:if>
		
		<c:set target="${contentData}" property="overline" value="${overline}"/>
		<c:set target="${contentData}" property="headline" value="${headline}"/>
		<c:set target="${contentData}" property="shortheadline" value="${shortheadline}"/>
		<c:set target="${contentData}" property="subheadline" value="${subheadline}"/>
		<c:set target="${contentData}" property="secondSubheadline" value="${secondSubheadline}"/>
		<c:set target="${contentData}" property="featureStackHeadline" value="${featureStack}" />
		<c:set target="${contentData}" property="streamHeadline" value="${streamHeadline}" />
		<c:set target="${contentData}" property="carouselHeadline" value="${carouselHeadline}" />	
		<c:set var="currentValue" value="${contentData}"/>
	</c:when>
	<c:when test="${objType eq 'EOM::Story' or objType eq 'EOM::CompoundStory' or objType eq 'TextAsset' or objType eq 'WireStory' or objType eq 'StreamTease'}">
		<p:out var="overline"	xvalue="$c/doc/story/headlines/overline/p" xslt="${xslt_file}"/>
		<p:out var="headline"	xvalue="$c/doc/story/headlines/headline/p" xslt="${xslt_file}"/>
		<p:out var="shortheadline"	xvalue="$c/doc/story/headlines/shortheadline/p" xslt="${xslt_file}"/>
		<p:out var="subheadline"	xvalue="$c/doc/story/headlines/subheadline/p" xslt="${xslt_file}"/>
		<p:out var="featureStack"	xvalue="$c/doc/story/headlines/feature-stack-headline/p" xslt="${xslt_file}" />
		<p:out var="streamHeadline"	xvalue="$c/doc/story/headlines/stream-headline/p" xslt="${xslt_file}" />
		<p:out var="carouselHeadline"	xvalue="$c/doc/story/headlines/carousel-headline/p" xslt="${xslt_file}" />
		
		<c:if test="${empty featureStack or fn:trim(featureStack) == ''}">
			<c:set var="featureStack" value="${headline}" />
		</c:if>
		<c:if test="${empty streamHeadline or fn:trim(streamHeadline) == ''}">
			<c:set var="streamHeadline" value="${headline}" />
		</c:if>
		<c:if test="${empty carouselHeadline or fn:trim(carouselHeadline) == ''}">
			<c:set var="carouselHeadline" value="${headline}" />
		</c:if>
		
		<c:set target="${contentData}" property="overline" value="${fn:trim(overline)}"/>
		<c:set target="${contentData}" property="headline" value="${fn:trim(headline)}"/>
		<c:set target="${contentData}" property="shortheadline" value="${fn:trim(shortheadline)}"/>
		<c:set target="${contentData}" property="subheadline" value="${fn:trim(subheadline)}"/>
		<c:set target="${contentData}" property="featureStackHeadline" value="${fn:trim(featureStack)}" />
		<c:set target="${contentData}" property="streamHeadline" value="${fn:trim(streamHeadline)}" />
		<c:set target="${contentData}" property="carouselHeadline" value="${fn:trim(carouselHeadline)}" />
		<c:set var="currentValue" value="${contentData}"/>
	</c:when>	
	<c:otherwise>
	    <c:set target="${contentData}" property="overline" value="System Type Not Accounted for"/>
		<c:set target="${contentData}" property="headline" value="System Type Not Accounted for"/>
		<c:set target="${contentData}" property="shortheadline" value=""/>
		<c:set target="${contentData}" property="subheadline" value=""/>
		<c:set target="${contentData}" property="featureStackHeadline" value="" />
		<c:set target="${contentData}" property="streamHeadline" value="" />
		<c:set target="${contentData}" property="carouselHeadline" value="" />
		<c:set var="currentValue" value="${contentData}"/>
	</c:otherwise>
</c:choose>