<%@ taglib prefix="c" uri="jstlCore" %>
<%@ taglib prefix="fn" uri="jstlFunctions"%>

<c:choose>
	<c:when test="${fn:contains(portalContext.publicBaseUrl, 'edit.boston.com') || param.debugjs == 'true' }">
		<script type="text/javascript" src="/js/libs/modernizr/modernizr.custom.min.js"></script>
		<script type="text/javascript" src="/js/libs/moment.min.js"></script>
		<script type="text/javascript" src="/js/libs/swfobject.js"></script>
		<script type="text/javascript" src="/js/bcom.util.js"></script>
		<script type="text/javascript" src="/js/bcom.dfp.ad-catalog.js"></script>
		<script type="text/javascript" src="/js/bcom.dfp.ad-init.js"></script>
		<script type="text/javascript" src="/js/bcom.dfp-rmcontroller.js"></script>
	</c:when>
	<c:otherwise>
		<script type="text/javascript" src="/js/hash/${param.hash}/dist/head.min.js"></script>
	</c:otherwise>
</c:choose>