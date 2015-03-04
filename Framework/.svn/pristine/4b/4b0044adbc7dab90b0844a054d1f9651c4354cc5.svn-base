<%@ page import="com.boston.ugc.utils.highlighter.lucene.*" %>
<%@ taglib prefix="fna" uri="http://java.sun.com/jsp/jstl/functions" %>

<c:set var="userUrl" value="${ugcUrl}/users/${user.id}"/>
<c:import var="userDoc" url="${userUrl}" /> 
<x:parse var="userXml"  doc="${userDoc}" />
<x:set var="forumSignature" select="string($userXml/user/forumSignature/text())" scope="request"/>

<div data-id="${currentDiscussion}" data-page="${page}" class="discussion discussion-list">
	<ol>
	<c:choose>
		<c:when test="${dataAdmin eq 'true'}">
			<x:forEach var="currentPost" begin="0" select="$postsXml/interactions/interaction">
			<x:set var="currentPostId" select="string($currentPost/id/text())"/>
			<x:set var="postApproval" select="string($currentPost/approvalStatus/text())"/>
			<x:set var="postUserName" select="string($currentPost/actingUserName/text())"/>
			<x:set var="postUserId" select="string($currentPost/actingUserKey/text())"/>
			<x:set var="postUserBlocked" select="string($currentPost/actingUserBlocked/text())"/>
			<x:set var="postTitle" select="string($currentPost/title/text())"/>
			<x:set var="postDateTime" select="string($currentPost/createDate/text())"/>
			<x:set var="userPosts" select="string($currentPost/totalPost/text())"/>	
			<x:set var="userFirstPostDate" select="string($currentPost/firstPostDate/text())"/>
			<x:set var="userLastPostDate" select="string($currentPost/lastPostDate/text())"/>
			<x:set var="postUserIcon" select="string($currentPost/actingUserImageUrl/text())"/>
			<x:set var="postIgnored" select="string($currentPost/ignored/text())"/>
			<c:choose>
				<c:when test="${postIgnored eq 'true'}">
					<c:set var="postIgnoredClass" value="ignored"/>
				</c:when>
				<c:otherwise>
					<c:set var="postIgnoredClass" value=""/>
				</c:otherwise>
			</c:choose>
			<x:set var="body" select="string($currentPost/body/text())"/>
			
			<jp:out var="body" value="${body}" escape="false"/>
			
			<% 	
		  		String userFirstPostDateTimeString = (String) pageContext.getAttribute("userFirstPostDate");
				String userLastPostDateTimeString = (String) pageContext.getAttribute("userLastPostDate");
				String postDateTimeString = (String) pageContext.getAttribute("postDateTime");
				//String createDate, createdTime;
				DateTimeFormatter dateTimeFormatter = ISODateTimeFormat.dateTimeParser();
		
				if (userFirstPostDateTimeString != "") {
		
					DateTime firstPostDateTime = dateTimeFormatter.parseDateTime(userFirstPostDateTimeString);
					String firstPostDateString = DateTimeFormat.forPattern("M/d/yyyy").withLocale(Locale.US).print(firstPostDateTime);
					pageContext.setAttribute("firstPostDateString", firstPostDateString);
				}
				if (userLastPostDateTimeString != "") {
		
					DateTime lastPostDateTime = dateTimeFormatter.parseDateTime(userLastPostDateTimeString);
					String lastPostDateString = DateTimeFormat.forPattern("M/d/yyyy").withLocale(Locale.US).print(lastPostDateTime);
					pageContext.setAttribute("lastPostDateString", lastPostDateString);
				}
				if (postDateTimeString != "") {
		
					DateTime postDateTime = dateTimeFormatter.parseDateTime(postDateTimeString);
					String postDateString = DateTimeFormat.forPattern("M/d/yyyy h:mm aa zzz").withLocale(Locale.US).print(postDateTime);
					pageContext.setAttribute("postDateString", postDateString);
				}
			%>
			<li class="post ${postIgnoredClass}" id="post-${currentPostId}" data-id="${currentPostId}" data-create-date="${postDateTime}" data-user-id="${postUserId}">
				<div class="ignored-message">
					<p>
						You have chosen to ignore posts from ${postUserName}.
						<a href="#" class="stop-ignoring icon unignore-user" data-action="stop-ignoring-user" data-user-id="${postUserId}">Show ${postUserName}'s posts</a>	
					</p>
				</div>
				<div class="post-head">
					<p class="post-subject" >${postTitle}</p>
					<p class="post-date">posted at ${postDateString}</p>
				</div><!-- / .post-head -->
				<div class="user-info">
					<ul>		
						<li><a href="/community/user/${postUserId}"><img src="${postUserIcon}" alt="" class="profile-image" /></a></li>
						<li class="username"><a href="/community/user/${postUserId}">${postUserName}</a></li>
						<li>Posts: ${userPosts}</li>
						<li>First: ${firstPostDateString}</li>
						<li>Last: ${lastPostDateString }</li>
					</ul>
				</div><!-- / .user-info -->
				<div class="post-content">
					${body}
				</div><!-- / .post-content -->
				<div class="post-utility">
					<ul class="user-actions">
						<c:if test="${postUserName eq currentUserName}">
							<li><a href="#edit-post-form" class="btn-light btn-small edit-post" data-action="edit-post" data-post-id="${currentPostId}">Edit post</a></li>
						</c:if>
						<li><a href="#add-post-form" class="btn-light btn-small reply-to-post" data-action="reply">Reply to this post</a></li>
						<li><a href="#add-post-form" class="btn-light btn-small new-post" data-action="new-post">New post</a></li>
						<li><a href="#" class="btn-light btn-small report-post" data-action="report-abuse" data-id="${currentPostId}" data-user-id="${postUserId}">Report abuse</a></li>
						<c:if test="${postUserName != currentUserName}">
							<li><a href="#" class="btn-light btn-small ignore-user" data-action="ignore-user" data-user-id="${postUserId}">Ignore ${postUserName}</a></li>
						</c:if>
					</ul>
					<ul class="admin-actions">
						<li class="admin"><a href="#" class="btn-light btn-small email-user" data-action="email-user" data-user-id="${postUserId}">Email ${postUserName}</a></li>
						<c:choose>
							<c:when test="${postUserBlocked eq 'true'}">
								<li class="admin"><a href="#" class="btn-light btn-small block-user" data-action="block-user" data-value="true" data-id="${postUserId}">Unblock user</a></li>
							</c:when>									
							<c:otherwise>									
								<li class="admin"><a href="#" class="btn-light btn-small block-user" data-action="block-user" data-value="false" data-id="${postUserId}">Block user</a></li>
							</c:otherwise>
						</c:choose>
						<c:choose>
							<c:when test="${postApproval eq 'BLOCKED'}">
								<li class="admin"><a href="#" class="btn-light btn-small delete-post" data-action="block-post" data-value="blocked" data-id="${currentPostId}">Unblock post</a></li>
							</c:when>
							<c:otherwise>
								<li class="admin"><a href="#" class="btn-light btn-small delete-post" data-action="block-post" data-value="unmoderated" data-id="${currentPostId}">Block post</a></li>
							</c:otherwise>
						</c:choose>
					</ul>
					<!-- the section is for BCOM-9998  -->
					<ul class="icon share icon-list share-icons nocontent">
						<li>
							<a href="#" class="comment-share-fb facebook-icon social-icon"></a>
						</li>
						<li>
							<a href="#" class="comment-share-tw twitter-icon social-icon"></a>
						</li>
					</ul>
					<!-- the section is for BCOM-9998  END -->
				</div><!-- / .post-utility -->
				<a href="#" id="after-post-${currentPostId}" class="post-anchor">&nbsp;</a>
			</li>
			</x:forEach>
		</c:when>
		<c:otherwise>
			<%-- ${dataAdmin != 'true'} --%>
			<x:forEach var="currentPost" begin="0" select="$postsXml/interactions/interaction">
				<x:set var="currentPostId" select="string($currentPost/id/text())"/>
				<x:set var="postApproval" select="string($currentPost/approvalStatus/text())"/>
				<x:set var="postUserName" select="string($currentPost/actingUserName/text())"/>
				<x:set var="postUserId" select="string($currentPost/actingUserKey/text())"/>
				<x:set var="postUserBlocked" select="string($currentPost/actingUserBlocked/text())"/>
				<x:set var="postDateTime" select="string($currentPost/createDate/text())"/>
				<x:set var="postIgnored" select="string($currentPost/ignored/text())"/>
				<c:choose>
					<c:when test="${postIgnored eq 'true'}">
						<c:set var="postIgnoredClass" value="ignored"/>
					</c:when>
					<c:otherwise>
						<c:set var="postIgnoredClass" value=""/>
					</c:otherwise>
				</c:choose>
	
				<li class="post ${postIgnoredClass}" id="post-${currentPostId}" data-id="${currentPostId}" data-create-date="${postDateTime}" data-user-id="${postUserId}">
				
				<c:choose>
					<c:when test="${((postUserBlocked eq 'false') || (postUserName eq currentUserName)) && !(postApproval eq'BLOCKED')}">
				
						<x:set var="postTitle" select="string($currentPost/title/text())"/>
						<x:set var="postDateTime" select="string($currentPost/createDate/text())"/>
						<x:set var="userPosts" select="string($currentPost/totalPost/text())"/>	
						<x:set var="userFirstPostDate" select="string($currentPost/firstPostDate/text())"/>
						<x:set var="userLastPostDate" select="string($currentPost/lastPostDate/text())"/>
						<x:set var="postUserIcon" select="string($currentPost/actingUserImageUrl/text())"/>
						<x:set var="body" select="string($currentPost/body/text())"/>
						<jp:out var="body" value="${body}" escape="false"/>
						<% 	
				   			String userFirstPostDateTimeString = (String) pageContext.getAttribute("userFirstPostDate");
							String userLastPostDateTimeString = (String) pageContext.getAttribute("userLastPostDate");
							String postDateTimeString = (String) pageContext.getAttribute("postDateTime");
							//String createDate, createdTime;
							DateTimeFormatter dateTimeFormatter = ISODateTimeFormat.dateTimeParser();
				
							if (userFirstPostDateTimeString != "") {
				
								DateTime firstPostDateTime = dateTimeFormatter.parseDateTime(userFirstPostDateTimeString);
								String firstPostDateString = DateTimeFormat.forPattern("M/d/yyyy").withLocale(Locale.US).print(firstPostDateTime);
								pageContext.setAttribute("firstPostDateString", firstPostDateString);
							}
							if (userLastPostDateTimeString != "") {
				
								DateTime lastPostDateTime = dateTimeFormatter.parseDateTime(userLastPostDateTimeString);
								String lastPostDateString = DateTimeFormat.forPattern("M/d/yyyy").withLocale(Locale.US).print(lastPostDateTime);
								pageContext.setAttribute("lastPostDateString", lastPostDateString);
							}
							if (postDateTimeString != "") {
				
								DateTime postDateTime = dateTimeFormatter.parseDateTime(postDateTimeString);
								String postDateString = DateTimeFormat.forPattern("M/d/yyyy h:mm aa zzz").withLocale(Locale.US).print(postDateTime);
								pageContext.setAttribute("postDateString", postDateString);
							}
						%>
						<div class="ignored-message">
							<p>
								You have chosen to ignore posts from ${postUserName}.
								<a href="#" class="stop-ignoring icon unignore-user" data-action="stop-ignoring-user" data-user-id="${postUserId}">Show ${postUserName}'s posts</a>	
							</p>
						</div>
						<div class="post-head">
							<p class="post-subject" >${postTitle}</p>
							<p class="post-date">posted at ${postDateString}</p>
						</div><!-- / .post-head -->
						<div class="user-info">
							<ul>		
								<li><a href="/community/user/${postUserId}"><img src="${postUserIcon}" alt="" class="profile-image" /></a></li>
								<li class="username"><a href="/community/user/${postUserId}">${postUserName}</a></li>
								<li>Posts: ${userPosts}</li>
								<li>First: ${firstPostDateString}</li>
								<li>Last: ${lastPostDateString }</li>
							</ul>
						</div><!-- / .user-info -->
						<div class="post-content">
							${body}
						</div><!-- / .post-content -->
						<%-- POST UTILITY / Only show if user is active --%>
						<c:choose>
							<c:when test="${currentUserIsActive eq 'true'}">
								<div class="post-utility">
									<ul>
										<c:if test="${postUserName eq currentUserName}">
											<li><a href="#edit-post-form" class="btn-light btn-small edit-post" data-action="edit-post" data-post-id="${currentPostId}">Edit post</a></li>
										</c:if>
										<li><a href="#add-post-form" class="btn-light btn-small reply-to-post" data-action="reply">Reply to this post</a></li>
										<li><a href="#add-post-form" class="btn-light btn-small new-post" data-action="new-post">New post</a></li>
										<li><a href="#" class="btn-light btn-small report-post" data-action="report-abuse" data-id="${currentPostId}" data-user-id="${postUserId}" data-create-dt="${postDateTime}">Report abuse</a></li>
										<c:if test="${postUserName != currentUserName}">
											<li><a href="#" class="btn-light btn-small ignore-user" data-action="ignore-user" data-user-id="${postUserId}">Ignore ${postUserName}</a></li>
										</c:if>
									</ul>
								</div><!-- / .post-utility -->
							</c:when>
						</c:choose>
						<!-- the section is for BCOM-9998  -->
						<div class="post-utility">	
							<ul class="icon share">
								<li>
									<a href="#" class="comment-share-fb">
										<img src="http://cache.boston.com/universal/site_graphics/fb_logo.png" />
									</a>
								</li>
								<li>
									<a href="#" class="comment-share-tw">
										<img src="http://cache.boston.com/universal/site_graphics/twitter_logo.png" />
									</a>
								</li>
							</ul>
						</div>
						<!-- the section is for BCOM-9998  END -->
					</c:when>
					<c:otherwise>
						<div class="post-content">
							<p><i>This post has been removed.</i></p>
						</div><!-- / .post-content -->
					</c:otherwise>
				</c:choose>
				<a href="#" id="after-post-${currentPostId}" class="post-anchor">&nbsp;</a>
				</li>
			</x:forEach>
		</c:otherwise>
	</c:choose>
	</ol>
</div><!-- / .discussion-list -->

<c:set var="quote" value='"' />
<c:set var="quote_replace" value='\\"' />
<%-- norlov: BCOM-9554 --%>
<script language="JavaScript">
var forumSignature = "${fna:replace(forumSignature, quote, quote_replace)}";
</script>
<div id="forumSignature" style="display:none;">${forumSignature}</div>
<%-- norlov: BCOM-9554 END --%>

<div class="forum-footer">

	<%-- PAGINATION  --%>
	<%@ include file="components/pagination3.jsp" %>
	
	<%-- DISCUSSION UTILITY / Only show to 'active' users --%>
	<c:choose>
		<c:when test="${currentUserIsActive eq 'true'}">
			<div class="discussion-utility quick-border">
				<ul>
				<c:choose>
					<c:when test="${loginStatus eq 'loggedIn'}">
						<li><a href="/community/forums/start_discussion/${forumId}/${forumSectionCategoryId}" class="btn-strong btn-medium"><i></i>Start new discussion</a></li>
					</c:when>
					<c:otherwise>
						<li><a href="/eom/SysConfig/WebPortal/Boston/Framework/regi/regi-login-register.jsp" class="btn-strong btn-medium"><i></i>Start a new discussion</a></li>				
					</c:otherwise>
				</c:choose>	
				</ul>
			</div><!-- / .discussion-utility -->
		</c:when>
	</c:choose>	
	
 	<%-- <p:include url="$configurationURI/Framework/skins/forums/components/pagination.jpt" />	--%>

	<c:if test="${loginStatus eq 'loggedIn'}">
		<c:choose>
			<c:when test="${currentUserIsActive eq 'true'}">
				<%-- User is active, display forms --%>
				<%-- ADD COMMENT FORM --%>
				<div class="add-content">
					<div class="add-content-head">
						<div>
							<h2 class="section-h2">Add your thoughts</h2>
							<p>Screen name: <a href="/community/user/${currentUserId}">${currentUserName}</a> (Not you? <a href="/logout">Log out</a>)
						</div>
							<p>Fields marked with a "<span class="req">*</span>" are required.</p>
							<p>We don't allow HTML, but if you start your links with "http://", they will be clickable.</p>
					</div><!-- / .create-post-head -->
					<div class="add-content-form">
						<!--  Add Form -->
						<form action="" method="POST" id="add-post-form">
							<div class="text form-section">
								<label for="add-subject">Headline <span class="req">*</span></label>
								<input type="text" name="title" value="Re: ${discussionTitle}" id="add-post-title" />
							</div>
							<div class="text form-section">
								<label for="add-post">Your post <span class="req">*</span></label>
								<textarea name="body" id="add-post-body" class="richtext" style="width:100%;"><br/>${forumSignature}</textarea>
							</div>
							<%--<div class="checkbox">
								<input type="checkbox" name="mark-as-question" id="mark-as-question" />
								<label for="mark-as-question">Mark this post as a QUESTION</label>
							</div>--%>
							<div>
								<input type="hidden" value="${discussionUrl}" id="discussion-url" />
								<input type="hidden" value="${currentDiscussion}" id="discussion-id" />
								<input type="hidden" value="${forumName}" id="forum-name" />
								<input type="hidden" value="${forumId}" id="forum-id" />
								<input type="hidden" value="${forumSectionName}" id="section-name" />
								<input type="hidden" value="${forumSectionCategoryName}" id="category-name" />
								<input type="hidden" value="${discussionTitle}" id="discussion-title" />
								<input type="hidden" value="${numPages}" id="current-last-page" />
								<!-- Submit -->
								<input type="submit" value="Add your post" class="btn-strong btn-medium" id="submit-add-post"/>
								<!-- Validation Message -->
								<span class="validation req">Please fill out all required fields.</span>
							</div>
							<div class="posting-policy-links">
								<p>Your comment is subject to the rules of our <a href="http://www.boston.com/community/rules/" target="_blank" onclick="openWindow('http://www.boston.com/community/rules/','','width=500,height=360,resizable=yes,scrollbars=yes,toolbar=no,location=no,menubar=no,status=no'); return false;">Posting Policy</a></p>
								<p>This comment may appear on your public profile. <a href="http://www.boston.com/help/public_profile_faq/">Public Profile FAQ</a></p>
							</div>
						</form>
						<!--  Edit Form -->
						<form action="" method="POST" id="edit-post-form" style="display:none;">
							<div class="text form-section">
								<label for="edit-subject">Headline <span class="req">*</span></label>
								<input type="text" name="title" value="" id="edit-post-title" />
							</div>
							<div class="text form-section">
								<label for="edit-post">Your post <span class="req">*</span></label>
								<textarea name="body" id="edit-post-body" class="richtext" style="width:100%;height:250px;"></textarea>
							</div>
							<div>
								<input type="hidden" value="${discussionUrl}" id="discussion-url" />
								<input type="hidden" value="${currentDiscussion}" id="discussion-id" />
								<input type="hidden" value="${forumName}" id="forum-name" />
								<input type="hidden" value="${forumId}" id="forum-id" />
								<input type="hidden" value="${forumSectionName}" id="section-name" />
								<input type="hidden" value="${forumSectionCategoryName}" id="category-name" />
								<input type="hidden" value="${discussionTitle}" id="discussion-title" />
								<input type="hidden" value="${numPages}" id="current-last-page" />
								<!-- Post ID -->
								<input type="hidden" value="" id="edit-post-id" />
								<!-- Submit -->
								<input type="submit" value="Save edit" class="btn-strong btn-medium" id="submit-edit-post"/>
								<!-- Validation Message -->
								<span class="validation req">Please fill out all required fields.</span>
							</div>
							<div class="posting-policy-links">
								<p>Your comment is subject to the rules of our <a href="http://www.boston.com/community/rules/" target="_blank" onclick="openWindow('http://www.boston.com/community/rules/','','width=500,height=360,resizable=yes,scrollbars=yes,toolbar=no,location=no,menubar=no,status=no'); return false;">Posting Policy</a></p>
								<p>This comment may appear on your public profile. <a href="http://www.boston.com/help/public_profile_faq/">Public Profile FAQ</a></p>
							</div>
						</form>
					</div><!-- / .add-content-form -->
				</div><!-- / .add-content -->
			</c:when>
			<c:otherwise>
				<%-- User is not active, display message --%>
				<div class="add-content">
					<p>We have de-activated your account. If you have questions, e-mail <a href="mailto:feedback@boston.com">feedback@boston.com</a>.</p>
				</div><!-- / .add-content -->			
			</c:otherwise>
		</c:choose>	
	</c:if>
</div><!-- / .forum-footer -->