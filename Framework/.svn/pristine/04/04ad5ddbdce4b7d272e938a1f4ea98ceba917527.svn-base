<%@ tag body-content="scriptless" %>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="section" rtexprvalue="true" required="false"%>
<%@ attribute name="echo" rtexprvalue="false" required="false"%>
<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"  %>


<c:if test="${empty section or section == ''}">
	<p:out var="section" value="news" />
</c:if>

<p:out var="sectionlc" value="${fn:toLowerCase(section)}" />
<p:out var="trackingVals" value="${fn:replace(sectionlc, '/', ' | ')}" />


<c:set var="currentValue" value="${trackingVals}" />
<c:if test="${echo == 'true'}">
		${currentValue}
</c:if>
