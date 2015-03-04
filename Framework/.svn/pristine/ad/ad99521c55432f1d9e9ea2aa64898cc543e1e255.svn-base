<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="x" uri="jstlXml"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="p" uri="ptag"%> 
<%@ page import="java.util.*" %>
<%@ page import="com.boston.registration.client.*" %>
<%@ page import="com.boston.registration.methode.*" %>
<%@ page import="com.boston.registration.model.db.impl.*" %>
<%@ page import="com.boston.registration.model.db.*" %>
<%@ page import="com.boston.registration.services.inside.errorhandler.*" %>
 
<c:set value="${cookie['pathAuth'].value}" var="userToken"/>

<%--BB: Redirect Must Come Before Any Includes --%>
 <c:if test="${userToken == null or userToken == ''}">
	<c:redirect url="login.jsp"/>
</c:if> 
  
<jsp:include page="eom$configurationURI/Framework/regi/common/header.jsp"/>
   
<c:if test="${userToken != null}">  
 
	<c:set value="${portalContext.env.sitedomain}" var="siteDomain" />
	   
   	<c:if test="${userToken != null}">
	
		<%
		    try 
			{
		    	String siteDomain = (String) pageContext.getAttribute("siteDomain");		    	
				InsideClient insideClient = new InsideClient(siteDomain);	 
				String sUserToken = (String) pageContext.getAttribute("userToken");
				
				UserResponse userObject = insideClient.getUserByToken(sUserToken);
				
				int status = userObject.status;
				pageContext.setAttribute("status",status);
				
				//out.println("Status: " + status);	
				
				if(userObject.status == 0 )
				{ 
					//out.println("STATUS GOOD??");
					//2011.08.05 - brett.berardinis@eidosmedia.com
					//Status Good! Populate Variables
					
					UserImpl uservar = userObject.getUser();
					
					Integer userid = uservar.getId();
					pageContext.setAttribute("userid",userid); 
					
					String firstname = uservar.getFirstName();
					pageContext.setAttribute("firstname",firstname);
					
					String lastname = uservar.getLastName();
					pageContext.setAttribute("lastname",lastname);
					
					String email = uservar.getEmail() ;
					pageContext.setAttribute("email",email);
		
					String screenname = uservar.getAlias();
					pageContext.setAttribute("screenname",screenname);
					 
					  
				}	
				//else {	 
				//	response.sendRedirect("regi-service-down.jsp"); 
				//}
				 
			 } catch (Exception ex) {
				 response.sendRedirect("regi-service-down.jsp"); 
				 ex.printStackTrace();
			 }	
		 %> 
 	</c:if>
 </c:if>
 
 <script> 
 	
 		function submitform()		 
		{  
			if (validateform() == false){
				 
				return false;
			}else{ 
				 
				return true;		 	
			} 
		} 
		 
		function validateform()  
		{   
		 
			var hasErrors = false;
			 			 
			//Check Zip
			var element = 'regi_zip'; 
			var ele = document.getElementById(element).value; 
			var div = document.getElementById(element + "_form");
			var divOriginal = 'form-fieldset form-name-zip';
			var divError = divOriginal + ' form-required form-fieldset-error'; 		
			
			var check = document.getElementById("regi_outside_us").checked;
			 
			if((ele == "" ||  ele.length < 5) && check == false)
			{ 	 
				div.className = divError; 
				hasErrors = true; 
		  	}else{  
		  		div.className = divOriginal;
			}
			 
			 
			 
			//Subscriber 
			var subscriber = document.getElementById('regi_subscriber_id').value; 
			var div = document.getElementById("regi_subscriber_form");
			var divOriginal = 'form-fieldset form-name-subscriber';
			var divError = divOriginal + ' form-required form-fieldset-error'; 
			    
			if((subscriber == "") || (subscriber == 0) )
			{ 	 
				div.className = divError; 
				hasErrors = true;
						 
		  	}else{  
		  		div.className = divOriginal;
			} 
			
	    
			if (hasErrors == true)			
			{ 
				 
				document.getElementById('form-error').style.visibility = 'visible'; 
				return false;
			}else{ 
				document.getElementById('form-error').style.visibility = 'hidden';  
		  		return true; 
			}
			  
		}
		 
		function disableZip() 
		{ 
			var check = document.getElementById("regi_outside_us").checked;
			 
			if (check == true)
			{ 
				 
				document.getElementById("regi_zip").value  = ""; 
				document.getElementById("regi_zip").disabled = true; 
				document.getElementById("regi_outside_us").value = 'true';
				
			}else{
				 
				document.getElementById("regi_zip").disabled = false;
				document.getElementById("regi_outside_us").value = 'false';			
			} 
		}	
		  
		
</script>  
 
<body>
 
	<div id="container"> 
		<div id="containerBorder"> 
			<div id="header"> 
				<div class="regi-header"> 
					<div class="bcom-globe-logos"> 
            			<a href="http://www.boston.com"></a> 
					</div> 
          			<div class="regi-header-inner"> 
            			<h1>Thank you, you're almost there!</h1> 
            			<p></p> 
          			</div> 
        		</div><!-- /end regi-header -->
      		</div><!-- /end #header -->
	
			<div id="content" class="section section95"> 
				<div id="Col1"> 
  
				<div class="fb-container">
		            <span class="fb-container-head-text">
		              <img src="http://cache.boston.com/universal/regi/images/facebook.gif">
		            </span>
	            <div class="fb-connected-pic">
	            </div>
	            <div class="fb-connected-info">
	            	<span class="fb-connected-info-name">
	               		${firstname} ${lastname}
	              	</span>
	              	<span class="fb-connected-info-email">
	               		${email}
	              	</span>
	            </div>
           
	            <div class="fb-connected-notes">
	            	<span class="fb-connected-note1">
	                	You will login using your Facebook account
	              	</span>
					<span class="fb-connected-note2">
					 	Your e-mail, name, gender and birthdate were provided by Facebook
					</span>
	            </div>
         	</div>
         		<h3><b>We need a little more info</b></h3>
         	
          
			<form name="loginForm" id="loginForm" onsubmit="return submitform()"  method="post" action="register_action_additional_info.jsp" id="regi">
						 
				<input type="hidden" name="mode" value="profileUpdate"> 
				<input type="hidden" name="regType" value="edit"> 
				<input type="hidden" name="uid" value="xCzNhICqBv0="> 
				<input type="hidden" name="validate" value="true"> 
				<input type="hidden" name="loadLists" value="true">          
				<input type="hidden" name="username_l" value="">   
			
				<input type="hidden" name="regi_userid" id="regi_userid" > 
				<input type="hidden" name="regi_accountstatus" id="regi_accountstatus" value="10">   
						
            	<jsp:include page="eom$configurationURI/Framework/regi/common/errorcodes.jsp"/>
            
				<div class="form-fieldset form-name-zip" id="regi_zip_form" >
					<span class="form-legend"> 
		                <label for="regi_zip"> 
		                  ZIP/Postal Code*
		                </label> 
	              	</span> 
					<span class="form-fields"> 
		                <input class="type-text" type="text" name="regi_zip" id="regi_zip"  maxlength="5"   > 
		                &nbsp;
		                <label for="regi_outside_us"> 
		                  <input class="type-checkbox" onClick="disableZip()" type="checkbox" name="regi_outside_us" id="regi_outside_us"   > 
		                  Outside the US
		                </label> 
              		</span> 
					<span class="form-message"> 
                		<span class="form-message-default"></span> 
		                <span class="form-message-success"> 
		                	<span class="form-message-bullet"><span>a</span></span> 
		                  	Success message.
		                </span> 
	                	<span class="form-message-error" id="regi_zip_error" >
		                 <span class="form-message-bullet">X</span>
					   		This field is required
	                	</span> 
              		</span> 
            	</div> 
            	 
						
			<div class="form-fieldset form-name-subscriber" id="regi_subscriber_form">
             		<label for="regi_subscriber_id"> 
	                <span class="form-legend"> 
	                  Globe Subscriber*
	                </span> 
	                <span class="form-fields"> 
	                  <select name="regi_subscriber_id" id="regi_subscriber_id"> 
	                    <option value="0">--- Select one ---</option> 
	                    <option value="102">I subscribe</option> 
	                    <option value="103">I read it regularly, but don&#39;t subscribe </option> 
	                    <option value="104">I read it occasionally, but don&#39;t subscribe</option> 
	                    <option value="105">I rarely or never read it</option> 
	                  </select> 
	                </span> 
             		</label> 
				<span class="form-message"> 
		        	<span class="form-message-default"> 
						<span class="form-message-bullet">&#9668;</span> 
		             	<a href="#" onclick="window.open('http://www.boston.com/help/registration/subscriberbenefits/','popup','width=375,height=475,resizable=yes,scrollbars=yes,toolbar=no,location=no,menubar=no,status=no'); return false;" class="form-why">Why do we ask this?</a> 
		           	</span> 
		           <span class="form-message-success"> 
		             <span class="form-message-bullet"><span>a</span></span> 
		             Success message.
		           </span>  
		           <span class="form-message-error"> 
		             <span class="form-message-bullet">X</span>
		             This field is required
		           </span> 
         		</span> 
           	</div> 
		
						
			<script type="text/javascript">
              $('.contestlink').click(function(){
                $.openDOMWindow({
                  width:580,
                  height:480,
                  loader:1,
                  windowPadding:0,
                  loaderHeight:16,
                  loaderWidth:17,
                  borderColor:'#000',
                  overlayOpacity:70,
                  windowSourceID:'#contestDetails'
                });
                return false;
              });
            </script>

			<div id="contestDetails" style="display:none;width:580px;">
				<div style="background-color:#000;height:15px;color:#fff;padding:10px;">
                	<span style="float:left">Contest Details</span>
               	 	<a href="#" class="closeDOMWindow" style="float:right;color:#fff" >close X</a>
              	</div>
       
             	<div style="overflow-x:hidden;overflow-y:scroll;width:580px;height:450px;">
               		<img src="http://cache.boston.com/images/ads/regi/rewards.jpg" usemap="#Map" />
               		<map name="Map" id="Map">
                 			<area shape="rect" coords="11,756,121,787" href="#" onclick="window.open('http://boston.com/advertisers/regi/rules/','RULES', 'width=500,height=300');" />
               		</map>
              	</div>
           	</div>
            
            <div class="form-callout">
              <p style="font-size: 11px;">
                Boston.com respects your privacy. Click <a href="http://www.boston.com/help/privacy-policy/" target="_blank">here</a> to learn more.
              </p>
              <span style="color:#272727">
                By clicking the Register button below, you agree to Boston.com's <a href="http://www.boston.com/help/memberagreement/" target="_blank">Member Agreement</a>
              </span>
            </div>
            
            <div class="form-fieldset form-name-submit">
              <span class="form-fields">
                <input type="submit" value="Register" class="form-button">
              </span>
              <span class="form-message">
                <a href="http://www.boston.com/help/privacy-policy/" target="_blank">Privacy Policy</a> |
                <a href="http://www.boston.com/help/faq/" target="_blank">Member FAQ</a>
              </span>
            </div>
            
          	</form>
          
			</div><!--/end #Col1 --> 

	        <div id="Col2"></div> 
			<div id="Col3"></div> 
			<div class="cf"></div>
      	</div><!--/end #content -->

		<jsp:include page="eom$configurationURI/Framework/regi/common/footer.jsp"/>
	
	</div><!-- /end #containerBorder -->
</div> <!-- /end #container -->
	 
	 <!-- Added Script for Alpha Numeric Validation-Start -->
	<script type="text/javascript"> 
		$('#regi_zip').numeric(); 
	</script>
	<!--  Added Script for Alpha Numeric Validation-End -->
	 
	 
	<!-- SiteCatalyst code version: H.19.3 Copyright 1997-2003 Omniture, Inc. More info available at http://www.omniture.com -->
	<%@ include file="/eom$configurationURI/Framework/global/user_state_bcom.jsp" %>
	<script language="JavaScript" src="//cache.boston.com/omniture/hcode/s_code_latest.js"></script>
	 
	<script language="JavaScript"><!--
	s.pageName='Member Center | BCom Registration | Facebook registration - need additional info',s.channel='Member Center',s.prop1='Member Center | BCom Registration';
	s.server='',s.pageType='',s.prop2='',s.prop3='',s.prop4='',s.prop5='',s.prop6='BCom Registration Page',s.prop7='',s.prop8='',s.prop9='',s.prop10='',s.prop41='Boston.com',
	s.prop35='${loggedInOmniture}',s.eVar20='D=c35',s.prop42='${loginType}',s.eVar42='${loginType}';
	/* E-commerce Variables */
	s.campaign='',s.state='',s.zip='',s.events='',s.products='',s.purchaseID='',s.eVar1='',s.eVar2='',s.eVar3='',s.eVar4='',s.eVar5='',s.eVar6='',s.eVar7='',s.eVar8='',s.eVar9='',s.eVar10='',s.eVar41='Boston.com';
	var s_code=s.t();if(s_code)document.write(s_code)
	//--></script>
	<script language="JavaScript" type="text/javascript"><!--
	if(navigator.appVersion.indexOf('MSIE')>=0)document.write(unescape('%3C')+'\!-'+'-')
	//--></script>
	<noscript><a href="http://www.omniture.com" title="Web Analytics"><img src="http://nytbglobe.112.2O7.net/b/ss/nytbglobe/1/H.19.3--NS/0" height="1" width="1" alt="" /></a></noscript><!--/DO NOT REMOVE/-->
	
	<!-- START Nielsen Online SiteCensus V6.0 -->
	<!-- COPYRIGHT 2010 Nielsen Online -->
	<script type="text/javascript"> 
	  (function () {
	    var d = new Image(1, 1);
	    d.onerror = d.onload = function () {
	      d.onerror = d.onload = null;
	    };
	    d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=us-604060h&cg=0&cc=1&si=", escape(window.location.href), "&rp=", escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
	  })();
	</script>
	<noscript>
	  <div>
	    <img src="//secure-us.imrworldwide.com/cgi-bin/m?ci=us-604060h&amp;cg=0&amp;cc=1&amp;ts=noscript" width="1" height="1" alt="" />
	  </div>
	</noscript>
	<!-- END Nielsen Online SiteCensus V6.0 -->
 
</body>   
</html>
