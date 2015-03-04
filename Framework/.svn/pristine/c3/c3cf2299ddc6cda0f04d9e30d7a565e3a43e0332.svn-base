<%-- <p:getContext var="ctx" entries="urlentry" />--%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ page pageEncoding="UTF-8" %>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="bg" tagdir="/WEB-INF/tags/eom/SysConfig/WebPortal/Boston/Framework/tags/custom" %>
<%-- <%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt"%> --%>
<%@ taglib prefix="fmt" uri="formatTags" %>
<%@ page import="java.lang.String.*, java.lang.Math.*, java.util.Date , java.text.SimpleDateFormat"%>
<%@ page import="org.joda.time.format.DateTimeFormatter" %>
<%@ page import="org.joda.time.format.DateTimeFormat" %>
<%@ page import="org.joda.time.format.ISODateTimeFormat" %>
<%@ page import="org.joda.time.format.PeriodFormatter" %>
<%@ page import="org.joda.time.format.PeriodFormatterBuilder" %>
<%@ page import="org.joda.time.Period" %>
<%@ page import="org.joda.time.DateTime" %>
<%@ page import="java.util.Locale" %>


<%@ include file="components/forum_pathmap.jsp" %>
<%@ include file="../../../common/regi_path.jsp" %>
<%-- norlov: BCOM-9554 --%>
<%@ include file="../../../components/ugc/getCurrentUgcUser.jsp" %>

<%-- using pathmap instead to avoid cache fragments
<c:set var="show" value="${param.show}" scope="request"/>
<c:set var="forumParent" value="${param.forumParent}"/>
<c:set var="sectionParent" value="${param.sectionParent}"/>
<c:set var="categoryParent" value="${param.categoryParent}"/>
<c:set var="currentDiscussion" value="${param.currentDiscussion}"/>
--%>
<c:set var="loginStatus" value="loggedOut" />
<c:set var="categoryName" value="${categoryParent}" scope="request"/>



<%@ include file="forumPagesVariables.jsp" %>
<div class="main span9">

<div id="forum-head" class="forum-head" data-admin="${dataAdmin}" data-page-type="${class}" data-ugc-user-id="${currentUserId}">
	<div class="user-utility">
		<ul>
		<c:choose>
			<c:when test="${loginStatus eq 'loggedOut'}">
				<li>You must be logged in to contribute. <a href="${loginUrl}">Log in</a></li>
				<li><a href="${regipath}/regi-login-register.jsp">Register</a></li>
			</c:when>
			<%-- norlov@thumbtack.net: fix for http://jira.boston.com/browse/BCOM-8261 --%>
			<c:when test="${loginStatus eq 'notFound'}">
				If you would like to post, please click <a href="${regipath}/membercenter-update-info.jsp">here</a> to create a screen name.
			</c:when>
			<c:otherwise>
				<li>Welcome, <a href="/community/user/${currentUserId}">${currentUserName}</a></li>
				<li><a href="/eom$configurationURI/Framework/regi/logout.jsp">Sign out</a></li>
				<li><a href="/community/user/myprofile/${currentUserId}">Edit profile</a></li>
			</c:otherwise>
		</c:choose>
		</ul>
	</div><!-- / .user-utility -->
	
	<c:choose>
	
		<c:when test="${show eq 'forum_index'}">
			<h1>Forums</h1>
		<%--	<div class="forum-search">
			<form>
				<input type="text" placeholder="Search Forums" name="forum-search" />
				<input type="submit" class="search-button" value="search" />
			</form>
			</div><!-- / forum-search -->  --%>
			</div><!-- / .forum-head -->
			<%@ include file="forum_index.jsp" %>
		</c:when>
	
		<c:when test="${show eq 'section_index'}">
			<h1>${forumName} Discussions</h1>
	<%-- 		<div class="forum-search">
			<form>
				<input type="text" placeholder="Search Forums" name="forum-search" />
				<input type="submit" class="search-button" value="search" />
			</form>
			</div><!-- / forum-search --> --%>
			<%-- BREADCRUMBS  --%>
			<%@ include file="components/breadcrumbs.jsp" %>
			</div><!-- / .forum-head -->
			<%@ include file="section_index.jsp" %>
		</c:when>
	
		<c:when test="${show eq 'category_index'}">
			<h1>${forumSectionName} Discussions</h1>
		<%-- 	<div class="forum-search">
			<form>
				<input type="text" placeholder="Search Forums" name="forum-search" />
				<input type="submit" class="search-button" value="search" />
			</form>
			</div><!-- / forum-search -->--%>
			<%-- BREADCRUMBS  --%>
			<%@ include file="components/breadcrumbs.jsp" %>
			</div><!-- / .forum-head -->
			<%@ include file="category_index.jsp" %>
		</c:when>
	
		<c:when test="${show eq 'discussion_index'}">
			<h1>${forumSectionCategoryName}<span>${categoryDesc}</span></h1>
		<%--	<div class="forum-search">
			<form>
				<input type="text" placeholder="Search Forums" name="forum-search" />
				<input type="submit" class="search-button" value="search" />
			</form>
			</div><!-- / forum-search -->  --%>
			<%-- FORUM UTILITY  --%>
			<%@ include file="components/forum_utility.jsp" %>
			<%-- PAGINATION  --%>
			<%@ include file="components/pagination3.jsp" %>
			<%-- BREADCRUMBS  --%>
			<%@ include file="components/breadcrumbs.jsp" %>
			<%-- ADMIN TOOLS  --%>
			<%@ include file="components/admin_tools.jsp" %>
			</div><!-- / .forum-head -->
			<%@ include file="discussion_index.jsp" %>
		</c:when>
	
		<c:when test="${show eq 'discussion'}">
			<h1>${discussionTitle}</h1>
	 	<%-- 	<div class="forum-search">
			<form>
				<input type="text" placeholder="Search Forums" name="forum-search" />
				<input type="submit" class="search-button" value="search" />
			</form>
			</div><!-- / forum-search -->  --%>
			<%-- FORUM UTILITY  --%>
			<%@ include file="components/forum_utility.jsp" %>
			<%-- PAGINATION  --%>
			<%@ include file="components/pagination3.jsp" %>
			<%-- BREADCRUMBS  --%>
			<%@ include file="components/breadcrumbs.jsp" %>
			<%-- ADMIN TOOLS  --%>
			<%@ include file="components/admin_tools.jsp" %>
			</div><!-- / .forum-head -->
			<%@ include file="discussion.jsp" %>
		</c:when>
		
		<c:when test="${show eq 'start_discussion'}">
			<h1>Forums</h1>
		<%-- 	<div class="forum-search">
			<form>
				<input type="text" placeholder="Search Forums" name="forum-search" />
				<input type="submit" class="search-button" value="search" />
			</form>
			</div><!-- / forum-search --> --%>
			</div><!-- / .forum-head -->
			<%@ include file="components/start_discussion_form.jsp" %>
			
		</c:when>
		
<%-- 		<c:when test="${show eq 'add_poll'}">
			<h1>Forums</h1>
			<div class="forum-search">
			<form>
				<input type="text" placeholder="Search Forums" name="forum-search" />
				<input type="submit" class="search-button" value="search" />
			</form>
			</div><!-- / forum-search -->
			</div><!-- / .forum-head -->
			<%@ include file="components/add_poll_form.jpt" %>
		</c:when>
--%>	
		<c:otherwise>
			<h1>Forum Index</h1>
		<%--	<div class="forum-search">
			<form>
				<input type="text" placeholder="Search Forums" name="forum-search" />
				<input type="submit" class="search-button" value="search" />
			</form>
			</div><!-- / forum-search --> --%>
			</div><!-- / .forum-head -->
			<%@ include file="forum_index.jsp" %>
		</c:otherwise>
	
	</c:choose> 
	<%--
	<jsp:include page="SysConfig/WebPortal/Boston/Framework/skins/common/commentsLoginPrompt.jpt" />
	--%>

</div><!-- / #span9 -->
<script type="text/javascript" src="/js/libs/tinymce/tinymce.min.js"></script>
<%-- debounce added according to BCOMREDESIGN-1395 --%>	
<script type="text/javascript" src="/js/libs/jquery.ba-throttle-debounce.min.js"></script> 	
<script type="text/javascript" src="/js/bcom.forums.js"></script>	

