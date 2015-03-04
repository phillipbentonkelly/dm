<%@ taglib prefix="c" uri="jstlCore" %>
<%@ taglib prefix="fn" uri="jstlFunctions"%>

<c:choose>
	<c:when test="${portalContext.env.debug == 'true' || param.debug == 'true'}">
		<link media="print" rel="stylesheet" href="/css/bdc-print.css" />
	</c:when>
	<c:otherwise>
		<link media="print" rel="stylesheet" href="/css/hash/${param.hash}/dist/bdc-print.css" />
	</c:otherwise>
</c:choose>