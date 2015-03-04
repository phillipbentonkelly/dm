<%@ taglib prefix="jp" uri="jptag" %>
<%@ taglib prefix="x" uri="jstlXml" %>
<%@ taglib prefix="c" uri="jstlCore" %>
<%@ taglib prefix="fn" uri="jstlFunctions" %>
<%@ taglib prefix="bg" tagdir="/WEB-INF/tags/eom$configurationURI/Framework/tags/custom" %>
<%@ page import="java.lang.String.*, java.util.Date, java.text.SimpleDateFormat" %>
<c:set var="loginStatus" value="loggedOut" />
<c:set var="dataAdmin" value="false" />
<c:set var="ugcUrl" value="${portalContext.publicBaseUrl}/ugc"/>
<c:set var="regiAuthToken" value="${cookie['pathAuth'].value}" />

<c:choose>
	<c:when test="${ regiAuthToken != null }">
		<c:set var="currentUserUrl" value="${ugcUrl}/users/regiauthtoken/${regiAuthToken}"/>
		<c:catch var="catchException">	
			<c:import var="currentUserDoc" url="${currentUserUrl}" />
		</c:catch>
		<c:choose>
			<c:when test="${ catchException == null }">		
				<x:parse var="currentUserXml" doc="${currentUserDoc}" />
				<x:set var="currentUserName" select="string($currentUserXml/user/name/text())"/>
				<x:set var="currentUserId" select="string($currentUserXml/user/id/text())"/>
				<x:set var="currentUserTier" select="string($currentUserXml/user/tier/text())"/>
				<x:set var="currentUserIsActive" select="string($currentUserXml/user/active/text())"/>
				<c:if test="${currentUserTier eq 'ADMIN'}">
					<c:set var="dataAdmin" value="true" />
				</c:if>
				<c:set var="loginStatus" value="loggedIn" />
			</c:when>
			<%-- norlov@thumbtack.net: fix for http://jira.boston.com/browse/BCOM-8261 --%>
			<c:when test="${fn:contains(catchException.message, 'FileNotFound')==true or fn:contains(catchException.message, 'Server returned HTTP response code: 401') == true}">
				<c:set var="loginStatus" value="notFound" />
			</c:when>
		</c:choose>
	</c:when>
</c:choose>

<c:choose>
	<c:when test="${show eq 'forum_index'}">
		<%-- FORUM INDEX --%>
		<c:set var="class" value="forums"/>
		<c:set var="forumsUrl" value="${ugcUrl}/forums/with/sections" />
		<c:import var="forumsDoc" url="${forumsUrl}" />
		<x:parse var="forumsXml" doc="${forumsDoc}" />
	</c:when>
	<c:when test="${show eq 'section_index'}">
		<%-- SECTION INDEX --%>
		<%-- This url is cached by OPS-15679 for performance --%>
		<c:set var="forumUrl" value="${ugcUrl}/cached/${forumParent}.xml"/>
		<%-- <c:set var="forumUrl" value="${ugcUrl}/forum/id/${forumParent}/with/topics-categories"/>--%>
		<c:import var="forumDoc" url="${forumUrl}" />
		<x:parse var="forumXml"  doc="${forumDoc}" />
		<x:set var="forumName" select="string($forumXml/forum/name/text())"/>
		<x:set var="forumUrl" select="string($forumXml/forum/url/text())"/>
		<c:set var="class" value="sections" />
	</c:when>
	<c:when test="${show eq 'category_index'}">
		<%-- CATEGORY INDEX --%>
		<c:set var="forumSectionUrl" value="${ugcUrl}/forumsection/id/${sectionParent}/with/forum-categories-discussions" />
		<c:import var="forumSectionDoc" url="${forumSectionUrl}" /> 
		<x:parse var="forumSectionXml"  doc="${forumSectionDoc}" />
		<x:set var="forumSectionName" select="string($forumSectionXml/forumSection/name/text())"/>
		<x:set var="forumSectionUrl" select="string($forumSectionXml/forumSection/url/text())"/>	
		<x:set var="forumName" select="string($forumSectionXml/forumSection/forum/name/text())"/>
		<x:set var="forumUrl" select="string($forumSectionXml/forumSection/forum/url/text())"/>
		<c:set var="class" value="categories" />
	</c:when>
	<c:when test="${show eq 'discussion_index'}">
		<%-- DISCUSSION INDEX --%>
		<c:set var="forumSectionCategoryUrl" value="${ugcUrl}/forumsectioncategory/id/${categoryParent}/with/forum-forumsection"/>			
		<%-- <c:set var="append" value="${categoryParent}"/> --%>	
		<c:import var="forumSectionCategoryDoc" url="${forumSectionCategoryUrl}" />
		<x:parse var="forumSectionCategoryXml"  doc="${forumSectionCategoryDoc}" />
		<x:set var="forumSectionCategoryId" select="string($forumSectionCategoryXml/forumSectionCategory/id/text())"/>
		<x:set var="forumSectionCategoryName" select="string($forumSectionCategoryXml/forumSectionCategory/name/text())" scope="request"/>
		<x:set var="categoryDesc" select="string($forumSectionCategoryXml/forumSectionCategory/desc/text())"/>
		<x:set var="forumId" select="string($forumSectionCategoryXml/forumSectionCategory/forum/id/text())"/>
		<x:set var="forumName" select="string($forumSectionCategoryXml/forumSectionCategory/forum/name/text())"/>
		<x:set var="forumUrl" select="string($forumSectionCategoryXml/forumSectionCategory/forum/url/text())"/>
		<x:set var="forumSectionName" select="string($forumSectionCategoryXml/forumSectionCategory/forumSection/name/text())"/>
		<x:set var="forumSectionUrl" select="string($forumSectionCategoryXml/forumSectionCategory/forumSection/url/text())"/>
		<x:set var="forumSectionCategoryUrl" select="string($forumSectionCategoryXml/forumSectionCategory/url/text())"/>	
		<c:set var="class" value="discussions" />
		<c:set var="page" value="${param.page}"/>
		<c:if test="${(page eq null) || (page eq '')}">
			<c:set var="page" value="1"/>
		</c:if>
		<c:set var="limitPerPage" value="25"/>
		<c:set var="currentPage" value="1"/>
		<c:set var="discussionsUrl" value="${ugcUrl}/topics?type=FORUM&sort=LATEST_POST_CREATE_DATE_DESC_STICKY_FIRST&sectionCategoryKey=${categoryParent}&limit=${limitPerPage}&offset=${limitPerPage*(page-1)}"/>
		<c:import var="discussionsDoc" url="${discussionsUrl}" /> 
		<x:parse var="discussionsXml"  doc="${discussionsDoc}" />
		<x:set var="count" select="string($discussionsXml/topics/@total)" />
        <fmt:parseNumber value="${count}" integerOnly="true" var="count"/>
		<c:set var="preNumPages" value="${count div limitPerPage}"/>	
		<c:set var="resultInDouble" value="${preNumPages}" />
		<c:set var="resultInDoubleZero" value="${resultInDouble - (resultInDouble%1)}" /> 
		<c:choose>
			<c:when test="${resultInDouble > resultInDoubleZero}">
				<fmt:parseNumber value="${preNumPages + 1}" integerOnly="true" var="numPages"/>
			</c:when>
			<c:otherwise>
				<fmt:parseNumber value="${preNumPages}" integerOnly="true" var="numPages"/>
			</c:otherwise>
		</c:choose> 
		<%@ include file="components/pagination2.jsp" %>
	</c:when>
	<c:when test="${show eq 'discussion'}">
		<%-- A DISCUSSION FORM --%>
		<c:set var="discussionUrl" value="${ugcUrl}/topics?type=FORUM&id=${currentDiscussion}&forumSectionCategory=True"/>
		<c:import var="discussionDoc" url="${discussionUrl}" />
		<x:parse var="discussionXml"  doc="${discussionDoc}" />
		<x:set var="discussionTitle" select="string($discussionXml/topics/topic/title/text())"/>
		<x:set var="forumId" select="string($discussionXml/topics/topic/forum/id/text())"/>
		<x:set var="forumName" select="string($discussionXml/topics/topic/forum/name/text())"/>
		<x:set var="forumUrl" select="string($discussionXml/topics/topic/forum/url/text())"/>
		<x:set var="forumSectionName" select="string($discussionXml/topics/topic/section/name/text())"/>
		<x:set var="forumSectionUrl" select="string($discussionXml/topics/topic/section/url/text())"/>
		<x:set var="forumSectionCategoryId" select="string($discussionXml/topics/topic/category/id/text())"/>					
		<x:set var="forumSectionCategoryName" select="string($discussionXml/topics/topic/category/name/text())"/>					
		<x:set var="forumSectionCategoryUrl" select="string($discussionXml/topics/topic/category/url/text())"/>					
		<x:set var="discussionUrl" select="string($discussionXml/topics/topic/url/text())"/>
		<x:set var="isSticky" select="string($discussionXml/topics/topic/sticky/text())"/>
		<c:set var="class" value="discussion" />
		<c:set var="ia" value="${param.ia}"/>
		<c:choose>
			<c:when test="${(ia eq null)||(ia eq '')}">
				<c:set var="iaQueryString"  value=""/>
			</c:when>
			<c:otherwise>
				<c:set var="iaQueryString" value="&iaKeyToGetPageWith=${ia}"/>			
			</c:otherwise>
		</c:choose>
		<c:choose>
			<c:when test="${currentUserId eq null}">
				<c:set var="viewingUserIdQueryString" value=""/>	
				
			</c:when>
			<c:otherwise>
				<c:set var="viewingUserIdQueryString"  value="&viewingUserId=${currentUserId}"/>					
			</c:otherwise>
		</c:choose>
		<c:set var="page" value="${param.page}"/>
		<c:if test="${(page eq null) || (page eq '')}">
			<c:set var="page" value="1"/>
		</c:if>
		<c:set var="limitPerPage" value="25"/>
		<c:set var="currentPage" value="1"/>
 		<c:set var="postsUrl" value="${ugcUrl}/interactions?topic=${currentDiscussion}&sort=OLDEST_CREATE_DT&limit=${limitPerPage}&offset=${limitPerPage*(page-1)}${iaQueryString}${viewingUserIdQueryString}"/>
		<c:import var="postsDoc" url="${postsUrl}" charEncoding="utf-8"/> 
		<x:parse var="postsXml"  doc="${postsDoc}" />
		<x:set var="count" select="string($postsXml/interactions/@total)" />
		<fmt:parseNumber value="${count}" integerOnly="true" var="count" />
		<x:set var="limit" select="string($postsXml/interactions/@limit)" />
		<fmt:parseNumber value="${limit}" integerOnly="true" var="limit"/>
		<x:set var="offset" select="string($postsXml/interactions/@offset)" />
		<fmt:parseNumber value="${offset}" integerOnly="true" var="offset"/>
		<%
			Integer limit = Integer.valueOf("" + pageContext.getAttribute("limit"));
			Integer offset = Integer.valueOf("" + pageContext.getAttribute("offset"));
			pageContext.setAttribute("page", Integer.valueOf((int)(Math.ceil((double)offset / limit)) + 1).toString());
		%>
		<c:set var="preNumPages" value="${count div limitPerPage}"/>	
		<c:set var="resultInDouble" value="${preNumPages}" />
		<c:set var="resultInDoubleZero" value="${resultInDouble - (resultInDouble%1)}" /> 
		<c:choose>
			<c:when test="${resultInDouble > resultInDoubleZero}">
				<fmt:parseNumber value="${preNumPages + 1}" integerOnly="true" var="numPages"/>
			</c:when>
			<c:otherwise>
				<fmt:parseNumber value="${preNumPages}" integerOnly="true" var="numPages"/>
			</c:otherwise>
		</c:choose>
		<%@ include file="components/pagination2.jsp" %>		
	 </c:when>
	
	<c:when test="${show eq 'start_discussion'}">
		<%-- ADD CONTENT FORM --%>
		<c:set var="class" value="discussion" />
		<c:set var="forumParent" value="${forumParent}"/>
		<c:set var="categoryParent" value="${categoryParent}"/>
		<c:set var="categoryUrl" value="${ugcUrl}/forumsectioncategory/id/${categoryParent}/with/forum-forumsection"/>		
		<c:import var="categoryDoc" url="${categoryUrl}" /> 
		<x:parse var="categoryXml"  doc="${categoryDoc}" />
	<%-- 	<x:set var="sectionId" select="string($categoryXml/forumSectionCategory/sectionKey/text())"/>
		<c:set var="sectionUrl" value="${ugcUrl}/forumsection/id/${sectionId}"/>
		<c:import var="sectionDoc" url="${sectionUrl}" /> 
		<x:parse var="sectionXml"  doc="${sectionDoc}" />
		<x:set var="forumSectionName" select="string($sectionXml/forumSection/name/text())" />
		--%>
		<x:set var="forumName" select="string($categoryXml/forumSectionCategory/forum/name/text())" />
		<x:set var="forumSectionCategoryName" select="string($categoryXml/forumSectionCategory/name/text())" />
	</c:when>
	
	<c:when test="${show eq 'add_poll'}">
		<%-- ADD POLL FORM --%>
		<p:out var="class" value="discussion" />
	</c:when>
	
	<c:otherwise>
		<%-- BY DEFAULT SHOW FORUM INDEX --%>
		<p:out var="class" value="forums" />
	</c:otherwise>
</c:choose>