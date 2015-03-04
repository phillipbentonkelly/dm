<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="jp" uri="jptag" %>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="c" uri="jstlCore" %>
<c:set var="userUrl" value="${ugcUrl}/users/${user.id}"/>
<c:import var="userDoc" url="${userUrl}" /> 
<x:parse var="userXml"  doc="${userDoc}" />
<x:set var="forumSignature" select="string($userXml/user/forumSignature/text())" scope="request"/>

<c:choose>
	<c:when test="${currentUserIsActive eq 'true'}">
		<%-- User is active, display forms --%>
		<div class="add-content">
			<div class="add-content-head">
				<div>
					<p class="section-header">Start a discussion</p>
					<p>Screen name: <a href="/community/user/${currentUserId}">${currentUserName}</a> (Not you? <a href="/logout">Log out</a>)
				</div>
				<p><b>Category: </b>${forumSectionCategoryName}</p>  
				<p><b>Forum: </b>${forumName}</p>
				<p>Fields marked with a "<span class="req">*</span>" are required.</p>
				<p>We don't allow HTML, but if you start your links with "http://", they will be clickable.</p>
				<%--<p>Please follow our <a href="">Privacy Policy</a></p>--%>
			</div><!-- / .create-post-head -->
			<div class="add-content-form">
				<form action="" method="POST" id="start-discussion-form">
					<div class="text form-section">
						<label for="title">Headline <span class="req">*</span></label>
						<input type="text" name="title" id="title" class="user" />
					</div>
					<div class="text form-section">
						<label for="body">Your post <span class="req">*</span></label>
						<textarea name="body" id="add-post-body" class="richtext user"><br/>${forumSignature}</textarea>
					</div>
					<%--<div class="checkbox">
						<input type="checkbox" name="mark-as-question" id="mark-as-question" />
						<label for="mark-as-question">Mark this post as a QUESTION<label>
					</div>--%>
					<div>
						<input type="hidden" value="${categoryParent}" id="section-category-id" />
						<input type="hidden" value="${forumParent}" id="forum-id" />
						<%--<input type="hidden" value="${forumName}" id="forum-name" />
						<input type="hidden" value="${forumSectionName}" id="section-name" />
						<input type="hidden" value="${forumSectionCategoryName}" id="category-name" /> --%>
						<!-- Submit  -->
						<input type="submit" value="Add your post" class="btn-strong btn-medium" />
						<%--<a href="#" class="button" data-action="add-poll">Add a poll to this discussion</a>--%>
						<a href="#" class="cancel-link" data-action="cancel">Cancel</a>
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