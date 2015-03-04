<%@ page import="org.jsoup.Jsoup" %>
<% 
String iaBody = Jsoup.parse((String)pageContext.getAttribute("body")).text();
if (iaBody.length() > 200){
	pageContext.setAttribute("body", iaBody.substring(0, 200));
	pageContext.setAttribute("showMoreLink", true);
}
%>
<p>${body} <c:if test="${showMoreLink}"><a href="${topicUrl}"> more &raquo;</a></c:if></p>
