<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ page import="java.lang.String.*, java.lang.Math.*"%>
<%@ page import="org.joda.time.format.DateTimeFormatter" %>
<%@ page import="org.joda.time.format.DateTimeFormat" %>
<%@ page import="org.joda.time.format.ISODateTimeFormat" %>
<%@ page import="org.joda.time.DateTime" %>
<%@ page import="java.util.Locale" %>

<c:set var="postsUrl" value="${ugcUrl}/interactions?actingUser=${user}&type=DISCUSSION_POST"/>
<c:import var="postsDoc" url="${postsUrl}" /> 
<x:parse var="postsXml"  doc="${postsDoc}" />
<x:set var="posts" select="string($postsXml/interactions)"/>
<c:set var="tabTitle" value="Forum Posts" />
<c:set var="categoryName" value="${tabTitle}" scope="request"/>

<div class="section">
    <!--  Using forum_posts.jsp -->
	<h2 class="section-h2">${userS} Forum Posts</h2>
	<ul>
	
	<c:if test="${(postsXml eq '[#document: null]' || postsXml eq null) && (posts eq '')}">
	<c:choose>
		<c:when test="${viewingOwnProfile eq 'true'}">
			<p>You have not made any discussion posts yet. Participate in the <a href="/community/forums">forums</a>!</p>
		</c:when>
		<c:otherwise>
			<p>${userName} has not made any discussion posts yet. Check back for updates or leave ${userName} a message.</p>
		</c:otherwise>
	</c:choose>
	</c:if>
	 
	<x:forEach var="currentIa" begin="0" select="$postsXml/interactions/interaction">
		<x:set var="topicTitle" select="string($currentIa/topicTitle/text())"/>
   		<x:set var="topicUrl" select="string($currentIa/topicUrl/text())"/>
   		<x:set var="body" select="string($currentIa/body/text())"/>
   		<jp:out var="body" value="${body}" escape="false"/>
   		<x:set var="created" select="string($currentIa/createDate/text())"/>
   		<x:set var="postApproval" select="string($currentIa/approvalStatus/text())"/>
		<c:if test="${!(postApproval eq 'BLOCKED')}">
			<li>   			
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
				<c:catch var ="catchException">
					<c:choose>
						<c:when test="${topicUrl eq null}">
	   						<p><b>Forum Post: ${topicTitle}</b></p>
	   					</c:when>
	   					<c:otherwise> 
	   						<p><b>Forum Post: <a href="${topicUrl}">${topicTitle}</a></b></p>
						</c:otherwise>
					</c:choose>
	   			</c:catch>
				<p class="timestamp">Posted ${createdDateString}</p>
				<div class="comment">
				<%@ include file="components/truncated_ia_body.jsp" %>
				</div><!-- / .comment -->
			</li>	
		</c:if>
	</x:forEach>
	</ul>
</div><!-- / .section -->

<%--@ include file="profile_middle_rail.jsp" --%>