<xsl:stylesheet 
        version="1.0" 
        xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        xmlns:Calendar="java.util.Calendar" 
		xmlns:SimpleDateFormat="java.text.SimpleDateFormat"
		xmlns:ISODateTimeFormat="org.joda.time.format.ISODateTimeFormat"
		xmlns:DateTimeFormatter="org.joda.time.format.DateTimeFormatter"
		xmlns:DateTimeFormat="org.joda.time.format.DateTimeFormat"
		exclude-result-prefixes="Calendar SimpleDateFormat ISODateTimeFormat DateTimeFormatter DateTimeFormat">
		
    <xsl:output method="html" omit-xml-declaration="yes" encoding="us-ascii"/>
	<xsl:output method="html"/>
    
    <xsl:param name="dataAdmin"/>
    <xsl:param name="currentUserIsActive"/>
    <xsl:param name="currentUserId"/>
	<xsl:param name="shareComments"/>
	<xsl:param name="hideReplies"/>
    
    <xsl:template name="root" match="/">
	    <xsl:for-each select="/interactions/interaction[not(level=2)]">
	        <xsl:call-template name="comment">
	            <xsl:with-param name="c" select ="." />
	            <xsl:with-param name="cTree" select="/interactions" />
	        </xsl:call-template> 
	    </xsl:for-each>
    </xsl:template>
    <xsl:template name="comment">
        <xsl:param name="c"/>
        <xsl:param name="cTree"/>
		<xsl:variable name="actingUserBlocked" select="$c/actingUserBlocked" />
		<xsl:variable name="actingUserImageUrl" select="$c/actingUserImageUrl" />
		<xsl:variable name="actingUserProfileUrl" select="$c/actingUserProfileUrl" />
		<xsl:variable name="actingUserKey" select="$c/actingUserKey" />
		<xsl:variable name="actingUserName" select="$c/actingUserName" />
		<xsl:variable name="actingUserType" select="$c/actingUserType" />
		<xsl:variable name="approvalStatus" select="$c/approvalStatus" />
		<xsl:variable name="body" select="$c/body" />
		<xsl:variable name="id" select="$c/id" />
		<xsl:variable name="ignored" select="$c/ignored" />
		<xsl:variable name="likeCount" select="$c/likeCount" />
		<xsl:variable name="dislikeCount" select="$c/dislikeCount" />
		<xsl:variable name="parentKey" select="$c/parentKey" />
		<xsl:variable name="replyCount" select="$c/replyCount" />
		<xsl:variable name="createDate" select="$c/createDate" />
    	<xsl:variable name="inputFormatter" select="ISODateTimeFormat:dateTimeParser()" />
		<xsl:variable name="calDate" select="DateTimeFormatter:parseDateTime($inputFormatter,$createDate)" />
		<xsl:variable name="outputFormatter" select="DateTimeFormat:forPattern('MMMM dd, YYYY — hh:mm a')" />
		<xsl:variable name="formattedCreateDate" select="DateTimeFormatter:print($outputFormatter, $calDate)" />
		<xsl:variable name="level" select="$c/level" />
		
		<xsl:variable name="blockComment" select="($actingUserBlocked='true' or $approvalStatus='BLOCKED' and not($actingUserKey=$currentUserId)) and $dataAdmin != 'true'"/>
		<xsl:variable name="blockCommentClass">
			<xsl:if test="$blockComment">comment-mod-blocked</xsl:if>
		</xsl:variable>
		<li class="comment ugc-ia comment-mod {$blockCommentClass}" id="comment-{$id}" data-reply-count="{$replyCount}">
		<xsl:choose>
			<xsl:when test="$blockComment">
				<i class="overline-weak">Comment Blocked</i>
				<div class="tz-sponsor-icon comment-blocked-icon">
					<i class="sponsor-hover-info">This comment has been flagged for inappropriate content and removed by site administrators.</i>
				</div>
			</xsl:when>
			<xsl:otherwise>
				<div class="avatar-holder comment-avatar-bd art-bd">
					<a href="{$actingUserProfileUrl}">
						<img src="{$actingUserImageUrl}" alt="{$actingUserName}" class="comment-avatar comment-list-art" />
					</a>
				</div>
				<div class="comment-holder comment-txt-bd txt-bd">
					<ul class="comment-head comment-title-list">
						<li class="comment-username comment-title-item">
							<a href="{$actingUserProfileUrl}"><xsl:value-of select="$actingUserName"/></a>
						</li>
						<li class="comment-timestamp comment-title-item">
							<a href="#comment-{$id}" class="comment-permalink"><xsl:value-of select="$formattedCreateDate"/></a>
						</li>
					</ul>
					<div class="comment-body comment-txt">
						<p><xsl:value-of disable-output-escaping="yes" select="$body"/></p>
					</div>
					<div class="comment-footer comment-button-mod">
						<xsl:if test="$dataAdmin = 'true'">
							<!--ul class="admin-actions inline">
								<xsl:choose>
									<xsl:when test="not($approvalStatus = 'BLOCKED')">
										<li><a href="#" data-action-type="ia" data-action-id="{$id}" data-property="approvalStatus" data-value="BLOCKED" class="admin-action report">Block comment</a></li>
									</xsl:when>
									<xsl:otherwise>
										<li><a href="#" data-action-type="ia" data-action-id="{$id}" data-property="approvalStatus" data-value="UNMODERATED" class="admin-action report">Unblock comment</a></li>
									</xsl:otherwise>
								</xsl:choose>
								<xsl:choose>
									<xsl:when test="not($actingUserBlocked= 'true')">
										<li><a href="#" data-action-type="user" data-action-id="{$actingUserKey}" data-property="blocked" data-value="true" class="admin-action report">Block user</a></li>
									</xsl:when>
									<xsl:otherwise>
										<li><a href="#" data-action-type="user" data-action-id="{$actingUserKey}" data-property="blocked" data-value="false" class="admin-action report">Unblock user</a></li>
									</xsl:otherwise>
								</xsl:choose>		
								<li><a href="#" data-action-type="stream" data-action-id="{$id}" class="admin-action report" data-value="STREAM">Stream</a></li>					
							</ul-->				
						</xsl:if>
						<!--ul class="user-actions inline">
							<xsl:if test="$level = 1">
								<li><a href="#" data-action-type="reply" data-action-id="{$id}" class="user-action reply">Reply</a></li>
							</xsl:if>
							<li><a href="#" data-action-type="like-dislike" data-property="likes" data-action-id="{$id}" class="user-action like">Like</a> (<span class="count"><xsl:value-of select="likeCount"/></span>)</li>
							<li><a href="#" data-action-type="like-dislike" data-property="dislikes" data-action-id="{$id}" class="user-action dislike">Dislike</a> (<span class="count"><xsl:value-of select="dislikeCount"/></span>)</li>
							<li><a href="#" data-action-type="report" data-action-id="{$id}" class="user-action report">Report abuse</a></li>
						</ul-->
						<xsl:if test="$currentUserId">
							<div class="comment-button-mod user-actions">
								<div class="comment-vote-mod">
									<a href="#" data-action-type="like-dislike" data-property="likes" data-action-id="{$id}" class="comment-vote-up comment-vote comment-btn user-action like">
										<i class="vote-up comment-vote-icon"></i>
										<i class="vote-up-animate comment-vote-icon"></i>
										<span class="count"><xsl:value-of select="likeCount"/></span>
									</a>
									<a href="#" data-action-type="like-dislike" data-property="dislikes" data-action-id="{$id}" class="comment-vote-down comment-vote comment-btn user-action dislike">
										<i class="vote-down comment-vote-icon"></i>
										<i class="vote-down-animate comment-vote-icon"></i>
										<xsl:if test="$dislikeCount &gt; 0">-</xsl:if><span class="count"><xsl:value-of select="dislikeCount"/></span>
									</a>
									<i class="hover-info comment-vote-hover-info">Sorry, you can only rate a comment once!</i>
								</div>
								<xsl:if test="$level = 1">
								<a href="#" data-action-type="reply" data-action-id="{$id}" class="comment-reply comment-btn js-comment-reply-toggle user-action reply">Reply</a>
								</xsl:if>
								<a href="#" data-action-type="report" data-action-id="{$id}" class="report-comment link-secondary user-action report">Report</a>
							</div>
						</xsl:if>
						<xsl:if test="$dataAdmin = 'true'">
							<div class="admin-controls admin-actions">
								<xsl:choose>
									<xsl:when test="not($approvalStatus = 'BLOCKED')">
										<a href="#" data-action-type="ia" data-action-id="{$id}" data-property="approvalStatus" data-value="BLOCKED" class="admin-action report">Block comment</a>
									</xsl:when>
									<xsl:otherwise>
										<a href="#" data-action-type="ia" data-action-id="{$id}" data-property="approvalStatus" data-value="UNMODERATED" class="admin-action report">Unblock comment</a>
									</xsl:otherwise>
								</xsl:choose>
								<xsl:choose>
									<xsl:when test="not($actingUserBlocked= 'true')">
										<a href="#" data-action-type="user" data-action-id="{$actingUserKey}" data-property="blocked" data-value="true" class="admin-action report">Block user</a>
									</xsl:when>
									<xsl:otherwise>
										<a href="#" data-action-type="user" data-action-id="{$actingUserKey}" data-property="blocked" data-value="false" class="admin-action report">Unblock user</a>
									</xsl:otherwise>
								</xsl:choose>	
								<a href="#" data-action-type="stream" data-action-id="{$id}" class="admin-action" data-value="STREAM">Stream</a>
							</div>
						</xsl:if>
					</div>
				</div><!-- / .comment-holder -->
				<xsl:choose>
					<xsl:when test="$hideReplies = 'true'">
						<xsl:if test="$replyCount &gt; 0">
							<div class="more-replies show-more">
								<a href="#" data-action-id="{$id}" data-action="show">Show replies (<xsl:value-of select="$replyCount"/>)</a>
							</div>	
						</xsl:if>
					</xsl:when>
					<xsl:otherwise>
						<xsl:if test="$replyCount &gt; 0">
							<ul class="children comment-reply-list" id="children-{$id}">
								<xsl:for-each select="$cTree/interaction[parentKey=$id]">
									<xsl:call-template name="comment">
										<xsl:with-param name="c" select ="."/>
										<xsl:with-param name="cTree" select ="$cTree"/>
									</xsl:call-template>
								</xsl:for-each>
							</ul>
							<xsl:if test="$replyCount &gt; 2">
								<!--div class="more-replies show-more">
									<a href="#" data-action-id="{$id}" data-action="show">Show more replies (<xsl:value-of select="$replyCount - 2"/>)</a>
								</div-->
								<div class="more-replies show-more">
									<a href="#" data-action-id="{$id}" data-action="show" class="show-reply show-reply-link link">View <xsl:value-of select="$replyCount - 2"/> Replies</a>
								</div>	
							</xsl:if>
						</xsl:if>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
    	</li> <!-- / .comment -->
	</xsl:template>
    <xsl:template name="ignore-text" match="text()" />

</xsl:stylesheet>