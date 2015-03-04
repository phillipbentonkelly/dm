<%--
{comments}
BDC-1190 added on-click tracking to comment count at bottom of articles
{comments}
--%>

<%@ taglib prefix="jp" uri="jptag" %>
<%@ taglib prefix="x" uri="jstlXml" %>
<%@ taglib prefix="c" uri="jstlCore" %>
<%@ taglib prefix="fn" uri="jstlFunctions" %>
<%@ taglib prefix="fmt" uri="formatTags" %>
<%@ taglib prefix = "p" uri = "ptag"%>
<c:set var="ugcUrl" value="${portalContext.publicBaseUrl}/ugc"/>
<c:set var="noComments" value="${param.noComments}"/>
<c:set var="limit" value="${param.limit}"/>
<c:set var="offset" value="${param.offset}"/>
<c:set var="topic" value="${param.topic}"/>
<c:set var="parent" value="${param.parent}"/>
<c:set var="sort" value="${param.sort}"/>
<c:set var="wrapComments" value="${param.wrapComments}"/>
<c:set var="siteUri" value="${portalContext.publicBaseUrl}"/>
<p:url type = "context" var = "questionIcon" value = "/img/bcom_help_404_page.svg" />
<c:set var="prop6" value="${param.prop6}"/>
<%
int paginationCnt = 8;

String queryString  = "?type=ARTICLE_COMMENT"; 
String limit	    = (String)pageContext.getAttribute("limit");
String offset       = (String)pageContext.getAttribute("offset");
String _page	    = (String)request.getParameter("page");
String topic	    = (String)pageContext.getAttribute("topic");
String parent	    = (String)pageContext.getAttribute("parent");
String sort         = (String)pageContext.getAttribute("sort");
String top		    = (String)pageContext.getAttribute("top");
String noComments 	= (String)pageContext.getAttribute("noComments");
String comment      = (String)request.getParameter("comment");
String wrapComments = (String)pageContext.getAttribute("wrapComments");
String siteUri      = (String)pageContext.getAttribute("siteUri");

if (limit != null){
	queryString += "&limit=" + limit; 
}
if (offset != null){
	queryString += "&offset=" + offset ; 
}
if (_page != null){
	limit = "25";
	queryString += "&offset=" + (Integer.parseInt(limit) * (Integer.parseInt(_page) - 1)) ; 
}
if (topic != null){
	queryString += "&topic=" + topic + "&recursive=true";
	if (wrapComments == null){
		wrapComments = "true";
	}
}
if (parent != null){
	queryString += "&parent=" + parent;
}
if (sort == null){
	sort =  "OLDEST_CREATE_DT";
} 
if (comment != null){
	queryString += "&iaKeyToGetPageWith=" + comment;
}
queryString += "&sort=" + sort;


pageContext.setAttribute("limit", limit);
pageContext.setAttribute("sort", sort);
pageContext.setAttribute("page", _page);
pageContext.setAttribute("wrapComments", wrapComments);
pageContext.setAttribute("hideReplies", false);
pageContext.setAttribute("noComments", noComments);
pageContext.setAttribute("commentsPath", "/interactions" + queryString);

%>

<c:set var="commentsUrl" value="${ugcUrl}${commentsPath}"/>
<c:set var="regiAuthToken" value="${cookie['pathAuth'].value}" />
<c:choose>
	<c:when test="${ regiAuthToken != null }">
		<c:set var="currentUserUrl" value="${ugcUrl}/users/regiauthtoken/${regiAuthToken}" />
		<c:catch var="userException">
			<c:import var="currentUserDoc" url="${currentUserUrl}"/>
		</c:catch>
		<c:choose>
			<c:when test="${ userException == null }">
				<x:parse var="currentUserXml" doc="${currentUserDoc}" />
				<x:set var="currentUserId" select="string($currentUserXml/user/id/text())"/>
				<x:set var="currentUserName" select="string($currentUserXml/user/name/text())"/>
				<x:set var="currentUserAvatar" select="string($currentUserXml/user/imageUrl/text())"/>
				<x:set var="currentUserTier" select="string($currentUserXml/user/tier/text())"/>
				<x:set var="currentUserIsActive" select="string($currentUserXml/user/active/text())"/>
				<x:set var="currentUserIsBlocked" select="string($currentUserXml/user/blocked/text())"/>
				<x:set var="currentUserProfileUrl" select="string($currentUserXml/user/profileUrl/text())"/>
				<c:if test="${currentUserTier eq 'ADMIN'}">
					<c:set var="dataAdmin" value="true" />
				</c:if>
				<c:if test="${currentUserIsBlocked eq 'true'}">
					<c:set var="actingUserBlocked" value="true" />
				</c:if>
			</c:when>
		</c:choose>
	</c:when>
</c:choose>



<!--
commentsUrl ${commentsUrl} 
currentUserId ${currentUserId}
admin ${dataAdmin}
-->
<c:catch var="commentsException">
	<c:choose>
		<c:when test="${noComments == null}">
			<c:import var="commentsDoc" url="${commentsUrl}" />
			<%-- **** ${commentsUrl} *** --%>
			<x:parse var="commentsXml" doc="${commentsDoc}" />
			<jp:import var="xsl" url="$configurationURI/Framework/skins/components/ugc/comments/comments.xsl"/>
			<c:set var="commentsHtml">
				<x:transform  xml="${commentsXml}" xslt="${xsl}">
					<x:param name="dataAdmin">
						${dataAdmin}
					</x:param>
					<x:param name="currentUserIsActive">
						${currentUserIsActive}
					</x:param>
					<x:param name="currentUserId">
						${currentUserId}
					</x:param>
					<x:param name="shareComments">
						${shareComments}
					</x:param>
					<x:param name="hideReplies">
						${hideReplies}
					</x:param>
				</x:transform>
			</c:set>
			<x:set var="commentCount" select="string($commentsXml/interactions/@totalWithReplies/text())"/>
			<x:set var="parentCommentCount" select="string($commentsXml/interactions/@total/text())"/>
			<x:set var="limit" select="string($commentsXml/interactions/@limit/text())"/>
			<x:set var="offset" select="string($commentsXml/interactions/@offset/text())"/>
		</c:when>
		<c:otherwise>
			<c:set var="topicUrl" value="${ugcUrl}/topics/${topic}"/>
			<c:import var="topicDoc" url="${topicUrl}" />
			<x:parse var="topicXml" doc="${topicDoc}" />
			<x:set var="commentCount" select="string($topicXml/topic/iaCount/text())"/>
		</c:otherwise>
	</c:choose>
</c:catch>
<c:if test="${wrapComments == 'true'}">
	<div id="comments-wrapper" class="ugc ugc-comments comments-wrapper" data-topic-id="${topic}" data-comment-count="${commentCount == null ? 0 : commentCount}">
		<div class="comment-label">
			<c:choose>
				<c:when test="${ commentsException != null }">
					<p>Sorry, comments are not available at this time</p>
				</c:when>
				<c:when test="${ commentCount == '0' }">
					<h3 class="comment-h"><a href="#comments" class="js-toggle-comments" data-omniture="comment | counter button | ${prop6}">Comments</a></h3>
					<div>Be the first to comment below.</div>
				</c:when>
				<c:otherwise>
				<h3 class="comment-h"><a href="#comments" class="js-toggle-comments" data-omniture="comment | counter button | ${prop6}"><span>${commentCount}</span> Comment${commentCount == "1" ? "" : "s"}</a></h3>
				<a class="link-secondary view-comments js-toggle-comments" data-omniture="comment | view | ${prop6}" href="#comments">View</a>
				</c:otherwise>
			</c:choose>
   		</div><!-- / .comment-label -->
		<c:choose>
			<c:when test="${ commentsException != null }">
			</c:when>
			<c:otherwise>
				<ul class="comment-filter-mod">
					<li class="comment-filter-item">
						<a href="#" class="comment-filter comment-filter-best ${sort == 'HIGHEST_RATING' ? 'selected':''}" data-sort="HIGHEST_RATING">Best</a>
						<a class="best-rating-explain" href="#">
							<img class="question-icon" src="${questionIcon}" width="19px" height="19px" />
						</a>
					</li>
					<li class="comment-filter-item">
						<a href="#" class="comment-filter comment-filter-newest ${sort == 'NEWEST_CREATE_DT' ? 'selected':''}" data-sort="NEWEST_CREATE_DT">Newest</a>
					</li>
					<li class="comment-filter-item">
						<a href="#" class="comment-filter comment-filter-oldest ${sort == 'OLDEST_CREATE_DT' ? 'selected':''}"  data-sort="OLDEST_CREATE_DT">Oldest</a>
					</li>
				</ul>
       		</c:otherwise>
      	</c:choose>
      	
      	<%-- Comment Form --%>
		<c:choose>
	        <c:when test="${ commentsException != null }">
			</c:when>
			<c:when test="${ regiAuthToken == null }">
				<div class="add-comment-mod">
					<div class="add-comment-avatar-bd art-bd">
						<img class="comment-list-art" src="http://u.o0bc.com/avatars/user-blank.jpg" />
					</div> <!-- /art-bd -->
					<div class="add-comment-txt-bd txt-bd user-message top">
						Please <a href="/login?p1=login_comment_${prop6}">login</a> to comment.
					</div>
				</div>
			</c:when>
			<c:when test="${currentUserId != null}">
				<div class="add-comment-mod">
					<div class="add-comment-avatar-bd art-bd">
						<img class="comment-list-art" src="${currentUserAvatar}">
					</div> <!-- /art-bd -->
					<div class="add-comment-txt-bd txt-bd">
						<ul class="add-comment-title-list">
							<li class="add-comment-item add-comment-name"><a href="${currentUserProfileUrl}">${currentUserName}</a></li>
							<li class="add-comment-item add-comment-ques">Not you? <a href="/logout" class="add-comment-item add-comment-queslink link">Sign out</a></li>
						</ul>
						<form method="POST" action="/" class="form-large expandable-form add-comment-form">
							<div class="input-mod">
								<input type="hidden" name="topicKey" value="${topic}" />
								<input type="hidden" name="type" value="ARTICLE_COMMENT" />
								<textarea id="new-comment" name="body" data-required="true" class="textarea tz-comment-input add-comment-input expandable-input" type="search" placeholder="What do you think?"></textarea>
								<button type="submit" class="comment-submit-btn-top submit-btn btn-medium btn-strong expandable-comment-btn">Submit</button>
								<p class="comment-disclaimer-top txt-sm">Your comment is subject to the rules of our <a class="link" href="/help/posting-rules">Posting Policy</a>.<br>This comment may appear on your public profile. <a class="link" href="/help/faq">Public Profile FAQ</a></p>
								<div class="content-disclaimer-abr-mod">
									<div class="tz-sponsor-icon content-disclaimer-icon">
										<i class="content-disclaimer-abr link-secondary">Privacy Policy</i>
										<i class="sponsor-hover-info">Your comment is subject to the rules of our <a class="link" href="/help/posting-rules">Posting Policy</a>.<br>This comment may appear on your public profile. <a class="link" href="/help/faq">Public Profile FAQ</a></i>
									</div>
								</div>
							</div>	
						</form>
					</div>
				</div>
			</c:when>
			<c:otherwise>
				<div class="add-comment-mod">
					<div class="add-comment-avatar-bd art-bd">
						<img class="comment-list-art" src="/img/user-blank.jpg" />
					</div> <!-- /art-bd -->
					<div class="add-comment-txt-bd txt-bd user-message top">
						<c:choose>
						      <c:when test="${fn:containsIgnoreCase(portalContext.publicBaseUrl, 'bostonglobe.com')}">
								To comment please create a BostonGlobe.com <a href="/eom/SysConfig/WebPortal/BostonGlobe/Framework/regi/mc-user.jsp">screen name</a>.
						      </c:when>
						      <c:otherwise>
								Whoops! We noticed that you haven't created a screen name yet. Before you can comment, please create a screen name <a href="/eom$configurationURI/Framework/regi/membercenter-update-info.jsp">here</a>.
						      </c:otherwise>
						</c:choose>
					</div>
				</div>
			</c:otherwise>
		</c:choose>
		<c:if test ="${ noComments == null }">
			<ul class="comment-list">
		</c:if>
</c:if>

<c:if test ="${ noComments == null }">
	<c:choose>
		<c:when test="${ commentsException == null }">
			${commentsHtml}
		</c:when>
		<c:otherwise>
			<p>Sorry, comments are not available at this time</p>
		</c:otherwise>
	</c:choose>
</c:if>
<c:if test="${wrapComments == 'true'}">
	<c:if test="${ noComments == null }">
		</ul> <!-- / .comments -->

			
	
		<% 
				String totalNumberOfResults = (String)pageContext.getAttribute("parentCommentCount");
				double parseTotalNumberOfResults = Double.parseDouble(totalNumberOfResults);
				String totalLimitperpage = (String)pageContext.getAttribute("limit");
				double parseTotalNumberOfLimit = Double.parseDouble(totalLimitperpage);
				int castDoubleIntoIntLimit = (int) parseTotalNumberOfLimit;
				int finalNumberOfPages = (int) ((Math.ceil(parseTotalNumberOfResults / castDoubleIntoIntLimit))); 
				pageContext.setAttribute("finalNumberOfPages", finalNumberOfPages);
				pageContext.setAttribute("totalNumberOfResults", totalNumberOfResults);
				pageContext.setAttribute("castDoubleIntoIntLimit", castDoubleIntoIntLimit);
				int pageNos = Integer.valueOf(_page);
				if (comment != null){
					// reset page according to offset returned by ugc
					String totatOffset = (String)pageContext.getAttribute("offset");
					double parseTotalOffset = Double.parseDouble(totatOffset);
					int castDoubleIntoIntOffset = (int) parseTotalOffset;
					pageNos = (castDoubleIntoIntOffset/castDoubleIntoIntLimit)+1; 
					pageContext.setAttribute("page", pageNos);
				}
				
				int leftPagesCnt = paginationCnt/2;
				if (pageNos - leftPagesCnt < 1) {
					leftPagesCnt = pageNos - 1;
				}
				int rightPagesCnt = paginationCnt - 1 - leftPagesCnt;
				if ((pageNos + rightPagesCnt) > finalNumberOfPages) {
					rightPagesCnt = finalNumberOfPages - pageNos;
					leftPagesCnt = paginationCnt - 1 - rightPagesCnt;
				}
				pageContext.setAttribute("leftPagesCnt", leftPagesCnt);
				pageContext.setAttribute("rightPagesCnt", rightPagesCnt);
				
				
			%>
      <jp:out var="hasComments" value="${ finalNumberOfPages gt 0 }"/>
      <c:if test="${ hasComments }">
        <a href="#comments" class="hide-comments-btn btn-link js-toggle-comments" data-omniture="comment | hide | ${prop6}">Hide Comments</a>
      </c:if>
			<jp:out var="isFirstPage" value="${1==2}" />
			<c:if test="${empty page or page eq 1}">
				<jp:out var="isFirstPage" value="${1==1}"/>
				<jp:out var="page" value="1" />
			</c:if>
			<div class="pagination">
				<ul class="pages">
					<c:choose>
						<c:when test="${castDoubleIntoIntUsers le castDoubleIntoIntLimit}">
						</c:when>
						<c:when test="${ !hasComments }"></c:when>
						<c:otherwise>
							<c:if test="${page gt 2 }">
								<li class="prev-off">
									<a href="?comments=all&sort=${sort}&page=1#comments" data-page="1">&laquo;</a>
								</li>
							</c:if>
							<c:if test="${!isFirstPage}">
								<li class="prev-off">
									<a href="?comments=all&sort=${sort}&page=${page - 1}#comments" data-page="${page - 1}">&lsaquo; Previous</a>
								</li>
							</c:if>
							<c:forEach var="i" begin="1" end="${leftPagesCnt}">
								<c:set var="j" value="${leftPagesCnt - i + 1}" scope="page"></c:set>
								<c:if test="${page gt j}">
									<li><a href="?comments=all&sort=${sort}&page=${page - j}#comments" data-page="${page - j}">${page - j}</a></li>
								</c:if>
							</c:forEach>
							<li class="active">${page}</li>
							<c:forEach var="i" begin="1" end="${rightPagesCnt}">
								<c:if test="${(page+i) le finalNumberOfPages}">
									<li><a href="?comments=all&sort=${sort}&page=${page + i}#comments" data-page="${page + i}">${page + i}</a></li>
								</c:if>
							</c:forEach>
							<c:if test="${page ne finalNumberOfPages}">
								<li>
									<a href="?comments=all&sort=${sort}&page=${page + 1}#comments" data-page="${page + 1}">Next &rsaquo;</a>
								</li>
							</c:if>
							<c:if test="${page lt finalNumberOfPages - 1}">
								<li>
									<a href="?comments=all&sort=${sort}&page=${finalNumberOfPages}#comments" data-page="${finalNumberOfPages}">&raquo;</a>
								</li>
							</c:if>
						</c:otherwise>
					</c:choose>
				</ul>
			</div>
			
			<%-- Comment Form --%>
			<c:choose>
        <c:when test="${ finalNumberOfPages lt 1}"></c:when>
		    <c:when test="${ commentsException != null }">
				</c:when>
				<c:when test="${ regiAuthToken == null }">
					<div class="add-comment-mod comment-form-bottom">
						<div class="user-message">
							Please <a href="/login?p1=login_comment_${prop6}">login</a> to comment.
						</div>
					</div>
				</c:when>
				<c:when test="${currentUserId != null}">
					<form class="form comment-form-bottom add-comment-form">
						<div class="form-row">
					    	<label>Join the conversation</label>
					  		<div class="input-mod">
								<input type="hidden" name="topicKey" value="${topic}" />
								<input type="hidden" name="type" value="ARTICLE_COMMENT" />
						    	<textarea class="textarea" data-required="true" name="body" rows="3" placeholder="What do you think?"></textarea>
								<button type="submit" class="comment-submit-btn submit-btn btn-medium btn-strong">Submit</button>
								<p class="comment-disclaimer txt-sm">Your comment is subject to the rules of our <a class="link" href="/help/posting-rules">Posting Policy</a><br>This comment may appear on your public profile. <a class="link" href="/help/faq">Public Profile FAQ</a></p>
								<div class="content-disclaimer-abr-mod">
									<div class="tz-sponsor-icon content-disclaimer-icon">
										<i class="content-disclaimer-abr link-secondary">Privacy Policy</i>
										<i class="sponsor-hover-info">Your comment is subject to the rules of our <a class="link" href="/help/posting-rules">Posting Policy</a>.<br>This comment may appear on your public profile. <a class="link" href="/help/faq">Public Profile FAQ</a></i>
									</div>
								</div>
							</div> <!-- /.input -->
						</div> <!-- /.form-row -->
					</form>
				</c:when>
				<c:otherwise>
					<div class="add-comment-mod comment-form-bottom">
						<div class="user-message">
							<c:choose>
							      <c:when test="${fn:containsIgnoreCase(portalContext.publicBaseUrl, 'bostonglobe.com')}">
									To comment please create a BostonGlobe.com <a href="/eom/SysConfig/WebPortal/BostonGlobe/Framework/regi/mc-user.jsp">screen name</a>.
							      </c:when>
							      <c:otherwise>
									Whoops! We noticed that you haven't created a screen name yet. Before you can comment, please create a screen name <a href="/eom$configurationURI/Framework/regi/membercenter-update-info.jsp">here</a>.
							      </c:otherwise>
							</c:choose>
						</div>
					</div>
				</c:otherwise>
			</c:choose>				
		</c:if>
	</div><!-- / .ugc -->
</c:if>
