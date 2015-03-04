<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="bdc" tagdir="/WEB-INF/tags/eom/SysConfig/WebPortal/BDC/Framework/tags/custom/" %>

<%@ page import="org.jsoup.Jsoup" %>
<%@ page import="org.jsoup.safety.Whitelist" %>
<%@page import="java.util.*"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.lang.String"%>
<%@page import="java.security.*"%>
<%@page import="java.math.BigInteger"%>


<%
//Variables
String requestMode = (String)request.getParameter("mode");
String requestID = (String)request.getParameter("id");
pageContext.setAttribute("requestID",requestID);
%>
<%if (requestID == null || requestID.isEmpty()) { %>
	<jp:getCollection path="/SysConfig/WebPortal/BDC/Framework/feeds/placester/queries/real-estate-get-category-pages.query" var="categoryPages"/>
<% } %>
<%if (!(requestID == null || requestID.isEmpty())) { 
	ArrayList<Map> oneItemList = new ArrayList<Map>();
	Map oneItem = new HashMap();
	oneItem.put("loid", (String)requestID);
	oneItemList.add(oneItem);
	
	Map categoryPages = new HashMap();
	categoryPages.put("items", oneItemList);
	
	pageContext.setAttribute("categoryPages",categoryPages);	
} %>

<%
	ArrayList<Map> categories = new ArrayList<Map>();
	Map category = new HashMap();
	ArrayList<Map> zone = new ArrayList<Map>();
	ArrayList<Map> zones = new ArrayList<Map>();
	
%>

<c:forEach items="${categoryPages.items}" var="item" varStatus="status">
	  	<p:getObject loid="${item.loid}" var="obj" />
	  	<p:object webObject="${obj}" content="page-doc" metadata="page-meta" channel="Boston.com"/>
	  	<p:out var="pageId" value="${item.loid}" />
  		<p:out var="pageTitle" xvalue="$page-meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/Title"/>
  		<p:out var="pageDoc" xvalue="$page-doc"/>
  		<p:out var="pageMeta" xvalue="$page-meta"/>
		<bdc:getMD5Checksum var="pageDocMD5" content="${pageDoc}${obj.loid}" />
		<bdc:getMD5Checksum var="pageMetaMD5" content="${pageMeta}${obj.loid}" />
  		
  		<%
  			String pageId = (String)pageContext.getAttribute("pageId");
  			String pageTitle = (String)pageContext.getAttribute("pageTitle");
  			String pageDoc = (String)pageContext.getAttribute("pageDoc");
  			String pageMeta = (String)pageContext.getAttribute("pageMeta");
  			
  			String pageDocMD5 = (String)pageContext.getAttribute("pageDocMD5");
  			String pageMetaMD5 = (String)pageContext.getAttribute("pageMetaMD5");
  			
  			category = new HashMap();
  			zones = new ArrayList<Map>();
  			
  		%>
  		<bdc:getAllZones path="${obj.path}" var="zones"/>
		<c:forEach items="${zones}" var="zoneName" varStatus="zoneStatus">
			<%
				zone = new ArrayList<Map>();
				String zoneName = (String)pageContext.getAttribute("zoneName");
				
			%>
			<bdc:getZoneContent var="zone" webObject="${obj}" zoneName="${zoneName}"/>
			<p:out var="zoneName" value="${zoneName}"/>
			<c:forEach items="${zone.items}" var="objZone" varStatus="zoStatus">
				<bdc:getPlacesterComponent loid="${objZone.loid}" zoneName="${zoneName}" var="component"/>
				<%
					Map component = (Map)pageContext.getAttribute("component");	
					
					pageDocMD5 += (String)component.get("checksum");
					pageMetaMD5 += (String)component.get("checksum");
					zones.add(component);
			
				%>
				
			</c:forEach>

		<%
			category.put("id",pageId);
			category.put("title",pageTitle);
			category.put("zones",zones);
		%>
		</c:forEach>
		<%
			//Put recalculated Checksum back in place
			pageContext.setAttribute("recalculatedDocMD5",pageDocMD5);
			pageContext.setAttribute("recalculatedMetaMD5",pageMetaMD5);
		%>
		<bdc:getMD5Checksum var="finalDocMD5" content="${recalculatedDocMD5}" />
		<bdc:getMD5Checksum var="finalMetaMD5" content="${recalculatedMetaMD5}" />

<%
	String finalDocMD5 = (String)pageContext.getAttribute("finalDocMD5");
	String finalMetaMD5 = (String)pageContext.getAttribute("finalMetaMD5");

	//Just a test to try out
	pageDocMD5 = (String)pageContext.getAttribute("pageDocMD5");
	pageMetaMD5 = (String)pageContext.getAttribute("pageMetaMD5");
	finalDocMD5 = pageDocMD5;
	finalMetaMD5 = pageMetaMD5;
	
	
	category.put("checksum",finalDocMD5 + finalMetaMD5);
	categories.add(category);
%>
</c:forEach>	
<%
	pageContext.setAttribute("pages",categories);
%>
<% if (requestMode.equals("full")) { %>
<category-pages>
	<c:forEach items="${pages}" var="page" varStatus="pageStatus">
		<category-page>
			<title>${page.title}</title>
			<id>${page.id}</id>
			<checksum>${page.checksum}</checksum>
			<components>
				<c:forEach items="${page.zones}" var="zone" varStatus="zoneStatus">
					<component>
						<title>${zone.title}</title>
						<id>${zone.id}</id>
						<checksum>${zone.checksum}</checksum>
						<type>${zone.type}</type>
						<source>${zone.source}</source>
						<content>${zone.content}</content>
						<zone>${zone.zone}</zone>
					</component>
				</c:forEach>
			</components>
		</category-page>
	</c:forEach>
</category-pages>
<% } else { %>
<category-pages>
	<c:forEach items="${pages}" var="page" varStatus="pageStatus">
		<category-page>
			<title>${page.title}</title>
			<id>${page.id}</id>
			<checksum>${page.checksum}</checksum>
		</category-page>
	</c:forEach>
</category-pages>
<% } %>