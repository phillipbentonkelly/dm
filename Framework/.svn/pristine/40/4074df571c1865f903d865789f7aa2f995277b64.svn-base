<%@ page import="org.joda.time.format.DateTimeFormatter" %>
<%@ page import="org.joda.time.format.DateTimeFormat" %>
<%@ page import="org.joda.time.format.ISODateTimeFormat" %>
<%@ page import="org.joda.time.DateTime" %>
<%@ page import="java.util.Locale" %>

<% 	
	String isoFormattedDateString = (String) pageContext.getAttribute("isoFormattedDate");
	//String createDate, createdTime;

	if (isoFormattedDateString != "") {

		DateTimeFormatter dateTimeFormatter = ISODateTimeFormat.dateTimeParser();
		DateTime createdDateTime = dateTimeFormatter.parseDateTime(isoFormattedDateString);
		String createdDateString = DateTimeFormat.forPattern("MM/dd/yyyy").withLocale(Locale.US).print(createdDateTime);
		String createdTimeString = DateTimeFormat.forPattern("hh:mm aa").withLocale(Locale.US).print(createdDateTime);
		pageContext.setAttribute("createdDateString", createdDateString);
		pageContext.setAttribute("createdTimeString", createdTimeString);
	}
%>