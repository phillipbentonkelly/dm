<%@ tag body-content="scriptless" import="
    org.w3c.dom.Document,
    java.util.ArrayList,
    java.util.LinkedHashSet,
    java.util.LinkedList,
    java.util.List,
    java.util.ListIterator,
    java.util.Map,
    com.eidosmedia.portal.PortalContext,
    com.eidosmedia.portal.util.PortalWebObjectWrapper,
    com.eidosmedia.portal.util.ObjectResolver,
    com.eidosmedia.wa.render.WebObject,
    com.eidosmedia.wa.render.WebObjectImpl,
    com.eidosmedia.wa.render.WebType,
    com.eidosmedia.wa.render.WebZone,
    com.eidosmedia.wa.render.WebTypeTemplate,
    com.eidosmedia.eomcache.ObjectProxy,
    com.eidosmedia.eomcache.proxies.data.XMLData,
    com.eidosmedia.portal.render.impl.cached.MetaOutputBuilder,
    com.eidosmedia.misc.xpath.AbstractXPathHelper,
    org.apache.xerces.dom.AttrNSImpl
" %>

<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="c" uri="jstlCore"%>

<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object" %>

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
  
<% 
 	final class DwcTraverser {
   
   		PortalWebObjectWrapper dwc;
   		ObjectResolver objectResolver;
   		PortalContext portalContext;
   		MetaOutputBuilder outputBuilder;
   
 		List<WebObject> content = new ArrayList<WebObject>();
  		LinkedHashSet<String> seen = new LinkedHashSet<String>();
  
   		public DwcTraverser(PortalWebObjectWrapper dwc) throws Exception {
  			this.dwc = dwc; 
  			portalContext = PortalContext.instance();
  			this.objectResolver = portalContext.getObjectResolver();
			outputBuilder = (MetaOutputBuilder) jspContext.getAttribute("com.eidosmedia.portal.jsp.PortalSupport.OUTPUT_BUILDER", 2);
 			traverse(); 
   		}
  
   		public List<WebObject> content() {
  			return content;
  		}

  		/* performs an in-order traversal of a dwc and any children */
  		public void traverse() throws Exception {

  			/* initialize stack and add root node */
  			StackList<WebObject> stack = new StackList<WebObject>();
  
 			stack.add(dwc.getWebObject());
 
  			/* traverse until stack is empty */
 			while (!stack.isEmpty()) {
 
  				/* shift first element off stack */
 				WebObject node = stack.pollFirst();
  				String loid = node.getLoid();
  		
  				/* process this node only if it hasn't been seen yet */
  				if (seen.add(loid)) {
  
  					ObjectProxy proxy = objectResolver.resolveByLoidEx(loid);
  						
  					/* eomcache dependency */
  					if (outputBuilder != null) 
  						outputBuilder.referenceObject(proxy);
 
 					if (node.isDwcDbType()) {
  						/* if node is a dwc, add its children to the stack */
 						List children = getZoneContents(node); 
  						stack.unshiftList(children);
  					} else {
  						/* otherwise, add the node to the output list */	
  						content.add(portalContext.toWebObject(proxy));
  					}
  
  				}
  			}
  		}
  
  		/* return an ordered list containing contents of all zones in a WebObject */
  		public List<WebObject> getZoneContents(WebObject container) throws Exception {
  			
  			/* figure out why ((WebObjectImpl) container).getZone(name) returns null 
  			   and this code gets a lot simpler. for now, pop them into a map and
  			   then iterate the list of ordered zone names */

  			List<WebObject> contents = new ArrayList<WebObject>();
  			List<String> zoneNames = getOrderedZones(container);
  			Map<String, WebZone> zonesMap = container.getZonesMap();
 			WebZone zones[] = ((WebObjectImpl) container).getZones();
 			WebType storyType = portalContext.getWebType("story");

 			for (WebZone zone : zones) {
  				zonesMap.put(zone.getName(), zone);
 			}
  
  			for (String zoneName : zoneNames) {
 				WebZone zone = zonesMap.get(zoneName); 
  				WebObject linked[] = zone.getLinked();
  				
  				for (WebObject link : linked) {
  					WebType linkType = link.getWebType();
  					if (linkType != null)
  						if (linkType.isSubtypeOf(storyType) || link.isWebContainer()) contents.add(link);
  				}
  			}
  
  			return contents;
  		}
  
  		/* extend linkedlist adding a method to unshift an entire list in order */
  		class StackList<T> extends LinkedList<T> {
  			public void unshiftList(List items) {
 				ListIterator iter = items.listIterator(items.size());
  				while (iter.hasPrevious()) {
 					this.addFirst((T) iter.previous()); 
  				}
  			}
  		}
  
  		/* get a list of zones in a dwc, sorted by their order in ref xml file */
  		List<String> getOrderedZones(WebObject container) throws Exception {
  	
  			List<String> zones = new ArrayList<String>();
  
  			WebType type = container.getWebType();
  			WebTypeTemplate wtTemplate = type.getDefaultTemplate();
  
 			if (wtTemplate == null) 
  				wtTemplate = type.getTemplates()[0];
  
  			ObjectProxy templateProxy = objectResolver.resolveByMethodeUri(null, wtTemplate.getPath(), null);
  			XMLData templateData = (XMLData) templateProxy.getData();
 			Document template = templateData.getXmlDocument();
  
  			List zoneNames = AbstractXPathHelper.selectNodes("//td/@partPageName", template);
  
 			for (Object node : zoneNames) {
  				zones.add( ((AttrNSImpl) node).getValue() );
  			}
  			
  			return zones;
  		}
   
   	}
 	
  
  	PortalWebObjectWrapper dwc = (PortalWebObjectWrapper)jspContext.getAttribute("obj");
	DwcTraverser traverser = new DwcTraverser(dwc);
  	jspContext.setAttribute("output", traverser.content());

%>