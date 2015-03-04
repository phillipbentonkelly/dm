<%@ page contentType="text/xml" pageEncoding="UTF-8"%>
<%@ taglib prefix="bgm" uri="bgmtags"%>
<%@ taglib prefix="bdc" tagdir="/WEB-INF/tags/eom$configurationURI/Framework/tags/custom/" %>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml"%> 

<c:set var="now" value="<%=new java.util.Date()%>" />
<p:out var="now" value="${now}" format="eomdate|GMT:EE, d MMM yyyy HH:mm:ss z" />

<jp:getCollection path="${param.query}" var="blogObj"/>

<%
	java.util.Calendar cal = java.util.Calendar.getInstance();
	int copyrightYear = cal.get(java.util.Calendar.YEAR);
	pageContext.setAttribute("copyrightYear", copyrightYear);
%>

<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss">
<channel>
	<author>
		<name>Boston Globe</name>
		<uri>http://www.boston.com</uri>
	</author>
	<title><p:out xvalue="$doc//channel/title"/></title>
	<pubDate>${now}</pubDate>
	<updated>${now}</updated>
	<rights>Copyright ${copyrightYear} Boston Globe Media Partners, LLC</rights>


<c:forEach items="${blogObj.items}" var="item" varStatus="status">

	<!-- ${item.uuid} -->
	<jsp:include page="eom$configurationURI/Framework/feeds/rss/render_single_object.jsp">
		<jsp:param name="id" value="${item.uuid}" />
	</jsp:include>

</c:forEach>

</channel>
</rss>