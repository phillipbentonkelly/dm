<%@ taglib prefix="c" uri="jstlCore" %>
<%@ taglib prefix="fn" uri="jstlFunctions"%>

<c:choose>
	<c:when test="${portalContext.env.debugjs == 'true' || param.debugjs == 'true'}">
		<%--<script type="text/javascript" language="JavaScript" src="/js/tracking/s_code_omniture_24_3.js"></script> --%>
		<script type="text/javascript" src="/js/tracking/s_code_latest.js"></script>
		<script type="text/javascript" language="JavaScript" src="/js/tracking/audience_manager.js"></script>
		<script type="text/javascript" src="/js/tracking/bcom-chartbeat.js"></script>
		<script type="text/javascript" src="/js/libs/tracking/visual-revenue.js"></script>
		<script type="text/javascript" src="/js/tracking/elevated_feature_stack_tracking.js"></script>
		<script type="text/javascript" src="/js/tracking/bcom.p1-tags.js"></script>
		
	</c:when>	
	<c:otherwise>
		<script type="text/javascript" src="/js/hash/${param.hash}/dist/tracking.min.js"></script>
	</c:otherwise>
</c:choose>