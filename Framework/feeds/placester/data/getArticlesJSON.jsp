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
<%@page import="org.codehaus.jackson.JsonGenerationException"%>
<%@page import="org.codehaus.jackson.map.JsonMappingException"%>
<%@page import="org.codehaus.jackson.map.ObjectMapper"%>

<%
//DM 219
//Variables
String requestMode = (String)request.getParameter("mode");
String requestID = (String)request.getParameter("id");
pageContext.setAttribute("requestID",requestID);
%>
<%if (requestID == null || requestID.isEmpty()) { %>

	<jp:getCollection path="/SysConfig/WebPortal/BDC/Framework/feeds/placester/queries/real-estate-get-articles.query" var="queryResults"/>
	
	<%
		//Items need to be merged if it is coming from Query and Folders, otherwise just normalized.
		ArrayList<Map> mergedObjectsList = new ArrayList<Map>();
		Map itemToMerge = new HashMap(); 	
		Map allItems = new HashMap();	
	%>
	<c:forEach items="${queryResults.items}" var="item" varStatus="status">
		<p:out var="itemLoid" value="${item.loid}"/>
		<%
			itemToMerge = new HashMap();
			itemToMerge.put("loid",(String)pageContext.getAttribute("itemLoid"));
			mergedObjectsList.add(itemToMerge);
		%>
	</c:forEach>
	<% 
	allItems.put("items",mergedObjectsList);
	pageContext.setAttribute("allItems",allItems); %>




<% } %>

<%
//Variables
String JSONCallback = (String)request.getParameter("JSONCallback");
pageContext.setAttribute("requestID",requestID);
%>
<%if (!requestID.isEmpty()) { 
	ArrayList<Map> oneItemList = new ArrayList<Map>();
	Map oneItem = new HashMap();
	oneItem.put("loid", (String)requestID);
	oneItemList.add(oneItem);
	
	Map categoryPages = new HashMap();
	categoryPages.put("items", oneItemList);
	
	pageContext.setAttribute("allItems",categoryPages);	
} %>

<%
	ArrayList<Map> categories = new ArrayList<Map>();
	Map category = new HashMap();
	ArrayList<Map> zone = new ArrayList<Map>();
	ArrayList<Map> zones = new ArrayList<Map>();
	
%>


{"articles" : [
<p:out var="comma" value=""/>
<c:forEach items="${allItems.items}" var="item" varStatus="status">
		${comma}
	  	<p:getObject loid="${item.loid}" var="obj" />
	  	<p:object webObject="${obj}" content="page-doc" metadata="page-meta" channel="Boston.com"/>
		<p:out var="storyText" xvalue="$page-doc//doc"/>
		<p:out var="metaText" xvalue="$page-meta//ObjectMetadata"/>
		<bdc:getMD5Checksum var="storyMD5" content="${storyText}${item.loid}" />
		<bdc:getMD5Checksum var="metaMD5" content="${metaText}${item.loid}" />
<% if (requestMode.equals("full")) { %>
		<bdc:getPlacesterElement loid="${item.loid}" var="itemOutput" />
		<bdc:getRelatedLinks var="relatedLinks" loid="${item.loid}" />
		<%
			Map itemOutput = (Map)pageContext.getAttribute("itemOutput");
			Map relatedLinks = (Map)pageContext.getAttribute("relatedLinks");
			String storyMD5 = (String)pageContext.getAttribute("storyMD5");
			String metaMD5 = (String)pageContext.getAttribute("metaMD5");
			
			ArrayList<Map> relatedLinksList = new ArrayList<Map>();
			
			ArrayList<String[]> _relatedLinks = (ArrayList<String[]>)relatedLinks.get("relatedLinksArray"); 
			if (_relatedLinks.size() > 0) {
				for (int i=0; i < _relatedLinks.size(); i++) {
					Map relatedLink = new HashMap();
					String[] _relatedLink =  (String[])_relatedLinks.get(i); 
					relatedLink.put("type", _relatedLink[0]);
					relatedLink.put("url", _relatedLink[1]);
					relatedLink.put("text", _relatedLink[2]);
					relatedLink.put("leadIn", _relatedLink[3]);
					relatedLink.put("reviewRating", _relatedLink[4]);
					relatedLink.put("new", _relatedLink[5]);
					relatedLinksList.add(relatedLink);
				}
				itemOutput.put("relatedLinks",relatedLinksList);
			}
			itemOutput.put("checksum",metaMD5 + storyMD5);
			
			
			ObjectMapper mapper = new ObjectMapper();
			pageContext.setAttribute("itemOutputJSON",(String)mapper.writeValueAsString(itemOutput));
		%>
		${itemOutputJSON}
<% } else { %>
	{
		"id": "${item.loid}",
		"checksum": "${metaMD5}${storyMD5}"
	}
<% } %>
	<p:out var="comma" value=","/>
</c:forEach>
]}