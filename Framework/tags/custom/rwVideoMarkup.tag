<%--
	This is a pure rendering tag. No variables are currently returned. Its purpose exists solely to get the markup needed for a video.
--%>

<%@ include file="includes/init.inc" %>

<%@ attribute name="webObject"	rtexprvalue="true" required="true" type="java.lang.Object" %>

<p:object webObject="${webObject}" content="content" metadata="meta" />
<%-- <bdc:getVideoTease webObject="${webObject}" var="objectMap" /> --%>
<bdc:rwGalleryVideo webObject="${webObject}" var="objectMap" />

<p:out var="autoPlay" xvalue="$meta//AutoPlay" />
<p:out var="autoPlayTF" value="false" />
<p:out var="autoPlay10" value="false" />
<c:if test="${autoPlay eq 'True'}">
	<p:out var="autoPlayTF" value="true" />
	<p:out var="autoPlay10" value="true" />
</c:if>

<c:choose>
	<%-- External video --%>
	<c:when test="${objectMap.isExternal}">
		<p:out var="externalLink" value="${objectMap.externalVideoLink}" />
		<div class="video-external">
			<p:out value="${externalLink}" xslt="$configurationURI/Framework/xslt/externalvideo.xslt" />
		</div>
	</c:when>
	
	<%-- Video is associated with Methode in some capacity --%>
	<c:otherwise>
		<c:choose>
			<%-- BRIGHTCOVE --%>
			<c:when test="${objectMap.provider eq 'brightcove'}">
				<div class="videoplayer brightcove" data-schema="1"
					data-player="article" data-params="@videoPlayer=${objectMap.videoId}"
					data-autoplay="${autoPlayTF}">
				</div>
			</c:when>
			
			<%-- NDN --%>
			<c:when test="${objectMap.provider eq 'NDN'}">
				<div class="videoplayer ndn_embed" data-schema="2"
					data-player="clicktoplay" data-config-widget-id="${autoPlay10}"
					data-config-type="VideoPlayer/Single"
					data-config-tracking-group="90106" data-config-video-id="${objectMap.videoId}"
					data-config-site-section="bostonglobe">
				</div>
			</c:when>
			
			<%-- CINESPORT --%>
			<c:when test="${objectMap.provider eq 'CineSport'}">
				<div class="videoplayer cinesport" data-schema="3"
					data-video-id="${objectMap.videoId}" data-autoplay="${autoPlayTF}">
				</div>
			</c:when>
						
			<%-- PERFORM --%>
			<c:when test="${objectMap.provider eq 'Perform'}">
				<p:out var="uuid" xvalue="$content//multimedia-container/video-container/@href" />
				<p:out var="uuid" value="${fn:substringAfter(uuid, '?uuid=')}" />
				<p:out var="uuid" value="${fn:substringBefore(uuid, '&')}" />
				<p:getObject uuid="${uuid}" var="performVid" />
				<p:object webObject="${performVid}" metadata="perfMeta" />
				<p:out var="playerID" xvalue="$perfMeta//PerformPlayer/PlayerID" />
				<p:out var="channelID" xvalue="$perfMeta//PerformPlayer/ChannelID" />
				<div class="perform-wrap">
					<div class="videoplayer perform" data-schema="4"
						data-player-id="${playerID}" data-channel-id="${channelID}"
						data-video-id="${objectMap.videoId}" id="perf${playerID}-${objectMap.videoId}">
					</div>
				</div>
			</c:when>
			
			<%-- USTREAM --%>
			<c:when test="${objectMap.provider eq 'Ustream'}">
				<div class="videoplayer ustream" data-schema="5"
					id="${objectMap.videoId}">
				</div>
			</c:when>
			
			<%-- NESN --%>
			<c:when test="${objectMap.provider eq 'nesn'}">
				<p:out var="nesnId" value="${objectMap.videoId}" />
				<c:if test="${objectMap.videoType eq 'latest'}">
					<p:out var="nesnId" value="0" />
				</c:if>
			
				<div class="videoplayer nesn" data-schema="6"
					data-video-type="${objectMap.videoType}"
					data-video-id="${nesnId}">
				</div>
			</c:when>
		</c:choose>
	</c:otherwise>
</c:choose>