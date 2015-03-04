<%@tag import=
		"java.util.*,
		java.net.*,
		java.io.*,
		java.lang.*,
		com.eidosmedia.eomcache.*,
		com.eidosmedia.portal.*,
		com.eidosmedia.eomcache.impl.*,
		com.eidosmedia.eomcache.impl.EOMCacheImpl.CacheReference,
		com.eidosmedia.eomcache.proxies.*,
		com.eidosmedia.eomcache.console.commands.*,
		com.eidosmedia.eomcache.proxies.data.*,
		com.eidosmedia.misc.*,
		com.eidosmedia.portal.util.*,
		com.eidosmedia.web.framework.*,
		com.eidosmedia.debug.*,
		com.eidosmedia.wa.render.*,
		java.text.*,
		org.apache.log4j.*,
		org.w3c.dom.*,
		javax.xml.xpath.*,
		ijava.io.*,
		com.eidosmedia.common.utils.XPathCache.*,
		com.eidosmedia.eom.metadata.MetadataImpl.*,
		com.eidosmedia.wa.render.EomDbHelper.*,
		com.eidosmedia.wa.render.WebObject.*,
		com.eidosmedia.wa.util.Dom.*,
		com.eidosmedia.wa.util.EomDb.*,
		com.eidosmedia.wa.util.Xml.*,
		com.eidosmedia.misc.*,
		com.eidosmedia.portal.*,
		com.eidosmedia.portal.jsp.*,
		com.eidosmedia.portal.conf.site.*,
		com.eidosmedia.eomcache.*,
		com.eidosmedia.eomcache.proxies.data.*,
		com.eidosmedia.portal.render.impl.cached.*,
		org.apache.commons.lang.*,
		java.io.File,
		org.w3c.dom.Document,
		javax.xml.parsers.DocumentBuilderFactory,
		javax.xml.parsers.DocumentBuilder,
		org.xml.sax.SAXException,
		java.util.logging.*,
		org.xml.sax.SAXParseException,
		java.lang.System.*,
		java.io.ByteArrayInputStream"
%>

<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%> 
<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="section" rtexprvalue="true" required="true"%>
<%@ attribute name="zoneName" rtexprvalue="true" required="true"%>
<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"  %>

<%
	PortalContext pc = PortalContext.instance();
	String sr = pc.getSiteRootPath();
	jspContext.setAttribute("siteRoot", sr);
%>

<c:choose>
	<c:when test="${section eq '/'}">
		<p:out var="testForValidSection" value="/" />
	</c:when>
	<c:when test="${fn:startsWith(section, '/')}">
		<p:out var="testForValidSection" value="${section}" />
	</c:when>
	<c:otherwise>
		<p:out var="slash" value="/" />
		<p:out var="testForValidSection" value="${slash}${section}" />
	</c:otherwise>
</c:choose>

<%
	String validSectionTest = (String) jspContext.getAttribute("testForValidSection");
	String appendSiteRoot = (String) jspContext.getAttribute("siteRoot");
	PortalContext portalContextTest = PortalContext.instance();
	SiteRoot siteRootTest = portalContextTest.getSiteRoot();
	SiteNode siteNodeTest = siteRootTest.matchSiteSection(validSectionTest);
	String pathToFolderFullStringTemp = siteNodeTest.getSectionId();
	String pathToFolderFullString;
	
	if (pathToFolderFullStringTemp == "/") {
		pathToFolderFullString = "";
	} else {
		pathToFolderFullString = pathToFolderFullStringTemp;
	}
	String finalFolderPath = appendSiteRoot + pathToFolderFullString;
	jspContext.setAttribute("finalFolderPath", finalFolderPath);
%>


<%!	
	public String getInheritanceValue(String finalFolderPathFullArg, int slashCountArg, String zoneNameFullArg) throws Exception {
	
  	if (slashCountArg == 4 || (finalFolderPathFullArg.contains("/Branch/") && slashCountArg == 6)) {
		//site root -- looking for homepage dwp
		PortalContext portalContextHomepage = PortalContext.instance();
		EOMCache cacheHomepage = portalContextHomepage.getCache();
		ObjectProxy objectProxyHomepage = cacheHomepage.getObject(new PathAccessId(0,finalFolderPathFullArg),false);
		ObjectProxyData dataHomepage = (ObjectProxyData) objectProxyHomepage.getData();
		String sysAttributesHomepage = dataHomepage.dumpDbMetadata();
		DocumentBuilderFactory sysDocBuilderFactoryHomepage = DocumentBuilderFactory.newInstance();
	    DocumentBuilder sysDocBuilderHomepage = sysDocBuilderFactoryHomepage.newDocumentBuilder();
	    ByteArrayInputStream sysBisHomepage = new ByteArrayInputStream(sysAttributesHomepage.getBytes());
	    Document sysDocHomepage = sysDocBuilderHomepage.parse (sysBisHomepage);
	    XPath sysXPathHomepage = XPathFactory.newInstance().newXPath();
	    String pathToDWPHomepage =  sysXPathHomepage.evaluate("//sys/props/PortalSiteConfig/HomePage", sysDocHomepage);	
		
	    
	    ObjectProxy objectProxyHomepageMeta = cacheHomepage.getObject(new PathAccessId(0,pathToDWPHomepage),false);
	   	String pathToHomepageDwpInFull = objectProxyHomepageMeta.getPath(); 
	    return pathToHomepageDwpInFull;
	   
	} else {
		
		//system attributes
		PortalContext portalContext = PortalContext.instance();
		EOMCache cache = portalContext.getCache();
	
		ObjectProxy objectProxy = cache.getObject(new PathAccessId(0,finalFolderPathFullArg),false);
		ObjectProxyData data = (ObjectProxyData) objectProxy.getData();
		String sysAttributes = data.dumpDbMetadata();
		DocumentBuilderFactory sysDocBuilderFactory = DocumentBuilderFactory.newInstance();
	    DocumentBuilder sysDocBuilder = sysDocBuilderFactory.newDocumentBuilder();
	    ByteArrayInputStream sysBis = new ByteArrayInputStream(sysAttributes.getBytes());
	    Document sysDoc = sysDocBuilder.parse (sysBis);
	    XPath sysXPath = XPathFactory.newInstance().newXPath();
	    String pathToDWP = sysXPath.evaluate("//sys/props/PortalSiteConfig/SectionPage",sysDoc);
		
		ObjectProxy objectProxy2 = cache.getObject(new PathAccessId(0,pathToDWP),false);
		WebObject dwpObj = portalContext.toWebObject(objectProxy2);
		WebContainer dwpCont = dwpObj.getContainer();
	 	Map zones = dwpCont.getNameToZoneMap();
	 	WebZone wZone =(WebZone)zones.get(zoneNameFullArg);
	 	WebLink links[] = wZone.getLinks();
	 	
	    if (links.length > 0){
		   	String pathToSectionDwpInFull = objectProxy2.getPath(); 
	   		return pathToSectionDwpInFull;
	   		
	   	} else {
			
	   		int lastIndexOfSlash = finalFolderPathFullArg.lastIndexOf('/');
	   		String finalFolderPathFullArgNew = finalFolderPathFullArg.substring(0,lastIndexOfSlash);
	   		int slashCountArgNew = slashCountArg - 1;
			String zoneArgNew = zoneNameFullArg;
	   		return getInheritanceValue(finalFolderPathFullArgNew, slashCountArgNew, zoneArgNew);
				
			}			
		}
		
	}	
%>
				
<%
	String finalFolderPathFull = (String) jspContext.getAttribute("finalFolderPath");
	String zoneNameArg = (String) jspContext.getAttribute("zoneName");
	int slashCount = StringUtils.countMatches(finalFolderPathFull, "/");
	String dwpPath = getInheritanceValue(finalFolderPathFull, slashCount, zoneNameArg);
	jspContext.setAttribute("dwpPathReturn",dwpPath);
%>
	
<p:out var="currentValue" value="${dwpPathReturn}"/>