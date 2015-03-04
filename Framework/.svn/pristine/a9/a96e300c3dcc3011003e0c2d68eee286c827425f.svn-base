<%@ include file="includes/init.inc"%>
<%@ tag import="com.eidosmedia.portal.render.impl.cached.MetaOutputBuilder,
                com.eidosmedia.portal.render.impl.cached.WritableFragment,
                com.eidosmedia.portal.render.impl.cached.ScriptFragment,
                java.io.IOException" %>
                
<%@ attribute name="format" rtexprvalue="true" required="true"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>

<c:if test="${empty webObject}">
  <c:set var="webObject" value="${currentObject}" />
</c:if>
<p:object webObject="${webObject}" content="story" metadata="meta" />
  
<jsp:useBean id="timestamps" class="java.util.HashMap" />

<p:out var="pubDate"
	xvalue="$meta//ObjectMetadata/OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/LastPublicationDate" />

<c:if test="${empty pubDate}">
	<p:out var="pubDate"
		xvalue="$meta//ObjectMetadata/OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/FirstPublicationDate" />
</c:if>
<p:out var="pubDate" value="${fn:trim(pubDate)}" />
<p:out var="javaDate" value="${pubDate}" format="eomdate:MM/dd/yyyy HH:mm:ss z" timeZone="US/Eastern" />

<c:if test="${not empty pubDate}">

	<c:if test="${format == 'shortDateTime'}">
		<p:out value="${pubDate}" format="eomdate:MM.dd.yy | h:mm a" timeZone="America/New_York" />
	</c:if>
	
	<c:if test="${format == 'time'}">
		<p:out value="${pubDate}" format="eomdate:h:mm a" timeZone="America/New_York" />
	</c:if>
	
	<c:if test="${format == 'shortDate'}">
		<p:out value="${pubDate}" format="eomdate:MM.dd.yy" timeZone="America/New_York" />
	</c:if>
	
	<c:if test="${format == 'date'}">
		<p:out value="${pubDate}" format="eomdate:MMMM dd, yyyy" timeZone="America/New_York" />
	</c:if>
	
	<c:if test="${format == 'short'}">
		<p:out value="${pubDate}" format="eomdate:MM.dd.yy | h:mm a" timeZone="America/New_York" />
		
	</c:if>
	
	<c:if test="${format == 'longDateTime'}">
		<p:out value="${pubDate}" format="eomdate:EEEEEE, MMMM d yyyy h:mm a" timeZone="America/New_York" />
	</c:if>
	
	<c:if test="${format == 'since'}">
		<%-- This format is more complicated. If the story is < 45 minutes old, we write a ScriptFragment to the output buffer.
		     This will insert a dynamic fragment in our cache fragment that will evaluate the correct value on page load. 
		 --%>
		<%	
			MetaOutputBuilder outputBuilder = (MetaOutputBuilder) jspContext.getAttribute("com.eidosmedia.portal.jsp.PortalSupport.OUTPUT_BUILDER", 2);
			String contextPubDate = (String) jspContext.getAttribute("javaDate"); 
			SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss z");
			final Date pubDate = dateFormat.parse(contextPubDate);
			
			ScriptFragment sinceFragment = new ScriptFragment(request.getRequestURI()) {
				public void writeOutput(WritableFragment.WriteOutputParam param,  Iterator<WritableFragment> i) throws IOException {
					String since;
					Date now = new Date();
					long diff = (now.getTime() - pubDate.getTime()) / 1000;
				
					if (diff <= 45)  {
						since = "seconds";
					} else if (diff <= 90) {
						since = "a minute";
					} else if (diff <= 2700 ){
						since = Math.round((double) diff / 60) + " minutes";
					} else if (diff <= 5400) {   
						// 45 - 90 minutes
						since = "an hour";
					} else if (diff <= 79200) {
						// 90 mins - 22 hours
						since = Math.round((double) diff / 3600) + " hours";
					} else if (diff <= 129600) {
						// 22 - 36 hours
						since = "a day";                          
					} else if (diff <= 2160000) {
						// 36 hours - 25 days
						since = Math.round((double) diff / 86400) + " days";
					} else if (diff <= 3888000) {
						// 25 - 45 days
						since = "a month"; 
					} else if (diff <= 29808000) {
						 // 45 - 345 days
						since = Math.round((double) diff / 2592000) + " months";
					} else if (diff <= 47260800) {
						// 345 - 547 days
						since = "a year"; 
					} else {
						since = Math.round((double) diff / 31536000) + " years";
					}
				
					since += " ago";
					param.outputStream.write(since.getBytes());	
				}
			};
				
			outputBuilder.write(sinceFragment);
        	
   		%>
	</c:if>
</c:if>