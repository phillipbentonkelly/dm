<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ page import="java.lang.String.*, java.lang.Math.*"%>
<%@ page import="org.joda.time.format.DateTimeFormatter" %>
<%@ page import="org.joda.time.format.DateTimeFormat" %>
<%@ page import="org.joda.time.format.ISODateTimeFormat" %>
<%@ page import="org.joda.time.DateTime" %>
<%@ page import="java.util.Locale" %>

<c:set var="commentsUrl" value="${ugcUrl}/interactions?actingUser=${user}&type=ARTICLE_COMMENT"/>
<c:import var="commentsDoc" url="${commentsUrl}" /> 
<x:parse var="commentsXml"  doc="${commentsDoc}" />
<x:set var="comments" select="string($commentsXml/interactions)"/>

<c:set var="tabTitle" value="Comments" />
<c:set var="categoryName" value="${tabTitle}" scope="request"/>

<div class="section">
	<h2 class="section-h2">${userS} Comments</h2>
	<ul>
	
	<c:if test="${(commentsXml eq '[#document: null]' || commentsXml eq null) && (comments eq '')}">
	<c:choose>
		<c:when test="${viewingOwnProfile eq 'true'}">
			<p>You have not made any article comments yet. Comment on an article now!</p>
		</c:when>
		<c:otherwise>
			<p>${userName} has not made any article comments yet. Check back for updates or leave ${userName} a message.</p>
		</c:otherwise>
	</c:choose>
	</c:if>
	 
	<x:forEach var="currentComment" begin="0" select="$commentsXml/interactions/interaction">
		<x:set var="topicTitle" select="string($currentComment/topicTitle/text())"/>
   		<x:set var="topicUrl" select="string($currentComment/topicUrl/text())"/>
   		<x:set var="body" select="string($currentComment/body/text())"/>
   		<jp:out var="body" value="${body}" escape="false"/>
   		<x:set var="created" select="string($currentComment/createDate/text())"/>
   		<x:set var="postApproval" select="string($currentComment/approvalStatus/text())"/>
   		
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
	   						<p><b>Comment on: ${topicTitle}</b></p>
	   					</c:when>
	   					<c:otherwise> 
	   						<p><b>Comment on: <a href="${topicUrl}">${topicTitle}</a></b></p>
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
