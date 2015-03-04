<%-- replaces @username references in a string with twitter links
  usage:
 	<bdc:twitterLinks var="string" value="${string}" />
  given string: 
	By Rob King @BostonDotCom
  produces:
    By Rob King <a href="http://www.twitter.com/BostonDotCom">@BostonDotCom</a>
--%> 
     
<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="value" rtexprvalue="true" required="true" %>
<%@ variable name-from-attribute="var" alias="output" scope="AT_END"  %>

<%@ include file="includes/bdc.inc" %> 
  
<bdc:regexReplace var="output" value="${value}" regex="(@)(\S+)" replace="<a href=\"http://www.twitter.com/$2\">$1$2</a>" />
