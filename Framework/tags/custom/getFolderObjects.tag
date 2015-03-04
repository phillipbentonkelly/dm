<%@ include file="includes/init.inc" %>
<%@ tag body-content="scriptless" import="
	javax.servlet.jsp.PageContext,
    com.eidosmedia.portal.PortalContext,
    com.eidosmedia.portal.context.UrlResolver,
    com.eidosmedia.portal.util.PortalWebObjectWrapper,
    com.eidosmedia.portal.util.ObjectResolver,                                      
    com.eidosmedia.wa.render.WebObject,
    com.eidosmedia.wa.render.WebObjectImpl,
    com.eidosmedia.wa.render.WebType,
        com.eidosmedia.wa.render.WebZone,
    com.eidosmedia.wa.render.WebTypeTemplate,
    com.eidosmedia.eomcache.ObjectProxy,
    com.eidosmedia.eomcache.proxies.data.XMLData,
    com.eidosmedia.portal.render.impl.cached.MetaOutputBuilder,
    com.eidosmedia.misc.xpath.AbstractXPathHelper,
    com.eidosmedia.misc.URIUtil,
    java.net.URLConnection,
	com.eidosmedia.eomcache.EOMCache,
	
com.eidosmedia.eomcache.CacheAccessId,
com.eidosmedia.eomcache.ObjectProxy,
com.eidosmedia.eomcache.protocols.EOMCacheURLConnection,
com.eidosmedia.eomcache.proxies.data.ObjectProxyData,
com.eidosmedia.eomcache.proxies.data.XSLData,
com.eidosmedia.eomcache.FolderProxy,
com.eidosmedia.eomcache.Transaction
    
" %>

<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="filterType" rtexprvalue="true" required="false"%>
<%@ attribute name="echo" rtexprvalue="false" required="false"%>
<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"  %>

<jsp:useBean id="contentData" class="java.util.HashMap"/>

<p:getObject path="${path}" var="obj" onError="ignore" />

<c:choose>
	<c:when test="${empty filterType}">
		<p:out var="filterType" value=""/>
	</c:when>
	<c:when test="${empty echo}">
		<p:out var="echo" value="False"/>
	</c:when>
</c:choose>

<%
//DM 219

PortalContext portalContext = PortalContext.instance();
EOMCache cache = portalContext.getCache();

PortalWebObjectWrapper folder = (PortalWebObjectWrapper) jspContext.getAttribute("obj");

ObjectProxy proxy = folder.getObjectProxy();
FolderProxy folderProxy = null;
ArrayList<String> items = new ArrayList<String>();


if (proxy instanceof FolderProxy) {
	folderProxy = (FolderProxy)proxy;
	Transaction transaction = cache.beginTransaction();
	ObjectProxy[] children = folderProxy.getChildren(transaction);	
	int ci=0;
	for (ObjectProxy child : children) {
		WebObject webObject = portalContext.toWebObject(child);
		jspContext.setAttribute("childId",webObject.getLoid());
		%>
		<p:getObject loid="${childId}" var="obj" onError="ignore" />
		<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com"/><% 
		String _WT = (String)jspContext.getAttribute("WT");
		String _filterType = (String)jspContext.getAttribute("filterType");
		if (_filterType.equals("")) {
			items.add((String)webObject.getLoid());
		} else {
			if (_filterType.toLowerCase().indexOf(_WT.toLowerCase()) >= 0) {
				items.add((String)webObject.getLoid());
			}
		}
		ci++;
	}
}
jspContext.setAttribute("items",items);
%>

	
<c:set target="${contentData}" property="items" value="${items}"/>
<c:set var="currentValue" value="${contentData}"/>

 
<c:if test="${echo == 'true'}">
	${currentValue}
</c:if>