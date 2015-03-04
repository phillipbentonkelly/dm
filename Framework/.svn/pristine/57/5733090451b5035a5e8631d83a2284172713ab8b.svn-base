<%@ taglib prefix="c" uri="jstlCore" %>
<%@ taglib prefix="fn" uri="jstlFunctions"%>

<c:choose>
	<c:when test="${portalContext.env.debug == 'true' || param.debug == 'true'}">
		<link rel="stylesheet" href="/css/bdc-screen.css" />
	</c:when>
	<c:otherwise>
		<link rel="stylesheet" href="/css/hash/${param.hash}/dist/bdc-screen.css" />
	</c:otherwise>
</c:choose>