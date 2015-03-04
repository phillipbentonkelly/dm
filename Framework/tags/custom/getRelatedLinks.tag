<%@ include file="includes/init.inc" %>

<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="edition" rtexprvalue="true" required="false"%>
<%@ attribute name="templateName" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="loid" rtexprvalue="true" required="false"%>
<%@ attribute name="xsltFile" rtexprvalue="false" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>
<%@ attribute name="echo" rtexprvalue="false" required="false"%>
<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"  %>

<p:out var="xslt_default" value="$configurationURI/Framework/xslt/story_new.xslt" />
<c:choose>
	<c:when test="${xsltFile != null and xsltFile != ''}">
		<p:out var="xslt_file" value="${xsltFile}" />
	</c:when>
	<c:otherwise>
		<p:out var="xslt_file" value="${xslt_default}" />
	</c:otherwise>
</c:choose>	

<jsp:useBean id="contentData" class="java.util.HashMap"/>

<c:choose>
	<c:when test="${not empty edition}">
		<p:out var="channel" value="Boston.com/${edition}"/>
	</c:when>
	<c:otherwise>
		<p:out var="channel" value="Boston.com"/>
	</c:otherwise>
</c:choose>

<c:choose>
	<c:when test="${not empty path}">
		<p:getObject path="${path}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="${channel}"/>
		</c:if>
	</c:when>
	<c:when test="${not empty uuid}">
		<p:getObject uuid="${uuid}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" channel="${channel}"  />
			<p:out var="StoryID" value="${uuid}" />
			<p:out var="objType" xvalue="$meta//sys/type" scope="page"/>
		</c:if>
	</c:when>
	<c:when test="${not empty loid}">
		<p:getObject loid="${loid}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" channel="${channel}"  />
			<p:out var="StoryID" value="$meta//uuid" />
			<p:out var="objType" xvalue="$meta//sys/type" scope="page"/>
		</c:if>
	</c:when>
	<c:when test="${not empty webObject}">
		<p:object webObject="${webObject}" content="c" metadata="meta" channel="${channel}" />
		<p:out var="StoryID" xvalue="$meta//uuid" />
		<p:out var="objType" xvalue="$meta//sys/type" scope="page"/>
	</c:when>
	<c:otherwise>
		<p:currentObject content="c" metadata="meta" webType="WT" uuid="StoryID" channel="${channel}" />
		<p:out var="obj" value="${currentObject}" />
		
	</c:otherwise>
</c:choose>

<c:if test="${empty StoryID}">
	<p:out xvalue="$meta//uuid" var="StoryID"/>
</c:if>


<% ArrayList<String[]> relatedLinksArray = new ArrayList<String[]>(); %>



<c:choose>
	<c:when test="${objType eq 'EOM::MediaGallery'}">
		<%-- related links data --%>
		<x:if select="$c/doc/story/multimedia-container/gallery-container/related-links/related-link//a">	
			<x:forEach varStatus="status" var="link" select="$c/doc/story/multimedia-container/gallery-container/related-links/related-link">
				<x:if select="$link//a">
					<p:out var="linkText" xvalue="$link//a" />
					<p:out var="linkURL" xvalue="$link//a/@href" />
					<p:out var="leadIn" xvalue="$link/span[@class='lead-in']" />
					<p:out var="reviewRating" xvalue="$link/span[@class='review-rating']" />
					<x:choose>
						<x:when select="$link/span[@class='new']">
							<p:out var="new" value="True" />
						</x:when>
						<x:otherwise>
							<p:out var="new" value="False" />
						</x:otherwise>
					</x:choose>
					<p:out var="type" value=""/>
					<c:choose>
						<c:when test="${fn:startsWith(linkURL,'relative:')}">
							<p:out var="linkURL" value="${fn:substringAfter(linkURL,'relative:')}" />
							<p:out var="type" value="external"/>
						</c:when>
						<c:when test="${fn:startsWith(linkURL,'http://')}">
							<p:out var="linkURL" value="${linkURL}" />
							<p:out var="type" value="external"/>
						</c:when>
						<c:otherwise>
							<p:out var="type" value="internal"/>
						</c:otherwise>
					</c:choose>
					<x:choose>
						<x:when select="$link/b">
							<p:out var="itemTemplate" value="regular_bold"/>
						</x:when>
						<x:otherwise>
							<p:out var="itemTemplate" value="regular_simple"/>
						</x:otherwise>
					</x:choose>
					<%
						String[] hyperLink = new String[8];
						hyperLink[0] = (String)jspContext.getAttribute("type");
						hyperLink[1] = (String)jspContext.getAttribute("linkURL");
						hyperLink[2] = (String)jspContext.getAttribute("linkText");
						hyperLink[3] = (String)jspContext.getAttribute("leadIn");
						hyperLink[4] = (String)jspContext.getAttribute("reviewRating");
						hyperLink[5] = (String)jspContext.getAttribute("new");
						hyperLink[6] = (String)jspContext.getAttribute("itemTemplate");
						hyperLink[7] = "False";
						relatedLinksArray.add(hyperLink);
					%>
				</x:if>
				<x:if select="$link/br">					
					<%
						relatedLinksArray.get(relatedLinksArray.size()-1)[7] = "True";
					%>
				</x:if>
			</x:forEach>
		</x:if>
		<%-- /.related links data --%>

		<c:set target="${contentData}" property="relatedLinksArray" value="${relatedLinksArray}"/>
	
	
		<c:set var="currentValue" value="${contentData}"/>
	
	</c:when>
	<c:when test="${objType eq 'VideoStory'}">	
		
		<%-- related links data --%>
		<x:if select="$c/doc/story/related-links/related-link//a">			
			<x:forEach varStatus="status" var="link" select="$c//related-links/related-link">
				<x:if select="$link//a">
					<p:out var="linkText" xvalue="$link//a" />
					<p:out var="linkURL" xvalue="$link//a/@href" />
					<p:out var="leadIn" xvalue="$link/span[@class='lead-in']" />
					<p:out var="reviewRating" xvalue="$link/span[@class='review-rating']" />
					<x:choose>
						<x:when select="$link/span[@class='new']">
							<p:out var="new" value="True" />
						</x:when>
						<x:otherwise>
							<p:out var="new" value="False" />
						</x:otherwise>
					</x:choose>
					<p:out var="type" value=""/>
					<c:choose>
						<c:when test="${fn:startsWith(linkURL,'relative:')}">
							<p:out var="linkURL" value="${fn:substringAfter(linkURL,'relative:')}" />
							<p:out var="type" value="external"/>
						</c:when>
						<c:when test="${fn:startsWith(linkURL,'http://')}">
							<p:out var="linkURL" value="${linkURL}" />
							<p:out var="type" value="external"/>
						</c:when>
						<c:otherwise>
							<p:out var="type" value="internal"/>
						</c:otherwise>
					</c:choose>
					<x:choose>
						<x:when select="$link/b">
							<p:out var="itemTemplate" value="regular_bold"/>
						</x:when>
						<x:otherwise>
							<p:out var="itemTemplate" value="regular_simple"/>
						</x:otherwise>
					</x:choose>
					<%
						String[] hyperLink = new String[8];
						hyperLink[0] = (String)jspContext.getAttribute("type");
						hyperLink[1] = (String)jspContext.getAttribute("linkURL");
						hyperLink[2] = (String)jspContext.getAttribute("linkText");
						hyperLink[3] = (String)jspContext.getAttribute("leadIn");
						hyperLink[4] = (String)jspContext.getAttribute("reviewRating");
						hyperLink[5] = (String)jspContext.getAttribute("new");
						hyperLink[6] = (String)jspContext.getAttribute("itemTemplate");
						hyperLink[7] = "False";
						relatedLinksArray.add(hyperLink);
					%>
				</x:if>
				<x:if select="$link/br">					
					<%
						relatedLinksArray.get(relatedLinksArray.size()-1)[7] = "True";
					%>
				</x:if>
			</x:forEach>
			<%
				jspContext.setAttribute("relatedLinksArray",relatedLinksArray);
			%>	
		</x:if>
		<%-- /.related links data --%>

		<c:set target="${contentData}" property="relatedLinksArray" value="${relatedLinksArray}"/>
		
		<c:set var="currentValue" value="${contentData}"/>
	</c:when>
	<c:when test="${objType eq 'EOM::Story' or objType eq 'EOM::CompoundStory' or objType eq 'TextAsset' or objType eq 'WireStory' or objType eq 'StreamTease'}">
	
		<%-- related links data --%>
		<x:if select="$c//related-links/related-link//a">
			<x:forEach varStatus="status" var="link" select="$c/doc/story/related-links/related-link">
				<x:if select="$link//a">
					<p:out var="linkText" xvalue="$link//a" />
					<p:out var="linkURL" xvalue="$link//a/@href" />
					<p:out var="leadIn" xvalue="$link/span[@class='lead-in']" />
					<p:out var="reviewRating" xvalue="$link/span[@class='review-rating']" />
					<x:choose>
						<x:when select="$link/span[@class='new']">
							<p:out var="new" value="True" />
						</x:when>
						<x:otherwise>
							<p:out var="new" value="False" />
						</x:otherwise>
					</x:choose>
					<p:out var="type" value=""/>
					<c:choose>
						<c:when test="${fn:startsWith(linkURL,'relative:')}">
							<p:out var="linkURL" value="${fn:substringAfter(linkURL,'relative:')}" />
							<p:out var="type" value="external"/>
						</c:when>
						<c:when test="${fn:startsWith(linkURL,'http://')}">
							<p:out var="linkURL" value="${linkURL}" />
							<p:out var="type" value="external"/>
						</c:when>
						<c:otherwise>
							<p:out var="type" value="internal"/>
						</c:otherwise>
					</c:choose>
					<x:choose>
						<x:when select="$link/b">
							<p:out var="itemTemplate" value="regular_bold"/>
						</x:when>
						<x:otherwise>
							<p:out var="itemTemplate" value="regular_simple"/>
						</x:otherwise>
					</x:choose>
					<%
						String[] hyperLink = new String[8];
						hyperLink[0] = (String)jspContext.getAttribute("type");
						hyperLink[1] = (String)jspContext.getAttribute("linkURL");
						hyperLink[2] = (String)jspContext.getAttribute("linkText");
						hyperLink[3] = (String)jspContext.getAttribute("leadIn");
						hyperLink[4] = (String)jspContext.getAttribute("reviewRating");
						hyperLink[5] = (String)jspContext.getAttribute("new");
						hyperLink[6] = (String)jspContext.getAttribute("itemTemplate");
						hyperLink[7] = "False";
						relatedLinksArray.add(hyperLink);
					%>
				</x:if>
				<x:if select="$link/br">					
					<%
						relatedLinksArray.get(relatedLinksArray.size()-1)[7] = "True";
					%>
				</x:if>
			</x:forEach>
		</x:if>
		<%-- /.related links data --%>

	</c:when>	
	<c:otherwise>
		<c:set var="currentValue" value="System Type Not Accounted for"/>
	</c:otherwise>
</c:choose>

<% jspContext.setAttribute("relatedLinksArray",relatedLinksArray); %>	
<c:set target="${contentData}" property="relatedLinksArray" value="${relatedLinksArray}"/>
<c:set var="currentValue" value="${contentData}"/>

<c:if test="${echo == 'true'}">
	${currentValue}
</c:if>