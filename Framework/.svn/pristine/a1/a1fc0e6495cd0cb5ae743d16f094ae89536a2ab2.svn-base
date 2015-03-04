<%-- 
	{comments}
	DM-43: Handle omniture tags in links with anchor tags.
	{comments}
 --%>

<%@ include file="includes/init.inc" %>

<%-- <%@ attribute name="var" rtexprvalue="false" required="true" %> --%>
<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>
<%@ attribute name="className" rtexprvalue="true" required="false"%>
<%@ attribute name="onClick" rtexprvalue="true" required="false"%>
<%@ attribute name="otherAttributes" rtexprvalue="true" required="false"%>
<%@ attribute name="isFStack" rtexprvalue="true" required="false" %>
<%@ attribute name="section" rtexprvalue="true" required="false"%>
<%@ attribute name="element" rtexprvalue="true" required="false"%>
<%@ attribute name="objectPosition" rtexprvalue="true" required="false"%>
<%@ attribute name="elementType" rtexprvalue="true" required="false"%>
<%@ attribute name="value" rtexprvalue="true" required="false"%>
<%@ attribute name="type" rtexprvalue="true" required="false"%>
<%@ attribute name="absolute" rtexprvalue="true" required="false"%>
<%@ attribute name="defaultHeadline" rtexprvalue="true" required="false"%>
<%@ attribute name="linkParam" rtexprvalue="true" required="false"%>

<%-- <%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"  %> --%>

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
			<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com"  />
		</c:if>
	</c:when>
	<c:when test="${not empty webObject}">
		<p:object webObject="${webObject}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com" />
		<p:getObject var="obj" webObject="${webObject}" />
	</c:when>
	<c:when test="${type eq 'internal' and not empty value}">
		<p:getObject path="${value}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com"/>
		</c:if>
	</c:when>
	<c:otherwise>
		<p:currentObject content="c" metadata="meta"  webType="WT" uuid="StoryID" channel="Boston.com" />
	</c:otherwise>
</c:choose>

<p:out var="objType" xvalue="$meta//sys/type" scope="page"/>

<p:out var="classAttrib" value=""/>
<p:out var="urlAnchorTag" value=""/>

<c:if test="${section eq '/'}">
	<p:out var="section" value="/homepage" />
</c:if>
<c:if test="${onClick}">
	<p:out var="onClickAttrib" value=" data-omniclick=\"${elementType}${objectPosition} | ${element}\""/>
	<%--
	<c:choose>
		<c:when test="${isFStack}">
			<p:out var="onClickAttrib" value=" data-omniclick=\"${elementType}${objectPosition} | ${element}');s.linkTrackEvents=s.linkTrackVars=s.events='';}\""/>
		</c:when>
		<c:otherwise>
			<p:out var="onClickAttrib" value=" data-omniclick=\"${elementType}${objectPosition} | ${element}\""/>
		</c:otherwise>
	</c:choose>
	--%>
</c:if>

<c:if test="${not empty className}">
	<p:out var="classAttrib" value=" class=\"${className}\""/>
</c:if>

<c:choose>
	<c:when test="${type eq 'internal'}">
		<p:out var="linkType" value="resource"/>
	</c:when>
	<c:when test="${type eq 'external'}">
		<p:out var="linkType" value="context"/>
	</c:when>
	<c:when test="${not empty type}">
		<p:out var="linkType" value="${type}"/>
	</c:when>
	<c:otherwise>
		<p:out var="linkType" value="context"/>
	</c:otherwise>
</c:choose>

<c:choose>
	<c:when test="${empty absolute}">
		<p:out var="urlType" value="false"/>
	</c:when>
	<c:otherwise>
		<p:out var="urlType" value="${absolute}"/>
	</c:otherwise>
</c:choose>

<jsp:doBody var="bodyText"/>

<c:if test="${empty bodyText and not empty defaultHeadline}">
	<p:out var="bodyText" value="${defaultHeadline}" />
</c:if>

<c:if test="${not empty bodyText}">
	<c:choose>
		<c:when test="${empty path and empty uuid and empty webObject and type ne 'internal'}">
			<c:choose>
				<c:when test="${not empty value}">
					<p:out var="url" value="${fn:trim(value)}" />
					<c:choose>
						<c:when test="${fn:startsWith(url,'/')}" >
							<p:url var="url" value="${url}" type="context" public="${urlType}"/>
						</c:when>
						<c:when test="${not fn:startsWith(url,'http://') and not fn:startsWith(url,'https://') and not fn:startsWith(url,'ftp://')}" >
							<p:out var="url" value="http://${url}" />
						</c:when>
					</c:choose>
					<p:url var="url" value="${url}" type="${linkType}" public="${urlType}"/>
					<c:if test="${not empty linkParam}">
						<c:if test="${fn:contains(url, '#')}">
							<p:out var="urlAnchorTag" value="${fn:substringAfter(url, '#')}" />
							<p:out var="url" value="${fn:substringBefore(url, '#')}" />
						</c:if>
						<c:choose>
							<c:when test="${fn:endsWith(url,'?')}">
								<p:out var="url" value="${url}${linkParam}"/>
							</c:when>
							<c:when test="${fn:contains(url,'?') and fn:endsWith(url,'&')}">
								<p:out var="url" value="${url}${linkParam}"/>
							</c:when>
							<c:when test="${fn:contains(url,'?') and not fn:endsWith(url,'&')}">
								<p:out var="url" value="${url}&${linkParam}"/>
							</c:when>
							<c:otherwise>
								<p:out var="url" value="${url}?${linkParam}"/>
							</c:otherwise>
						</c:choose>
						<c:if test="${not empty urlAnchorTag}">
							<p:out var="url" value="${url}\#${urlAnchorTag}"/>
						</c:if>
					</c:if>
					<c:set var="attributesWithSpaces" value="${classAttrib} ${onClickAttrib} ${otherAttributes}" />
					<a href="${url}" ${ attributesWithSpaces}>${bodyText}</a>
				</c:when>
				<c:otherwise>
					<jsp:doBody/>
				</c:otherwise>
			</c:choose>
		</c:when>
		
		<c:when test="${objType eq 'TextAsset' or objType eq 'StreamTease' or WT eq 'streamtease'}">
			<p:out var="url" xvalue="$c//doc/story/xref" />
			<p:out var="url" value="${fn:trim(url)}" />
			<c:choose>
				<c:when test="${not empty url}">
					<p:out var="url" value="${fn:trim(url)}" />
					<c:choose>
						<c:when test="${fn:startsWith(url,'/')}" >
							<p:url var="url" value="${url}" type="context" public="${urlType}"/>
						</c:when>
						<c:when test="${not fn:startsWith(url,'http://') and not fn:startsWith(url,'https://') and not fn:startsWith(url,'ftp://')}">
							<p:out var="url" value="http://${url}" />
						</c:when>
					</c:choose>
					
					<c:if test="${not empty linkParam}">
						<c:if test="${fn:contains(url, '#')}">
							<p:out var="urlAnchorTag" value="${fn:substringAfter(url, '#')}" />
							<p:out var="url" value="${fn:substringBefore(url, '#')}" />
						</c:if>
						<c:choose>
							<c:when test="${fn:endsWith(url,'?')}">
								<p:out var="url" value="${url}${linkParam}"/>
							</c:when>
							<c:when test="${fn:contains(url,'?') and fn:endsWith(url,'&')}">
								<p:out var="url" value="${url}${linkParam}"/>
							</c:when>
							<c:when test="${fn:contains(url,'?') and not fn:endsWith(url,'&')}">
								<p:out var="url" value="${url}&${linkParam}"/>
							</c:when>
							<c:otherwise>
								<p:out var="url" value="${url}?${linkParam}"/>
							</c:otherwise>
						</c:choose>
						<c:if test="${not empty urlAnchorTag}">
							<p:out var="url" value="${url}\#${urlAnchorTag}"/>
						</c:if>
					</c:if>
					<c:set var="attributesWithSpaces" value="${classAttrib} ${onClickAttrib} ${otherAttributes}" />
					<a href="${url}" ${ attributesWithSpaces}>${bodyText}</a>				</c:when>
				<c:otherwise>
					<jsp:doBody/>
				</c:otherwise>
			</c:choose>
		</c:when>
		<c:otherwise>
			<p:url var="url" webObject="${obj}" public="${urlType}"/>
				<c:if test="${not empty linkParam}">
					<c:if test="${fn:contains(url, '#')}">
							<p:out var="urlAnchorTag" value="${fn:substringAfter(url, '#')}" />
							<p:out var="url" value="${fn:substringBefore(url, '#')}" />
						</c:if>
					<c:choose>
						<c:when test="${fn:endsWith(url,'?')}">
							<p:out var="url" value="${url}${linkParam}"/>
						</c:when>
						<c:when test="${fn:contains(url,'?') and fn:endsWith(url,'&')}">
							<p:out var="url" value="${url}${linkParam}"/>
						</c:when>
						<c:when test="${fn:contains(url,'?') and not fn:endsWith(url,'&')}">
							<p:out var="url" value="${url}&${linkParam}"/>
						</c:when>
						<c:otherwise>
							<p:out var="url" value="${url}?${linkParam}"/>
						</c:otherwise>
					</c:choose>
					<c:if test="${not empty urlAnchorTag}">
						<p:out var="url" value="${url}\#${urlAnchorTag}"/>
					</c:if>
				</c:if>
				<c:set var="attributesWithSpaces" value="${classAttrib} ${onClickAttrib} ${otherAttributes}" />
				<a href="${url}" ${ attributesWithSpaces}>${bodyText}</a>
		</c:otherwise>
	</c:choose>
</c:if>


