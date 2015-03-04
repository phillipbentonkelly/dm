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

<p:out var="firstMMC" xvalue="local-name($c//multimedia-container/*[1])" />

<%-- determine the objType of first multi-media container asset --%>

<c:choose>
	<c:when test="${firstMMC eq 'video-container'}">
		<c:set var="currentValue" value="video-container"/>
		<c:if test="${echo == 'true'}">
			${currentValue}
		</c:if>
	</c:when>
	<c:when test="${firstMMC eq 'photo-container'}">
		<c:set var="currentValue" value="photo-container"/>
		<c:if test="${echo == 'true'}">
			${currentValue}
		</c:if>
	</c:when>
	<c:when test="${firstMMC eq 'gallery-container'}">
		<c:set var="currentValue" value="gallery-container" />
		<c:if test="${echo == 'true'}">
			${currentValue}
		</c:if>
	</c:when>
</c:choose>