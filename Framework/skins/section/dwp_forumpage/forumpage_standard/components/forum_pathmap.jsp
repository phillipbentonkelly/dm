 <%@ page import="java.util.regex.Pattern" %>
 <%@ page import="java.util.regex.Matcher" %>
 <%!
 
	 private static final Pattern forum_index_pattern = Pattern.compile("^/community/forums/?$"); 
	 private static final Pattern section_index_pattern = Pattern.compile("^/community/forums/([^/]+)/(\\d+)$"); 
	 private static final Pattern category_index_pattern = Pattern.compile("^/community/forums/([^/]+)/([^/]+)/(\\d+)/(\\d+)$"); 
	 private static final Pattern discussion_index_pattern = Pattern.compile("^/community/forums/([^/]+)/([^/]+)/([^/]+)/(\\d+)/(\\d+)$"); 
	 private static final Pattern discussion_pattern = Pattern.compile("^/community/forums/([^/]+)/([^/]+)/([^/]+)/([^/]+)/(\\d+)/(\\d+)$");
	 private static final Pattern start_discussion_pattern = Pattern.compile("^/community/forums/start_discussion/(\\d+)/(\\d+)$");
 %>
 
<%
 String show=null;
 String sectionParent=null;
 String categoryParent=null;
 String currentDiscussion=null;
 String forumParent=null;
 
 {
	Matcher matcher;
	//String path=request.getParameter("q");
	String path=((com.eidosmedia.portal.PortalRequestWrapper)pageContext.getRequest()).getOriginalRequestUri();
	

	if ( null != ( matcher=forum_index_pattern.matcher(path) ) &&  matcher.matches() ) {
		
		show="forum_index";
	} else if ( null != ( matcher=section_index_pattern.matcher(path) ) && matcher.matches() ) {
		
		show="section_index";
		forumParent=matcher.group(2);
	} else if ( null != ( matcher=category_index_pattern.matcher(path) ) && matcher.matches() ) {
		
		show="category_index";
		sectionParent=matcher.group(4);
	} else if ( null != ( matcher=discussion_index_pattern.matcher(path) ) && matcher.matches() ) {
	
		show="discussion_index";
		categoryParent=matcher.group(5);
	} else if ( null != ( matcher=discussion_pattern.matcher(path) ) && matcher.matches() ) {
		show="discussion";
		currentDiscussion=matcher.group(6);
	} else if ( null != ( matcher=start_discussion_pattern.matcher(path) ) && matcher.matches() ) {
		
		show="start_discussion";
		forumParent=matcher.group(1);
		categoryParent=matcher.group(2);
	}
 }

 //out.println("path:             "+((com.eidosmedia.portal.PortalRequestWrapper)pageContext.getRequest()).getOriginalRequestUri());
 //out.println("show:             "+show);
 //out.println("forumParent:       "+forumParent);
 //out.println("sectionParent:     "+sectionParent);
 //out.println("categoryParent:    "+categoryParent);
 //out.println("currentDiscussion: "+currentDiscussion);
 
 pageContext.setAttribute("show", show);
 pageContext.setAttribute("forumParent", forumParent);
 pageContext.setAttribute("sectionParent", sectionParent);
 pageContext.setAttribute("categoryParent", categoryParent);
 pageContext.setAttribute("currentDiscussion", currentDiscussion);
 
 %>