<%@ taglib prefix="c" uri="jstlCore" %>
<%@ taglib prefix="fmt" uri="formatTags" %>

<c:set var="pagination" value="2"/>
<c:forEach var="i" begin="2" end="2" step="1" varStatus="status">
	<p>why is i not being printed ${i}</p>
</c:forEach>

<c:set var="four" value="4" />
<c:set var="three" value="3" />
<c:set var="numPages" value="${four div three}" />
<c:set var="resultInDouble" value="${numPages}" />
<p>resultInDouble ${resultInDouble} </p>
<c:set var="resultInDoubleZero" value="${resultInDouble - (resultInDouble%1)}" /> 
<p>resultInDoubleZero ${resultInDoubleZero} </p>
<c:choose>
	<c:when test="${resultInDouble > resultInDoubleZero}">
		<fmt:parseNumber value="${numPages + 1}" integerOnly="true" var="numPages"/>
	</c:when>
	<c:otherwise>
		<fmt:parseNumber value="${numPages}" integerOnly="true" var="numPages"/>
	</c:otherwise>
</c:choose> 
<p>${numPages}</p>
