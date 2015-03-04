<%@ include file="includes/init.inc" %>

<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>
<%@ attribute name="leadIn" rtexprvalue="true" required="false"%>
<%@ attribute name="reviewRating" rtexprvalue="true" required="false"%>

<c:choose>
	<c:when test="${not empty path}">
		<p:getObject path="${path}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID"/>
		</c:if>
	</c:when>
	<c:when test="${not empty uuid}">
		<p:getObject uuid="${uuid}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID"  />
		</c:if>
	</c:when>
	<c:when test="${not empty webObject}">
		<p:object webObject="${webObject}" content="c" metadata="meta" webType="WT" uuid="StoryID" />
		<p:getObject var="obj" webObject="${webObject}" />
	</c:when>
	<c:when test="${type eq 'internal' and not empty value}">
		<p:getObject path="${value}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID"/>
		</c:if>
	</c:when>
	<c:otherwise>
		<p:currentObject content="c" metadata="meta"  webType="WT" uuid="StoryID" />
	</c:otherwise>
</c:choose>

<p:out var="objType" xvalue="$meta//sys/type" scope="page"/>

<%--
<c:choose>
	<c:when test="${leadInType eq 'review-rating'}">
		<c:choose>
			<c:when test="${fn:endsWith(leadIn,'.5') or fn:endsWith(leadIn,'.0')}">
				<p:out var="starRating" value="${leadIn}0"/>
			</c:when>
			<c:when test="${fn:length(leadIn) eq 1}">
				<p:out var="starRating" value="${leadIn}.00"/>
			</c:when>
			<c:otherwise>
				<p:out var="starRating" value="${leadIn}"/>
			</c:otherwise>
		</c:choose>
		<span><img src="/img/review_stars/rating_star_${starRating}.gif"/></span>
	</c:when>
	<c:when test="${leadInType eq 'lead-in'}">
		<span>${leadIn}</span>
	</c:when>
	<c:otherwise>
		<jsp:doBody/>
	</c:otherwise>
</c:choose>
 --%>


<c:choose>
	<c:when test="${not empty reviewRating}">
		<c:choose>
			<c:when test="${fn:endsWith(reviewRating,'.5') or fn:endsWith(reviewRating,'.0')}">
				<p:out var="starRating" value="${reviewRating}0"/>
			</c:when>
			<c:when test="${fn:length(reviewRating) eq 1}">
				<p:out var="starRating" value="${reviewRating}.00"/>
			</c:when>
			<c:otherwise>
				<p:out var="starRating" value="${reviewRating}"/>
			</c:otherwise>
		</c:choose>
		<span><img src="/img/review_stars/rating_star_${starRating}.gif"/></span>
	</c:when>
</c:choose>
<c:choose>
	<c:when test="${not empty leadIn}">
		<span>${leadIn}</span>
	</c:when>
</c:choose>
<jsp:doBody/>

