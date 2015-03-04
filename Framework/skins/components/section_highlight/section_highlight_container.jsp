<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ page import="java.util.List, 
                 java.util.ArrayList,
                 com.eidosmedia.portal.render.ctx.ContextMap,
                 com.eidosmedia.portal.render.ctx.ContextEntry" %>

<%-- #techdebt #todo - how to use configurationURI here? #mehwordpress --%>
<%@ taglib prefix="bdc" tagdir="/WEB-INF/tags/eom/SysConfig/WebPortal/BDC/Framework/tags/custom/"%>

<p:getObject var="dwc" loid="${param.dwc}" />
<p:getObject var="exclude" loid="${param.exclude}" />

<p:object webObject="${dwc}" metadata="meta" />

<%-- #techdebt #todo - this doesn't honour story count in metadata but meh wordpres.... --%>
<bdc:getStories webObject="${dwc}" var="stories" count="5" exclude="${exclude}" />
                
<p:out var="title" xvalue="$meta//OnlineProduct[child::ProductName='Boston.com']/Title" />
<c:if test="${empty title}">
	<p:out var="title" value="We Think You'll Like" />
</c:if>

<div class="page-module">
  
  <% // build a contextmap to pass to jsp. equivalent of p:param.
    List<ContextEntry> entries = new ArrayList<ContextEntry>();
    entries.add(new ContextEntry("imageSize", "Wide"));
    entries.add(new ContextEntry("headlineType", "bold"));

    ContextMap context = new ContextMap(entries.toArray(new ContextEntry[entries.size()]));
    pageContext.setAttribute("ctx", context);
  %>

  <div class="page-module-header">${title}</div>
  <jp:includeContent webObject="${stories[0]}" styleName="sc_image_tease_item" context="${ctx}" />
  
  <div class="headline-list--condensed">
    <ul class="headline-list">      
      <c:forEach var="story" items="${stories}" begin="1" end="4">
        <jp:includeContent webObject="${story}" styleName="sc_headline_list_item" />
      </c:forEach>
    </ul>
  </div>

</div>
