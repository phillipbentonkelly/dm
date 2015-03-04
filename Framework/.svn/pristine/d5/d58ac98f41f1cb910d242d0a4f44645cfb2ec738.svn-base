<%@ taglib prefix="p" uri="ptag"%>

<%@ attribute name="var" rtexprvalue="false" required="true" %>
<%@ attribute name="path" rtexprvalue="true" required="true" %>
<%@ variable name-from-attribute="var" alias="output" scope="AT_END"  %>

<p:getObject path="/SysConfig/Classify/Data/Sections_Boston.xml" var="sections" />

<p:out var="output" xvalue="$sections//Section[SectionPath=$path]/SectionName" />
