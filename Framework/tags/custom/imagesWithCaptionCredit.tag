<%@ include file="includes/init.inc" %>

<%@ attribute name="format" required="false"%>
<%@ attribute name="inputImageUrl" required="false"%>
<%@ attribute name="uuid" required="false"%>
<%@ attribute name="baseDomain" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>
<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ attribute name="type" required="false"%>
<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"%>
<%@ tag body-content="scriptless" import="java.util.regex.Pattern, java.util.regex.Matcher"%>

<jsp:useBean id="contentData" class="java.util.HashMap" />

<%-- Handle new "virtual" image sizes --%>
<%
	Map<String, String> aspect = new HashMap<String, String>();
	aspect.put("image_650x365", "aspect_16:9");
	aspect.put("image_540x304", "aspect_16:9");
	aspect.put("image_430x241", "aspect_16:9");
	aspect.put("image_320x242", "aspect_16:9");
	aspect.put("image_210x118", "aspect_16:9");
	aspect.put("image_650x488", "aspect_4:3");
	aspect.put("image_540x405", "aspect_4:3");
	aspect.put("image_430x322", "aspect_4:3");
	aspect.put("image_320x240", "aspect_4:3");
	aspect.put("image_210x157", "aspect_4:3");

	String origFormat = (String) jspContext.getAttribute("format");
	
	if (aspect.containsKey(origFormat)) {
		String aspectFormat = aspect.get(origFormat);
		jspContext.setAttribute("outputFormat", origFormat);
		jspContext.setAttribute("format", aspectFormat);		
	} else {
		jspContext.setAttribute("outputFormat", origFormat);
	} 
%>

<%

	String var = (String) jspContext.getAttribute("var");
	String uuid = (String) jspContext.getAttribute("uuid");
	String inputImageUrl = (String) jspContext.getAttribute("inputImageUrl");
	String imageUuid = ""; // uuid from image query string
	
	if (inputImageUrl != null && inputImageUrl != "") {
		
		//append '&' to end of string to flag end of uuuid
		inputImageUrl = new String(inputImageUrl + "&");
		
		//find the last index count for the '?' character
		//this locates the end of the image path in the query string
		int indexLastQuestionMark = inputImageUrl.lastIndexOf('?');
	
		//find the first index count for the '=' character
		//this locates the start of the uuid string, since uuid is always the first query string parameter
		int indexFirstEqualSign = inputImageUrl.indexOf('=');
		
		//find the first index of the '&' character'
		//this locates the end of the uuid string
		//since the only '&' occurrences will be in the query string.
		int indexFirstAnd = inputImageUrl.indexOf('&');
		
		
		if (indexLastQuestionMark > 0) {
			//note that we must extract the imageUuid first 
			//before inputImageUrl is truncated to remove the query string
			
			//extract the image uuid from query string using the range set from q and c
			imageUuid = inputImageUrl.substring(indexFirstEqualSign+1, indexFirstAnd);
			//extract the image path from index 0 (the beginning of the query string) and x
			inputImageUrl = inputImageUrl.substring(0,indexLastQuestionMark);
			//set the two variables to the page
			//we now have the path of the image when it was slotted into the story and the image uuid
			jspContext.setAttribute("inputImageUrl",inputImageUrl);
			jspContext.setAttribute("imageUuid", imageUuid);
		}

	}
	String format = (String) jspContext.getAttribute("format");
	
	if (var != null && var.isEmpty())
		throw new Exception("Invalid var name");

	if (var != null)
		jspContext.setAttribute("src", null);
	if (inputImageUrl == null && uuid == null && webObject == null) {
		throw new Exception("Either the inputImageUrl, uuid, or webObject attribute must be set.  Both cannot be null.");
	}
%>

<c:set var="urlSrc" value="" />
<c:set var="img" value="" />

<c:choose>
	<c:when test="${not empty webObject}">
		<p:object webObject="${webObject}" content="content" metadata="meta" />
		<p:out var="StoryID" xvalue="$meta//uuid" />
		<p:out var="objPath" value="${webObject.path}" />
		<p:out var="objType" xvalue="$meta//sys/type" />
	</c:when>
	<c:when test="${uuid != null}">
		<p:getObject uuid="${uuid}" var="webObject" />
		<p:object webObject="${webObject}" content="content" metadata="meta" webType="WT" channel="Boston.com" />
		<p:out var="StoryID" value="${uuid}" />
		<p:out var="objPath" value="${webObject.path}" />
		<p:out var="objType" xvalue="$meta//sys/type" />
	</c:when>
</c:choose>


<c:choose>
	<c:when test="${not empty webObject and webObject != null and webObject != ''}">
		<c:choose>
			<c:when	test="${objType eq 'EOM::Story' or objType eq 'EOM::CompoundStory' or objType eq 'TextAsset' or objType eq 'WireStory' or objType eq 'StreamTease'}">
				<x:choose>
					<x:when select="$content//photogrp[@class='alt-web-images']/photo[@name=$format and @fileref!='']">
						<p:out var="img" xvalue="$content//photogrp[@class='alt-web-images']/photo[@name=$format]/@fileref" />
						<p:url value="${img}" var="urlSrc" format="${outputFormat}" type="resource" baseDomain="${baseDomain}" />
						<p:out var="imageCaption" xvalue="$content//photogrp[@class='alt-web-images']/captiongrp[../photo[@name=$format]]/caption/p" />
						<p:out var="imageCredit" xvalue="$content//photogrp[@class='alt-web-images']/captiongrp[../photo[@name=$format]]/credit/p" />
						<c:if test="${empty imageCaption or imageCaption == ''}">
							<p:out var="imageCaption" xvalue="$content//photogrp[@class='main-web-images']/captiongrp/caption/p" />
						</c:if>
						<c:set target="${contentData}" property="imageCaption" value="${imageCaption}" />
						<c:set target="${contentData}" property="imageCredit" value="${imageCredit}" />
					</x:when>
					<x:when select="$content//photogrp[@class='main-web-images']/photo[@fileref!='']">
						<p:out var="img" xvalue="$content//photogrp[@class='main-web-images' and photo/@fileref!='']/photo/@fileref" />
						<p:url value="${img}" var="urlSrc" format="${outputFormat}" type="resource" baseDomain="${baseDomain}"/>
						<p:out var="imageCaption" xvalue="$content//photogrp[@class='main-web-images' and photo/@fileref!='']/captiongrp/caption/p" />
						<p:out var="imageCredit" xvalue="$content//photogrp[@class='main-web-images' and photo/@fileref!='']/captiongrp/credit/p" />
						<c:set target="${contentData}" property="imageCaption" value="${imageCaption}" />
						<c:set target="${contentData}" property="imageCredit" value="${imageCredit}" />
					</x:when>
					<x:when select="$content//photogrp[@class='alt-web-images']/photo[@fileref!='']">
						<p:out var="img" xvalue="$content//photogrp[@class='alt-web-images']/photo[@fileref!='']/@fileref" />
						<p:url value="${img}" var="urlSrc" format="${outputFormat}" type="resource" baseDomain="${baseDomain}" />
						<p:out var="imageCaption" xvalue="$content//photogrp[@class='alt-web-images']/captiongrp[../photo[@fileref!='']]/caption/p" />
						<p:out var="imageCredit" xvalue="$content//photogrp[@class='alt-web-images']/captiongrp[../photo[@fileref!='']]/credit/p" />
						<c:if test="${empty imageCaption or imageCaption == ''}">
							<p:out var="imageCaption" xvalue="$content//photogrp[@class='main-web-images']/captiongrp/caption/p" />
						</c:if>
						<c:set target="${contentData}" property="imageCaption" value="${imageCaption}" />
						<c:set target="${contentData}" property="imageCredit" value="${imageCredit}" />
					</x:when>
				</x:choose>
			</c:when>
			<c:when test="${objType eq 'EOM::MediaGallery'}">
				<x:choose>
					<x:when select="$content//multimedia-container/gallery-container/headlines/photogrp[@class='alt-web-images']/photo[@name=$format and @fileref!='']">
						<p:out var="img" xvalue="$content//multimedia-container/gallery-container/headlines/photogrp[@class='alt-web-images']/photo[@name=$format]/@fileref" />
						<p:url value="${img}" var="urlSrc" format="${outputFormat}" type="resource" baseDomain="${baseDomain}"/>
						<p:out var="imageCaption" xvalue="$content//multimedia-container/gallery-container/headlines/photogrp[@class='alt-web-images']/captiongrp[../photo[@name=$format]]/caption/p" />
						<p:out var="imageCredit" xvalue="$content//multimedia-container/gallery-container/headlines/photogrp[@class='alt-web-images']/captiongrp[../photo[@name=$format]]/credit/p" />
						<c:set target="${contentData}" property="imageCaption" value="${imageCaption}" />
						<c:set target="${contentData}" property="imageCredit" value="${imageCredit}" />
					</x:when>
					<x:when select="$content//multimedia-container/gallery-container/headlines/photogrp[@class='photo-gallery-tease']/photo[@name='image_371w' and @fileref!='']">
						<p:out var="img" xvalue="$content//multimedia-container/gallery-container/headlines/photogrp[@class='photo-gallery-tease']/photo[@name='image_371w']/@fileref" />
						<p:url value="${img}" var="urlSrc" format="${outputFormat}" type="resource" baseDomain="${baseDomain}"/>
						<p:out var="imageCaption" xvalue="$content//multimedia-container/gallery-container/headlines/photogrp[@class='photo-gallery-tease']/captiongrp[../photo[@name='image_371w']]/caption/p" />
						<p:out var="imageCredit" xvalue="$content//multimedia-container/gallery-container/headlines/photogrp[@class='photo-gallery-tease']/captiongrp[../photo[@name='image_371w']]/credit/p" />
						<c:set target="${contentData}" property="imageCaption" value="${imageCaption}" />
						<c:set target="${contentData}" property="imageCredit" value="${imageCredit}" />
					</x:when>
					<x:when select="$content//multimedia-container/gallery-container/photogrp[1]/photo[@fileref!='']">
						<p:out var="img" xvalue="$content//multimedia-container/gallery-container/photogrp[1]/photo/@fileref" />
						<p:url value="${img}" var="urlSrc" format="${outputFormat}" type="resource" baseDomain="${baseDomain}"/>
						<p:out var="imageCaption" xvalue="$content//multimedia-container/gallery-container/photogrp[1]/captiongrp/caption/p" />
						<p:out var="imageCredit" xvalue="$content//multimedia-container/gallery-container/photogrp[1]/captiongrp/credit/p" />
						<c:set target="${contentData}" property="imageCaption" value="${imageCaption}" />
						<c:set target="${contentData}" property="imageCredit" value="${imageCredit}" />
					</x:when>
				</x:choose>
			</c:when>
			<c:when test="${objType eq 'VideoStory'}">
				<x:choose>
					<x:when select="$content//photogrp[@class='alt-web-images']/photo[@name=$format and @channel='Boston.com' and @fileref!='']">
						<p:out var="img" xvalue="$content//photogrp[@class='alt-web-images']/photo[@name=$format]/@fileref" />
						<p:url value="${img}" var="urlSrc" format="${outputFormat}" type="resource" baseDomain="${baseDomain}"/>
						<p:out var="imageCaption" xvalue="$content//photogrp[@class='alt-web-images']/captiongrp[../photo[@name=$format and @channel='Boston.com']]/caption/p" />
						<p:out var="imageCredit" xvalue="$content//photogrp[@class='alt-web-images']/captiongrp[../photo[@name=$format and @channel='Boston.com']]/credit/p" />
						<c:if test="${empty imageCaption or imageCaption == ''}">
							<p:out var="imageCaption" xvalue="$content//photogrp[@class='main-web-images']/captiongrp/caption/p" />
						</c:if>
						<c:set target="${contentData}" property="imageCaption" value="${imageCaption}" />
						<c:set target="${contentData}" property="imageCredit" value="${imageCredit}" />
					</x:when>
					<x:when select="$content//photogrp[@class='main-web-images']/photo[@fileref!='']">
						<p:out var="img" xvalue="$content//photogrp[@class='main-web-images' and photo/@fileref!='']/photo/@fileref" />
						<p:url value="${img}" var="urlSrc" format="${outputFormat}" type="resource" baseDomain="${baseDomain}"/>
						<p:out var="imageCaption" xvalue="$content//photogrp[@class='main-web-images' and photo/@fileref!='']/captiongrp/caption/p" />
						<p:out var="imageCredit" xvalue="$content//photogrp[@class='main-web-images' and photo/@fileref!='']/captiongrp/credit/p" />
						<c:set target="${contentData}" property="imageCaption" value="${imageCaption}" />
						<c:set target="${contentData}" property="imageCredit" value="${imageCredit}" />
					</x:when>
				</x:choose>
			</c:when>
		</c:choose>
		<%-- The following is added to extract the correct URL, if an image uuid is given --%>
		<c:if test="${img != null and img != ''}">
			<%
				inputImageUrl = (String) jspContext.getAttribute("img"); // path to image
				
				if (inputImageUrl != "") {

					//append '&' to end of string to flag end of uuid
					inputImageUrl = new String(inputImageUrl + "&");
				
					//Example query string : Boston/Content/Business/Images/00b303b271184f43a880b60a805251cf-b4fc5a5dc6d1da1b1c0f6a706700d571.jpg?uuid=c08f4e94-0cc3-11e2-95c2-a3d2263025dd
					
					//find the last index count for the '?' character
					//this locates the end of the image path in the query strling
					int indexLastQuestionMark = inputImageUrl.lastIndexOf('?');
					//find the first index count for the '=' character
					//this locates the start of the uuid string, since uuid is always the first query string parameter
					int indexFirstEqualSign = inputImageUrl.indexOf('=');
					//find the first index of the '&' character'
					//this locates the end of the uuid string
					//since the only '&' occurrences will be in the query string.
					int indexFirstAnd = inputImageUrl.indexOf('&');
					
					if (indexLastQuestionMark > 0) {
						//note that we must extract the imageUuid first 
						//before inputImageUrl is truncated to remove the query string
						
						//extract the image uuid from query string using the range set from q and c
						imageUuid = inputImageUrl.substring(indexFirstEqualSign+1, indexFirstAnd);
						//extract the image path from index 0 (the beginning of the query string) and x
						inputImageUrl = inputImageUrl.substring(0,indexLastQuestionMark);
						//set the two variables to the page
						//we now have the path of the image when it was slotted into the story and the image uuid
						jspContext.setAttribute("imageUuid", imageUuid);
					}
				}
			%>
		</c:if>
		<%-- used to have the stuff at the very end here --%>
	</c:when>
	<c:when test="${inputImageUrl != ''}">
		<c:choose>
			<c:when test="${format == null or format == ''}">
				<p:url value="${inputImageUrl}" var="urlSrc" type="resource" />
			</c:when>
			<c:otherwise>
				<p:url value="${inputImageUrl}" var="urlSrc" format="${outputFormat}" type="resource" />
			</c:otherwise> 
		</c:choose>			
	</c:when> 
</c:choose>

<c:if test="${not empty imageUuid}">
	<p:getObject uuid="${imageUuid}" var="imgFromStoryObj" />
	<c:if test="${not empty imgFromStoryObj}">
		<p:out var="img" value="${imgFromStoryObj.path}" />
		<c:choose>
			<c:when test="${format == null or format == ''}">
				<p:url value="${img}" var="urlSrc" type="resource" baseDomain="${baseDomain}"/>
			</c:when>
			<c:otherwise>
				<p:url value="${img}" var="urlSrc" format="${outputFormat}" type="resource" baseDomain="${baseDomain}"/>
			</c:otherwise>
		</c:choose>
	</c:if>
</c:if>

<c:if test="${urlSrc != ''}">
	<%
	    String path = (String) jspContext.getAttribute("urlSrc");
		String basepath="";
		String ext="";
		int k = path.lastIndexOf('.');
		if (k != -1) {
			basepath = path.substring(0, k);
			ext = path.substring(k+1);
			if (ext.equalsIgnoreCase("pdf") || ext.equalsIgnoreCase("ai")) {
				ext = "jpg";
			}
		    basepath = basepath + "." + ext;    	    
		}
		
		Pattern pattern = Pattern.compile("\\s");
		Matcher matcher = pattern.matcher(basepath);
		boolean found = matcher.find();
		
		if (var != null){
			if (found == true){
				basepath = basepath.replaceAll("\\s", "%20");
				jspContext.setAttribute("src",basepath);
		} else {
				jspContext.setAttribute("src",basepath);
			}
				
		}
	%>
</c:if>

<c:set target="${contentData}" property="src" value="${src}"/>
<c:set var="currentValue" value="${contentData}"/>