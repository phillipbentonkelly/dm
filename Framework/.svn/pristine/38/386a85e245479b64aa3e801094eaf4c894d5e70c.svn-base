<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="jp" uri="jptag"%> 
<%@ taglib prefix="x" uri="jstlXml" %>
<%@ taglib prefix="fn" uri="jstlFunctions"%>

<c:set var="loggedIn" value="false" scope="request"/>
<jsp:useBean id="ugc" class="java.util.HashMap" scope="request"/>
<jsp:useBean id="user" class="java.util.HashMap"/>
<c:set var="regiAuthToken" value="${cookie['pathAuth'].value}" />
<c:set var="ugcUrl" value="${portalContext.publicBaseUrl}/ugc" scope="request"/>
<c:if test="${regiAuthToken != null}">
	<c:set var="currentUserUrl" value="${ugcUrl}/users/regiauthtoken/${regiAuthToken}"/>
	<c:catch var="catchException">
		<c:import var="doc" url="${currentUserUrl}" />
	</c:catch>
	<c:choose> 
		<c:when test="${ catchException == null }">
			<c:set var="loggedIn" value="true" scope="request"/>
			<x:parse var="xml" doc="${doc}" />
				<x:set var="id" select="string($xml/user/id/text())"/>
				<x:set var="name" select="string($xml/user/name/text())"/>
				<x:set var="tier" select="string($xml/user/tier/text())"/>
				<x:set var="type" select="string($xml/user/type/text())"/>
				<x:set var="active" select="string($xml/user/active/text())"/>
				<x:set var="imageUrl" select="string($xml/user/imageUrl/text())"/>				
		</c:when>
	</c:choose>
</c:if>
<c:set target="${user}" property="id" value="${id}"/>
<c:set target="${user}" property="name" value="${name}"/>
<c:set target="${user}" property="tier" value="${tier}"/>
<c:set target="${user}" property="type" value="${type}"/>
<c:set target="${user}" property="active" value="${active}"/>
<c:set target="${user}" property="imageUrl" value="${imageUrl}"/>

<c:set target="${ugc}" property="user" value="${user}"/>
