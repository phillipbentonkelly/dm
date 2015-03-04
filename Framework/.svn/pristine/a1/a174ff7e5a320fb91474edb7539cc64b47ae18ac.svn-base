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
		<p:object webObject="${webObject}" content="c" metadata="meta" channel="Boston.com"/>
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
                                    
<p:out var="galleryUrl" xvalue="$c//multimedia-container/gallery-container/@href" />
<p:out var="galleryTemp" value="${fn:substringAfter(galleryUrl, '?uuid=')}" />
<p:out var="galleryUuid" value="${fn:substringBefore(galleryTemp, '&id=')}" />

<c:set var="currentValue" value="${galleryUuid}"/>
<c:if test="${echo == 'true'}">
	${currentValue}
</c:if>