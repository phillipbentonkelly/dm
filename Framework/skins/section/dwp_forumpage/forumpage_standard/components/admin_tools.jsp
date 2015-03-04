<c:if test="${dataAdmin}"> <%-- fix for BCOM-10969 --%>
<c:choose>

	<c:when test="${show eq 'discussion_index'}">
		<%-- Category Level Admin --%>
		<div class="admin-utility">
			<ul>
				<%--<li><a href="#" class="icon moderators" data-action="category-moderator">View/change moderator</a></li>--%>
				<li><a href="#" class="icon edit-rename" data-action="edit-category" data-id="${categoryParent}">Edit/rename category</a></li>
				<li><a href="#" class="icon close" data-action="archive-category" data-value="false" data-id="${categoryParent}">Archive category</a></li><%-- Close forum --%>
				<%--<li><a href="#" class="icon delete" data-action="delete-category">Delete forum</a></li>--%>
			</ul>
		</div>
	</c:when>

	<c:when test="${show eq 'discussion'}">
		<%-- Discussion Level Admin --%>
		<div class="admin-utility">
			<ul>
				<li><a href="#" class="icon edit-rename" data-action="edit-discussion" data-id="${currentDiscussion}">Edit/rename discussion</a></li>
				<c:choose>
					<c:when test="${isSticky eq 'true'}">
						<li><a href="${discussionUrl}" class="icon make-sticky" data-action="sticky-discussion" data-value="true" data-id="${currentDiscussion}">Unstick</a></li>
					</c:when>									
					<c:otherwise>									
						<li><a href="${discussionUrl}" class="icon make-sticky" data-action="sticky-discussion" data-value="false" data-id="${currentDiscussion}">Make sticky</a></li>
					</c:otherwise>
				</c:choose>				
				<li><a href="#" class="icon close" data-action="archive-discussion" data-value="false" data-id="${currentDiscussion}">Archive discussion</a></li> <%-- was Close --%>
				<%--<li><a href="#" class="icon delete" data-action="delete-discussion">Delete discussion</a></li>--%>
				
				<%-- norlov: BCOM-10365 --%>
				<select id="forumStructure" style="display:none;">
				<c:set var="forumsUrl" value="${ugcUrl}/forums"/>
				<c:import var="forumsDoc" url="${forumsUrl}" />
				<x:parse var="forumsXml"  doc="${forumsDoc}" />
				<x:forEach var="forum" begin="0" select="$forumsXml/forums/forum">
					<x:set var="forumId" select="string($forum/id/text())"/>
					<x:set var="forumName" select="string($forum/name/text())"/>
					<option value="-1">${forumName}</option>
					
					<c:set var="forumCategoriesUrl" value="${ugcUrl}/forum/id/${forumId}/with/discussions-categories"/>
					<c:import var="forumCategoriesDoc" url="${forumCategoriesUrl}" />
					<x:parse var="forumCategoriesXml"  doc="${forumCategoriesDoc}" />
					
					<x:forEach var="section" begin="0" select="$forumCategoriesXml/forum/sections/forumSection">
						<x:set var="forumSectionName" select="string($section/name/text())"/>
						<option value="-1">&nbsp;&nbsp;&nbsp;&nbsp;${forumSectionName}</option>
						<x:forEach var="cat" begin="0" select="$section/categories/forumSectionCategory">
							<x:set var="catName" select="string($cat/name/text())"/>
							<x:set var="catId" select="string($cat/id/text())"/>
							<option value="${catId}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${catName}</option>
						</x:forEach>
					</x:forEach>
				</x:forEach>
				</select>
				<%-- norlov: BCOM-10365 END --%>

				<li><a href="#" class="icon move" data-action="move-discussion" data-id="${currentDiscussion}">Move discussion</a></li>
			</ul>
		</div>
	</c:when>
	
</c:choose>
</c:if>