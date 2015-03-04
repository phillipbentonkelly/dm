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


<% ArrayList<Map> imagesArray = new ArrayList<Map>(); %>


<c:choose>
	<c:when test="${objType eq 'EOM::MediaGallery'}">
		<x:forEach varStatus="status" var="photo" select="$c//photogrp/headlines[@class='gallery-image']/..">
			<x:if select="$photo/photo[@fileref!='']">




					<p:out var="img" xvalue="$photo/photo/@fileref" />
					<p:out var="format" xvalue="$photo/photo/@name" />
					<p:out var="order" value="${status.count}" />
					
					<p:out var="class" xvalue="$photo/@class" />
					<p:url value="${img}" var="urlSrc" format="${format}" type="resource" baseDomain="http://devedit.boston.com" />
					<p:out var="imageCaption" xvalue="$photo//captiongrp[../photo[@name=$format]]/caption/p" />
					<p:out var="imageCredit" xvalue="$photo//captiongrp[../photo[@name=$format]]/credit/p" />
					<c:if test="${empty imageCaption or imageCaption == ''}">
						<p:out var="imageCaption" xvalue="$photo//captiongrp/caption/p" />
					</c:if>
					
<%
						Map imageInfo = new HashMap();
						
						String caption = (String)jspContext.getAttribute("imageCaption");
						caption = caption.replaceAll("\\n|\\r","")
						.replaceAll("\\\"","\\\\\"")
						.replaceAll("\\\t","    ")
						.trim();

						String credit = (String)jspContext.getAttribute("imageCredit");
						credit = credit.replaceAll("\\n|\\r","")
						.replaceAll("\\\"","\\\\\"")
						.replaceAll("\\\t","    ")
						.trim();

						//imagesArray.add(imageInfo);
					%>


					<p:out var="img" xvalue="$photo/photo/@fileref" />
					<p:out var="format" xvalue="$photo/photo/@name" />
					<p:out var="order" value="${status.count}" />
					
					<p:out var="class" xvalue="$photo/@class" />
					<p:url value="${img}" var="urlSrc" type="resource"/>
					<p:out var="imageCaption" xvalue="$photo//captiongrp[../photo[@name=$format]]/caption/p" />
					<p:out var="imageCredit" xvalue="$photo//captiongrp[../photo[@name=$format]]/credit/p" />
					<c:if test="${empty imageCaption or imageCaption == ''}">
						<p:out var="imageCaption" xvalue="$photo//captiongrp/caption/p" />
					</c:if>
					<%
						imageInfo = new HashMap();

					
						caption = (String)jspContext.getAttribute("imageCaption");
						caption = caption.replaceAll("\\n|\\r","")
						.replaceAll("\\\"","\\\\\"")
						.replaceAll("\\\t","    ")
						.trim();
	
						credit = (String)jspContext.getAttribute("imageCredit");
						credit = credit.replaceAll("\\n|\\r","")
						.replaceAll("\\\"","\\\\\"")
						.replaceAll("\\\t","    ")
						.trim();
						
						imageInfo.put("img", (String)jspContext.getAttribute("img"));
						imageInfo.put("url", (String)jspContext.getAttribute("urlSrc"));
						imageInfo.put("format", "original");
						imageInfo.put("type", (String)"container");
						imageInfo.put("class", (String)jspContext.getAttribute("class"));
						imageInfo.put("caption", caption);
						imageInfo.put("credit", credit);
						imageInfo.put("order", (String)jspContext.getAttribute("order"));
						imagesArray.add(imageInfo);
					%>					




			</x:if>
		</x:forEach>
	</c:when>
	<c:when test="${objType eq 'VideoStory'}">	
		<%--Need implementation for VideoStory --%>
	</c:when>
	<c:when test="${objType eq 'EOM::Story' or objType eq 'EOM::CompoundStory' or objType eq 'TextAsset' or objType eq 'WireStory' or objType eq 'StreamTease'}">
			<x:forEach varStatus="status" var="photo" select="$c//photogrp">
				<x:if select="$photo/photo[@fileref!='']">

					<p:out var="img" xvalue="$photo/photo/@fileref" />
					<p:out var="format" xvalue="$photo/photo/@name" />
					<p:out var="order" value="${status.count}" />
					
					<p:out var="class" xvalue="$photo/@class" />
					<p:url value="${img}" var="urlSrc" format="${format}" type="resource" baseDomain="http://devedit.boston.com" />
					<p:out var="imageCaption" xvalue="$photo//captiongrp[../photo[@name=$format]]/caption/p" />
					<p:out var="imageCredit" xvalue="$photo//captiongrp[../photo[@name=$format]]/credit/p" />
					<c:if test="${empty imageCaption or imageCaption == ''}">
						<p:out var="imageCaption" xvalue="$photo//captiongrp/caption/p" />
					</c:if>
					<%
						Map imageInfo = new HashMap();

						String caption = (String)jspContext.getAttribute("imageCaption");
						caption = caption.replaceAll("\\n|\\r","")
						.replaceAll("\\\"","\\\\\"")
						.replaceAll("\\\t","    ")
						.trim();
	
						String credit = (String)jspContext.getAttribute("imageCredit");
						credit = credit.replaceAll("\\n|\\r","")
						.replaceAll("\\\"","\\\\\"")
						.replaceAll("\\\t","    ")
						.trim();
						
						imageInfo.put("img", (String)jspContext.getAttribute("img"));
						imageInfo.put("url", (String)jspContext.getAttribute("urlSrc"));
						imageInfo.put("format", (String)jspContext.getAttribute("format"));
						imageInfo.put("type", (String)"container");
						imageInfo.put("class", (String)jspContext.getAttribute("class"));
						imageInfo.put("caption", (String)caption);
						imageInfo.put("credit", (String)credit);
						imageInfo.put("order", (String)jspContext.getAttribute("order"));
						imagesArray.add(imageInfo);
					%>


					<p:out var="img" xvalue="$photo/photo/@fileref" />
					<p:out var="format" xvalue="$photo/photo/@name" />
					<p:out var="order" value="${status.count}" />
					
					<p:out var="class" xvalue="$photo/@class" />
					<p:url value="${img}" var="urlSrc" type="resource" baseDomain="http://devedit.boston.com" />
					<p:out var="imageCaption" xvalue="$photo//captiongrp[../photo[@name=$format]]/caption/p" />
					<p:out var="imageCredit" xvalue="$photo//captiongrp[../photo[@name=$format]]/credit/p" />
					<c:if test="${empty imageCaption or imageCaption == ''}">
						<p:out var="imageCaption" xvalue="$photo//captiongrp/caption/p" />
					</c:if>
					<%
						imageInfo = new HashMap();

						caption = (String)jspContext.getAttribute("imageCaption");
						caption = caption.replaceAll("\\n|\\r","")
						.replaceAll("\\\"","\\\\\"")
						.replaceAll("\\\t","    ")
						.trim();
	
						credit = (String)jspContext.getAttribute("imageCredit");
						credit = credit.replaceAll("\\n|\\r","")
						.replaceAll("\\\"","\\\\\"")
						.replaceAll("\\\t","    ")
						.trim();					
					
						imageInfo.put("img", (String)jspContext.getAttribute("img"));
						imageInfo.put("url", (String)jspContext.getAttribute("urlSrc"));
						imageInfo.put("format", "original");
						imageInfo.put("type", (String)"container");
						imageInfo.put("class", (String)jspContext.getAttribute("class"));
						imageInfo.put("caption", (String)caption);
						imageInfo.put("credit", (String)credit);
						imageInfo.put("order", (String)jspContext.getAttribute("order"));
						imagesArray.add(imageInfo);
					%>

				</x:if>
			</x:forEach>


			<%-- Inline images--%>
			<x:forEach varStatus="status" var="photo" select="$c//photogrp-inline">
				<x:if select="$photo/photo-inline[@fileref!='']">

					<p:out var="img" xvalue="$photo/photo-inline/@fileref" />
					
					<p:out var="order" value="${status.count}" />
					<p:out var="class" xvalue="$photo/@class" />
					<p:url value="${img}" var="urlSrc" type="resource" baseDomain="http://devedit.boston.com" />
					<p:out var="imageCaption" xvalue="$photo//captiongrp[../photo-inline]/caption/p" />
					<p:out var="imageCredit"  xvalue="$photo//captiongrp[../photo-inline]/credit/p" />
					<c:if test="${empty imageCaption or imageCaption == ''}">
						<p:out var="imageCaption" xvalue="$photo//captiongrp/caption/p" />
					</c:if>
					<%
						Map imageInfo = new HashMap();

						imageInfo.put("img", (String)jspContext.getAttribute("img"));
						imageInfo.put("url", (String)jspContext.getAttribute("urlSrc"));
						imageInfo.put("format", "");
						imageInfo.put("type", (String)"inline");
						imageInfo.put("class", (String)jspContext.getAttribute("class"));
						imageInfo.put("caption", (String)jspContext.getAttribute("imageCaption"));
						imageInfo.put("credit", (String)jspContext.getAttribute("imageCredit"));
						imageInfo.put("order", (String)jspContext.getAttribute("order"));
						imagesArray.add(imageInfo);
					%>

				</x:if>
			</x:forEach>
	</c:when>	
	<c:otherwise>
		<c:set var="currentValue" value="System Type Not Accounted for"/>
	</c:otherwise>
</c:choose>

<% jspContext.setAttribute("imagesArray",imagesArray); %>	
<c:set target="${contentData}" property="imagesArray" value="${imagesArray}"/>
<c:set var="currentValue" value="${contentData}"/>

<c:if test="${echo == 'true'}">
	${currentValue}
</c:if>