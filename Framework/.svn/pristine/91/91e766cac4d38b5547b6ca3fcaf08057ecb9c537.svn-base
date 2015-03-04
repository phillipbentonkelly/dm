<%@ include file="includes/init.inc" %>
<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="timeStampDuration" rtexprvalue="true" required="false"%>
<%@ attribute name="timeStampAccess" rtexprvalue="true" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>
<%@ attribute name="echo" rtexprvalue="false" required="false"%>
<%@ variable name-from-attribute="var" alias="result" scope="AT_END" %>
<p:out var="result" value=""/>

<c:if test="${timeStampAccess != null && timeStampAccess != ''}">
	<c:choose>
		<c:when test="${not empty path}">
			<p:getObject path="${path}" var="obj" onError="ignore" />
			<c:if test="${not empty obj}">
				<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com"/>
			</c:if>
		</c:when>
		<c:when test="${not empty uuid}">
			<p:getObject uuid="${uuid}" var="obj" onError="ignore" />
			<c:if test="${not empty obj}">
				<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com"  />
			</c:if>
		</c:when>
		<c:when test="${not empty webObject}">
			<p:object webObject="${webObject}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com" />
			<p:getObject var="obj" webObject="${webObject}" />
		</c:when>
		<c:otherwise>
			<p:currentObject content="c" metadata="meta"  webType="WT" uuid="StoryID" channel="Boston.com" />
		</c:otherwise>
	</c:choose>
	
	<p:out var="lastPubDate" value=""/>
	<x:if select="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/LastPublicationDate">
		<p:out var="lastPubDate" xvalue="$meta//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/LastPublicationDate"/>
	</x:if>
 
	<c:if test="${lastPubDate != null && lastPubDate != ''}">
		<p:out var="durationTimeStamp" value="${timeStampDuration}"/>
		<p:out var="accessTimeStamp" value="${timeStampAccess}"/>
		
		<%
		SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMddHHmmss", Locale.US);
		formatDate.setTimeZone(TimeZone.getTimeZone("Etc/UTC"));
		
		String date=(String)jspContext.getAttribute("lastPubDate");
		String durationTimeStamp=(String)jspContext.getAttribute("durationTimeStamp");
		String accessTimeStamp=(String)jspContext.getAttribute("accessTimeStamp");
		
		Date lastPubTime = (Date)formatDate.parse(date);
		int time = Integer.parseInt(durationTimeStamp);
		time*=60*1000;
		Date finalTime = new Date(lastPubTime.getTime() + time);
		
		String enableTimeStamp = "false";
		Date currentDate = new Date();
		int compareTime = currentDate.compareTo(finalTime);
		if (accessTimeStamp.equals("enabled") && currentDate.compareTo(finalTime)<=0) {
			enableTimeStamp = "true";
		}
		jspContext.setAttribute("lastPubTime",formatDate.format(lastPubTime));
		jspContext.setAttribute("finalTime",formatDate.format(finalTime));
		jspContext.setAttribute("currentDate",formatDate.format(currentDate));
		jspContext.setAttribute("accessTimeStamp",accessTimeStamp);
		jspContext.setAttribute("compareTime",compareTime);
		jspContext.setAttribute("enableTimeStamp",enableTimeStamp);
		%>
		
		<!--   
		lastPubTime ${lastPubTime}
		finalTime   ${finalTime}
		currentDate ${currentDate}
		accessTimeStamp ${accessTimeStamp}
		compareTime ${compareTime}
		enableTimeStamp ${enableTimeStamp} 
		-->
		
		<c:if test="${enableTimeStamp == 'true' }">
			<p:out var="datetime" xvalue="${lastPubDate}" format="eomdate:yyyy-MM-dd" timeZone="US/Eastern"/> <%-- datetime attribute value --%>
			<p:out var="pubTime" xvalue="${lastPubDate}" format="eomdate:h:mm a" timeZone="US/Eastern"/> <%-- time value --%>
			<p:out var="pubTime" value="${fn:replace(pubTime, 'AM', 'a.m.')}"/>
			<p:out var="pubTime" value="${fn:replace(pubTime, 'PM', 'p.m.')}"/>
			<p:out var="result" value="${pubTime}"/>
		</c:if>
	</c:if>
</c:if>
<c:if test="${echo == 'true'}">
	${result}
</c:if>