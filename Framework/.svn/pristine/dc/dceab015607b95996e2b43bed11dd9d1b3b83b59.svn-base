<%@ taglib prefix="bgm" uri="bgmtags"%>

<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml"%>


<%@ include file="includes/init.inc" %>

<%@ tag body-content="scriptless" import="
	java.util.Map,
	java.util.HashMap,
	java.util.ArrayList,
	java.util.Date,
	java.util.Locale,
	java.util.TimeZone,
	java.lang.StringBuffer,
	java.util.*,
	java.lang.Integer,
	java.text.*,
	java.util.Collection,
	java.util.Calendar,
	java.text.DateFormat,
	java.text.SimpleDateFormat,
	java.util.Locale,
	com.eidosmedia.portal.util.*,
	java.security.*,
	java.math.BigInteger"
	trimDirectiveWhitespaces="true"	
%>

<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="content" rtexprvalue="true" required="true"%>
<%@ attribute name="echo" rtexprvalue="false" required="false"%>
<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"  %>

<%
	//Calculate MD5 checksum, this can be used to track changes to either content or metadata
	String contentString = (String)jspContext.getAttribute("content");

	MessageDigest m = MessageDigest.getInstance("MD5");
	m.reset();
	m.update(contentString.getBytes());
	byte[] digest = m.digest();
	BigInteger number = new BigInteger(1, digest);
    String contentMD5 = number.toString(16);

    jspContext.setAttribute("contentMD5",contentMD5);
%>

<c:set var="currentValue" value="${contentMD5}"/>

<c:if test="${echo == 'true'}">
	${currentValue}
</c:if>