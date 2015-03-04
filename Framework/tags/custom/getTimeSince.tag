<%@ tag body-content="scriptless" import="
	java.lang.StringBuffer,
	java.util.Date,
	org.joda.time.format.DateTimeFormatter,
	org.joda.time.format.ISODateTimeFormat,
	org.joda.time.format.PeriodFormatter,
	org.joda.time.format.PeriodFormatterBuilder,
	org.joda.time.Period,
	org.joda.time.DateTime,
	org.joda.time.Seconds
" %>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml" %>

<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="isoFormattedDate" rtexprvalue="true" required="false"%>

<%@ attribute name="year" rtexprvalue="true" required="false"%>
<%@ attribute name="month" rtexprvalue="true" required="false"%>
<%@ attribute name="day" rtexprvalue="true" required="false"%>

<%@ variable name-from-attribute="var" alias="timeSinceString" scope="AT_END"  %>
<%

String isoFormattedDate = (String) jspContext.getAttribute("isoFormattedDate");

String year = (String) jspContext.getAttribute("year");
String month = (String) jspContext.getAttribute("month");
String day = (String) jspContext.getAttribute("day");

String timeSinceString;

if (isoFormattedDate != null && isoFormattedDate != "") {

	DateTimeFormatter dateTimeFormatter = ISODateTimeFormat.dateTimeParser();

	DateTime periodStart = dateTimeFormatter.parseDateTime(isoFormattedDate);
	DateTime now = new DateTime();
	Period period = new Period(periodStart, now);
	Seconds secondsPeriod = Seconds.secondsBetween(periodStart, now); 

	Integer days = secondsPeriod.toStandardDays().getDays();
	Integer hours = secondsPeriod.toStandardHours().getHours();
	Integer minutes = secondsPeriod.toStandardMinutes().getMinutes();
	Integer seconds = secondsPeriod.getSeconds();

	if (days > 0){
		if (days > 1){
			timeSinceString = days.toString() + " days";
	    }
	    else {
	    	timeSinceString = days.toString() + " day";
	    }
	} else if (hours > 0){
		if (hours > 1){
			timeSinceString = hours.toString() + " hours";
	    }
	    else {
	    	timeSinceString = hours.toString() + " hour";
	    }
	} else if (minutes > 0){
		if (minutes > 1){
			timeSinceString = minutes.toString() + " minutes";
	    }
	    else {
	    	timeSinceString = minutes.toString() + " minute";
	    }
	} else if (seconds > 0){
		if (seconds > 1){
			timeSinceString = seconds.toString() + " seconds";
	    }
	    else {
	    	timeSinceString = seconds.toString() + " second";
	    }
	} else {
		timeSinceString = "";
	}
} else if (year != null && year != "" && month != null && month != "" && day != null && day != "") {
	int yearInt = java.lang.Integer.parseInt(year);
	int monthInt = java.lang.Integer.parseInt(month);
	int dayInt = java.lang.Integer.parseInt(day);
	DateTime periodStart = new DateTime(yearInt, monthInt, dayInt, 0, 0);
	DateTime now = new DateTime();
	System.out.println("b-day" + periodStart.toString());
	Period period = new Period(periodStart, now);
	Integer years = new Integer(period.getYears());

	timeSinceString = years.toString();
	
} else if (year != null && year != "") {
	int yearInt = java.lang.Integer.parseInt(year);
	
	Date currentDate = new java.util.Date();
	int currentYear = currentDate.getYear();
	Integer years = new Integer(currentYear - yearInt);

	timeSinceString = years.toString();
	
} else {
	timeSinceString = "";
}

/*   	.appendYears().appendSuffix(" years, ")
	.appendMonths().appendSuffix(" months, ")
	.appendWeeks().appendSuffix(" weeks, ")

	
PeriodFormatter periodFormatter = new PeriodFormatterBuilder()
.appendYears().appendSuffix(" years, ")
.appendMonths().appendSuffix(" months, ")
.appendWeeks().appendSuffix(" weeks, ")
    .appendDays().appendSuffix(" days, ")
    .appendHours().appendSuffix(" hours, ")
    .appendMinutes().appendSuffix(" minutes, ")
    .appendSeconds().appendSuffix(" seconds")
    .printZeroNever()
    .toFormatter();

String elapsed = periodFormatter.print(period);

jspContext.setAttribute("timeSinceString", elapsed);
*/
jspContext.setAttribute("timeSinceString", timeSinceString);

%>
<%-- 
<p:out var="formattedValue" value="This will display time since ${isoFormattedDate}"/>
--%>