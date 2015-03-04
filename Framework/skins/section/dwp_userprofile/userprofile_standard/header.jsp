<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ page import="java.lang.String.*, java.lang.Math.*"%>
<%@ page import="org.joda.time.format.DateTimeFormatter" %>
<%@ page import="org.joda.time.format.DateTimeFormat" %>
<%@ page import="org.joda.time.format.ISODateTimeFormat" %>
<%@ page import="org.joda.time.DateTime" %>
<%@ page import="java.util.Locale" %>

<div class="profile-head">

	<div class="username">
		<h2 class="h2">${userS} Page</h2>
	</div><!-- / .username -->
		
	<c:choose>
		<c:when test="${viewingOwnProfile}">
		
			<div class="personal-info">
				<img src="${userIcon}" alt="${userName}" class="profile-image" />
				<p><a href="/community/user/myprofile/${user}" class="btn-light btn-medium pull-right">Edit Profile</a><p>		
				<c:choose>
					<c:when test="${hasGenderAndLocation}">
						<div class="gender-location">${userGender}, 	   ${userLocation}</div>
						<c:choose>
							<c:when test="${hasAboutMe}">
								<div><b>About Me:</b> ${aboutMe}</div>	
							</c:when>
							<c:otherwise>
								<p>You can add more about yourself here by visiting the Profile tab below or by
								<a href="/community/user/myprofile/${user}">clicking here</a>.</p>							
							</c:otherwise>
						</c:choose>
					</c:when>
					<c:when test="${hasGenderOnly}" >
						<p>${userGender}</p>
						<c:choose>
							<c:when test="${hasAboutMe}">
								<p><b>About Me:</b> ${aboutMe}</p>	
							</c:when>
							<c:otherwise>
								<p>You can add more about yourself here by visiting the Profile tab below or by
								<a href="/community/user/myprofile/${user}">clicking here</a>.</p>							
							</c:otherwise>
						</c:choose>
					</c:when>
					<c:when test="${hasLocationOnly}" >
						<p>${userLocation}</p>
						<c:choose>
							<c:when test="${hasAboutMe}">
								<p><b>About Me:</b> ${aboutMe}</p>	
							</c:when>
							<c:otherwise>
								<p>You can add more about yourself here by visiting the Profile tab below or by
								<a href="/community/user/myprofile/${user}">clicking here</a>.</p>							
							</c:otherwise>
						</c:choose>
					</c:when>
					<c:when test="${hasAboutMe}" >
						<p><b>About Me:</b> ${aboutMe}</p>
					</c:when>
					<c:otherwise>
						<p>Share a little about yourself. 
						Add a photo, a brief description about yourself and your interests. 
						<a href="/community/user/myprofile/${user}">Click here</a></p>
					</c:otherwise>
				</c:choose>
			</div><!-- / .personal-info -->
			<%@ include file="components/profile_nav.jsp" %>
		</c:when>
		<%--<c:otherwise>  --%> 
		
		<c:when test="${!(userProfileVisibility eq 'PRIVATE' || userProfileVisibility eq 'SHARED_WITH_FRIENDS') || (ugc.user.tier eq 'ADMIN')}"> 
			<%-- <a href="" class="recommend">&#9733; Recommend (1)</a> --%>
			<div class="personal-info">
				<img src="${userIcon}" alt="${userName}" class="profile-image" />
				<c:choose>
					<c:when test="${hasGenderAndLocation}">
						<p>${userGender}, 	 ${userLocation}</p>
						<c:if test="${hasAboutMe}">
							<p><b>About Me:</b> ${aboutMe}</p>
						</c:if>
					</c:when>
					<c:when test="${hasGenderOnly}" >
						<p>${userGender}</p>
						<c:if test="${hasAboutMe}">
							<p><b>About Me:</b> ${aboutMe}</p>
						</c:if>
					</c:when>
					<c:when test="${hasLocationOnly}" >
						<p>${userLocation}</p>
						<c:if test="${hasAboutMe}">
							<p><b>About Me:</b> ${aboutMe}</p>
						</c:if>
					</c:when>
					<c:when test="${hasAboutMe}" >
						<p><b>About Me:</b> ${aboutMe}</p>
					</c:when>
					<c:otherwise>
						<p>This member hasn't added any personal information yet.</p><br/><%-- This person has not created their profile yet. --%>
						<p>Leave ${userName} a message to find out more.</p> 
						<%-- or Add SchwenLarson as a friend and you can check back later. --%>
					</c:otherwise>
				</c:choose>
			</div><!-- / .personal-info -->
			<div class="profile-actions">
				<ul>
				<c:choose>
					<c:when test="${ugc.user.active eq 'true'}">
						<li>
							<a href="/community/user/messages/${user}" class="box btn-light btn-small">Leave a Message</a>
						</li>
						<li>
							<a href="#" class="icon report user-action" data-action-type="report" data-report-type="user" data-action-id="${user}">Report Abuse</a>
						</li>
						<li>
						<c:choose>
							<c:when test="${ignored eq 'true'}">
								<a href="#" class="icon unignore-user user-action" data-action-type="ignore-user" data-ignore-type="stop-ignore" data-action-id="${user}">Stop ignoring ${userName}</a>
							</c:when>
							<c:otherwise>
								<a href="#" class="icon ignore-user user-action" data-action-type="ignore-user" data-ignore-type="start-ignore" data-action-id="${user}">Ignore ${userName}</a>
							</c:otherwise> 
						</c:choose>
						
							
						</li>
					</c:when>
				</c:choose>
					
				</ul>
			</div><!-- / .personal-info .col-b -->
			<%@ include file="components/profile_nav.jsp" %>
		</c:when>
		
		<c:otherwise>
			<div class="personal-info col-a">
				<img src="${userIcon}" alt="${userName}" class="profile-image" />
				<p>${userS} profile is set to private.</p>
			</div><!-- You must be logged in to leave a message. <a href="/eom/SysConfig/WebPortal/Boston/Framework/regi/login.jsp">Login</a> | <a href="/eom/SysConfig/WebPortal/Boston/Framework/regi/regi-login-register.jsp">Register</a>--> <!-- / .personal-info .col-a -->
			<div class="profile-actions col-b">
				<ul>
					<%--<li>
						<a href="" class="box">Leave a Message</a>
					</li>
					<li>
						<a href="" class="box">Ask this member to add you as a Friend</a>
					</li>--%>
					<c:choose>
						<c:when test="${ugc.user.active eq 'true'}">
							<li>
								<a href="#" class="icon report" data-action="report-abuse-user" data-id="${user}">Report Abuse</a>
							</li>
						</c:when>
					</c:choose>
				</ul>
			</div>
		</c:otherwise>
	</c:choose>
	
</div><!-- / .profile-head -->