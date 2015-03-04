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
<%@ include file="common/regi-path.jsp" %>
<jp:userSession var="userSession" /> 

 
<c:if test="${userSession == null or userSession.email == null or userSession.authToken == null}">
	 <c:redirect url="login.jsp" />
</c:if>

<p:getObject path="$configurationURI/Framework/regi/boston-email-list.xml" var="EmailList" />
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

<c:if test="${userSession != null}">  

	<c:set value="${userSession.email}" var="userEmail" />  
	<c:set value="${portalContext.env.sitedomain}" var="siteDomain" />   
	
   	<c:if test="${userEmail != null}">
   	 
   	    <%! List<MailingList> email_list = new ArrayList(); %>
   	    
	   	<%     try 
			{
		    	String siteDomain = (String) pageContext.getAttribute("siteDomain");
				InsideClient insideClient = new InsideClient(siteDomain); 
				
				String sUserEmail = (String) pageContext.getAttribute("userEmail");
				UserResponse userObject = insideClient.getMailingList(sUserEmail);
			 	 
				int status = userObject.status;
				pageContext.setAttribute("status",status); 
				   
				if(userObject.status == 0 )
				{  
					email_list = userObject.methodeData.getMailinglists(); 
					   
					
				}else {	
					response.sendRedirect("regi-service-down.jsp"); 
				}
					
			 } catch (Exception ex) {
				 ex.printStackTrace();
				 response.sendRedirect("regi-service-down.jsp"); 
				 
			 }	
			 String email_list_vals = (String) pageContext.getAttribute("email_list_vals");
			 pageContext.setAttribute("allUnsubscribed", EmailListUtil.isAllUnsubscribed(email_list, email_list_vals));
			 pageContext.setAttribute("allSubscribed", EmailListUtil.isAllSubscribed(email_list, email_list_vals));
		
		%>
		 
	</c:if>
</c:if>  
  
<jsp:include page="eom$configurationURI/Framework/regi/common/header.jsp"/>
 
<body  > 
	<meta name="WT.cg_n" content="Member Center" /> 
	<meta name="WT.cg_s" content="Member Center" /> 
	<meta name="ti" content="Registration form" /> 
	<meta name="WT.si_n" content="newMember" /> 
	<meta name="WT.si_x" content="1" /> 
 
	<div id="container"> 
		<div id="containerBorder"> 
			<div id="header">
				<div class="member-header"> 
				  	<div class="bcom-globe-logos"> 
				       <a href="${fn:replace(portalContext.publicBaseUrl,'https','http')}"></a> 
				    </div> 
					<div class="member-header-inner"> 
			          <h1> 
			            <img src="//graphics.boston.com/universal/regi/images/member_center_icon.png"> 
			            <img src="//graphics.boston.com/universal/regi/images/member_center_text.png"> 
			          </h1> 
			          <p>Update your account information</p> 
			        </div> 
			        <div class="member-header-right"> 
			            <p><a href="http://services.bostonglobe.com/subscribers/custserv.aspx?id=5274">Boston Globe Services account &raquo;</a></p> 
			        </div> 
				</div> 
				<div class="member-tabs">
					<ul>
						<li><a class="resend" href="membercenter-update-info.jsp">Update personal info</a></li>
						<li class="member-tabs-selected"><a href="membercenter-subs.jsp">E-mail newsletters</a></li> 
					</ul>
				</div>
		        
			</div> 
 
			<!-- Start subs tab -->
			<form name="loginForm" method="post"  action="register_action_email_list.jsp"  id="subs"> 
			<input type="hidden" name="mode" value=""> 
			<input type="hidden" name="regType" value=""> 
			<input type="hidden" name="uid" value="xCzNhICqBv0="> 
			<input type="hidden" name="validate" value="false"> 
			<input type="hidden" name="loadLists" value="false"> 
		
			<div id="content" class=""> 
				<div id="member-newsletter-subscriptions"> 
					<!-- This is a sample unsubscribe action - it won't appear unless user is subscribed to at least one item -->
					
					<c:if test="${allUnsubscribed eq 'false'}">
						<div class="newsletter-unsubscribe"> 					
							<div class="section-header"> 
								<span class="newsletter-action"> 
									Unsubscribe
								</span> 
								<span class="newsletter-action-description"> 
									You are currently signed up to receive the following e-mails:
								</span> 
						  	</div> 
					 	 
					 
						<c:set var="counter" value="0" />
						
						<x:forEach select="$email_list_content//EmailList/EmailListElement" var="email_list_ele"> 
							<c:set var="counter" value="${counter + 1}" />
							<c:set var="divID" value="unsubscribe_${counter}" />
							<c:set var="inputID" value="regi_email_unsubscribe_${counter}" />
							<p:out xvalue="$email_list_ele//EmailListName" var="emailName" />	
							<p:out xvalue="$email_list_ele//EmailListID" var="emailID" /> 
							<p:out xvalue="$email_list_ele//EmailListDesc" var="emailDesc" /> 
							 
							<% 
								String emailID = (String) pageContext.getAttribute("emailID");
								if   (EmailListUtil.isSubscribed(email_list, emailID)) 
							
							{ %>  
					 	  
							<div class="newsletter-subscribe-item" id="${divID}" > 
								<label for="newsletter-subscribe-item0"> 
									<span class="newsletter-checkbox"> 
										<input class="type-checkbox" type="checkbox" name="regi_email_unsubscribe" id="${inputID}" value="${emailID}"> 
									</span> 
									<span class="newsletter-name"> 
									  <b>${emailName}</b>   
									</span> 
									<span class="newsletter-description"> 
										${emailDesc} 
									</span> 
								</label> 
							</div>
							
							<%} %> 
						 	
						</x:forEach>
					       
					</div> 
					</c:if>
					<c:if test="${allSubscribed eq 'false'}">
					<div class="newsletter-subscribe"> 
							<div class="section-header"> 
					              <span class="newsletter-action"> 
					                Subscribe
					              </span> 
					              <span class="newsletter-action-description"> 
					                Boston.com also offers the following free e-mail products:
					              </span> 
						    </div>  					
					
						<c:set var="counter" value="0" />
						
						<x:forEach select="$email_list_content//EmailList/EmailListElement" var="email_list_ele">  
							<c:set var="counter" value="${counter + 1}" />
							<c:set var="divID" value="subscribe_${counter}" />
							<c:set var="inputID" value="regi_email_subscribe_${counter}" />
						    <p:out xvalue="$email_list_ele//EmailListName" var="emailName" />	
							<p:out xvalue="$email_list_ele//EmailListID" var="emailID" /> 
							<p:out xvalue="$email_list_ele//EmailListDesc" var="emailDesc" /> 
							<p:out xvalue="$email_list_ele//EmailListSample" var="emailSample" /> 
							<p:out xvalue="$email_list_ele/ShowMemberSubNewsletter" var="show" /> 
	
							<% 
								String emailID = (String) pageContext.getAttribute("emailID"); 
								if   (!EmailListUtil.isSubscribed(email_list, emailID))
							
							{ %>  
					 	  	<c:if test="${show == '1'}">
							<div class="newsletter-subscribe-item" id="${divID}" > 
								<label for="newsletter-subscribe-item0"> 
									<span class="newsletter-checkbox"> 
										<input class="type-checkbox" type="checkbox" name="regi_email_subscribe" id="${inputID}" value="${emailID}"> 
									</span> 
									<span class="newsletter-name"> 
									  <b>${emailName}</b>
									  <c:if test="${ not empty emailSample}">
									 	<a href="#" class="view-sample" data-modalsrc="${emailSample }">See a sample</a>
									  </c:if>
									</span> 
									<span class="newsletter-description"> 
										${emailDesc} 
									</span> 
								</label> 
							</div>
							</c:if>
							<%} %> 
						 	
						</x:forEach> 
					</div> 
					</c:if>
				<c:choose>
					<c:when test="${allUnsubscribed eq 'false'}">
		
						<div class="newsletter-unsubscribe-all"> 
							<div class="newsletter-unsubscribe-all-contents"> 
								<label for="newsletter-unsubscribe"> 
									<span class="unsubscribe-all-checkbox"> 
										<input class="type-checkbox" type="checkbox" name="regi_email_unsubscribe_all" id="regi_email_unsubscribe_all" value="${email_list_vals}"  > 
									</span> 
									<span class="unsubscribe-all-description"> 
										<b>Unsubscribe to all: </b> If you would like to stop receiving all Boston.com e-mail products
									</span> 
								</label> 
							</div> 
						</div> 
					
					</c:when>
					<c:otherwise>
						<div >
							<br />
						</div>
					</c:otherwise>
				</c:choose>
					
					<span class="member-update-newsletters">  
						<input type="hidden" name="dispatch" value="editsubspage"> 
						<input type="submit" value="Update my e-mails" class="form-button">	                            
					</span> 
				</div>
		
				<div id="Col3"></div> 
				<div class="cf"></div>
			</div><!-- /end #content -->
		</form> 
          	<!-- End subs tab -->

			<jsp:include page="eom$configurationURI/Framework/regi/common/footer.jsp"/> 
      		<jsp:include page="eom$configurationURI/Framework/regi/common/facebook_handler.jsp"/>         
 
    	</div><!-- /end #containerBorder -->
  	</div> <!-- /end #container -->
 
 	<!-- SiteCatalyst code version: H.19.3 Copyright 1997-2003 Omniture, Inc. More info available at http://www.omniture.com -->
	<%@ include file="/eom$configurationURI/Framework/global/user_state_bcom.jsp" %>
	<script language="JavaScript" src="//cache.boston.com/omniture/hcode/s_code_latest.js"></script>
	<script language="JavaScript"><!--
	s.pageName='Member Center | BCom Registration | BCom update account: e-mail newsletters',s.channel='Member Center',s.prop1='Member Center | BCom Registration';
	s.server='',s.pageType='',s.prop2='',s.prop3='',s.prop4='',s.prop5='',s.prop6='BCom Registration Page',s.prop7='',s.prop8='',s.prop9='',s.prop10='',s.prop41='Boston.com';
	/* E-commerce Variables */
	s.campaign='',s.state='',s.zip='',s.events='',s.products='',s.purchaseID='',s.eVar1='',s.eVar2='',s.eVar3='',s.eVar4='',s.eVar5='',s.eVar6='',s.eVar7='',s.eVar8='',s.eVar9='',s.eVar10='',s.eVar41='Boston.com',
	s.prop35='${loggedInOmniture}',s.eVar20='D=c35',s.prop42='${loginType}',s.eVar42='${loginType}';
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
<script>
var modal = {};

modal.modalBehavior = function(win, $, undefined) {

	var behavior = function() {
		// glommed onto obj so it can be changed at will
		this.o = $('#gray-overlay');
		this.w = $(win).height();
		this.h = $(win).width();		
		
		// main methods	
	 	var setDims = function(o, w, h) {
			$(o).css('width', w );
			$(o).css('height', h );	
		},
		resizeBg = function(w, h, o) {
			$(win).resize( 
				$.throttle(100, function() {
					setDims(o,w,h);
				})
			);	
		},

		setInitialBg = function(w, h, o) {
			var html;
			if ( modal.opts.lockBg === true) {
				html = '<div id="'+ modal.opts.overlayId +'"><iframe src="" allowtransparency="true" frameBorder="0"></iframe></div>';
			} else {
				html = '<div id="'+ modal.opts.overlayId +'"></div>';				
			}
			$('body').prepend( html );
			setDims(o,w,h);
		},
		popModalContent = function( imgPath ) {

			var urlString = /\.jpg|\.jpeg|\.png|\.gif|\.html|\.htm|\.php|\.cfm|\.asp|\.aspx|\.jsp|\.jst|\.rb|\.txt/g;

			var urlType = imgPath.match(urlString);

			if(urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif'){
				//code to show images
				$('body').prepend('<a href="#" class="close-modal">Close</a><div class="modal-content-wrapper"><img src="'+imgPath+'" class="modal-content"></img></div>').hide().fadeIn('200');
			} else {
				var myHeight,myWidth,setHeight,setWidth;
				if( typeof( window.innerWidth ) == 'number' ) { 

				//Non-IE 

				myWidth = window.innerWidth;
				myHeight = window.innerHeight; 

				} else if( document.documentElement && 

				( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) { 

				//IE 6+ in 'standards compliant mode' 

				myWidth = document.documentElement.clientWidth; 
				myHeight = document.documentElement.clientHeight; 

				} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) { 

				//IE 4 compatible 

				myWidth = document.body.clientWidth; 
				myHeight = document.body.clientHeight;

				}
				setWidth = myWidth*.6;
				setHeight = myHeight*.8; 
				
				var iframeForSampleHtml = '<a href="#" class="close-modal">Close</a>' +
							'<div class="modal-content-wrapper">' +
								'<div id="externalframe" style="height: '+setHeight+'px; width: '+setWidth+'px;">' +
									'<iframe class="sampleIframe" src="'+imgPath+'" scrolling="no"></iframe>' + 
								'</div>' + 
							'</div>'; 
				$('body').prepend(iframeForSampleHtml).hide().fadeIn('200');
			}
		};
		return {
			i: function(winWidth, winHeight, o) {
				setInitialBg(w,h,o);
			},
			p: function( img ) {
				popModalContent( img );
			},
			opts: {}
		}
	}(),
	
	init = function(){
		return behavior;
	}; 
	
	return init;
	
}(this, jQuery);

modal.setup = function( m, $, win) {
	
	var addHandlers = function() {		
		$('a[data-modalsrc]').bind('click', function(e) {
			var modalContent = $(e.target).attr('data-modalsrc');
			m.p( modalContent );
			m.i(m.w, m.h, m.o);
			return false;
		});
		
	}, 
	teardownModal = function() {
		$( "body" )
			.bind('teardown', function(e) {
				$('.modal-content-wrapper, #gray-overlay')
					.fadeOut('200',function() {
						$('.close-modal, #gray-overlay, .modal-content-wrapper').remove();
					});				
				return false;
			})
			.click(function(e) {
				$(this).trigger('teardown');
			});

	},
	init = function() {
		addHandlers();
		teardownModal();
	};
	
	return init;
}( modal.modalBehavior(), jQuery, this);

modal.cfg = function(opts) {
	// ... do any special logic here before adding properties to modal object ...
	return {
		lockBg: opts.lockBg,
		overlayId: opts.overlayId		
	}

}



modal.opts = modal.cfg({
	lockBg: false,
	overlayId: 'gray-overlay'
});

modal.setup();

</script>
<style><!--
	#gray-overlay {
			position: fixed;
			display: block;
			background-color: #222;
			z-index: 9999;
			margin: 0;
			padding: 0;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: .9;
			filter: alpha(opacity=90);
			background-position: center center;
			background-repeat: no-repeat;
			background: -webkit-gradient(radial, center center, 0, center center, 60, from(whitesmoke), to(#444));
			background: -webkit-radial-gradient(circle, whitesmoke, #444);
			background: -moz-radial-gradient(circle, whitesmoke, #444);
			background: -ms-radial-gradient(circle, whitesmoke, #444);
		}

		iframe {
			height: 99%;
			width: 99%;
			position: absolute;
			top: 0;
			left: 0;
			padding: 0;
			margin: 0;
			opacity: 0;
			overflow: hidden;
			background-color: transparent;
			z-index: 0;
		}
		.modal-content-wrapper {
			position: fixed;
			width: 100%;
			top: 10%;
			z-index: 9999;
			text-align: center;
		}
		
		iframe.sampleIframe {
			opacity: 1;
			position: relative;
			border: none;
		}

		a.close-modal,
		a.close-modal:hover {
			position: fixed;
			width: 80%;
			top: 5%;
			z-index: 10000;
			text-align: center;
			font: 1.4em/1.3em Helvetica, sans-serif;
			color: white;
			text-transform: uppercase;
			border-bottom: none;			
		}
		
		/* Newsletter re-design rules (move to outside css file after local dev)*/
		.section95 #Col1 {
			width: auto;
		}
		
		div#member-newsletter-subscriptions {			
			width: 75%;
			zoom: 1;
			display: inline-block;
			position: relative;
		}
		.newsletter-name a {
			font-size: 12px;
		}
		.newsletter-description {
			margin-left: 140px;
		}

		#container .form-button, #container .form-button:hover {
			width: 160px;
			height: 35px;
			padding: 4px 0 6px 0;
			font-size: 12px;
			margin-top: 1.5em;
		}
		
		.member-update-newsletters {
			margin-left: 0;
			margin-top: .25em;
		}
		.newsletter-action {
			font-size: 14px;
			font-weight: bold;
		}
		#externalframe{
			width:600px;
			height:500px;
			overflow: hidden;
			margin: auto auto;
		}
		#emailIssues{
			display: none;
		}		
--></style>	 

<!--[if IE 7]>  
<style>
	.view-sample {
		padding: 0;
	}
</style>
<!--<![endif]-->

	
	
</body> 
</html>

