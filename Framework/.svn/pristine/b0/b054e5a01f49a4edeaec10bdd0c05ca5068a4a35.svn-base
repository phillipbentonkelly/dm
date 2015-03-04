<%-- Fix for ugly Methode "quirk".
     When an AutoRefreshProxy (a query w/ an update timeout, etc) is scheduled for refresh during a server restart,
     the next update never gets scheduled. This checks to see if autorefresh is active on an object, and re-registers
     it if it is not.
     
     You need to include either webObject or path.
--%>

<%@ tag body-content="scriptless" import="
    com.eidosmedia.wa.render.WebObject,
    com.eidosmedia.portal.util.PortalWebObjectWrapper,
    com.eidosmedia.eomcache.impl.EOMCacheImpl,
    com.eidosmedia.eomcache.ObjectProxy,
    com.eidosmedia.eomcache.AutoRefreshProxy,
    com.eidosmedia.eomcache.impl.AutoRefreshTask,
    com.eidosmedia.portal.PortalContext
" %>

<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object" %>
<%@ attribute name="uuid" rtexprvalue="true" required="false" %>
<%@ attribute name="path" rtexprvalue="true" required="false" %>

<c:choose>
	<c:when test="${not empty path}">
		<p:getObject path="${path}" var="obj" onError="ignore" />
	</c:when>
	<c:when test="${not empty uuid}">
		<p:getObject uuid="${uuid}" var="obj" onError="ignore" />
	</c:when>
	<c:when test="${not empty webObject}">
		<p:getObject webObject="${webObject}" var="obj"  />
	</c:when>
	<c:otherwise>
		<p:getObject webObject="${currentObject}" var="obj"  />
	</c:otherwise>
</c:choose>

<%

  // RMK - disabled pending review
	/*PortalWebObjectWrapper object = (PortalWebObjectWrapper) jspContext.getAttribute("obj");

	ObjectProxy proxy = object.getObjectProxy();
	
	if (proxy instanceof AutoRefreshProxy) {
		AutoRefreshProxy refreshProxy = (AutoRefreshProxy) proxy;
		PortalContext portalContext = PortalContext.instance();
		EOMCacheImpl cache = (EOMCacheImpl) portalContext.getCache();
		
		AutoRefreshTask refreshTask = cache.findNextAutoRefreshTaskScheduled(refreshProxy);
		
		if (null == refreshTask) {
			cache.deregisterAutoRefreshProxy(refreshProxy);
			cache.registerAutoRefreshProxy(refreshProxy);
		}
	}*/
%>
