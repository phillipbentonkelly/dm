<%@ include file="includes/init.inc" %>

<%@ attribute name="var"		rtexprvalue="false"	required="true" %>
<%@ attribute name="appendHP"	rtexprvalue="true" required="false" %>
<%@ attribute name="appendSection" rtexprvalue="true" required="false" %>
<%@ attribute name="webObject"	rtexprvalue="true"	required="false" type="java.lang.Object" %>
<%@ variable name-from-attribute="var" alias="navigation" scope="AT_END" %>

<jsp:useBean id="navStructure" class="java.util.HashMap" /> 

<p:import var="nav" url="/SysConfig/Classify/Data/BDC_nav_menu.xml" xml="true" />

<c:if test="${not empty webObject}">
	<%-- SHORTCUTS (if we're using a nav DWC) --%>
	<%
		ArrayList<Map> shortcuts = new ArrayList<Map>();
	%>
	<p:object webObject="${webObject}" metadata="meta" />
	<x:forEach var="sc" select="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/NavConfig/Shortcuts/Shortcut">
		<p:out var="url"	xvalue="$sc/ShortcutUrl" />
		<p:out var="text"	xvalue="$sc/ShortcutName" />
		
		<c:if test="${not fn:contains(url, '?p1=')}">
			<p:out var="url" value="${url}?p1=Main_Shortcuts${appendSection}" />
		</c:if>
		
		<%
			Map link = new HashMap();
				link.put("text", (String)jspContext.getAttribute("text"));
				link.put("url", (String)jspContext.getAttribute("url"));
			shortcuts.add(link);
		%>
	</x:forEach>
	<%
		jspContext.setAttribute("shortcuts", shortcuts);
	%>
	<c:set target="${navStructure}" property="shortcuts" value="${shortcuts}" />
</c:if>

<%-- SECTIONS --%>
<%
	ArrayList<Map> sections = new ArrayList<Map>();
%>
<x:forEach var="section" select="$nav//Nav/Sections/Section">
	<p:out var="url"	xvalue="$section/URL" />
	<p:out var="path"	xvalue="$section/SectionPath" />
	<p:out var="name"	xvalue="$section/SectionName" />
	
	<c:if test="${fn:trim(url) eq '' and fn:trim(path) ne ''}">
		<p:out var="url" value="${path}" />
	</c:if>
	
	<c:if test="${fn:contains(url, '?p1=')}">
		<p:out var="url" value="${url}${appendHP}" />
	</c:if>
	
	<%
		Map link = new HashMap();
			link.put("text", (String)jspContext.getAttribute("name"));
			link.put("url", (String)jspContext.getAttribute("url"));
		sections.add(link);
	%>
</x:forEach>

<%-- SITER SITES --%>
<%
	ArrayList<Map> sisterSites = new ArrayList<Map>();
%>
<x:forEach var="ss" select="$nav//SisterSites/Sites/Site">
	<p:out var="class"	xvalue="$ss/@class" />
	<p:out var="url"	xvalue="$ss/URL" />
	<p:out var="tease"	xvalue="$ss/Tease" />
	<p:out var="name"	xvalue="$ss/Label" />
	
	<p:out var="url" value="${url}?p1=Main_Sites${appendSection}" />
	
	<%
		Map link = new HashMap();
			link.put("text", (String)jspContext.getAttribute("name"));
			link.put("tease", (String)jspContext.getAttribute("tease"));
			link.put("url", (String)jspContext.getAttribute("url"));
			link.put("class", (String)jspContext.getAttribute("class"));
		sisterSites.add(link);
	%>
</x:forEach>

<%-- LEGAL --%>
<%
	ArrayList<Map> legal = new ArrayList<Map>();
%>
<x:forEach var="legal" select="$nav//LegalLinks/LinkData">
	<p:out var="text"	xvalue="$legal/Text" />
	<p:out var="url"	xvalue="$legal/URL" />
	
	<p:out var="url" value="${url}?p1=Main_Nav${appendSection}" />
	
	<%
		Map link = new HashMap();
			link.put("text", (String)jspContext.getAttribute("text"));
			link.put("url", (String)jspContext.getAttribute("url"));
		legal.add(link);
	%>
</x:forEach>


<%
	jspContext.setAttribute("sections", sections);
	jspContext.setAttribute("sisterSites", sisterSites);
	jspContext.setAttribute("legal", legal);
%>

<c:set target="${navStructure}" property="sections" value="${sections}" />
<c:set target="${navStructure}" property="sisterSites" value="${sisterSites}" />
<c:set target="${navStructure}" property="legal" value="${legal}" />

<c:set var="navigation" value="${navStructure}" /> 