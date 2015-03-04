<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:html="http://www.w3.org/Profiles/XHTML-transitional"
	xmlns:met="xalan://com.eidosmedia.portal.util.PortalXsltUtil"
	xmlns:p="xalan://com.eidosmedia.portal.util.PortalXsltExtensions" 
	extension-element-prefixes="p"
	xmlns:xf="xalan://web.CssXform"
	exclude-result-prefixes="xf html met">
	
	
	<xsl:output method="text" indent="yes" encoding="iso-8859-1"/>
	<!-- for servlet start -->
	<xsl:param name="portalPublicUrl"/>
	<xsl:param name="portalContext" />
	
	
	<!-- ***** root ****************************** -->
	<xsl:template match="/">
		<xsl:apply-templates select="*"/>
	</xsl:template>
	
	<!-- ****************** remove anything that might be a note,annotation or should otherwise not show up  ******************* -->
	<xsl:template match="*[contains(@class,'@notes')]"/>

	<xsl:template match="p"> 
		<xsl:apply-templates/> 
		<xsl:value-of select="' '"/> 
	</xsl:template>	

	<xsl:template match="text()"> 
		<xsl:value-of select="."/> 
	</xsl:template> 

	
</xsl:stylesheet>