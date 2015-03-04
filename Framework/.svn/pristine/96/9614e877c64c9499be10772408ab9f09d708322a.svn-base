<%@ include file="includes/init.inc" %>

<%@ attribute name="var"		rtexprvalue="false" required="true" %>
<%@ attribute name="webObject"	rtexprvalue="true"	required="true"	type="java.lang.Object" %>

<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END" %>

<jsp:useBean id="stupidHash" class="java.util.HashMap" />

<%
	Map linkData = new HashMap();
	// There will be a block for Universal related links and one of Slides (in the event of a gallery)
	ArrayList<Map> universalLinks = new ArrayList<Map>();
	ArrayList<Map> slideLinks = new ArrayList<Map>(); // Currently goes nowhere.
%>

<p:object webObject="${webObject}" content="content" metadata="meta" />

<p:out var="WT" xvalue="$meta//WebType" />

<%-- ///////////////////////////////////////////////////////////
	Universal Related Links
/////////////////////////////////////////////////////////// --%>
<c:choose>
	<c:when test="${fn:endsWith(WT, 'picturestory') or fn:endsWith(WT, 'gallery')}">
		
		<x:set var="rlCount" select="count($content//gallery-container/related-links/related-link[child::a/text() != ''])" />
		<fmt:parseNumber value="${rlCount}" var="rlCount" integerOnly="true" />
		<c:set target="${stupidHash}" property="universalCount" value="${rlCount}" />
		
		<%-- // Universal related links --%>
		<x:forEach var="rl" select="$content//gallery-container/related-links/related-link" varStatus="loop">
			<p:out var="linkUrl" xvalue="$rl/a/@href" />
			<p:out var="linkText" xvalue="$rl/a/text()" />
			<p:out var="linkId" value="${fn:substringBefore(fn:substringAfter(linkUrl, 'uuid='), '&')}" />
			<%
				Map temp = new HashMap();
					temp.put("url", (String)jspContext.getAttribute("linkUrl"));
					temp.put("id", (String)jspContext.getAttribute("linkId"));
					temp.put("text", (String)jspContext.getAttribute("linkText"));
				universalLinks.add(temp);
			%>
		</x:forEach>
		<%
			jspContext.setAttribute("rlUniversal", universalLinks);
		%>
		<c:set target="${stupidHash}" property="universalLinks" value="${rlUniversal}" />
		
		<%-- // Slide specific related links --%>
		<%--
			Not yet implemented.
		--%>
		
	</c:when>
	<c:otherwise>
		
		<x:set var="rlCount" select="count($content//related-links/related-link[child::a/text() != ''])" />
		<fmt:parseNumber value="${rlCount}" var="rlCount" integerOnly="true" />
		<c:set target="${stupidHash}" property="universalCount" value="${rlCount}" />
		
		<x:forEach var="rl" select="$content//related-links/related-link" varStatus="loop">
			<p:out var="linkUrl" xvalue="$rl/a/@href" />
			<p:out var="linkText" xvalue="$rl/a/text()" />
			<p:out var="linkId" value="${fn:substringBefore(fn:substringAfter(linkUrl, 'uuid='), '&')}" />
			<%
				Map temp = new HashMap();
					temp.put("url", (String)jspContext.getAttribute("linkUrl"));
					temp.put("id", (String)jspContext.getAttribute("linkId"));
					temp.put("text", (String)jspContext.getAttribute("linkText"));
				universalLinks.add(temp);
			%>
		</x:forEach>
		<%
			jspContext.setAttribute("rlUniversal", universalLinks);
		%>
		<c:set target="${stupidHash}" property="universalLinks" value="${rlUniversal}" />
		
	</c:otherwise>
</c:choose>

<c:set var="currentValue" value="${stupidHash}" />