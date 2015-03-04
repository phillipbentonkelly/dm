<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="jp" uri="jptag"%>
<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="c" uri="jstlCore"%>
<%@ taglib prefix="fn" uri="jstlFunctions"%>
<%@ taglib prefix="bg" tagdir="/WEB-INF/tags/eom/SysConfig/WebPortal/BostonGlobe/Framework/tags/custom"%>
<%--
<p:out var="category" value="${param.cat}" />

<!--
ids: ${ids}
-->
<!--ids is an implicit var set by the portal that the contains the last X number of posts from the blog -->
<!-- category: ${category} ids: ${ids} page: ${page}-->
<jp:blogId var="blogId" />
<jp:getBlog blogId="${blogId}" var="blog" />
<c:set value="${blog.metadata}" var="meta" />
<p:out var="container_path" xvalue="$meta//Page/ContainerPath"/>
<p:getObject path="${container_path}" var="dwp" />
<p:out var="container_path" value="${category}~${ids}`${container_path}"/>
<jp:includeContent context="${container_path}" url="$configurationURI/Framework/skins/section/dwp_blogpage/blogpage_standard/blogpage_standard.jpt"/>
 --%>