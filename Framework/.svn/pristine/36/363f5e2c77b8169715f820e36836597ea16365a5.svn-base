<%@ include file="includes/init.inc" %>

<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>
<%@ variable name-from-attribute="var" alias="data" scope="AT_END"  %>

<jsp:useBean id="data" class="java.util.HashMap"/>

<p:object webObject="${webObject}" content="c" metadata="meta" webType="WT" />
<p:out var="eomType" xvalue="$meta//sys/type" />

<c:choose>
	<c:when test="${eomType == 'EOM::WebPage'}">
		<p:out var="prop6" xvalue="$meta//ObjectMetadata/OnlineProducts/OnlineProduct[child::ProductName = 'Boston.com']/AdPageValues/Prop6" escape="javascript" />
		<p:out var="pageAsset" value="${prop6}" />
	</c:when>
	<c:otherwise>
		<p:out var="prop6"  xvalue="$meta//ObjectMetadata/OnlineProducts/OnlineProduct[child::ProductName = 'Boston.com']/TrackingType" />
		<p:out var="pageAsset" value="${prop6}" />
		<p:out var="refProvider" xvalue="$meta//ObjectMetadata/Reference/Provider" />
		<c:if test="${WT == 'summarystory' and not empty refProvider}">
			<p:out var="refProvider" value="${refProvider} | Summary" />
		</c:if>
	</c:otherwise>
</c:choose>
<c:if test="${not empty refProvider}">
	<p:out var="prop6" value="${prop6} | ${refProvider}" />
</c:if>

<%-- Clean up the pageAsset variable a little --%>
<p:out var="pageAsset" value="${fn:replace(pageAsset, ' ', '_')}" />

<c:set target="${data}" property="prop6" value="${prop6}" />
<c:set target="${data}" property="pageAsset" value="${fn:toLowerCase(pageAsset)}" />