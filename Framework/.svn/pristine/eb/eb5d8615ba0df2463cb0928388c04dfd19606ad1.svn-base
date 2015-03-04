<%@ page pageEncoding="UTF-8" %>

<%@ taglib prefix="c" uri="jstlCore" %>
<%@ taglib prefix="x" uri="jstlXml" %>
<%@ taglib prefix="fn" uri="jstlFunctions" %>
<%@ taglib prefix="jp" uri="jptag" %> 
<%@ page import="java.util.*" %>
<%@ page import="com.boston.registration.client.*" %>
<%@ page import="com.boston.registration.methode.*" %>
<%@ page import="com.boston.registration.model.db.impl.*" %>
<%@ page import="com.boston.registration.model.db.*" %>
<%@ page import="com.boston.registration.services.inside.errorhandler.*" %>

<c:set value="${cookie['pathAuth'].value}" var="userToken"/>

<%-- Set demographic outside us bean from input form --%>
<jsp:useBean id="demoOutsideUSBean" class="com.boston.registration.model.db.impl.DemographicImpl" scope="request">
	<jsp:setProperty name="demoOutsideUSBean" param="regi_outside_us" property="propBool"/>
	<jsp:setProperty name="demoOutsideUSBean" property="demographicPropertyKey" value="40"/>
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

<c:if test="${userToken != null}">  
 
	<c:set value="${portalContext.env.sitedomain}" var="siteDomain" />
	
	<c:if test="${userToken != null}">  
	
		<%
		    try {    	
		    	  
		    	String siteDomain = (String) pageContext.getAttribute("siteDomain");    
		    	String sUserToken = (String) pageContext.getAttribute("userToken"); 
		 		    	
				InsideClient insideClient = new InsideClient(siteDomain);
				 
				UserResponse userObject = insideClient.getUserByToken(sUserToken);
		    	 
		    	List<DemographicImpl> demographics = new ArrayList();
			    
			    if (demoZipBean.getPropString() != null)
			    	demographics.add(demoZipBean);
			   
			    if (( demoReadershipBean.getPropNum() != null) && (demoReadershipBean.getPropertyListValueKey() != null))
			    	demographics.add(demoReadershipBean);
			    
			    if ( demoOutsideUSBean.getPropBool() != null) { 
			    	 
			    	if ( demoOutsideUSBean.getPropBool().booleanValue() == true ) {
			    	 
			    		DemographicImpl new_demoOutsideUSBean = new DemographicImpl(); 
			    		new_demoOutsideUSBean = demoOutsideUSBean; 
			    		new_demoOutsideUSBean.setPropBool(Boolean.FALSE);
			    		demographics.add(new_demoOutsideUSBean);
			    	} 
			    	else {
			    	 
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
			      
			    DemographicList demographiclist = new DemographicList();
			    demographiclist.setDemographic(demographics); 
			     
			    userObject.demographicList = demographiclist;
			     
				if (sUserToken != null) {
					 
			    	UserResponse result = insideClient.updateUser(userObject);
 
			    	if (result != null) { 
			    		
			    		DemographicList demographicList = result.demographicList;
			    		 
			    		List<DemographicImpl> dlist = demographicList.getDemographic();
			    		  
						if (result.status == 0) {
							response.sendRedirect("regi-email-continue.jsp");
						}else{ 
							response.sendRedirect("regi-service-down.jsp"); 			    			
						}
			    	}
			    }
		    }
		
			catch (Exception ex) {
				response.sendRedirect("regi-service-down.jsp"); 
		    	ex.printStackTrace();
		    }
		%>
 	</c:if>
 </c:if>
 
 