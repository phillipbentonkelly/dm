<%@ include file="includes/init.inc" %>

<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="sectionId" rtexprvalue="true" required="true" %>

<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END" %>

<jsp:useBean id="contentData" class="java.util.HashMap" />

<%
	String source = (String)jspContext.getAttribute("sectionId");
	int count = org.apache.commons.lang.StringUtils.countMatches(source, "/");
	if (count > 1) {
		int index = source.indexOf('/');
		int indexEnd = source.length();
		int indexStart = index + 1;
		String id = source.substring(indexStart,indexEnd);
		int indexRoundTwo = id.indexOf('/');
		int indexEndRoundTwo = indexRoundTwo + 1;
		String finalParentSection = source.substring(0,indexEndRoundTwo);
		jspContext.setAttribute("section", finalParentSection);
	} else {
		jspContext.setAttribute("section", source);
	}
%>

<p:getObject path="/SysConfig/Classify/Data/Sections_Boston.xml" var="sections" />
<p:object webObject="${sections}" content="sectionContent" />

<p:out var="path" value="" />
<p:out var="name" value="" />

<c:forTokens items="${section}" delims="/" var="item" varStatus="status">
	<p:out var="path" value="${path}/${item}" />
	<p:out var="name" xvalue="$sectionContent//Section[child::SectionPath=$path]/SectionName" />
</c:forTokens>

<c:set target="${contentData}" property="name" value="${name}" />
<c:set target="${contentData}" property="path" value="${path}" />

<c:set var="currentValue" value="${contentData}" />