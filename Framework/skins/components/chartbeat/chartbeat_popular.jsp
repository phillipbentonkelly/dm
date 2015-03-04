<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="fmt" uri="formatTags" %>
<%@ taglib prefix="x" uri="jstlXml" %>

<p:currentObject metadata="meta" webType="WT" sectionId="section" />
<%-- Do things with the XML --%>

<p:out var="p1MustReads" value="" />
<c:if test="${param.isHomepage}">
  <p:out var="p1MustReads" value="_hp" />
</c:if>

<p:out var="publicBaseUrl" value="${fn:replace(portalContext.publicBaseUrl,'.boston.com','')}" />
<p:out var="xmlUrl" value="http://www.boston.com/partners/chartbeat/chartbeat.xml" />
  <%-- xmlUrl updated to reflect a proper non-Jenkins URL --%>
<c:import url="${xmlUrl}" var="mostPopularXml" />
<x:parse xml="${mostPopularXml}" var="mostPopularParsed" />

<div class="page-module " >
  <div class="page-module-header">Most Popular</div>
  <ol class="headline-list--numbered js-split-list" data-break="[[768,960],[450,700]]">
    <x:forEach var="mostPop" begin="0" end="9" select="$mostPopularParsed/elements/page" varStatus="loop">
      <x:set var="storyLink" select="string($mostPop/@path)" />
      <x:set var="headline" select="string($mostPop/title/text())" />
      <p:out var="scribbleLiveBS" value="no" />
    
      <c:choose>
        <c:when test="${fn:contains(headline, ' - ')}">
          <p:out var="headlineSplit" value="${fn:trim(fn:substringBefore(headline, ' - '))}" />
        </c:when>
        <c:when test="${fn:contains(headline, ' | ')}">
          <p:out var="headlineSplit" value="${fn:trim(fn:substringBefore(headline, ' | '))}" />
        </c:when>
        <c:otherwise>
          <p:out var="headlineSplit" value="${fn:trim(headline)}" />
        </c:otherwise>
      </c:choose>
  
      <c:set var="gigyaRandID"><%= java.lang.Math.round(java.lang.Math.random() * 100000) %></c:set>
      <c:if test="${fn:startsWith(storyLink, 'boston.com') and scribbleLiveBS eq 'no'}">
        <c:set var="storyLink" value="${publicBaseUrl}.${storyLink}" />
      </c:if>
      
      <c:if test="${scribbleLiveBS eq 'yes'}">
        <p:out var="storyLink" value="http://www.${storyLink}" />
      </c:if>
        
      <c:if test="${loop.index > 4}">
        <p:out var="secondaryItem" value=" headline-list__item--secondary" />
      </c:if>
      <c:if test="${loop.index < 5 or param.isHomepage}">
        <li class="headline-list__item${secondaryItem}">
          <a class="headline-list__link" href="${storyLink}?p1=Must_Reads${p1MustReads}">${headlineSplit}</a>
        </li>
      </c:if> 
    </x:forEach>

  </ol>
</div>



