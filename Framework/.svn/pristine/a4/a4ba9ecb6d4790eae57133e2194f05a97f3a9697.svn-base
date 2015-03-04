<%@ include file="includes/init.inc" %>

<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="path" rtexprvalue="true" required="false" %>
<%@ attribute name="uuid" rtexprvalue="true" required="false" %>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object" %>

<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END" %>

<jsp:useBean id="contentData" class="java.util.HashMap" />
<%--
	contentData.objectType
	contentData.stackClass
	contentData.streamClass
	contentData.carouselClass
--%>

<c:choose>
	<c:when test="${not empty path}">
		<p:getObject path="${path}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" />
			<p:out var="objectType" xvalue="$meta//sys/type" scope="page" />
		</c:if>
	</c:when>
	<c:when test="${not empty uuid}">
		<p:getObject uuid="${uuid}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" />
			<p:out var="objectType" xvalue="$meta//sys/type" scope="page" />
		</c:if>
	</c:when>
	<c:when test="${not empty webObject}">
		<p:object webObject="${webObject}" content="c" metadata="meta" />
		<p:out var="objectType" xvalue="$meta//sys/type" scope="page" />
		<p:out var="StoryID" xvalue="$meta//uuid" scope="page" />
	</c:when>
	<c:otherwise>
		<p:currentObject content="c" metadata="meta" webType="WT" uuid="StoryID" />
		<p:out var="objectType" xvalue="$meta//sys/type" scope="page" />
	</c:otherwise>
</c:choose>

<c:choose>
	<c:when test="${objectType eq 'EOM::MediaGallery'}">
		<c:set target="${contentData}" property="objectType" value="${objectType}" />
		<c:set target="${contentData}" property="stackClass" value="tz-gallery-icon" />
		<c:set target="${contentData}" property="streamClass" value="tz-gallery-icon" />
		<c:set target="${contentData}" property="carouselClass" value="tz-gallery-icon" />
	</c:when>
	<c:when test="${objectType eq 'VideoStory'}">
		<c:set target="${contentData}" property="objectType" value="${objectType}" />
		<c:set target="${contentData}" property="stackClass" value="tz-video-icon" />
		<c:set target="${contentData}" property="streamClass" value="tz-video-icon" />
		<c:set target="${contentData}" property="carouselClass" value="tz-video-icon" />
	</c:when>
	<%--
		TODO: Figure out how to handle the quick photos.
			Quick photos have a class of 'tz-image-icon'
	--%>
	<%--
	<c:when test="${objectType eq 'EOM::CompoundStory' or objectType eq 'EOM::Story' or objectType eq 'TextAsset' or objType eq 'WireStory'}">
		<c:set target="${contentData}" property="objectType" value="${objectType}" />
		<c:set target="${contentData}" property="stackClass" value="" />
		<c:set target="${contentData}" property="streamClass" value="" />
		<c:set target="${contentData}" property="carouselClass" value="" />
		
		<p:out var="firstMMC" xvalue="local-name($c//multimedia-container/*[1])" />
		<c:if test="${not empty firstMMC}">
			<c:choose>
				<c:when test="${firstMMC == 'video-container'}">
					<c:set target="${contentData}" property="objectType" value="${objectType}" />
					<c:set target="${contentData}" property="stackClass" value="tz-video-icon" />
					<c:set target="${contentData}" property="streamClass" value="tz-video-icon" />
					<c:set target="${contentData}" property="carouselClass" value="" />
				</c:when>
			</c:choose>
		</c:if>
	</c:when>
	--%>
	<c:otherwise>
		<c:set target="${contentData}" property="objectType" value="none" />
		<c:set target="${contentData}" property="stackClass" value="" />
		<c:set target="${contentData}" property="streamClass" value="" />
		<c:set target="${contentData}" property="carouselClass" value="" />
	</c:otherwise>
</c:choose>

<c:set var="currentValue" value="${contentData}" />