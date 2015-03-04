<%-- bdc:dedupe
   
   Takes a list of WebObjects (items param) and outputs a deduplicated list to var
--%>

<%@ tag body-content="scriptless" import="
	java.util.LinkedHashSet,
    java.util.List,
    java.util.ArrayList,
    java.util.Iterator,
    com.eidosmedia.wa.render.WebObject
" %>

<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ attribute name="items" rtexprvalue="true" required="true" type="java.util.List" %>
<%@ attribute name="count" rtexprvalue="true" required="false" type="java.lang.Integer" %>
<%@ variable name-from-attribute="var" alias="output" scope="AT_END" %>

<%
 	Integer count = (Integer) jspContext.getAttribute("count");
   	List input = (List) jspContext.getAttribute("items");
 	
   	List<WebObject> output = new ArrayList<WebObject>();
  	LinkedHashSet<String> seen = new LinkedHashSet<String>();
   
  	Iterator<WebObject> items = input.iterator();
 
  	while (items.hasNext()) {
 		WebObject item = items.next();
  		String loid = item.getLoid();
  		if (seen.add(loid)) {
 			output.add(item); 
  			if (count > 0 && output.size() >= count) break;
  		}
  	}
 
  	jspContext.setAttribute("output", output);
  
%>