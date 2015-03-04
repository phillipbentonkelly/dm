<x:forEach var="forumSection" begin="0" select="$forumXml/forum/sections/forumSection">
<x:set var="forumSectionId" select="string($forumSection/id/text())"/> 
<x:set var="forumSectionName" select="string($forumSection/name/text())"/>
<x:set var="forumSectionUrl" select="string($forumSection/url/text())"/>

<div class="forum-section">
	<div class="section-head">
		<h2><a href="${forumSectionUrl}">${forumSectionName}</a></h2>
		<a href="${forumSectionUrl}" class="see-more" title="See More">See more ${forumSectionName} discussions</a>
	</div><!-- / .section-head -->
	
	<table class="test-section-1 sections">
		<thead>
			<tr>
				<th class="primary-col">Most Active</th>
				<th class="secondary-col">Started On</th>
				<th class="secondary-col"">Posts</th>
				<th class="primary-col">Latest</th>
			</tr>
		</thead>
		<tbody>
		<c:set var="parity" value="odd"/>
		
		<x:forEach var="discussion" begin="0" select="$forumSection/discussions/topic">
			<x:set var="discussionId" select="string($discussion/id/text())"/>
			<x:set var="createDt" select="string($discussion/createDate/text())"/>
			<x:set var="discussionUrl" select="string($discussion/url/text())"/>
			<x:set var="discussionTitle" select="string($discussion/title/text())" />
			<x:set var="updateTime" select="string($discussion/latestPostCreateDate/text())"/>
			<x:set var="latestPostUserName" select="string($discussion/latestPostUserName/text())"/>
			<x:set var="latestPostUserId" select="string($discussion/latestPostUserId/text())"/>
			<x:set var="creatorUserName" select="string($discussion/creatorUserName/text())"/>
			<x:set var="creatorUgcUserKey" select="string($discussion/creatorUgcUserKey/text())"/>
			<%-- <x:set var="isSticky" select="string($discussion/sticky/text())"/> --%>
			<c:set var="isSticky" value="true"/>
			<bg:getTimeSince var="timeSinceFormattedDate" isoFormattedDate="${updateTime}" />
			
			<% 	
   				String createdDateTimeString = (String) pageContext.getAttribute("createDt");
				//String createDate, createdTime;

				if (createdDateTimeString != "") {

					DateTimeFormatter dateTimeFormatter = ISODateTimeFormat.dateTimeParser();
					DateTime createdDateTime = dateTimeFormatter.parseDateTime(createdDateTimeString);
					String createdDateString = DateTimeFormat.forPattern("M/d/yyyy").withLocale(Locale.US).print(createdDateTime);
					String createdTimeString = DateTimeFormat.forPattern("h:mm aa zzz").withLocale(Locale.US).print(createdDateTime);
					pageContext.setAttribute("createdDateString", createdDateString);
					pageContext.setAttribute("createdTimeString", createdTimeString);
				}
			%>
			
			<tr id="discussion-${discussionId}" data-id="${discussionId}" class="discussion ${parity}">
				<%-- kdravolin: #BCOM-8294 <td class='name <c:if test="${isSticky eq 'true'}">sticky</c:if>'><b><a href="${discussionUrl}">${discussionTitle}</a></b><span class="author">Started by: <a href="/community/user/${creatorUgcUserKey}">${creatorUserName}</a></span></td> --%>
				<td class="name primary-col"><b><a href="${discussionUrl}">${discussionTitle}</a></b><span class="author">Started by: <a href="/community/user/${creatorUgcUserKey}">${creatorUserName}</a></span></td>
				<td class="start secondary-col"><a href="${discussionUrl}">${createdDateString}</a> <br/> ${createdTimeString}</td> 
				<x:set var="posts" select="string($discussion/iaCount/text())" /> 
				<td class="posts post-count secondary-col"><a class="icon" href="${discussionUrl}"><%= (pageContext.getAttribute("posts") != null && !"".equals(pageContext.getAttribute("posts"))) ? NumberFormat.getIntegerInstance().format(Integer.parseInt((String) pageContext.getAttribute("posts"))) : "" %></a></td>
				<td class="latest primary-col" data-create-date="${updateTime}">
				<c:if test="${(latestPostUserName != null) && (latestPostUserName ne '')}">
					<a href="${discussionUrl}">${timeSinceFormattedDate} ago</a><span class="author">by <a href="/community/user/${latestPostUserId}">${latestPostUserName}</a></span>
				</c:if>
				</td>		
			</tr>
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
	<div class="browse">
		<span>Browse by Category:</span>
		<ul>
		<x:forEach var="forumSectionCategory" begin="0" select="$forumSection/categories/forumSectionCategory">
			<x:set var="forumSectionCategoryUrl" select="string($forumSectionCategory/url/text())"/>
			<x:set var="forumSectionCategoryName" select="string($forumSectionCategory/name/text())"/>
	 		<li><a href="${forumSectionCategoryUrl}">${forumSectionCategoryName}</a></li>
		</x:forEach>
		</ul>
	</div>
</div>
</x:forEach>

<%-- END LOOP OVER THIS --%>