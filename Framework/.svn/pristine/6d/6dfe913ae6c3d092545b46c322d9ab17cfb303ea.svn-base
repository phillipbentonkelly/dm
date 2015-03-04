<%@ include file="includes/init.inc"%>

<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ attribute name="webObject" rtexprvalue="true" required="true"
	type="java.lang.Object"%>

<%@ variable name-from-attribute="var" alias="dateString" scope="AT_END"%>

<p:object webObject="${webObject}" content="story" metadata="meta" />

<p:out var="hasBreaking" xvalue="$story//doc/story/headlines/overline/p" />
<bdc:getHeadlines webObject="${webObject}" var="headlines" />
<p:out var="objectType" xvalue="$meta//type" />

<p:out var="firstPubDate"
	xvalue="$meta//ObjectMetadata/OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/FirstPublicationDate"
	format="eomdate:MM/dd/yyyy HH:mm:ss z" timeZone="US/Eastern" />
<p:out var="lastPubDate"
	xvalue="$meta//ObjectMetadata/OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/LastPublicationDate"
	format="eomdate:MM/dd/yyyy HH:mm:ss z" timeZone="US/Eastern" />
<p:out var="dateString" value="" />
<c:if test="${not empty lastPubDate and fn:trim(lastPubDate) != ''}">
	<!-- lastPubDate = ${lastPubDate} -->
	<%
		String minutes = new String("minute");
		String hours = new String("hour");
		String output = new String("");
	   
		String lastPub = (String)jspContext.getAttribute("lastPubDate");
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss z");
		Date d1 = null, d2 = null;
		
		d1 = dateFormat.parse(lastPub);
		d2 = cal.getTime();
		
		long diff = (d2.getTime() - d1.getTime()) / 1000;

		if (diff <= 45) {
 			output = "seconds"; 
  		} else if (diff <= 90) {
			output = "a minute";
		} else if (diff <= 2700) {
			// 45 minutes
  			output = Math.round((double) diff / 60) + " minutes";
  		} else if (diff <= 5400) {
			// 90 minutes
			output = "an hour";
	   	} else if (diff <= 79200) {
 			// 22 hours
  			output = Math.round((double) diff / 3600) + " hours";
  		} else if (diff <= 129600) {
			// 36 hours
			output = "a day";						  
		} else if (diff <= 2160000) {
 			// 25 days
  			output = Math.round((double) diff / 86400) + " days";
  		} else if (diff <= 3888000) {
			// 45 days
			output = "a month"; 
  		} else if (diff <= 29808000) {
			// 345 days
  			output = Math.round((double) diff / 2592000) + " months";
		} else if (diff <= 47260800) {
 			output = "a year"; 
  		} else {
 			output = Math.round((double) diff / 31536000) + " years";
  		}
		
		output = output + " ago";
								  
	   	jspContext.setAttribute("dateString", output);
	  
	%>

</c:if>
