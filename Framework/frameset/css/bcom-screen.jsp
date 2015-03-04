<%--
{comments}
BDC-1433 Created new css file so we could remove header/footer styles without messing up Movable Type 
{comments} 
--%>
<%@ taglib prefix="c" uri="jstlCore" %>
<%@ taglib prefix="fn" uri="jstlFunctions"%>

<c:choose>
	<c:when test="${portalContext.env.debug == 'true' || param.debug == 'true'}">
		<link rel="stylesheet" href="/css/bcom-screen.css" />
	</c:when>
	<c:otherwise>
		<link rel="stylesheet" href="/css/hash/${param.hash}/dist/bcom-screen.css" />
	</c:otherwise>
</c:choose>
