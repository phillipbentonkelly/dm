<%
   // Configuration
   String defaultUserId = "515998462";
   String clientId = "a575adc5ed0e49659438e00b8f47163d";
%>
 
<%-- TODO : Move this crap out of methode and this whole tag is no longer needed. --%>
  
<%@ tag body-content="scriptless" import="
    java.util.ArrayList,
    java.util.List,
    java.util.Map,
    java.util.HashMap,
	com.eidosmedia.portal.util.Php,                                          
	net.sf.json.JSONObject,
 	net.sf.json.JSONArray,
	java.io.IOException,
    java.util.Iterator,
    java.util.regex.Matcher,
    java.util.regex.Pattern
                                          
" %>
  
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="c" uri="jstlCore"%>

<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ attribute name="userId" rtexprvalue="true" required="true"%>
<%@ attribute name="tag" rtexprvalue="true" required="false"%>
<%@ attribute name="maxItems" rtexprvalue="true" required="false" type="java.lang.Integer" %>
  
<%@ variable name-from-attribute="var" alias="output" scope="AT_END"  %>

<%
 
   // instagram feed iterator with tag filtering. 
   class InstagramFeed {
   
		private final String api= "https://api.instagram.com/v1";
  
   		private String nextUrl;
   		private String tag = null;
   		private Iterator<JSONObject> posts;
  		private String nextPage;
  
   		public InstagramFeed (String clientId, String userId) {
   			// kick everything off by requesting the feed URL.
   			// other URLs will come from JSON pagination.next_url
  			String feedUrl = String.format("%s/users/%s/media/recent?client_id=%s", api, userId, clientId);
   			getInstagramData(feedUrl);
   		}
   
   		private void getInstagramData(String url) {
  			
   			String json;
   
   			try {
   				json = Php.file_get_contents(url);
   			} catch (IOException e) {
  				json = null;
   			}
   
   			if (json != null) {
   				JSONObject page = Php.json_decode(json);
  				JSONArray data = (JSONArray) page.get("data");
  				JSONObject pagination = (JSONObject) page.get("pagination");
   				posts = data.iterator();
  				nextPage = (String) pagination.get("next_url");
   			}
   
   		}
 
  		// set a tag filter
  		public InstagramFeed tag(String tag) {
  			this.tag = tag;
  			return this;
  		}

  		// parse a post
  		private void processPost(JSONObject post) {
  			
  			// Remove unprintable characters (e.g. emoji) from caption
  			Map caption = (Map) post.get("caption");
  			String text = (String) caption.get("text");
  			Map<String, String> regram = new HashMap<String, String>();
  			
  			// Strip Emoji and such
  			text = text.replaceAll("[^\\x20-\\x7e]", "");

  			// extract regrams of form (regram from @username)
  			//Pattern rgPattern = Pattern.compile("\\(regram from @([^\\)]*)\\)");
 			Pattern rgPattern = Pattern.compile("@([^@\\s\\)]+)");
  			Matcher rgMatcher = rgPattern.matcher(text);
  			if (rgMatcher.find()) {
  				regram.put("username", rgMatcher.group(1));
  				regram.put("url", "http://instagram.com/" + rgMatcher.group(1));
  				//text = rgMatcher.replaceAll("");
  			}
  			
  			// strip tags
  			List<String> tags = (List<String>) post.get("tags");
  			for (String tag : tags) {
  				text = text.replaceAll("\\s*#" + tag + "\\s*", "");
  			}
  			post.put("regram", regram);
  			caption.put("text", text);
  		}
  
  		// the brains of the operation.
   		public JSONObject next() {
  
  			JSONObject post = null;
  
  			if (hasNext()) {
 	 			if (tag == null || tag.isEmpty()) {
 	 				post = posts.next();
  				} else {
  					while (post == null && hasNext()) {
 						JSONObject obj = posts.next();
  						JSONArray tags = (JSONArray) obj.get("tags"); 
 						if (tags.contains(tag))
 							post = obj;
  					}
  				}
  			}
  
  			if (post != null) 
 				processPost(post); 
  
  			return post;
  		}
  
  		public boolean hasNext() {
  		
  			if (posts.hasNext()) return true;
  
  			if (nextPage == null) return false;
  	
  			getInstagramData(nextPage);
  			
  			return posts.hasNext();
  
  		}
   
   }
   
	String tag = (String) jspContext.getAttribute("tag");
	InstagramFeed instagram = new InstagramFeed(clientId, defaultUserId).tag(tag);
 
  	Integer maxItems = (Integer) jspContext.getAttribute("maxItems");
  
  	List posts = new ArrayList();
    Map output = new HashMap();
  	while (posts.size() < maxItems && instagram.hasNext()) {
        JSONObject post = instagram.next();
    	if (post != null) {
            posts.add(post);
            if (!output.containsKey("user")) 
            	output.put("user", post.get("user"));
        }
    }

    output.put("posts", posts);            
   	jspContext.setAttribute("output", output);

%>
