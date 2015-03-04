<%@ include file="includes/init.inc" %>

<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="headline" rtexprvalue="true" required="false" %>
<%@ attribute name="link" rtexprvalue="true" required="false" %>

<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END" %>

<jsp:useBean id="contentData" class="java.util.HashMap" />

<%-- Clean the headline --%>
<c:choose>
	<c:when test="${fn:trim(headline) ne ''}">
		<c:set var="headlineSplit" value="${headline}" />
		<c:choose>
			<c:when test="${fn:contains(headline, ' - ')}">
				<c:set var="headlineSplit" value="${fn:trim(fn:substringBefore(headline, ' - '))}" />
			</c:when>
			<c:when test="${fn:contains(headline, ' | ')}">
				<c:set var="headlineSplit" value="${fn:trim(fn:substringBefore(headline, ' | '))}" />
			</c:when>
			<c:otherwise>
				<c:set var="headlineSplit" value="${fn:trim(headline)}" />
			</c:otherwise>
		</c:choose>
		<c:set target="${contentData}" property="headline" value="${headlineSplit}" />
	</c:when>
	<c:otherwise>
		<c:set target="${contentData}" property="headline" value="" />
	</c:otherwise>
</c:choose>

<%-- Clean the URL --%>
<c:choose>
	<c:when test="${fn:trim(link) ne ''}">
		<c:set var="scribbleLiveBS" value="no" />
		<c:set var="storyLink" value="${fn:trim(link)}" />
		<c:if test="${fn:endsWith(link, '/scribblelive/bg_template.html')}">
			<c:set var="scribbleLiveBS" value="yes" />
		</c:if>
		<c:if test="${fn:startsWith(link, 'boston.com') and scribbleLiveBS eq 'no'}">
			<c:set var="storyLink" value="${storyLink}" />
		</c:if>
		<c:if test="${scribbleLiveBS eq 'yes'}">
			<c:set var="storyLink" value="http://www.${storyLink}" />
		</c:if>
		<c:set target="${contentData}" property="link" value="${storyLink}" />
	</c:when>
	<c:otherwise>
		<c:set target="${contentData}" property="link" value="" />
	</c:otherwise>
</c:choose>

<c:set var="currentValue" value="${contentData}" />