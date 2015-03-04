<%-- FORUM UTILITY / Only show to 'active' users --%>
<c:choose>
	<c:when test="${currentUserIsActive eq 'true'}">
	
		<div class="forum-utility">
			<ul>
				<c:choose>
					<c:when test="${show eq 'discussion_index'}">
						<c:choose>
							<c:when test="${loginStatus eq 'loggedIn'}">
								<li><a href="/community/forums/start_discussion/${forumId}/${categoryParent}" class="btn-strong btn-medium new-discussion"><i></i>Start new discussion</a></li>
							</c:when>
							<c:otherwise>
								<li><a href="/eom/SysConfig/WebPortal/Boston/Framework/regi/regi-login-register.jsp" class="btn-strong btn-medium new-discussion"><i></i>Start a new discussion!</a></li>				
							</c:otherwise>
						</c:choose>
						<%--<li><a href="" class="button mark-all"><i></i>Mark all as read</a></li>
						<li><a href="" class="button subscribe"><i></i>Subscribe</a></li>--%>
					</c:when>
					
					<c:when test="${show eq 'discussion'}">
						<c:choose>
							<c:when test="${loginStatus eq 'loggedIn'}">
								<li><a href="/community/forums/start_discussion/${forumId}/${forumSectionCategoryId}" class="btn-strong btn-medium new-discussion"><i></i>Start new discussion</a></li>
								<li><a href="#add-post-form" class="btn-strong btn-medium new-post" data-action="new-post"><i></i>Add a new post</a></li>							
							</c:when>
							<c:otherwise>
								<li><a href="/eom/SysConfig/WebPortal/Boston/Framework/regi/regi-login-register.jsp" class="btn-strong btn-medium new-discussion"><i></i>Start new discussion</a></li>
								<li><a href="/eom/SysConfig/WebPortal/Boston/Framework/regi/regi-login-register.jsp" class="btn-strong btn-medium new-post" data-action="new-post"><i></i>Add a new post</a></li>							
							</c:otherwise>
						</c:choose>
						<%--<li><a href="" class="button mark-all"><i></i>Mark all as read</a></li>--%>		
					</c:when>
					
				</c:choose>
				
				<%-- RSS Link
				<c:choose>
					<c:when test="${show eq 'discussion'}">
						<a href="" class="rss-feed">RSS</a>
					</c:when>
				</c:choose>
				--%>
			</ul>
		</div><!-- / .forum-utility -->
		
	</c:when>
</c:choose>