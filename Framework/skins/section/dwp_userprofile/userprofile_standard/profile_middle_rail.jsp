<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ page import="java.lang.String.*, java.lang.Math.*"%>
<%@ page import="org.joda.time.format.DateTimeFormatter" %>
<%@ page import="org.joda.time.format.DateTimeFormat" %>
<%@ page import="org.joda.time.format.ISODateTimeFormat" %>
<%@ page import="org.joda.time.DateTime" %>
<%@ page import="java.util.Locale" %>

<c:set var="ugcUrl" value="${portalContext.publicBaseUrl}/ugc"/>
<c:set var="commentLimit" value="5"/>

<c:if test="${(messages ne '') && (messages ne null) && (viewingOwnProfile)}">
	<div class="widget">
		<h3 class="section-h">My Messages</h3>
		<ul>
			<x:forEach var="message" varStatus="status" begin="0" select="$messagesXml/interactions/interaction">
				<x:set var="id" select="string($message/id/text())"/>
				<x:set var="actingUserKey" select="string($message/actingUserKey/text())"/>
				<x:set var="body" select="string($message/body/text())"/>
				<x:set var="created" select="string($message/createDate/text())"/>
				<x:set var="actingUserName" select="string($message/actingUserName/text())"/>
				<x:set var="actingUserImageUrl" select="string($message/actingUserImageUrl/text())"/>
				<x:set var="approvalStatus" select="string($message/approvalStatus/text())"/>
				<c:if test="${!(approvalStatus eq 'BLOCKED') || (ugc.user.tier eq 'ADMIN')}">
				<% 	
   				String createdDateTimeString = (String) pageContext.getAttribute("created");
				//String createDate, createdTime;

				if (createdDateTimeString != "") {

					DateTimeFormatter dateTimeFormatter = ISODateTimeFormat.dateTimeParser();
					DateTime createdDateTime = dateTimeFormatter.parseDateTime(createdDateTimeString);
					String createdDateString = DateTimeFormat.forPattern("MM/dd/yyyy hh:mm:ss zzz").withLocale(Locale.US).print(createdDateTime);
					pageContext.setAttribute("createdDateString", createdDateString);
				}
				%>
				<li>
					<img src="${actingUserImageUrl}" alt="Username" class="profile-image" />
					Message From <a href="/community/user/${actingUserKey}">${actingUserName}</a>
					<div class="timestamp">${createdDateString}</div>
				</li>
				</c:if>
			</x:forEach>
		</ul>
		<a href="/community/user/messages/${user}">View all messages</a>
	</div><!-- / .widget -->
</c:if>
<%-- TODO add back /cache prefix to url below after http://jira.boston.com/browse/OPS-38960 is done --%>
<c:set var="userRecentlyCommentedDiscussionsUrl"  value="${ugcUrl}/topics?type=FORUM&creator=${user}&sort=LATEST_POST_CREATE_DATE_DESC&limit=10"/>
<c:import var="userRecentlyCommentedDiscussionsDoc" url="${userRecentlyCommentedDiscussionsUrl}" />
<x:parse var="userRecentlyCommentedDiscussionsXml" doc="${userRecentlyCommentedDiscussionsDoc}" />
<x:set var="userRecentlyCommentedDiscussions" select="string($userRecentlyCommentedDiscussionsXml/topics)"/>
<c:if test="${(userRecentlyCommentedDiscussionsXml eq '[#document: null]' || userRecentlyCommentedDiscussionsXml eq null) && userRecentlyCommentedDiscussions ne ''}">
<div class="widget">
	<h3 class="section-h fancy">My Latest Discussions</h3>
	<ul>
  		<x:forEach var="recentlyCommentedDiscussion" varStatus="status" begin="0"
			select="$userRecentlyCommentedDiscussionsXml/topics/topic">
			<x:set var="recentlyCommentedDisUrl" select="string($recentlyCommentedDiscussion/url/text())"/>
			<x:set var="recentlyCommentedDisTitle" select="string($recentlyCommentedDiscussion/title/text())"/>
			<x:set var="recentlyCommentedDisCreated" select="string($recentlyCommentedDiscussion/createDate/text())"/>
			<% 	
   				String recentlyCommentedDisCreatedString = (String) pageContext.getAttribute("recentlyCommentedDisCreated");
				String createDate, createdTime;

				if (recentlyCommentedDisCreatedString != "") {

					DateTimeFormatter dateTimeFormatter = ISODateTimeFormat.dateTimeParser();
					DateTime recentlyCommentedDisCreatedDateTime = dateTimeFormatter.parseDateTime(recentlyCommentedDisCreatedString);
					String recentlyCommentedDisCreatedDateTimeString = DateTimeFormat.forPattern("MM/dd/yyyy hh:mm:ss zzz").withLocale(Locale.US).print(recentlyCommentedDisCreatedDateTime);
					pageContext.setAttribute("recentlyCommentedDisCreated", recentlyCommentedDisCreatedDateTimeString);
				}
			%>

		<li>
			<a href="${recentlyCommentedDisUrl}">${recentlyCommentedDisTitle}</a> 
			<div class="timestamp">${recentlyCommentedDisCreated}</div>
		</li>
	
		</x:forEach>

	</ul>
	<a href="/community/forums">Go to discussion forums</a>
</div><!-- / .widget -->
</c:if>