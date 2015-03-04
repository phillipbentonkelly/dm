<div class="discussion-list">
	<table>
		<thead>
			<tr>
				<th class="primary-col">Discussions</th>
				<th class="secondary-col">Started By</th>
				<th class="secondary-col">Posts</th>
				<th class="primary-col">Latest Post</th>
			</tr>
		</thead>
		<tbody>
		<c:set var="parity" value="odd"/>
		
<x:forEach var="discussion" begin="0" select="$discussionsXml/topics/topic">
		<x:set var="discussionId" select="string($discussion/id/text())"/>
		<x:set var="discussionTitle" select="string($discussion/title/text())"/>
		<x:set var="discussionUrl" select="string($discussion/url/text())"/>
		<x:set var="isSticky" select="string($discussion/sticky/text())"/>

		<x:set var="creatorUserName" select="string($discussion/creatorUserName/text())"/>
		<x:set var="createDt" select="string($discussion/createDate/text())"/>
		<% 	
			String createdDateTimeString = (String) pageContext.getAttribute("createDt");
			//String createDate, createdTime;

			if (createdDateTimeString != "") {
				DateTimeFormatter dateTimeFormatter = ISODateTimeFormat.dateTimeParser();
				DateTime createdDateTime = dateTimeFormatter.parseDateTime(createdDateTimeString);
				String createdDateString = DateTimeFormat.forPattern("M/d/yyyy").withLocale(Locale.US).print(createdDateTime);
				String createdTimeString = DateTimeFormat.forPattern("h:mm aa").withLocale(Locale.US).print(createdDateTime);
				pageContext.setAttribute("createdDateString", createdDateString);
				pageContext.setAttribute("createdTimeString", createdTimeString);
			}
		%>
		<x:set var="creatorUgcUserKey" select="string($discussion/creatorUgcUserKey/text())"/>
		<x:set var="latestPostUserName" select="string($discussion/latestPostUserName/text())"/>
		<x:set var="latestPostUserId" select="string($discussion/latestPostUserId/text())"/>
		<x:set var="latestPostCreateDate" select="string($discussion/latestPostCreateDate/text())"/>
		<bg:getTimeSince var="timeSinceFormattedDate" isoFormattedDate="${latestPostCreateDate}" />
		
			<tr id="discussion-${discussionId}" data-id="${discussionId}" class="${parity} discussion">
			<%-- BCOM-8294 --%>
				<td class='discussion-name name primary-col <c:if test="${isSticky eq 'true'}">sticky</c:if>'><a href="${discussionUrl}">${discussionTitle}</a></td>
				<td class="author secondary-col"><a href="/community/user/${creatorUgcUserKey}">${creatorUserName}</a><br/>${createdDateString}<br/>${createdTimeString}</td>
				<td class="post-count secondary-col"><a href="${discussionUrl}" class="icon"><x:out select="$discussion/iaCount/text()"/></a></td> <%-- removed the class star --%>
				<td class="latest primary-col" data-create-date="${latestPostCreateDate}">
				<c:if test="${(latestPostUserName != null) && (latestPostUserName ne '')}">
					${timeSinceFormattedDate} ago by <a href="/community/user/${latestPostUserId}">${latestPostUserName}</a>
				</c:if>
				</td>
			</tr>
			<c:if test="${dataAdmin eq 'true'}">
				<tr class="${parity} admin">
					<td colspan="4" class="admin">
						<div class="category-admin admin-utility">
							<ul>
								<li><a href="#" class="icon edit-rename" data-action="edit-discussion" data-id="${discussionId}">Edit/rename discussion</a></li>
								<c:choose>
									<c:when test="${isSticky eq 'true'}">
										<li><a href="${discussionUrl}" class="icon make-sticky" data-action="sticky-discussion" data-value="true" data-id="${discussionId}">Unstick</a></li>
									</c:when>									
									<c:otherwise>									
										<li><a href="${discussionUrl}" class="icon make-sticky" data-action="sticky-discussion" data-value="false" data-id="${discussionId}">Make sticky</a></li>
									</c:otherwise>
								</c:choose>
								<li><a href="#" class="icon close" data-action="archive-discussion" data-value="false" data-id="${discussionId}">Archive discussion</a></li>
								<%--<li><a href="#" class="icon close" data-action="close-discussion" data-discussion="${discussionId}">Close discussion</a></li>
								<li><a href="#" class="icon delete" data-action="delete-discussion" data-discussion="${discussionId}">Delete discussion</a></li>
								<li><a href="#" class="icon discovery" data-action="hide-discussion" data-discussion="${discussionId}">Remove from Discovery</a></li>--%>
							</ul>
						</div>
					</td>
				</tr>
			</c:if>
			<c:choose>
				<c:when test="${parity=='odd'}">
					<c:set var="parity" value="even"/>
				</c:when>
				<c:when test="${parity=='even'}">
					<c:set var="parity" value="odd"/>
				</c:when>
			</c:choose>
</x:forEach>
		</tbody>
	</table>
</div><!-- / .discussion-list -->

<div class="forum-footer">
	<%-- PAGINATION  --%>
	<%@ include file="components/pagination3.jsp" %>
	<%-- DISCUSSION UTILITY / Only show if user is 'active'  --%>
	<c:choose>
		<c:when test="${currentUserIsActive eq 'true'}">
			<div class="discussion-utility">
				<ul>
				<c:choose>
					<c:when test="${loginStatus eq 'loggedIn'}">
						<li><a href="/community/forums/start_discussion/${forumId}/${categoryParent}" class="btn-strong btn-medium"><i></i>Start new discussion</a></li>
					</c:when>
					<c:otherwise>
						<li><a href="/eom/SysConfig/WebPortal/Boston/Framework/regi/regi-login-register.jsp" class="btn-strong btn-medium"><i></i>Start a new discussion!</a></li>				
					</c:otherwise>
				</c:choose>	
				</ul>
			</div><!-- / .discussion-utility -->
		</c:when>
	</c:choose>

</div><!-- / .forum-footer -->