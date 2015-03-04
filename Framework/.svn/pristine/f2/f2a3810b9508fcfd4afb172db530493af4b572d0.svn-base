<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="bdc" tagdir="/WEB-INF/tags/eom/SysConfig/WebPortal/BDC/Framework/tags/custom/" %>

<%@ page import="org.jsoup.Jsoup" %>
<%@ page import="org.jsoup.safety.Whitelist" %>
<%@page import="java.util.*"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.lang.String"%>
<%@page import="java.security.*"%>
<%@page import="java.math.BigInteger"%>


<%
//Variables
String requestMode = (String)request.getParameter("mode");
String requestID = (String)request.getParameter("id");
String keywords = (String)request.getParameter("keywords");

pageContext.setAttribute("requestID",requestID);
%>
<%if (requestID.isEmpty()) { %>
	<jp:getCollection path="/SysConfig/WebPortal/BDC/Framework/feeds/placester/queries/real-estate-get-articles.query" var="queryResults"/>
<% } %>
<%if (!requestID.isEmpty()) { 
	ArrayList<Map> oneItemList = new ArrayList<Map>();
	Map oneItem = new HashMap();
	oneItem.put("loid", (String)requestID);
	oneItemList.add(oneItem);
	
	Map queryResults = new HashMap();
	queryResults.put("items", oneItemList);
	
	pageContext.setAttribute("queryResults",queryResults);	
} %>




<% if (keywords != null && !keywords.isEmpty()) { 
	Map matches = new HashMap();
	String[] keywordsToMatch = keywords.split(",");
%>
	<c:forEach items="${queryResults.items}" var="match" varStatus="status">
	<p:out var="itemMatchId" value="${match.loid}"/>
	<%
		String itemMatchId = (String)pageContext.getAttribute("itemMatchId");
		matches.put(itemMatchId,"0");
	
	%>
	<p:getObject loid="${match.loid}" var="matchObj" />
 	<p:object webObject="${matchObj}" content="match-story" metadata="match-meta" channel="Boston.com"/>
	
		<x:forEach select="$match-meta//ObjectMetadata/Categorization/Keywords/Keyword" var="keyword_item" varStatus="status">
			<p:out var="matchItemKeywork" xvalue="$keyword_item//."/>
			<%
				String matchItemKeywork = (String)pageContext.getAttribute("matchItemKeywork");
				for (String keywordToMatch : keywordsToMatch) {
					if (matchItemKeywork.equals(keywordToMatch)) {
						matches.remove(itemMatchId);
						matches.put(itemMatchId,"1");
					}
				}
				
			%>
		</x:forEach>
	</c:forEach>	
<%	

ArrayList<Map> matchedList = new ArrayList<Map>();
for (Object matchedID : matches.keySet()) {
	if(matches.get((String)matchedID)=="1") {
		Map matchedItem = new HashMap();
		matchedItem.put("loid", (String)matchedID);
		matchedList.add(matchedItem);
	}
		
}

Map queryResults = new HashMap();
queryResults.put("items", matchedList);

pageContext.setAttribute("queryResults",queryResults);	


}
	
%>




<c:import var="dfps" url="/fragment/SysConfig/WebPortal/BDC/Framework/feeds/placester/utils/getDPFSettingsXML.jpt">
</c:import>
<x:parse var="dfps_doc" doc="${dfps}"></x:parse>



<articles>
	<c:forEach items="${queryResults.items}" var="item" varStatus="status">
		<p:out var="imgSrc" value=""/>
		
  		<p:getObject loid="${item.loid}" var="obj" />
		
	
	  	<p:object webObject="${obj}" content="item-story" metadata="item-meta" channel="Boston.com"/>

		<p:url webObject="${obj}" var="link"/>

		<p:out var="webtype" xvalue="$item-meta//ObjectMetadata/OnlineProducts/OnlineProduct/WebType" />
		<c:if test="${webtype != 'video' and webtype !='streamtease'}">
			<p:out var="itemBody" xvalue="$item-story//text" xslt="$configurationURI/Framework/xslt/bdc_story_default_new.xslt"></p:out>
			<p:out var="itemWebTease" xvalue="$item-story//doc/story/web-tease"/>
			<p:out var="itemStreamTease" xvalue="$item-story//doc/story/stream-tease"/>
			<c:if test="${fn:trim(itemBody) == ''}">
				<p:out var="itemBody" value="${itemWebTease}"/>
				<c:if test="${fn:trim(itemWebTease) == ''}">
					<p:out var="itemBody" value="${itemStreamTease}"/>
				</c:if>
			</c:if>		
		<article>
		
		<% if (requestMode.equals("full")) { %>
			<title><x:out select="$item-story//doc/story/headlines/headline"/></title>
			<DEK><x:out select="$item-story//doc/story/headlines/subheadline"/></DEK>

		<p:out var="storyText" xvalue="$item-story//doc"/>
		<p:out var="metaText" xvalue="$item-meta//ObjectMetadata"/>
		<bdc:getMD5Checksum var="storyMD5" content="${storyText}" />
		<bdc:getMD5Checksum var="metaMD5" content="${metaText}" />
			<checksum>${metaMD5}${storyMD5}</checksum>
			<id>${item.loid}</id>
			<creationDate><x:out select="$item-meta//ObjectMetadata/OnlineProducts/OnlineProduct/FirstPublicationDate"/></creationDate>
			<updateDate><x:out select="$item-meta//ObjectMetadata/OnlineProducts/OnlineProduct/LastPublicationDate"/></updateDate>
			<author>
				<name><x:out select="$item-story//doc/story/text/byline/byname"/></name>
				<source><x:out select="$item-story//doc/story/text/byline/bysource"/></source>
			</author>

			<taxonomies>
			<x:forEach select="$item-meta//ObjectMetadata/Categorization/Taxonomies/Taxonomy">
				<taxonomy><x:out select="."/></taxonomy>
			</x:forEach>
			</taxonomies>

			<content>
				<![CDATA[
					${itemBody}
				]]>

			</content>

			<%-- Related links --%>
			<bdc:getRelatedLinks var="relatedLinks" loid="${item.loid}" />
			<related-links>
			<c:forEach items="${relatedLinks.relatedLinksArray}" var="relatedItem" varStatus="status">
				<related-link>
					<type>${relatedItem[0]}</type>
					<URL>${relatedItem[1]}</URL>
					<text>${relatedItem[2]}</text>
					<lead-in>${relatedItem[3]}</lead-in>
					<review-rating>${relatedItem[4]}</review-rating>
					<new>${relatedItem[5]}</new>
				</related-link>
			</c:forEach>
			</related-links>

			<%-- Multimedia --%>
			<bdc:getImages var="images" loid="${item.loid}" />
			<multimedia>
			<c:forEach items="${images.imagesArray}" var="image" varStatus="status">
				<media medium="image" type="${image.type}" format="${image.format}" class="${image.class}" order="${image.order}">
					<url>${image.url}</url>
					<caption>${image.caption}</caption>
					<credit>${image.credit}</credit>
				</media>
			</c:forEach>
			</multimedia>

			<%-- "Metadata" --%>
			<metadata>
				<SEOInformation>
					<summary><x:out select="$item-meta//ObjectMetadata/SEOInformation/Summary"/></summary>
					<headline><x:out select="$item-meta//ObjectMetadata/SEOInformation/Headline"/></headline>
				</SEOInformation>
				<keywords>
					<x:forEach select="$item-meta//ObjectMetadata/Categorization/Keywords/Keyword" var="keywordItem" varStatus="status">
					<keyword>
						<x:out select="$keywordItem"/>
					</keyword>
					</x:forEach>
				</keywords>
			</metadata>
			<dfp>
				<network-code><p:out xvalue="$dfps_doc//dfp[@loid='${item.loid}']/network-code"/></network-code>
				<ad-unit><p:out xvalue="$dfps_doc//dfp[@loid='${item.loid}']/ad-unit"/></ad-unit>
				<ad-slots><p:out xvalue="$dfps_doc//dfp[@loid='${item.loid}']/ad-slots"/></ad-slots>
				<ad-frequency><p:out xvalue="$dfps_doc//dfp[@loid='${item.loid}']/ad-frequency"/></ad-frequency>
				<gallery-ad-frequency><p:out xvalue="$dfps_doc//dfp[@loid='${item.loid}']/gallery-ad-frequency"/></gallery-ad-frequency>
				<city-name><p:out xvalue="$dfps_doc//dfp[@loid='${item.loid}']/city-name"/></city-name>
				<key-value-pairs>
					<s1><p:out xvalue="$dfps_doc//dfp[@loid='${item.loid}']/key-value-pairs/s1"/></s1>
					<s2><p:out xvalue="$dfps_doc//dfp[@loid='${item.loid}']/key-value-pairs/s2"/></s2>
					<s3><p:out xvalue="$dfps_doc//dfp[@loid='${item.loid}']/key-value-pairs/s3"/></s3>
					<s4><p:out xvalue="$dfps_doc//dfp[@loid='${item.loid}']/key-value-pairs/s4"/></s4>
					<s5><p:out xvalue="$dfps_doc//dfp[@loid='${item.loid}']/key-value-pairs/s5"/></s5>
					<page-type><p:out xvalue="$dfps_doc//dfp[@loid='${item.loid}']/key-value-pairs/page-type"/></page-type>
					<page-URL><p:out xvalue="$dfps_doc//dfp[@loid='${item.loid}']/key-value-pairs/page-URL"/></page-URL>
					<meta><p:out xvalue="$dfps_doc//dfp[@loid='${item.loid}']/key-value-pairs/meta"/></meta>
					<stream-count><p:out xvalue="$dfps_doc//dfp[@loid='${item.loid}']/key-value-pairs/stream-count"/></stream-count>
				</key-value-pairs>
			</dfp>
			<link>${portalContext.publicBaseUrl}${link}</link>
		<% } //End of full request %>
		<% if (requestMode.equals("checksum")) { %>
			<title><x:out select="$item-story//doc/story/headlines/headline"/></title>
			<p:out var="storyText" xvalue="$item-story//doc"/>
			<p:out var="metaText" xvalue="$item-meta//ObjectMetadata"/>
			<bdc:getMD5Checksum var="storyMD5" content="${storyText}" />
			<bdc:getMD5Checksum var="metaMD5" content="${metaText}" />
			<checksum>${metaMD5}${storyMD5}</checksum>
			<id>${item.loid}</id>
		
		<% } //End of check request %>
		</article>
	</c:if>
	</c:forEach>
</articles>