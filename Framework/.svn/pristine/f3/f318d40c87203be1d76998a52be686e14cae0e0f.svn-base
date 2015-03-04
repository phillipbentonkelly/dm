<div class="breadcrumbs">
	<ul>
		<c:choose>
		
			<c:when test="${show eq 'section_index'}">
				<li><a href="/community/forums">Forums</a> &raquo;</li>
				<li><a href="${forumUrl}">${forumName}</a></li>
			</c:when>
			
			<c:when test="${show eq 'category_index'}">
				<li><a href="/community/forums">Forums</a> &raquo;</li>
				<li><a href="${forumUrl}">${forumName}</a> &raquo;</li>
				<li><a href="${forumSectionUrl}">${forumSectionName}</a></li>
			</c:when>
			
			<c:when test="${show eq 'discussion_index'}">	
				<li><a href="/community/forums">Forums</a> &raquo;</li>
				<li><a href="${forumUrl}">${forumName}</a> &raquo;</li>
				<li><a href="${forumSectionUrl}">${forumSectionName}</a> &raquo;</li>
				<li><a href="${forumSectionCategoryUrl}">${forumSectionCategoryName}</a></li>
			</c:when>
		
			<c:when test="${show eq 'discussion'}">	
			    <li><a href="/community/forums">Forums</a> &raquo;</li>
				<li><a href="${forumUrl}">${forumName}</a> &raquo;</li>
				<li><a href="${forumSectionUrl}">${forumSectionName}</a> &raquo;</li>
				<li><a href="${forumSectionCategoryUrl}">${forumSectionCategoryName}</a> &raquo;</li>
				<li><a href="${discussionUrl}">${discussionTitle}</a></li>
			</c:when>
		
			<c:otherwise>
				<li>Forums</li>
			</c:otherwise>
		
		</c:choose>

	</ul>
</div><!-- / .breadcrumbs -->