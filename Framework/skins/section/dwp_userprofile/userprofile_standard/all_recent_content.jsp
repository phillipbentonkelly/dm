<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ page import="java.lang.String.*, java.lang.Math.*"%>
<%@ page import="org.joda.time.format.DateTimeFormatter" %>
<%@ page import="org.joda.time.format.DateTimeFormat" %>
<%@ page import="org.joda.time.format.ISODateTimeFormat" %>
<%@ page import="org.joda.time.DateTime" %>
<%@ page import="java.util.Locale" %>

<c:set var="interactionsUrl" value="${ugcUrl}/interactions?actingUser=${user}&type=ARTICLE_COMMENT&type=DISCUSSION_POST"/>
<c:import var="interactionsDoc" url="${interactionsUrl}" /> 
<x:parse var="interactionsXml"  doc="${interactionsDoc}" />
<x:set var="interactions" select="string($interactionsXml/interactions)"/>

<c:set var="tabTitle" value="Home" />
<c:set var="categoryName" value="${tabTitle}" scope="request"/>


<div class="section">
	<h2 class="section-h2">All Recent Activity</h2>
	
	<c:if test="${(interactions eq '')}"><%--  || (interactionsXml eq null)}"> --%>
	<c:choose>
		<c:when test="${viewingOwnProfile eq 'true'}">
			<p>You have not made any contributions yet. Participate in the <a href="/community/forums">forums</a> or comment on an article!</p>
		</c:when>
		<c:otherwise>
			<p>${userName} has not made any contributions yet. Check back for updates or leave ${userName} a message.</p>
		</c:otherwise>
	</c:choose>
	</c:if>
	
	<ul>
	 
	<x:forEach var="currentIa" begin="0" select="$interactionsXml/interactions/interaction">
		<x:set var="iaType" select="string($currentIa/type/text())"/>
		<x:set var="postApproval" select="string($currentIa/approvalStatus/text())"/>
   <c:choose>
   		<c:when test="${iaType eq 'ARTICLE_COMMENT' && !(postApproval eq 'BLOCKED')}">
   		<li>
   			<x:set var="topicTitle" select="string($currentIa/topicTitle/text())"/>
   			<x:set var="topicUrl" select="string($currentIa/topicUrl/text())"/>
   			<x:set var="uuid" select="string($currentIa/topicUuid/text())"/>
   			<x:set var="body" select="string($currentIa/body/text())"/>
   			<jp:out var="body" value="${body}" escape="false"/>
   			<x:set var="created" select="string($currentIa/createDate/text())"/>
   			
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
   						<div class="title">Comment on: ${topicTitle}</div>
   					</c:when>
   					<c:otherwise> 
   						<div class="title">Comment on: <a href="${topicUrl}">${topicTitle}</a></div>
					</c:otherwise>
				</c:choose>
   			</c:catch>
			<p class="timestamp">Posted ${createdDateString}</p>
			<div class="comment">
				<%@ include file="components/truncated_ia_body.jsp" %>
			</div><!-- / .comment -->
			</li>
   		</c:when>
		<c:when test="${iaType eq 'DISCUSSION_POST' && !(postApproval eq 'BLOCKED')}">
		<li>
   			<x:set var="discussionTitle" select="string($currentIa/topicTitle/text())"/>
   			<x:set var="topicUrl" select="string($currentIa/topicUrl/text())"/>
   		 	<x:set var="discussionId" select="string($currentIa/topicKey/text())"/> 
   			<x:set var="body" select="string($currentIa/body/text())"/>
   			<x:set var="created" select="string($currentIa/createDate/text())"/>
   			
   			
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
   						<div class="title">Forum Post: ${discussionTitle}</div>
   					</c:when>
   					<c:otherwise> 
   						<div class="title">Forum Post: <a href="${topicUrl}">${discussionTitle}</a></div>
					</c:otherwise>
				</c:choose>
   			</c:catch>
			<p class="timestamp">Posted ${createdDateString}</p>
			<div class="comment">
		 		<%@ include file="components/truncated_ia_body.jsp" %>
			</div><!-- / .comment -->
		</li>
		</c:when>
   </c:choose>	
	</x:forEach>
	</ul>
</div><!-- / .section -->