<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ page import="java.lang.String.*, java.lang.Math.*"%>
<%@ page import="org.joda.time.format.DateTimeFormatter" %>
<%@ page import="org.joda.time.format.DateTimeFormat" %>
<%@ page import="org.joda.time.format.ISODateTimeFormat" %>
<%@ page import="org.joda.time.DateTime" %>
<%@ page import="java.util.Locale" %>

<%@ include file="../../../common/regi_path.jsp" %>

<c:set var="tabTitle" value="My Profile" />
<c:set var="categoryName" value="${tabTitle}" scope="request"/>

<div class="section edit-profile">
	<h2 class="section-h2">My Profile</h2>
	<div class="intro">
		<p>Tell others a little about yourself. If you would like to change your e-mail address, password, or other site registration options, please visit 

your <a href="${regipath}/membercenter-update-info.jsp">Member Center</a> page.</p>
	</div>
	
	<div class="user-avatar">
		<%-- Upload Avatar Form --%>
		<form action="/ugc/users/${user}/avatar" name="edit-avatar-form" id="edit-avatar-form" method="POST" enctype="multipart/form-data">
			<div class="form-section first">
				<label>Avatar</label>
				<div class="form-input">
					<div class="set-avatar">
						<img src="${userIcon}" alt="Avatar" class="user-avatar current" />
						<div class="upload-custom">
							Use one of your own images:
							<input type="file" name="file" id="custom-avatar" />
						</div>
						<div class="use-stock">
							Don't have an image handy?
							<a href="#" id="show-stock-avatars" data-toggle="closed">Use one of ours...</a>
						</div>
					</div><!-- .upload -->
					<div id="stock-avatars">
						<%-- Stock avatar list is loaded via ajax --%>
					</div><!-- .stock-avatars -->
				</div><!-- .form-input -->
			</div><!-- .form-section -->
		</form>
	</div><!-- .user-avatar -->
	
	
	<%-- Edit Profile Form --%>
	<form action="" name="edit-profile" id="edit-profile-form" method="POST">
		<div class="form-section">
			<label for="aboutMe">About Me</label>
			<div class="form-input">
				<textarea name="aboutMe" id="aboutMe">${aboutMe}</textarea>
			</div>
		</div>
		<div class="form-section inline">
			<label for="gender">Gender</label>
			<div class="form-input">
				<c:choose>
					<c:when test="${userGender eq 'MALE'}">
						<span><input type="radio" name="gender" value="MALE" checked/> Male </span>
						<span><input type="radio" name="gender" value="FEMALE" /> Female </span>
						<span><input type="radio" name="gender" value="HIDE"/> Don't display gender</span>
					</c:when>
					<c:when test="${userGender eq 'FEMALE'}">
						<span><input type="radio" name="gender" value="MALE" /> Male </span>
						<span><input type="radio" name="gender" value="FEMALE" checked/> Female </span>
						<span><input type="radio" name="gender" value="HIDE"/> Don't display gender</span>
					</c:when>
					<c:otherwise>
						<span><input type="radio" name="gender" value="MALE" /> Male </span>
						<span><input type="radio" name="gender" value="FEMALE" /> Female </span>
						<span><input type="radio" name="gender" value="HIDE" checked/> Don't display gender</span>
					</c:otherwise>
				</c:choose>
			</div>
		</div>
		<div class="form-section">
			<label for="location">Location</label>
			<div class="form-input">
				<input type="text" name="location" value="${userLocation}" placeholder="e.g. Boston, MA" id="location"/>		
			</div>
		</div>
		<div class="form-section inline">
			<label for="userProfileVisibility">My Page content is</label>
			<div class="form-input">
			<c:choose>
				<c:when test="${userProfileVisibility eq 'PUBLIC'}">
					<span><input type="radio" name="profileVisibility" value="PUBLIC" checked/> Public </span>
					<span><input type="radio" name="profileVisibility" value="PRIVATE" /> Private </span>
				</c:when>
				<c:otherwise>
					<span><input type="radio" name="profileVisibility" value="PUBLIC" /> Public </span>
					<span><input type="radio" name="profileVisibility" value="PRIVATE" checked/> Private </span>
				</c:otherwise>
			</c:choose>			
			</div>
		</div>
		<div class="form-section">
			<label for="forumSignature">Forum signature</label>
			<div class="form-input">
				<textarea name="forumSignature" class="richtext" id="forum-signature">${forumSignature}</textarea>
				<p>This signature will appear under comments you post in the forums. It will not appear on comments you make on articles.</p>
			</div>
		</div>
		<div class="form-input">
			<input type="hidden" value="${user}" id="user-id" />
			<input type="submit" value="Update profile" class="btn-strong btn-medium" id="submit-edit-profile" />
		</div>
	</form><!-- / Edit Profile -->
</div><!-- / .section -->