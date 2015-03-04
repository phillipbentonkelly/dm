<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ page import="java.lang.String.*, java.lang.Math.*"%>
<%@ page import="org.joda.time.format.DateTimeFormatter" %>
<%@ page import="org.joda.time.format.DateTimeFormat" %>
<%@ page import="org.joda.time.format.ISODateTimeFormat" %>
<%@ page import="org.joda.time.DateTime" %>
<%@ page import="java.util.Locale" %>

<c:set var="tabTitle" value="Messages" />
<c:set var="categoryName" value="${tabTitle}" scope="request"/>

<%@ include file="../../../common/regi_path.jsp" %>

<div class="section">
	<h2 class="section-h2">Messages</h2>
<ul class="messages">
	<c:if test="${loggedIn eq 'false'}">
		<p><a href="${loginUrl}">Log in</a> or <a href="${regipath}/regi-login-register.jsp">register</a> to leave a message for ${userName}!</p>
	</c:if>
	<c:if test="${(messagesXml eq '[#document: null]' || messagesXml eq null) && (messages eq '')}">
		<c:choose>
		<c:when test="${viewingOwnProfile eq true}">
			<p>You have no messages yet at the moment.</p>
		</c:when>
		<c:when test="${viewingOwnProfile eq false && loggedIn eq 'true' && ugc.user.active eq 'true'}">
		<%-- Get the conversation started...  --%>
			<p>Leave a message for ${userName}!</p>
		</c:when>
		</c:choose>
	</c:if>
	<c:if test="${viewingOwnProfile eq 'true'}">
	
		<x:forEach var="message" begin="0" select="$messagesXml/interactions/interaction">
				<x:set var="id" select="string($message/id/text())"/>
				<x:set var="actingUserKey" select="string($message/actingUserKey/text())"/>
				<x:set var="body" select="string($message/body/text())"/>
				<x:set var="created" select="string($message/createDate/text())"/>
				<x:set var="actingUserName" select="string($message/actingUserName/text())"/>
				<x:set var="actingUserImageUrl" select="string($message/actingUserImageUrl/text())"/>
				<x:set var="approvalStatus" select="string($message/approvalStatus/text())"/>
			
			<c:if test="${!(approvalStatus eq 'BLOCKED') || (ugc.user.tier eq 'ADMIN')}">
	   			<% 	
	   				String createdDateTimeString = (String) pageContext.getAttribute("created");
					//String createDate, createdTime;
	
					if (createdDateTimeString != "") {
	
						DateTimeFormatter dateTimeFormatter = ISODateTimeFormat.dateTimeParser();
						DateTime createdDateTime = dateTimeFormatter.parseDateTime(createdDateTimeString);
						String createdDateString = DateTimeFormat.forPattern("MM/dd/yyyy hh:mm:ss zzz").withLocale(Locale.US).print(createdDateTime);
						pageContext.setAttribute("createdDateString", createdDateString);
					}
				%>
				<li>
					<img src="${actingUserImageUrl}" alt="Username" class="profile-image"></img>
					<div class="message">
						<p class="author"><a href="/community/user/${actingUserKey}">${actingUserName}</a> wrote:</p>
						<p class="timestamp">${createdDateString}</p>
						<div>${body}</div>
						<ul class="user-actions">
							<li>
								<a href="#" class="btn-light btn-small user-action" data-action-id="${id}" data-action-type="report">Report Abuse</a>
							</li>
						</ul>
						<c:if test="${ugc.user.tier eq 'ADMIN'}">
							<ul class="admin-actions">
								<li>
									<c:choose>
										<c:when test="${approvalStatus eq 'BLOCKED'}">
											<a href="#" class="btn-light btn-small admin-action" data-action-type="ia" data-action-id="${id}" data-property="approvalStatus" data-value="UNMODERATED">Unblock Message</a>
										</c:when>
										<c:otherwise>
											<a href="#" class="btn-light btn-small admin-action" data-action-type="ia" data-action-id="${id}" data-property="approvalStatus" data-value="BLOCKED">Block Message</a>
										</c:otherwise>
									</c:choose>
								</li>			
							</ul>
						</c:if>	
					</div><!-- / .message -->
				</li>
			</c:if>
		</x:forEach>
	</c:if>
	</ul>
</div><!-- / .section -->
<c:if test="${viewingOwnProfile eq 'false' && loggedIn eq 'true' && ugc.user.active eq 'true'}">
<div class="add-content">
	<div class="add-content-head">
		<div>
			<b>Leave Me a Message</b>
			<p>All messages are private for now.</p>
		</div>
	</div><!-- / .create-post-head -->
	<div class="add-content-form">
		<form action="" method="POST" id="submit-message-form">
			<div class="text form-section">
				<textarea name="body" id="body" class="richtext"></textarea>
			</div>
			<div>
				<input type="hidden" value="${user}" id="named-user-id" name="namedUserKey" />
				<input type="hidden" value="${ugc.user.id}" id="acting-user-id" />
				<input type="hidden" value="MESSAGE" name="type" />
				<!-- Submit Button -->
				<input type="submit" value="Post Message" class="btn-strong btn-medium" />
				<!-- Validation Message -->
				<span class="validation req">Please fill out all required fields.</span>
			</div>
		</form>
	</div><!-- / .create-post-form -->
</div><!-- / .add-content -->
</c:if>