<%@ include file="includes/init.inc" %>

<%--  Parameters sent into the tag --%>
<%@ attribute name="templateName" required="true"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>

<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ attribute name="type" required="false"%>
<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"%>
<%@ tag body-content="scriptless" import="java.util.regex.Pattern, java.util.regex.Matcher"%>

<%--
Given the template name, split template by underscores
hsize map - 1st element used to map for hsize
image format - 2nd element used to map for image format
mapping file used /SysConfig/Classify/Data/TemplateFormatMap_Boston.xml
--%>

<jsp:useBean id="teaseData" class="java.util.HashMap" />

<p:getObject path="/SysConfig/Classify/Data/TemplateFormatMap_Boston.xml" var="teaseDataObj" />

<p:out var="hSize" value="" />
<p:out var="imageFormat" value="" />
<c:set var="string" value="${fn:split(templateName, '_')}" />

<c:forEach items="${string}" var="item" varStatus="counter">
	<c:choose>
		<c:when test="${counter.count == 1}">
			<p:out var="hSize" xvalue="$teaseDataObj//map[@template=$item]/@format" />
		</c:when>
		<c:when test="${counter.count == 2}">
			<p:out var="imageFormat" xvalue="$teaseDataObj//map[@template=$item]/@format" />
			<p:out var="imageFormat" value="image_${imageFormat}"/>
		</c:when>
		<c:otherwise>
		</c:otherwise>
	</c:choose>
</c:forEach>

<c:set target="${teaseData}" property="hSize" value="${hSize}" />
<c:set target="${teaseData}" property="imageFormat" value="${imageFormat}" />
				
<c:set var="currentValue" value="${teaseData}"/>