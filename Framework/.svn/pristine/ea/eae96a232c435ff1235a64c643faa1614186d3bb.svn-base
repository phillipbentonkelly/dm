<%@ include file="includes/init.inc" %>

<%@ attribute name="value" rtexprvalue="true" required="true" %>
<%@ attribute name="regex" rtexprvalue="true" required="true" %>
<%@ attribute name="replace" rtexprvalue="true" required="true" %>
<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ variable name-from-attribute="var" alias="output" scope="AT_END"  %>


<%

	String value = (String) jspContext.getAttribute("value");

	String regex = (String) jspContext.getAttribute("regex");

	String replace = (String) jspContext.getAttribute("replace");
	
	jspContext.setAttribute("output", value.replaceAll(regex, replace));
	
%>

