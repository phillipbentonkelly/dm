<%-- 
	 <rule>
	 	<from>^/community/user/(\d+)$</from>
	 	<forward>/page/Boston/Production/Boston.com/WebPages/Community/userprofile.dwp?show=home&amp;user=$1</forward>
	 </rule>
	 <rule>
	 	<from>^/community/user/home/(\d+)$</from>
	 	<forward>/page/Boston/Production/Boston.com/WebPages/Community/userprofile.dwp?show=home&amp;user=$1</forward>
	 </rule>
	 <rule>
	 	<from>^/community/user/messages/(\d+)$</from>
	 	<forward>/page/Boston/Production/Boston.com/WebPages/Community/userprofile.dwp?show=messages&amp;user=$1</forward>
	 </rule>
	 <rule>
	 	<from>^/community/user/comments/(\d+)$</from>
	 	<forward>/page/Boston/Production/Boston.com/WebPages/Community/userprofile.dwp?show=comments&amp;user=$1</forward>
	 </rule>
	 	 <rule>
	 	<from>^/community/user/forum_posts/(\d+)$</from>
	 	<forward>/page/Boston/Production/Boston.com/WebPages/Community/userprofile.dwp?show=forum-posts&amp;user=$1</forward>
	 </rule>
	 <rule>
	 	<from>^/community/user/myprofile/(\d+)$</from>
	 	<forward>/page/Boston/Production/Boston.com/WebPages/Community/userprofile.dwp?show=my-profile&amp;user=$1</forward>
	 </rule>
	 <rule>
	 	<from>^/community/user/(\d+)$</from>
	 	<forward>/page/Boston/Production/Boston.com/WebPages/Community/userprofile.dwp?show=home&amp;user=$1</forward>
	 </rule>
 --%>

<%@ page import="java.util.regex.Pattern" %>
<%@ page import="java.util.regex.Matcher" %>
 <%!
 
	 private static final Pattern user_pattern = Pattern.compile("^/community/user/(\\d+)$"); 
	 private static final Pattern home_pattern = Pattern.compile("^/community/user/home/(\\d+)$"); 
	 private static final Pattern messages_pattern = Pattern.compile("^/community/user/messages/(\\d+)$"); 
	 private static final Pattern comments_pattern = Pattern.compile("^/community/user/comments/(\\d+)$");
	 private static final Pattern forumposts_pattern = Pattern.compile("^/community/user/forum-posts/(\\d+)$");
	 private static final Pattern myprofile_pattern = Pattern.compile("^/community/user/myprofile/(\\d+)$");

 %>
 
<%
 String show=null;
 String user=null;
 
Matcher matcher;
String path=((com.eidosmedia.portal.PortalRequestWrapper)pageContext.getRequest()).getOriginalRequestUri();

if ( null != ( matcher=user_pattern.matcher(path) ) &&  matcher.matches() ) {
	show="home";
	user=matcher.group(1);
} else if ( null != ( matcher=home_pattern.matcher(path) ) && matcher.matches() ) {
	
	show="home";
	user=matcher.group(1);
} else if ( null != ( matcher=messages_pattern.matcher(path) ) && matcher.matches() ) {
	
	show="messages";
	user=matcher.group(1);
} else if ( null != ( matcher=comments_pattern.matcher(path) ) && matcher.matches() ) {

	show="comments";
	user=matcher.group(1);
} else if ( null != ( matcher=forumposts_pattern.matcher(path) ) && matcher.matches() ) {
	show="forum-posts";
	user=matcher.group(1);
} else if ( null != ( matcher=myprofile_pattern.matcher(path) ) && matcher.matches()) {
	show="my-profile";
	user=matcher.group(1);
}
else {
	show="no-user";
}
 
 pageContext.setAttribute("show", show, PageContext.REQUEST_SCOPE);
 pageContext.setAttribute("user", user, PageContext.REQUEST_SCOPE);

%>
