<%@ page import="java.text.NumberFormat" %> 

<x:forEach var="forum" begin="0" select="$forumsXml/forums/forum">
	<div class="forum-section">
	<x:set var="forumId" select="string($forum/id/text())" /> 
	<x:set var="forumName" select="string($forum/name/text())" />
	<x:set var="forumUrl" select="string($forum/url/text())" />
<%--	<bg:slugify var="forumNameSlug" preSlug="${forumName}" />
 	<c:set var="forumSectionsByForumUrl" value="${ugcUrl}/forumsections/forumid/${forumId}" />
--%>
	<div class="section-head"><%-- <h2><a href="#"><x:out select="$forum/name/text()"/></a></h2> --%>

	
	<h2><a href="${forumUrl}">${forumName}</a></h2>
    <x:set var="totalDiscussions" select="string($forum/discussionCount/text())" />
    <x:set var="totalPosts" select="string($forum/posts/text())" />
	<div class="forum-counts">Total discussions: <%= NumberFormat.getIntegerInstance().format(Integer.parseInt((String) pageContext.getAttribute("totalDiscussions")))  %> | Total posts: <%= NumberFormat.getIntegerInstance().format(Integer.parseInt((String) pageContext.getAttribute("totalPosts")))  %></div>
	<%-- <a href="" class="toggle hide" title="Collapse Section"
		data-target="test-section-1">&minus;</a> --%> </div>
	<!-- / .section-head -->

	<table class="forums">
		<thead>
			<tr>
				<th class="primary-col">Section</th>
				<th class="secondary-col">Discussions</th>
				<th class="secondary-col">Posts</th>
				<th class="primary-col">Latest Post</th>
			</tr>
		</thead>
		<tbody>
		<%-- 	<c:import var="forumSectionsByForumDoc"
				url="${forumSectionsByForumUrl}" />
			<x:parse var="forumSectionsByForumXml"
				doc="${forumSectionsByForumDoc}" /> --%>
			<c:set var="parity" value="odd"/>
			 <%-- <c:if test="0 == 1">--%>
			<x:forEach var="forumSection" varStatus="status" begin="0"
				select="$forum/sections/forumSection">
				
				<x:set var="forumSectionName" select="string($forumSection/name/text())" />
				<x:set var="forumSectionId" select="string($forumSection/id/text())" />
				<x:set var="forumSectionUrl" select="string($forumSection/url/text())" />  
				<c:choose>
					<c:when test="${(status.count mod 2) eq 0}">
						<tr class="even">
					</c:when>
					<c:otherwise>
						<tr class="odd">
					</c:otherwise>
				</c:choose>
				<tr class=${parity}>
				<td class="name primary-col"><a href="${forumSectionUrl}">${forumSectionName}</a></td>
				    <x:set var="discussions" select="string($forumSection/discussionCount/text())" />
				    <x:set var="posts" select="string($forumSection/posts/text())" />
				    <%-- norlov / thumbtack: the checks are required as a fix for BCOM-10865 --%>
					<td class="discussions secondary-col"><%= (pageContext.getAttribute("discussions") != null && !"".equals(pageContext.getAttribute("discussions"))) ? NumberFormat.getIntegerInstance().format(Integer.parseInt((String) pageContext.getAttribute("discussions"))) : "" %></td> <%-- for this and the next, can link to the corresponding discussion --%>
					<td class="posts secondary-col"><%= (pageContext.getAttribute("posts") != null && !"".equals(pageContext.getAttribute("posts"))) ? NumberFormat.getIntegerInstance().format(Integer.parseInt((String) pageContext.getAttribute("posts"))) : "" %></td>
					<td class="latest primary-col">
					<x:set var="updateTime" select="string($forumSection/latestPostCreateDate/text())"/>
					<%-- 	<c:if test="${updateTime ne ''}"> --%>
					<x:set var="latestDiscussionId" select="string($forumSection/latestPostDiscussionId/text())" />
										
				 	 	<c:choose>
				 	 		<c:when test="${(latestDiscussionId != null) && (latestDiscussionId != 0) && (latestDiscussionId ne '')}">
								<bg:getTimeSince var="timeSinceFormattedDate" isoFormattedDate="${updateTime}" />
								<x:set var="latestDiscussionTitle" select="string($forumSection/latestPostDiscussionTitle/text())" />
								<x:set var="latestPostDiscussionUrl" select="string($forumSection/latestPostDiscussionUrl/text())" />
								<x:set var="latestPostUserName" select="string($forumSection/latestPostUserName/text())" />
								<x:set var="latestPostUserId" select="string($forumSection/latestPostUserId/text())" />
				 	 			<%-- 	<bg:slugify var="latestDiscussionTitleSlug" preSlug="${latestDiscussionTitle}" />
								<c:set var="discussionUrl" value="${ugcUrl}/discussion/id/${latestDiscussionId}"/>
								<c:import var="discussionDoc" url="${discussionUrl}" /> 
								<x:parse var="discussionXml"  doc="${discussionDoc}" />	
								<x:set var="forumSectionCategoryId" select="string($discussionXml/discussion/categoryKey/text())"/>
							    <c:set var="forumSectionCategoryUrl" value="${ugcUrl}/forumsectioncategory/id/${forumSectionCategoryId}"/>
								<c:import var="forumSectionCategoryDoc" url="${forumSectionCategoryUrl}" /> 
								<x:parse var="forumSectionCategoryXml"  doc="${forumSectionCategoryDoc}" />	
								<x:set var="forumSectionCategoryName" select="string($forumSectionCategoryXml/forumSectionCategory/name/text())" />
								<bg:slugify var="forumSectionCategoryNameSlug" preSlug="${forumSectionCategoryName}" />
							--%>		${timeSinceFormattedDate} ago by 
					  	<a href="/community/user/${latestPostUserId}">${latestPostUserName}</a> in <a href="${latestPostDiscussionUrl}">${latestDiscussionTitle}</a>
							</c:when>
							<c:otherwise>
								<c:set var="forumSectionCategoryName" value="" />
								<c:set var="latestDiscussionTitle" value="" />
								<c:set var="latestDiscussionId" value="" />
							</c:otherwise>
						</c:choose>
				<%-- 	</c:if> --%>
					
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
			<%--</c:if>--%>
		</tbody>
	</table>

	</div>
	<!-- / .forum-section -->

</x:forEach>
