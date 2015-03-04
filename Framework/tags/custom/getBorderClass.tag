<%@ include file="includes/init.inc" %>

<%@ attribute name="var" required="false" %>
<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="topBorder" rtexprvalue="true" required="false"%>
<%@ attribute name="bottomBorder" rtexprvalue="true" required="false"%>
<%@ attribute name="defaultBorder" rtexprvalue="true" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>
<%@ attribute name="echo" rtexprvalue="false" required="false"%>
<%--<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"  %>--%>


<c:choose>
	<c:when test="${not empty path}">
		<p:getObject path="${path}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" metadata="meta" channel="Boston.com"/>
		</c:if>
	</c:when>
	<c:when test="${not empty uuid}">
		<p:getObject uuid="${uuid}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" metadata="meta" channel="Boston.com"  />
		</c:if>
	</c:when>
	<c:when test="${not empty webObject}">
		<p:object webObject="${webObject}" metadata="meta" channel="Boston.com"/>
	</c:when>
	<c:otherwise>
		<p:currentObject metadata="meta" channel="Boston.com" />	
	</c:otherwise>
</c:choose>

<p:out var="top" xvalue="$meta/dbMetadata/ObjectMetadata/TopBorder"/>
<c:choose>
	<c:when test="${not empty topBorder}">
		<p:out var="top" value="${topBorder}"/>
	</c:when>
	<c:when test="${empty top and empty defaultBorder}">
		<p:out var="top" value="enabled"/>
	</c:when>
		<c:when test="${empty top and not empty defaultBorder}">
			<p:out var="top" value="${defaultBorder}"/>
		</c:when>
</c:choose>

<p:out var="right" xvalue="$meta/dbMetadata/ObjectMetadata/RightBorder"/>
<c:choose>
	<c:when test="${not empty rightBorder}">
		<p:out var="right" value="${rightBorder}"/>
	</c:when>
	<c:when test="${empty right and empty defaultBorder}">
		<p:out var="right" value="enabled"/>
	</c:when>
	<c:when test="${empty right and not empty defaultBorder}">
		<p:out var="right" value="${defaultBorder}"/>
	</c:when>
</c:choose>

<p:out var="bottom" xvalue="$meta/dbMetadata/ObjectMetadata/BottomBorder"/>
<c:choose>
	<c:when test="${not empty bottomBorder}">
		<p:out var="bottom" value="${bottomBorder}"/>
	</c:when>
	<c:when test="${empty bottom and empty defaultBorder}">
		<p:out var="bottom" value="enabled"/>
	</c:when>
	<c:when test="${empty bottom and not empty defaultBorder}">
		<p:out var="bottom" value="${defaultBorder}"/>
	</c:when>
</c:choose>

<p:out var="left" xvalue="$meta/dbMetadata/ObjectMetadata/LeftBorder"/>
<c:choose>
	<c:when test="${not empty leftBorder}">
		<p:out var="left" value="${leftBorder}"/>
	</c:when>
	<c:when test="${empty left and empty defaultBorder}">
		<p:out var="left" value="enabled"/>
	</c:when>
	<c:when test="${empty left and not empty defaultBorder}">
		<p:out var="left" value="${defaultBorder}"/>
	</c:when>
</c:choose>

<p:out var="borderTopClass" value="border-top"/>
<p:out var="borderRightClass" value="border-right"/>
<p:out var="borderBottomClass" value="border-bottom"/>
<p:out var="borderLeftClass" value="border-left"/>

<p:out var="divClass" value=""/>

<c:if test="${top == 'enabled'}">
	<p:out var="divClass" value="${divClass} ${borderTopClass}"/>
</c:if>

<c:if test="${right == 'enabled'}">
	<p:out var="divClass" value="${divClass} ${borderRightClass}"/>
</c:if>

<c:if test="${bottom == 'enabled'}">
	<p:out var="divClass" value="${divClass} ${borderBottomClass}"/>
</c:if>

<c:if test="${left == 'enabled'}">
	<p:out var="divClass" value="${divClass} ${borderLeftClass}"/>
</c:if>

<%-- <c:choose>
	<c:when test="${bottom eq 'enabled' and top eq 'enabled'}">
		<p:out var="divClass" value=" border-top border-bottom " />
	</c:when>
	<c:when test="${bottom eq 'enabled' and top eq 'disabled'}">
		<p:out var="divClass" value=" border-bottom " />
	</c:when>
	<c:when test="${bottom eq 'disabled' and top eq 'enabled'}">
		<p:out var="divClass" value=" border-top " />
	</c:when>
	<c:when test="${bottom eq 'disabled' and top eq 'disabled'}">
		<p:out var="divClass" value="" />
	</c:when>
	<c:otherwise>
		<p:out var="divClass" value=" border-top border-bottom " />
	</c:otherwise>
</c:choose>--%>

<c:choose>
	<c:when test="${not empty var}">
		<%--<p:out var="currentValue" value="${divClass}" /> --%>
		<%
			String divClass = (String) jspContext.getAttribute("divClass");;
			jspContext.setAttribute(var,divClass,PageContext.REQUEST_SCOPE);
		%>
	</c:when>
	<c:otherwise>
		<p:out value="${divClass}"/>
	</c:otherwise>
</c:choose>