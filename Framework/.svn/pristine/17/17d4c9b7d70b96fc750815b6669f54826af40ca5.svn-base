<%@tag import=
		"java.util.*,
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
		java.io.ByteArrayInputStream,
		java.util.HashMap,
		java.util.Map"
		trimDirectiveWhitespaces="true" 
%>

<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%> 
<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="section" rtexprvalue="true" required="true"%>
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
	public Map getSiteSectionData(String xvalueFullArg, String finalFolderPathFullArg, int slashCountArg, String SR) throws Exception {
	
		Map dataMap = new HashMap();
		String adjustedFolderPath = finalFolderPathFullArg.substring(SR.length());

		if(adjustedFolderPath.equals("")) {
			dataMap.put("Path", "/");
		} else {
			dataMap.put("Path", adjustedFolderPath);
		}
	
		if (slashCountArg == 4) {
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
		    String homepageTitle =  sysXPathHomepage.evaluate("//sys/props/PortalSiteConfig/Title", sysDocHomepage);	
			
			dataMap.put("Name", homepageTitle);
		    
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
		    String sectionTitle = sysXPath.evaluate("//sys/props/PortalSiteConfig/SectionDisplayName",sysDoc);
		    
		    dataMap.put("Name", sectionTitle);
			
		}
		
		return dataMap;
	}
%>

<p:out var="dataMap" value="" />
			
<%
	String xvalueFull = (String) jspContext.getAttribute("xvalue");
	
	String finalFolderPathFull = (String) jspContext.getAttribute("finalFolderPath");
	String sectionFullPath = (String) jspContext.getAttribute("section");
	String siteRoot = (String) jspContext.getAttribute("siteRoot");
	
	int slashCount = StringUtils.countMatches(finalFolderPathFull, "/");
	
	Map dataMap = getSiteSectionData(xvalueFull, finalFolderPathFull, slashCount, siteRoot);

	jspContext.setAttribute("dataMap", dataMap);
	/*
	jspContext.setAttribute("dataMapName", sectionInfo.Name);
	jspContext.setAttribute("dataMapPath", sectionInfo.Path);
	*/
%>

<jsp:useBean id="SecData" class="java.util.HashMap" />
<c:set target="${SecData}" property="name" value="${dataMap.Name}" />
<c:set target="${SecData}" property="path" value="${dataMap.Path}" />


<c:set var="currentValue" value="${SecData}" />