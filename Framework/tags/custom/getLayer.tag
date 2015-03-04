<%@ tag language="java" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ attribute name="echo" rtexprvalue="false" required="false"%>
<%@ attribute name="webType" rtexprvalue="true" required="true"%>
<%@ attribute name="layerType" rtexprvalue="true" required="true"%>
<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"  %>

<p:out var="requiredAssetsPath" value="/SysConfig/WebPortal/BDC/required_assets.xml"/>
<p:getObject path="${requiredAssetsPath}" var="requiredAssetsObj"/>
<p:object webObject="${requiredAssetsObj}" content="requiredAssets" />

<p:out var="layer" xvalue="$requiredAssets//requirements[@webType=$webType]/layers/*[name()=$layerType]" />
<c:if test="${layer == ''}">
	<p:out var="layer" xvalue="$requiredAssets//requirements[@webType='BLANK']/layers/*[name()=$layerType]" />
</c:if>

<c:set var="currentValue" value="${layer}"/>
<c:if test="${echo == 'true'}">
	${currentValue}
</c:if>