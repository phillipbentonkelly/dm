<%@ taglib prefix="c" uri="jstlCore"%>

<c:set var="s_pageName" value="${param.s_pageName}"/>

<c:if test="${not empty categoryName}">
	<c:set var="s_pageName" value="${s_pageName} | ${forumSectionCategoryName}" />
</c:if>

<c:out value="${s_pageName}" escapeXml="false" />
