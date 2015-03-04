<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>

<div id="fb-root"></div>

<c:set value="${portalContext.env.fbhandler}" var="fbhandler" scope="request" />
<c:set value="${portalContext.env.fbfail}" var="fbfail" scope="request" />
<c:set value="${portalContext.env.fbsuccess}" var="success" scope="request" />
<c:set value="${portalContext.env.fbupdate}" var="fbupdate" scope="request" />
<c:set value="${portalContext.env.fbdeny}" var="fbdeny" scope="request" />

<c:set value="${cookie['pathUrl'].value}" var="pathUrl" scope="request" />

<c:choose>
	<c:when test="${pathUrl != null}">
		<c:set value="${pathUrl}" var="fbsuccess" />
	</c:when>
	<c:otherwise>
		<c:set value="${success}" var="fbsuccess" />
	</c:otherwise>
</c:choose>
 

<%-- staging 163137293699584
	ted.cao.boston 161040973919755 
	boston.com 135637993114591 --%>

<script> 
	
	window.fbAsyncInit = function() {
		FB.init({appId: '135637993114591', status: true, cookie: true, xfbml: true, oauth:true});
	};
	
	(function() {
		var e = document.createElement('script'); e.async = true;
		e.src = document.location.protocol +
		'//connect.facebook.net/en_US/all.js';
		document.getElementById('fb-root').appendChild(e);
	}());

	function fbSessionHandler(response){
		
		 var url = "${fbhandler}?fail=${fbfail}&success=${fbsuccess}&deny=${fbdeny}&update=${fbupdate}";
	
		if (response.authResponse) {
			window.location.assign(url);
		} else {
			//deny
			window.location.assign(url + "&error=access_deny");
		}
	}
</script>


