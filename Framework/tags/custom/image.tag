<%@ include file="includes/init.inc" %>

<%@ tag language="java" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="p" uri="ptag"%>

<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object"%>
<%@ attribute name="format" rtexprvalue="true" required="false"%>
<%@ attribute name="value" rtexprvalue="true" required="false"%>
<%@ attribute name="baseDomain" rtexprvalue="true" required="false"%>
<%@ attribute name="var" rtexprvalue="false" required="true"%>

<%@ variable name-from-attribute="var" alias="currentValue" scope="AT_END"  %>
<%@ tag body-content="scriptless" import="java.util.regex.Pattern, java.util.regex.Matcher" %>


<p:out var="mode" value="indirect"/>

<c:choose>
	<c:when test="${not empty path}">
		<p:getObject path="${path}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com"/>
		</c:if>
	</c:when>
	<c:when test="${not empty uuid}">
		<p:getObject uuid="${uuid}" var="obj" onError="ignore" />
		<c:if test="${not empty obj}">
			<p:object webObject="${obj}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com"  />
		</c:if>
	</c:when>
	<c:when test="${not empty webObject}">
		<p:object webObject="${webObject}" content="c" metadata="meta" webType="WT" uuid="StoryID" channel="Boston.com" />
		<p:getObject var="obj" webObject="${webObject}" />
	</c:when>
	<c:otherwise>
		<p:out var="mode" value="direct"/>
	</c:otherwise>
</c:choose>


<c:choose>
	<c:when test="${mode == 'direct'}">
		<p:url var="currentValue" value="${value}" format="${format}"/>
	</c:when>
	<c:otherwise>
		<c:choose>
			<c:when test="${format eq 'image_1920x1190'}">	
				<x:if select="$c//photogrp[@class='main-web-images']/photo[@fileref!='']">
					<p:out var="img" xvalue="$c//multimedia-container/photo-container/photogrp[@class='main-web-images']/photo/@fileref"/>
					<p:url var="currentValue" value="${img}" format="${format}"/>
				</x:if>
			</c:when>
			<c:when test="${format eq 'image_1024c635'}">
				<x:if select="$c//photogrp[@class='main-web-images']/photo[@fileref!='']">
					<p:out var="img" xvalue="$c//multimedia-container/photo-container/photogrp[@class='main-web-images']/photo/@fileref"/>
					<p:url var="currentValue" value="${img}" format="${format}"/>
				</x:if>	
			</c:when>
			<c:when test="${format eq 'image_700c434'}">
				<x:if select="$c//photogrp[@class='main-web-images']/photo[@fileref!='']">
					<p:out var="img" xvalue="$c//multimedia-container/photo-container/photogrp[@class='main-web-images']/photo/@fileref"/>
					<p:url var="currentValue" value="${img}" format="${format}"/>
				</x:if>
			</c:when>
			<c:when test="${format eq 'image_700w'}">
				<x:if select="$c//photogrp[@class='main-web-images']/photo[@fileref!='']">
					<p:out var="img" xvalue="$c//multimedia-container/photo-container/photogrp[@class='main-web-images']/photo/@fileref"/>
					<p:url var="currentValue" value="${img}" format="${format}"/>
				</x:if>
			</c:when>
			<c:when test="${format eq 'image_676x282'}">
				<x:choose>
					<x:when select="$c//photogrp[@class='alt-web-images']/photo[@name='image_676x282'  and @fileref!='']">
						<p:out var="img" xvalue="$c//photogrp[@class='alt-web-images']/photo[@name='image_676x282']/@fileref" />
						<p:url var="currentValue" value="${img}" format="${format}" />
					</x:when>	
					<x:when select="$c//photogrp[@class='main-web-images']/photo[@fileref!='']">
						<p:out var="img" xvalue="$c//multimedia-container/photo-container/photogrp[@class='main-web-images']/photo/@fileref"/>
						<p:url var="currentValue" value="${img}" format="${format}"/>
					</x:when>													
				</x:choose>
			</c:when>
			<c:when test="${format eq 'image_360w'}">
				<x:if select="$c//photogrp[@class='main-web-images']/photo[@fileref!='']">
					<p:out var="img" xvalue="$c//multimedia-container/photo-container/photogrp[@class='main-web-images']/photo/@fileref"/>
					<p:url var="currentValue" value="${img}" format="${format}"/>
				</x:if>
			</c:when>
			<c:when test="${format eq 'image_300x300'}">
				<x:if select="$c//photogrp[@class='main-web-images']/photo[@fileref!='']">
					<p:out var="img" xvalue="$c//multimedia-container/photo-container/photogrp[@class='main-web-images']/photo/@fileref"/>
					<p:url var="currentValue" value="${img}" format="${format}"/>
				</x:if>
			</c:when>
			<c:when test="${format eq 'image_255x106'}">
				<x:choose>
					<x:when select="$c//photogrp[@class='alt-web-images']/photo[@name='image_255x106' and @fileref!='']">
						<p:out var="img" xvalue="$c//photogrp[@class='alt-web-images']/photo[@name=$format]/@fileref"/>
						<p:url var="currentValue" value="${img}" format="${format}" />
					</x:when>	
					<x:when select="$c//photogrp[@class='main-web-images']/photo[@fileref!='']">
						<p:out var="img" xvalue="$c//photogrp[@class='main-web-images']/photo/@fileref"/>
						<p:url var="currentValue"  value="${img}" format="${format}"/>
					</x:when>													
				</x:choose>
			</c:when>
			<c:when test="${format eq 'image_150x93'}">
				<x:choose>
					<x:when select="$c//photogrp[@class='alt-web-images']/photo[@name='image_676x282' and @fileref!='']">
						<p:out var="img" xvalue="$c//photogrp[@class='alt-web-images']/photo[@name=$format]/@fileref"/>
						<p:url var="currentValue"  value="${img}" format="${format}" />
					</x:when>	
					<x:when select="$c//photogrp[@class='main-web-images']/photo[@fileref!='']">
						<p:out var="img" xvalue="$c//photogrp[@class='main-web-images']/photo/@fileref"/>
						<p:url var="currentValue" value="${img}" format="${format}"/>
					</x:when>													
				</x:choose>
			</c:when>
			<c:when test="${format eq 'image_150x84'}">
				<x:choose>
					<x:when select="$c//photogrp[@class='alt-web-images']/photo[@name='image_150x84' and @fileref!='']">
						<p:out var="img" xvalue="$c//photogrp[@class='alt-web-images']/photo[@name=$format]/@fileref"/>
						<p:url var="currentValue" value="${img}" format="${format}"/>
					</x:when>	
					<x:when select="$c//photogrp[@class='main-web-images']/photo[@fileref!='']">
						<p:out var="img" xvalue="$c//photogrp[@class='main-web-images']/photo/@fileref"/>
						<p:url var="currentValue" value="${img}" format="${format}"/>
					</x:when>													
				</x:choose>
			</c:when>
			<c:when test="${format eq 'image_130x80'}">
				<x:if select="$c//photogrp[@class='main-web-images']/photo[@fileref!='']">
					<p:out var="img" xvalue="$c//multimedia-container/photo-container/photogrp[@class='main-web-images']/photo/@fileref"/>
					<p:url var="currentValue" value="${img}" format="${format}"/>
				</x:if>
			</c:when>
			<c:when test="${format eq 'image_50x50'}">
				<x:if select="$c//photogrp[@class='main-web-images']/photo[@fileref!='']">
					<p:out var="img" xvalue="$c//multimedia-container/photo-container/photogrp[@class='main-web-images']/photo/@fileref"/>
					<p:url var="currentValue" value="${img}" format="${format}"/>
				</x:if>
			</c:when>
		</c:choose>
	</c:otherwise>	
</c:choose>


<%
	// all these work for the god damn space
    String path = (String) jspContext.getAttribute("currentValue");
	String basepath="";
	Pattern pattern = Pattern.compile("\\s");
	Matcher matcher = pattern.matcher(basepath);
	boolean found = matcher.find();
	
	if (var != null){
		if (found == true){
			basepath = basepath.replaceAll("\\s", "%20");
			return; 
		} else {
			return; 
		}
			
	}
%>

