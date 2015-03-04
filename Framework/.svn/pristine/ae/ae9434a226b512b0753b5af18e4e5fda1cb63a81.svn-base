<%@ taglib prefix="c" uri="jstlCore" %>
<%@ taglib prefix="fn" uri="jstlFunctions"%>

<c:choose>
		<c:when test="${portalContext.env.debugjs == 'true' || param.debugjs == 'true' || portalContext.env.debug == 'true' || param.debug == 'true'}">
		    <script type="text/javascript" src="/js/libs/underscore.js"></script>
		    <script type="text/javascript" src="/js/libs/backbone.js"></script>
		    <script type="text/javascript" src="/js/libs/backbone.layoutmanager.js"></script>
		    <script type="text/javascript" src="/js/libs/pubnub.js"></script>
	        <script type="text/javascript" src="/js/libs/notify.js"></script>
			<script type="text/javascript" src="/js/libs/mustache.js"></script>
			<script type="text/javascript" src="/js/infiniScroll.js"></script>		
			<script type="text/javascript" src="/js/libs/magnific-popup/dist/jquery.magnific-popup.js"></script>
			<script type="text/javascript" src="/js/libs/swiper/dist/idangerous.swiper.min.js"></script>
			<script type="text/javascript" src="/js/libs/jquery.serializeObject.js"></script>
			<script type="text/javascript" src="/js/libs/jquery.ba-bbq.min.js"></script>
			<script type="text/javascript" src="/js/libs/jquery.debouncedresize.js"></script>
			<script type="text/javascript" src="/js/libs/jquery.deparam.js"></script>
			<script type="text/javascript" src="/js/libs/jquery.ba-throttle-debounce.min.js"></script>
			<script type="text/javascript" src="/js/libs/jquery.mCustomScrollbar.js"></script>
			<script type="text/javascript" src="/js/libs/respond.min.js"></script>
			<script type="text/javascript" src="/js/bcom.nav.js"></script>
			<script type="text/javascript" src="/js/bcom.simple-galleries.js"></script>
		    <script type="text/javascript" src="/js/bcom.infinity.js"></script>
		    <script type="text/javascript" src="/js/bcom.carousel.js"></script>
		    <script type="text/javascript" src="/js/bcom.user.js"></script>	
			<script type="text/javascript" src="/js/bcom.videoplayer.js"></script>	    
			<script type="text/javascript" src="/js/bcom.mustreads.js"></script>
			<script type="text/javascript" src="/js/bcom.trending.js"></script>
			<script type="text/javascript" src="/js/bcom.share.js"></script>
			<script type="text/javascript" src="/js/bcom.weather.js"></script>
			<script type="text/javascript" src="/js/bcom.omniclick.js"></script>			
			<script type="text/javascript" src="/js/bcom.stream-scoreboard.js"></script>
			<script type="text/javascript" src="/js/bcom.wishabi.js"></script>
			<script type="text/javascript" src="/js/bcom.comments.js"></script>
			<script type="text/javascript" src="/js/bcom.profiles.js"></script>			
		    <script type="text/javascript" src="/js/bcom.customscroll.js"></script>	   
		    <script type="text/javascript" src="/js/bcom.breaking-scoreboard.js"></script>	
		    <script type="text/javascript" src="/js/app.js"></script>
		    <script type="text/javascript" src="/js/bcom.inits.js"></script>
		    <script type="text/javascript" src="/js/bcom.stream-scoreboard.js"></script>
		    <script type="text/javascript" src="/js/bcom.byline.js"></script>
		    
			</c:when>
			<c:otherwise>
				<script type="text/javascript" src="/js/hash/${param.hash}/dist/body.min.js"></script>
				<%--
				<p:inline url="$configurationURI/Framework/frameset/required_assets_js.jpt">
					<p:param name="configPath" value="$configurationURI/required_assets.xml"/>
					<p:param name="webType" value="${WT}"/>
					<p:param name="sectionPath" value="${sectionPath}"/>
				</p:inline>
				--%>
			</c:otherwise>
		</c:choose>