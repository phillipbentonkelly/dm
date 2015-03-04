<%@ tag body-content="scriptless" import="
    java.util.List,
    java.util.ArrayList,
    java.util.Iterator,
    com.eidosmedia.wa.render.WebObject,
    com.eidosmedia.wa.render.Hyperlinks,
    com.eidosmedia.portal.render.impl.cached.CachePortalCollection
" %>

<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%> 
<%@ taglib prefix="bdc"
	tagdir="/WEB-INF/tags/eom/SysConfig/WebPortal/BDC/Framework/tags/custom/"%>
  
<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="count" rtexprvalue="true" required="true" %>
<%@ attribute name="path" rtexprvalue="true" required="false" %>
<%@ attribute name="uuid" rtexprvalue="true" required="false" %>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object" %>
<%@ attribute name="exclude" rtexprvalue="true" required="false" type="java.lang.Object" %>
<%@ attribute name="backfillQuery" rtexprvalue="true" required="false" %>
<%@ attribute name="backfillQueryParams" rtexprvalue="true" required="false" %>
<%@ attribute name="backfillWhenEmpty" rtexprvalue="true" required="false" %>
  
<%@ variable name-from-attribute="var" alias="output" scope="AT_END"%>

<c:choose>
	<c:when test="${not empty path}">
		<p:getObject path="${path}" var="obj" onError="ignore" />
	</c:when>
	<c:when test="${not empty uuid}">
		<p:getObject uuid="${uuid}" var="obj" onError="ignore" />
	</c:when>
	<c:when test="${not empty webObject}">
		<p:getObject webObject="${webObject}" var="obj"  />
	</c:when>
	<c:otherwise>
		<p:getObject webObject="${currentObject}" var="obj"  />
	</c:otherwise>
</c:choose>

<%-- get all slotted stories, deduped --%>
<bdc:flattenContainer webObject="${obj}" var="output" />

<%
	List<WebObject> output = (List<WebObject>) jspContext.getAttribute("output");
	WebObject exclude = (WebObject) jspContext.getAttribute("exclude");
	
	class Filter {
		public void process(List<WebObject> stories, WebObject filterStory) throws Exception {
			String test = "blah";
			Iterator<WebObject> it = (Iterator<WebObject>) stories.iterator();
			String excludeLoid = filterStory.getLoid();
			
			while (it.hasNext()) {
				WebObject story = it.next();
				if (story.getLoid().equals(excludeLoid)) {
					test = "EX " + excludeLoid;
					it.remove();
				}
			}
		}
	}
	Filter filter = new Filter();
%>

<%-- process exclusion --%>
<%
	if (exclude != null) {
		filter.process(output, exclude);
	}
%>

<%-- backfill from specified query IF:
     backfillQuery option was specified (kind of a prerequisite...)
     # of stories returned by flattenContainer is less than # requested
  	 backfillWhenEmpty option is non-false
--%>

<c:if test="${
            not empty backfillQuery &&
            fn:length(output) < count && 
            (fn:length(output) > 0 || backfillWhenEmpty != 'false')
            }">
  
  	<p:getCollection path="$configurationURI/Framework/queries/${backfillQuery}" var="backfill" virtualParams="${backfillQueryParams}" />
	
	<% 
    	CachePortalCollection backfill = (CachePortalCollection) jspContext.getAttribute("backfill");
		
    	if (backfill != null) {
    		
       		List<WebObject> backfillObjects = backfill.getWebObjects();
    		
       		/* broken stories sometimes appear in eomdb. remove them because we hate broken stories.
       		   see jira: ITSD-2086 */
    		List<WebObject> broken = new ArrayList<WebObject>(); 	
  			for (WebObject story : backfillObjects) {
 				try {
  					/* this call will throw an ObjectNotExistsException for broken stories */
  					Hyperlinks links = story.getHyperlinks(null);
  				} catch (Exception e) {
 					broken.add(story); 
  				}
  			}
       		
  			if (broken.size() > 0) backfillObjects.remove(broken);
    		
    		if (backfillObjects != null) {
    			
    			// gracefully ignore null objects
    			while(backfillObjects.remove(null));

    			// process exclusion filter - #todo - this could result in 1 less story than expected
    			if (exclude != null) filter.process(backfillObjects, exclude);
    			
    			//List<WebObject> output = (List<WebObject>) jspContext.getAttribute("output");     			
    			output.addAll(backfillObjects);
    		
    		}
    		
    	}
    	
  	%>
  	
    <bdc:dedupe var="output" items="${output}" count="${count}" />
  
</c:if>

