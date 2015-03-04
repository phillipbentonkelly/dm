<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:html="http://www.w3.org/Profiles/XHTML-transitional"
	xmlns:met="xalan://com.eidosmedia.portal.util.PortalXsltUtil"
	xmlns:p="xalan://com.eidosmedia.portal.util.PortalXsltExtensions" 
	extension-element-prefixes="p"
	xmlns:xf="xalan://web.CssXform"
	exclude-result-prefixes="xf html met">
	
	
	<!-- Commented out due to an issue with the highlight of the search term -->
	<xsl:preserve-space elements="script"/>
	<xsl:output method="html" indent="yes" encoding="iso-8859-1"/>
	<!-- for servlet start -->
	<xsl:param name="portalPublicUrl"/>
	<xsl:param name="portalContext" />
	<xsl:param name="ext"/>
	<xsl:param name="baseuri"/>
	<xsl:param name="objectPath"/>
	
	
	<!-- ***** root ****************************** -->
	<xsl:template match="/">
		<xsl:apply-templates select="*"/>
	</xsl:template>
	
	<!-- ****************** remove anything that might be a note,annotation or should otherwise not show up  ******************* -->
	<xsl:template match="*[@class='@notes']" >
		<!-- Hullo Thar <xsl:text></xsl:text> -->
	</xsl:template>
	
	<xsl:template match="fragment">	
		<xsl:value-of select="." disable-output-escaping="yes"/>
	</xsl:template>

</xsl:stylesheet>