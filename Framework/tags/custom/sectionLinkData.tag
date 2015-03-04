<%@ include file="includes/init.inc" %>

<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="sectionId" rtexprvalue="true" required="true" %>

<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END" %>

<jsp:useBean id="contentData" class="java.util.HashMap" />

<p:getObject path="/SysConfig/Classify/Data/Sections_Boston.xml" var="sections" />
<p:object webObject="${sections}" content="sectionContent" />

<p:out var="path" value="" />
<p:out var="name" value="" />

<c:forTokens items="${sectionId}" delims="/" var="item" varStatus="status">
	<p:out var="path" value="${path}/${item}" />
	<p:out var="name" xvalue="$sectionContent//Section[child::SectionPath=$path]/SectionName" />
</c:forTokens>

<c:set target="${contentData}" property="name" value="${name}" />
<c:set target="${contentData}" property="path" value="${path}" />

<c:set var="currentValue" value="${contentData}" />