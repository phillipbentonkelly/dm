<%@ taglib prefix="jp" uri="jptag" %>
<%@ taglib prefix="x" uri="jstlXml" %>
<%@ taglib prefix="c" uri="jstlCore" %>
<c:set var="ugcUrl" value="${portalContext.publicBaseUrl}/ugc" scope="request"/>
<c:choose>
	<c:when test="${ugc.user.id != null}">
		<c:set var="viewingUserIdQueryString" value="?viewingUserId=${ugc.user.id}"/>
	</c:when>
	<c:otherwise>
		<c:set var="viewingUserIdQueryString" value=""/>
	</c:otherwise>
</c:choose>


<c:set var="userUrl" value="${ugcUrl}/users/${user}${viewingUserIdQueryString}"/>
<c:catch var="catchExceptionUserProfile">
	<c:import var="userDoc" url="${userUrl}" /> 
	<x:parse var="userXml"  doc="${userDoc}" />
</c:catch>
<c:set var="catchExceptionUserProfile" value="${catchExceptionUserProfile}" scope="request"/>
<c:if test="${catchExceptionUserProfile != null }">
	<c:set var="show" value="no-user" scope="request"/>
</c:if>

<c:if test="${catchExceptionUserProfile == null }">
	<x:set var="userName" select="string($userXml/user/name/text())" scope="request"/>
	<x:set var="userIcon" select="string($userXml/user/imageUrl/text())" scope="request"/>
	<x:set var="userGender" select="string($userXml/user/gender/text())"scope="request"/>
	<x:set var="userLocation" select="string($userXml/user/location/text())" scope="request"/>
	<x:set var="aboutMe" select="string($userXml/user/aboutMe/text())" scope="request"/>
	<x:set var="forumSignature" select="string($userXml/user/forumSignature/text())" scope="request"/>
	<x:set var="userProfileVisibility" select="string($userXml/user/profileVisibility/text())" scope="request"/>
	<x:set var="active" select="string($userXml/user/active/text())" scope="request"/>
	<x:set var="tier" select="string($userXml/user/tier/text())" scope="request"/>
	<x:set var="type" select="string($userXml/user/type/text())" scope="request"/>
	<c:set var="viewingOwnProfile" value="${ugc.user.id eq user}" scope="request"/>
	<x:set var="ignored" select="string($userXml/user/ignored/text())" scope="request"/>
	<c:set var="hasGenderOnly" value="${(userGender ne 'HIDE') && (userGender ne '') && (userGender != null)}" scope="request"/>
	<c:set var="hasLocationOnly" value="${(userLocation ne '') && (userLocation != null)}" scope="request"/>
	<c:set var="hasAgeOnly" value="${(userAge ne '') && (userAge != null)}" scope="request"/>
	<c:set var="emptyProfile" value="${!hasGenderOnly && !hasAgeOnly && !hasLocationOnly}" scope="request"/>
	<c:set var="hasAboutMe" value="${aboutMe ne ''}" scope="request"/>
	<c:set var="hasGenderAndLocation" value="${hasGenderOnly && hasLocationOnly}" scope="request"/>
	<c:set var="hasGenderAndAge" value="${hasGenderOnly && hasAgeOnly}" scope="request"/>
	<c:set var="hasAgeAndLocation" value="${hasAgeOnly && hasLocationOnly}" scope="request"/>
	<c:set var="hasGenderAgeLocation" value="${hasGenderOnly && hasAgeOnly && hasLocationOnly}" scope="request"/>
	
	
	<%
			String userName = (String)pageContext.getAttribute("userName", PageContext.REQUEST_SCOPE);
			String userS= userName+"\'s";
		    pageContext.setAttribute("userS", userS, PageContext.REQUEST_SCOPE);
	%>
	
	<c:catch var="catchMessagesException">
		<c:set var="messagesUrl" value="${ugcUrl}/interactions?namedUser=${user}&type=MESSAGE"/>
		<c:import var="messagesDoc" url="${messagesUrl}" /> 
		<x:parse var="messagesXml"  doc="${messagesDoc}" scope="request"/>
		<x:set var="messages" select="string($messagesXml/interactions)" scope="request"/>
	</c:catch>
</c:if>
