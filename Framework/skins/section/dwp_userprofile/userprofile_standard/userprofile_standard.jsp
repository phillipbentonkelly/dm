<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="bg" tagdir="/WEB-INF/tags/eom$configurationURI/Framework/tags/custom" %>
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

<c:if test="${show eq 'my-profile' && !viewingOwnProfile}">
	<c:set var="show" value="home" scope="request"/>
</c:if>

<div class="">
	<c:choose>
		<c:when test="${catchExceptionUserProfile != null}">
			<p>Whoops, something went wrong! Please <a href="mailto:feedback@boston.com">email us</a> and let us know!</p>
		</c:when>
		<c:when test="${active eq 'false'}">
		
			<%-- User is not active, display message --%>
			<div class="profile-head">
				<div class="username">
					<h2>${userS} Page</h2>
				</div><!-- / .username -->
				<p>We have de-activated this account. If you have questions, e-mail <a href="mailto:feedback@boston.com">feedback@boston.com</a>.</p>
			</div><!-- / .profile-head -->
			
		</c:when>
		<c:otherwise>
		
			<%-- User is active, display profile --%>
		
			<%@ include file="header.jsp" %>
				
			<%-- ASSIGN VARIABLES BASED ON QUERYSTRING --%>
			<div class="profile-body">
			<c:choose>
				<c:when test="${viewingOwnProfile || userProfileVisibility eq 'PUBLIC' || ugc.user.tier eq 'ADMIN'}">
			
					<c:choose>
					  
						<c:when test="${show eq 'home'}">
							<%-- HOME --%>
							<%@ include file="all_recent_content.jsp" %>
						</c:when>
					
						<c:when test="${show eq 'messages'}">
							<%-- MESSAGE --%>
							<%@ include file="messages.jsp" %>
						</c:when>
					
						<c:when test="${show eq 'comments'}">
							<%-- COMMENTS --%>
							<%@ include file="comments.jsp" %>
						</c:when>
					
						<c:when test="${show eq 'forum-posts'}">
						    <%-- FORUM POSTS  --%>
							<%@ include file="forum_posts.jsp" %>
						</c:when>
					
						<c:when test="${show eq 'my-profile' && viewingOwnProfile eq 'true'}">
							<%-- MY PROFILE --%>
							<%@ include file="my_profile.jsp" %>
						</c:when> 
						<c:when test="${show eq 'no-user'}">
							<%-- USER NOT FOUND --%>
							
							<%@ include file="user_not_found.jsp" %>
						</c:when>
						<c:otherwise>
							<%-- BY DEFAULT SHOW HOME --%> 
							<%@ include file="all_recent_content.jsp" %>		
						</c:otherwise>
					
					</c:choose>
				</c:when>
				<c:otherwise>
					
				</c:otherwise>
			</c:choose>
			
			</div><!-- / .profile-body -->
		
		</c:otherwise>
	</c:choose>
 			
</div>
<script type="text/javascript" src="/js/libs/tinymce/tinymce.min.js"></script> 		