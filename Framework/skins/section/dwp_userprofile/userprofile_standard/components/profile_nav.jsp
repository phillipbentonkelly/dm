<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>

<c:set var="url" value="/community/user" />

<nav class="profile-nav">
	<ul class="tabs">	
		<c:choose>
			<c:when test="${show eq 'home'}">
				<li class="active">
			</c:when>
			<c:otherwise>
				<li>
			</c:otherwise>
		</c:choose>
		<a href="${url}/home/${user}">Home</a>
		</li>
		
		<c:choose>
			<c:when test="${show eq 'messages'}">
				<li class="active">
			</c:when>
			<c:otherwise>
				<li>
			</c:otherwise>
		</c:choose>
		<a href="${url}/messages/${user}">Messages</a>
		</li>
		
		<c:choose>
			<c:when test="${show eq 'comments'}">
				<li class="active">
			</c:when>
			<c:otherwise>
				<li>
			</c:otherwise>
		</c:choose>
		<a href="${url}/comments/${user}">Comments</a>
		</li>
		
		<c:choose>
			<c:when test="${show eq 'forum-posts'}">
				<li class="active">
			</c:when>
			<c:otherwise>
				<li>
			</c:otherwise>
		</c:choose>
		<a href="${url}/forum-posts/${user}">Forum Posts</a>
		</li>
		
	  	<c:if test="${viewingOwnProfile eq 'true'}"> 
			<c:choose>
				<c:when test="${show eq 'my-profile'}">
					<li class="active">
				</c:when>
				<c:otherwise>
					<li>
				</c:otherwise>
			</c:choose>
			<a href="${url}/myprofile/${user}">My Profile</a>
			</li>
		 </c:if> 
	</ul>
</nav><!-- / .profile-nav -->