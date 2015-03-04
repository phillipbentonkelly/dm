<%--
{comments}
BDC-1159 add hashed/minified screen.css 
{comments} 
--%>
<%@ taglib prefix="c" uri="jstlCore" %>
<%@ taglib prefix="fn" uri="jstlFunctions"%>

<c:choose>
	<c:when test="${portalContext.env.debug == 'true' || param.debug == 'true'}">
		<link rel="stylesheet" href="/css/screen.css" />
	</c:when>
	<c:otherwise>
		<link rel="stylesheet" href="/css/hash/${param.hash}/dist/screen.css" />
	</c:otherwise>
</c:choose>
