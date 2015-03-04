<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="jp" uri="jptag"%> 
<%@ taglib prefix="p" uri="ptag" %>
<%@ taglib prefix="bdc" tagdir="/WEB-INF/tags/eom$configurationURI/Framework/tags/custom/" %>
<%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml" %>
<%@ page language="java" contentType="application/json" pageEncoding="UTF-8"
    import="
	net.sf.json.*,
	net.sf.json.xml.*,
	java.util.*,
	org.w3c.dom.*,
	javax.xml.xpath.XPath,
	javax.xml.xpath.XPathConstants,
	javax.xml.xpath.XPathExpression,
	javax.xml.xpath.XPathExpressionException,
	javax.xml.xpath.XPathFactory,
	
	java.io.StringWriter,
	javax.xml.transform.OutputKeys,
	 javax.xml.transform.Transformer,
 javax.xml.transform.TransformerException,
 javax.xml.transform.TransformerFactory,
 javax.xml.transform.dom.DOMSource,
 javax.xml.transform.stream.StreamResult

" %>
 
<%--
	Give me a loid or uuid  Methode object and I will give you a json bundle of stream data
	
	The json is focused on updating the stream service database
--%>

<c:set var="channel" value="${cacheScope.product}" />
<c:if test="${empty channel}">
	<c:set var="channel" value="Boston.com" />
</c:if>
<c:set var="modelOnly" value="${cacheScope.modelOnly}" />
<c:if test="${empty modelOnly}">
	<c:set var="modelOnly" value="0" />
</c:if>	

<c:catch var="err">
			 
	<c:choose>
		<c:when test="${not empty param.loid}">
			<jp:getObject loid="${param.loid}" var="obj" onError="ignore" />
		</c:when>
		<c:when test="${not empty param.uuid}">
			<jp:getObject uuid="${param.uuid}" var="obj" onError="ignore" />
		</c:when>
		
		<c:otherwise><c:set var="err">No object identifier specified</c:set></c:otherwise>
	</c:choose>
	
	<c:if test="${not empty obj}">
		<c:choose>
			<c:when test="${not empty channel}">
				<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="${channel}"/>
			</c:when>
			<c:otherwise>
				<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID"/>
			</c:otherwise>
		</c:choose>
	</c:if>
	
	<c:if test="${empty uuid}">
		<jp:out var="uuid" xvalue="$meta//uuid" />
	</c:if>
	<c:if test="${empty loid}">
		<jp:out var="loid" xvalue="$meta//loid" />
	</c:if>
</c:catch>	

<c:choose>
	<c:when test="${empty obj}">
		{"error":"object not found"}
	</c:when>
	<c:when test="${not empty err}" >
		{"error":"need an error message "}
	</c:when>
	<c:otherwise> 
	
		<%-- build a result object from our data --%>
		
		<%-- first use our tags to gather data from the object --%>
		
		<jp:out var="env" value="${portalContext.env.ENV_ID}"/>
		
		<%-- pick up metadata --%>
		<jp:url var="cUrl" webObject="${obj}" public="true" /> 
		<jp:out var="shortUrl" xvalue="$meta//OnlineProduct[ProductName=$channel]/ShortUrl" escape="JavaScript"/>
		
		<%-- tweak url metadata based on webtype --%>
		<c:if test="${WT == 'summarystory'}">
			<%-- BostonGlobe.com stub if present --%>
			<jp:out var="bgUrl" xvalue="$meta//OnlineProducts/BostonGlobeUrls/CanonicalUrl" /> 
			<c:if test="${not empty bgUrl}"><c:set var="cUrl" value="${bgUrl}"/></c:if>
			<jp:out var="bgsUrl" xvalue="$meta//OnlineProducts/BostonGlobeUrls/ShortUrl" /> 
			<c:if test="${not empty bgsUrl}"><c:set var="shortUrl" value="${bgsUrl}"/></c:if>
		</c:if>
	
		<%-- tweak url based on objectType --%>
		<c:if test="${objectType == 'StreamTease'}">
			<%-- xref if present --%>
			<jp:out var="st_url" xvalue="$c//doc/story/xref" />
			<jp:out var="st_url" value="${fn:trim(st_url)}" />		
			<c:if test="${not empty st_url}"><c:set var="cUrl" value="${st_url}"/></c:if>	
		</c:if>	
	
		<%-- pick up content --%>
		<c:choose>
			<c:when test="${objectType == 'VideoStory'}">
				<bdc:videoObjectMap webObject="${obj}" var="vid"/>
				<jp:out var="headline"  value="${vid.videoHeadline}" />
				<jp:out var="teaseTextjs"  value="${vid.videoCaption}" />
				
			</c:when>	
			<c:otherwise>
				<bdc:getSummaryForSectionFront webObject="${obj}" var="teaseText" priority="stream"/>
				<bdc:getHeadlines webObject="${obj}" var="heds"/>
				
				<jp:out var="headline"  value="${heds.streamHeadline}" />
				<jp:out var="teaseTextjs"  value="${teaseText}" />
				
			</c:otherwise>
		</c:choose>	
		
		
	<%

	
	/* drop into java to grab the Streams metadata and to build the json result
	   
	*/
	  	JSONObject model_jsobj = new JSONObject();
	    model_jsobj.put("head",pageContext.getAttribute("headline"));
	    model_jsobj.put("url",pageContext.getAttribute("cUrl"));
	    model_jsobj.put("shortUrl",pageContext.getAttribute("shortUrl"));
	    model_jsobj.put("subhead",pageContext.getAttribute("teaseTextjs"));
	    model_jsobj.put("loid",pageContext.getAttribute("loid")); 		
		
		
	    //grab full metadata from page context
	    Document meta = (Document)pageContext.getAttribute("meta");
	   
	    //make an xpath and grab the comment node and all of its children out of metadata
		XPathFactory xFactory = XPathFactory.newInstance();
		XPath xpath = xFactory.newXPath();
	 	Transformer t = TransformerFactory.newInstance().newTransformer();
	   	t.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");

	 	//if we haven't been asked for details on a specific stream echo all streams
	 	if ( pageContext.getAttribute("stream") == null ) {
	 		String sxpth = "//ObjectMetadata//OnlineProduct[ProductName='" 
	 		+ pageContext.getAttribute("channel").toString() 
	 		+ "']/Streams";
	 	
	 	
	         Node snode_results = (Node)xpath.evaluate(sxpth,
	        		meta, 
	        		XPathConstants.NODE);
	        		
	 	    if (snode_results != null && snode_results.hasChildNodes() ) {
	 		
	 		    //transform result node into a string
	 			StringWriter ssw = new StringWriter();
	 		 	try {   
	 			   	t.transform(new DOMSource(snode_results), new StreamResult(ssw));
	 		 	} catch (TransformerException te) {
	 		 	   System.out.println("snodeToString Transformer Exception");
	 		 	} 
	 	 
	 	 		//convert the string into sometype of json object
	 		    XMLSerializer xmlSerializer = new XMLSerializer(); 
	 		    JSON stream_json = xmlSerializer.read( ssw.toString() ); 
	 		  
	 		  	//add  json to model
	 		  	model_jsobj.put("streams",stream_json);	
	 		
	 		}
	 	}	   	
		
	    JSONObject jsobj = new JSONObject();
	    jsobj.put("method", "create");
	    jsobj.put("model",model_jsobj); 
	    jsobj.put("uuid", pageContext.getAttribute("StoryID") );	
	    jsobj.put("env", pageContext.getAttribute("env") );	
	    
	 
		String result = "";
		result = jsobj.toString();
		
		pageContext.setAttribute("result", result);
		
	%>
		
 		<c:out value="${result}" escapeXml="false"/>
	</c:otherwise>
</c:choose>	