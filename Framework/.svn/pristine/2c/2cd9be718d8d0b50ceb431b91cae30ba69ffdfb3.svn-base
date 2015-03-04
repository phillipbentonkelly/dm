<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>

<c:choose>
	<c:when test="${param.errorcode != ''}">
		<c:set value="${param.errorcode}" var="errorCode" scope="request" />
	</c:when>    
	<c:otherwise>
		<c:set value="nothing" var="errorCode" scope="request" /> 
	</c:otherwise>  
</c:choose> 
  
<c:choose>
	<c:when test="${errorCode == '-100'}"> 
	    <div class="form-error" id="form-error">E-mail already been registered. Please subscribe with a new E-mail address.</div>
	</c:when>
	<c:when test="${errorCode == '-200'}"> 
	    <div class="form-error" id="form-error">Failed to add or update subscription</div>
	</c:when>
	<c:when test="${errorCode == '-300'}"> 
	    <div class="form-error" id="form-error">Failed to add demographics</div>
	</c:when>
	<c:when test="${errorCode == '-400'}"> 
	    <div class="form-error" id="form-error">Failed to delete demographics</div>
	</c:when>
	<c:when test="${errorCode == '-600'}"> 
	    <div class="form-error" id="form-error">Screen name already been taken. Please subscribe with a new screen name.</div>
	</c:when>	
	<c:otherwise>												 
		<div class="form-error" style="visibility:hidden"  id="form-error">
			The highlighted fields are incorrect or need to be updated.
		</div>
	</c:otherwise>
</c:choose>   