<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ page import="java.util.*" %>
<%@ page import="com.boston.registration.client.*" %>
<%@ page import="com.boston.registration.methode.*" %>
<%@ page import="com.boston.registration.model.db.impl.*" %>
<%@ page import="com.boston.registration.services.inside.errorhandler.*" %>
<%@include file="common/regi-path.jsp" %>

<c:set var="ugcUrl" value="${portalContext.publicBaseUrl}/ugc"/>

<%-- Set user bean from input form --%>
<jsp:useBean id="userBean" class="com.boston.registration.model.db.impl.UserImpl" scope="request">
	<jsp:setProperty name="userBean" param="regi_firstname" property="firstName"/>
	<jsp:setProperty name="userBean" param="regi_lastname" property="lastName"/>
	<jsp:setProperty name="userBean" param="regi_email" property="email"/>
	<jsp:setProperty name="userBean" param="regi_userid" property="id"/>
	<jsp:setProperty name="userBean" param="regi_accountstatus" property="accountStatus"/>	
	<jsp:setProperty name="userBean" param="regi_alias" property="alias"/>
	<jsp:setProperty name="userBean" param="regi_email_subscribe" property="emailListId"/>
	<jsp:setProperty name="userBean" param="regi_authtoken" property="authToken"/>
</jsp:useBean>

<%-- Set password bean from input form --%>
<jsp:useBean id="passwordBean" class="com.boston.registration.model.db.impl.PasswordImpl" scope="request">
	<jsp:setProperty name="passwordBean" param="regi_password" property="newPassword"/>
	<jsp:setProperty name="passwordBean" param="regi_password2" property="confirmNewPassword"/>
</jsp:useBean>
 
<jsp:useBean id="demoJobBean" class="com.boston.registration.model.db.impl.DemographicImpl" scope="request">
	<jsp:setProperty name="demoJobBean" param="regi_job_id" property="propNum"/>
	<jsp:setProperty name="demoJobBean" param="regi_job_id" property="propertyListValueKey"/>	
	<jsp:setProperty name="demoJobBean" property="demographicPropertyKey" value="10"/>
</jsp:useBean>
 
<jsp:useBean id="demoIndustryBean" class="com.boston.registration.model.db.impl.DemographicImpl" scope="request">
	<jsp:setProperty name="demoIndustryBean" param="regi_industry_id" property="propNum"/>
	<jsp:setProperty name="demoIndustryBean" param="regi_industry_id" property="propertyListValueKey"/>	
	<jsp:setProperty name="demoIndustryBean" property="demographicPropertyKey" value="20"/>	
</jsp:useBean>
 
<jsp:useBean id="demoIncomeBean" class="com.boston.registration.model.db.impl.DemographicImpl" scope="request">
	<jsp:setProperty name="demoIncomeBean" param="regi_income_id" property="propNum"/>
	<jsp:setProperty name="demoIncomeBean" param="regi_income_id" property="propertyListValueKey"/>	
	<jsp:setProperty name="demoIncomeBean" property="demographicPropertyKey" value="30"/>	
</jsp:useBean>

<%-- Set demographic outside us bean from input form --%>
<jsp:useBean id="demoOutsideUSBean" class="com.boston.registration.model.db.impl.DemographicImpl" scope="request">
	<jsp:setProperty name="demoOutsideUSBean" param="regi_outside_us" property="propBool"/>
	<jsp:setProperty name="demoOutsideUSBean" property="demographicPropertyKey" value="40"/>
</jsp:useBean>

<%-- Set demographic Birth Year bean from input form. Todo: check num only --%>
<jsp:useBean id="demoBirthYearBean" class="com.boston.registration.model.db.impl.DemographicImpl" scope="request">
	<jsp:setProperty name="demoBirthYearBean" param="regi_birthyear" property="propNum"/>
	<jsp:setProperty name="demoBirthYearBean" property="demographicPropertyKey" value="50"/>
</jsp:useBean>

<%-- Set demographic gender bean from input form --%>
<jsp:useBean id="demoGenderBean" class="com.boston.registration.model.db.impl.DemographicImpl" scope="request">
	<jsp:setProperty name="demoGenderBean" param="regi_gender" property="propString"/>
	<jsp:setProperty name="demoGenderBean" property="demographicPropertyKey" value="60"/>
</jsp:useBean>

<%-- Set demographic zip bean from input form --%>
<jsp:useBean id="demoZipBean" class="com.boston.registration.model.db.impl.DemographicImpl" scope="request">
	<jsp:setProperty name="demoZipBean" param="regi_zip" property="propString"/>
	<jsp:setProperty name="demoZipBean" property="demographicPropertyKey" value="70"/>
</jsp:useBean> 

<%-- Set demographic Readership Id bean from input form. Todo: check num only  --%>
<jsp:useBean id="demoReadershipBean" class="com.boston.registration.model.db.impl.DemographicImpl" scope="request">
	<jsp:setProperty name="demoReadershipBean" param="regi_subscriber_id" property="propNum"/>
	<jsp:setProperty name="demoReadershipBean" param="regi_subscriber_id" property="propertyListValueKey"/>	
	<jsp:setProperty name="demoReadershipBean" property="demographicPropertyKey" value="100"/>	
</jsp:useBean>

<c:set value="${portalContext.env.sitedomain}" var="siteDomain" />


<%

	

    try {    	
    	String siteDomain = (String) pageContext.getAttribute("siteDomain");    	
		InsideClient insideClient = new InsideClient(siteDomain);
	    List<DemographicImpl> demographics = new ArrayList();
	    
	    if (demoZipBean.getPropString() != null)
	    	demographics.add(demoZipBean);
	    
	    if ( demoOutsideUSBean.getPropBool() != null) { 
	    	if ( demoOutsideUSBean.getPropBool().booleanValue() == true ) {
	    		DemographicImpl new_demoOutsideUSBean = new DemographicImpl(); 
	    		new_demoOutsideUSBean = demoOutsideUSBean; 
	    		new_demoOutsideUSBean.setPropBool(Boolean.FALSE);
	    		demographics.add(new_demoOutsideUSBean);
	    	} else {
	    		DemographicImpl new_demoOutsideUSBean = new DemographicImpl(); 
	    		new_demoOutsideUSBean = demoOutsideUSBean; 
	    		new_demoOutsideUSBean.setPropBool(Boolean.TRUE);	    		
	    		demographics.add(new_demoOutsideUSBean);
	    	}
	    } else {
    		DemographicImpl new_demoOutsideUSBean = new DemographicImpl(); 
    		new_demoOutsideUSBean = demoOutsideUSBean; 
    		new_demoOutsideUSBean.setPropBool(Boolean.TRUE);	    		
    		demographics.add(new_demoOutsideUSBean);
	    }
	    
	    if ( demoGenderBean.getPropString() != null)
	    	demographics.add(demoGenderBean);
	    
	    if ( demoBirthYearBean.getPropNum() != null)
	    	demographics.add(demoBirthYearBean);
	    
	    if (( demoReadershipBean.getPropNum() != null) && (demoReadershipBean.getPropertyListValueKey() != null))
	    	demographics.add(demoReadershipBean);
	    
	    if (( demoIncomeBean.getPropNum() != null) && (demoIncomeBean.getPropertyListValueKey() != null))
	    	demographics.add(demoIncomeBean);
	    
	    if (( demoIndustryBean.getPropNum() != null) && (demoIndustryBean.getPropertyListValueKey() != null))
	    	demographics.add(demoIndustryBean);
	    
	    if (( demoJobBean.getPropNum() != null) && (demoJobBean.getPropertyListValueKey() != null))
	    	demographics.add(demoJobBean);
	    
	    DemographicList demographiclist = new DemographicList();
	    demographiclist.setDemographic(demographics);
	    UserResponse obj = new UserResponse();

	    obj.setUser(userBean); 
	    passwordBean.setEmail(userBean.getEmail());	    
	    obj.setPassword(passwordBean);    
	    obj.demographicList = demographiclist;
		       
	    Integer userid = userBean.getId();	    
	    
	    if (userid == 0) {
	    	try {
	    	// add member
	    	UserResponse result = insideClient.insertUser(obj);
	    	
	    	if ((result != null) && (result.status >= 0)) {

	    		String sAuthPath = result.getUser().getAuthToken();
	    		
	    		//set pathAuth cookie
				Cookie pathAuth = new Cookie("pathAuth",sAuthPath);
				pathAuth.setPath("/");
				pathAuth.setDomain(".boston.com");
				// according with BDC-511
				pathAuth.setMaxAge(60 * 60 * 24 * 365 * 4);
				response.addCookie(pathAuth);
	    		
	    		//This is  a workaround for subscribing email lists to new member. Program has to 
	    		//call getMailingList first then subscribe
	    		UserResponse result2 = insideClient.getMailingList(userBean.getEmail());
	    		
	    		if ((userBean.getEmailListId() == null) || (userBean.getEmailListId().length == 0)) {
	    			response.sendRedirect(regipath + "/regi-email-continue.jsp?authtoken="+sAuthPath);
	    		} else {
	    			
	    			String[] mlists = userBean.getEmailListId();
	    			UserResponse subResp = insideClient.subscribeMailingList(userBean.getEmail(),mlists[0]);
	    			response.sendRedirect(regipath + "/boston-deals-register.jsp");
	    			  
	    		}
	    		
	    	} else {	    
	    		if (result != null && result.status == -100) {
		    		response.sendRedirect(regipath + "/login_retry.jsp?error=true&already_registered=true&email="+userBean.getEmail());	    		
	    		} else {
		    		response.sendRedirect(regipath + "/login_retry.jsp?error=true&email="+userBean.getEmail());	    		
	    		}
	    	}	
	    	
	    	} catch (Exception ex) {
	    		
	    		if ((userBean.getEmailListId() == null) || (userBean.getEmailListId().length == 0)) {
	    			response.sendRedirect(regipath + "/regi-login-register.jsp");
	    		} else {
	    			response.sendRedirect(regipath + "/deals-regi-page.jsp");
	    		}
	    		ex.printStackTrace();	    		
	    	}
	    	
	    } else {
	    	
	    	try {	    	
	    		// update member 
	    		UserResponse result = insideClient.updateUser(obj);
			    if(result != null && result.getUser() != null && result.status >= 0) {
			    	// norlov: REGI-907
		    		//set pathAuth cookie
		    		String sAuthPath = result.getUser().getAuthToken();
					pageContext.setAttribute("user1", result.getUser().getAuthToken());
		    		
					Cookie pathAuth = new Cookie("pathAuth", sAuthPath);
					pathAuth.setPath("/");
					pathAuth.setDomain(".boston.com");
					// according with BDC-511
					pathAuth.setMaxAge(60 * 60 * 24 * 365 * 4);
					response.addCookie(pathAuth);
					// norlov: BCOM-9758
				    //set PSyncHint and mock of AT cookies after alias set
				    if (userBean.getAlias() != null && !"".equals(userBean.getAlias())) {
						Cookie pSyncHint = new Cookie("PSyncHint",userBean.getAlias());
						pSyncHint.setPath("/");
						pSyncHint.setDomain(".boston.com");
						pSyncHint.setMaxAge(-1);
						response.addCookie(pSyncHint);
						Cookie at = new Cookie("AT","-");
						at.setPath("/");
						at.setDomain(".boston.com");
						at.setMaxAge(-1);
						response.addCookie(at);
						// norlov: BCOM-11057
						pageContext.setAttribute("syncRequired", Boolean.TRUE);
						pageContext.setAttribute("pathAuth", sAuthPath);
				    }
					
			    }
	    		//System.out.println("mode: "+request.getParameter("mode"));
	    		if (request.getParameter("mode")!=null && request.getParameter("mode").compareTo("partialprofileUpdate")==0) {
		    		if ((result != null) && (result.status >= 0)) {
		    			response.sendRedirect(regipath + "/regi-updatepartialprofile-thankyou.jsp");
		    		} else {
		    			response.sendRedirect(regipath + "/update-account.jsp?error=true&errorcode="+result.status);
		    		}	    		
	    		} else {	    			
		    		if ((result != null) && (result.status >= 0)) {
		    			response.sendRedirect(regipath + "/membercenter-thankyou.jsp?update=profile");
		    		} else {
		    			response.sendRedirect(regipath + "/membercenter-update-info.jsp?error=true&errorcode="+result.status);
		    		}	    		
	    		}	    		
	    		
	    	} catch (Exception ex) {
	    		if (request.getParameter("mode")!=null && request.getParameter("mode").compareTo("partialprofileUpdate")==0) {
	    			response.sendRedirect(regipath + "/update-account.jsp");
	    		}else 
	    			response.sendRedirect(regipath + "/membercenter-update-info.jsp");
	    		ex.printStackTrace();
	    	}
	    }
    } catch (Exception ex) {
    	response.sendRedirect(regipath + "/regi-login-register.jsp");
    	ex.printStackTrace();
    }
%>
<%-- norlov: BCOM-11057 trigger UGC syncUserFromRegiToken to synchronize UGC name with regi screen name --%>
<c:if test="${syncRequired}">
	<c:set var="syncUserUrl" value="${fn:replace(ugcUrl, 'https', 'http')}/users/regiauthtoken/${pathAuth}?sync=true"/>
	<c:import var="syncUserDoc" url="${syncUserUrl}" /> 
</c:if>		