<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ page import="java.util.*" %>  
<%@ page import="java.net.*" %>
<%@ page import="javax.servlet.jsp.*" %> 
<%@ page import="com.boston.registration.client.*" %>
<%@ page import="com.boston.registration.methode.*" %>
<%@ page import="com.boston.registration.model.db.impl.*" %>
<%@ page import="com.boston.registration.services.inside.errorhandler.*" %>
<%@ page import="com.boston.registration.utils.*" %>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="p" uri="ptag"%>
<jp:userSession var="userSession" /> 
 
<c:set value="${portalContext.env.fbhandler}" var="fbhandler" scope="request" /> 
 
<c:if test="${userSession == null or userSession.email == null or userSession.authToken == null}">
	 <c:redirect url="login.jsp" />
</c:if>

<jsp:include page="eom/SysConfig/WebPortal/Boston/Framework/regi/common/header.jsp"/>

<p:getObject path="/SysConfig/WebPortal/Boston/Framework/regi/boston-email-list.xml" var="EmailList" />
<p:object webObject="${EmailList}" content="email_list_content" />

<c:set var="counter" value="0" />
<x:forEach select="$email_list_content//EmailList/EmailListElement" var="email_list_ele">  
	<p:out xvalue="$email_list_ele//EmailListID" var="emailID" /> 
	<c:set var="counter" value="${counter + 1}" />
	
	<c:choose>
		<c:when test="${counter == 1}">
		    <c:set var="email_list_vals" value="${emailID}" /> 
		</c:when>
		<c:otherwise >
		   <c:set var="email_list_vals" value="${email_list_vals},${emailID}" /> 
		</c:otherwise>  
	</c:choose> 
</x:forEach>


<body> 
<x:forEach select="$email_list_content//EmailList/EmailListElement" var="email_list_ele">  
							<c:set var="counter" value="${counter + 1}" />
							<c:set var="divID" value="subscribe_${counter}" />
							<c:set var="inputID" value="regi_email_subscribe_${counter}" />
						<%-- <p:out xvalue="$email_list_ele//EmailListName" var="emailName" />	--%>	
							<p:out xvalue="$email_list_ele//EmailListID" var="emailID" /> 
							<p:out xvalue="$email_list_ele//EmailListDesc" var="emailDesc" /> 
							<p:out xvalue="$email_list_ele//EmailListSample" var="emailSample" /> 
							<x:set var="emailName" select="string($email_list_ele//EmailListName/text())"/>
							<x:set var="show" select="string($email_list_ele/ShowMemberSubNewsletter/text())"/>
							<x:set var="show2" select="$email_list_ele//EmailListID"/>
							<x:set var="show3" select="string($email_list_ele//ShowRegiNewsletter/text())"/>
							
							
							<x:set var="currentNode" select="string($email_list_ele/text())"/>
							<p>currentNode: ${currentNode}</p>

							<p>emailID: ${emailID }</p>
							<p>emailName: ${emailName}</p>
							<p>show: ${show}</p>
							<p>show2: ${show2}</p>
							<p>show3: ${show3}</p>
				
 </x:forEach>
	
	
</body> 
</html>

