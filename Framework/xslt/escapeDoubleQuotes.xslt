<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:html="http://www.w3.org/Profiles/XHTML-transitional"
	xmlns:met="xalan://com.eidosmedia.portal.util.PortalXsltUtil"
	xmlns:p="xalan://com.eidosmedia.portal.util.PortalXsltExtensions" 
	extension-element-prefixes="p"
	xmlns:xf="xalan://web.CssXform"
	exclude-result-prefixes="xf html met">
	
	<xsl:preserve-space elements="script"/>
	<xsl:output method="html" indent="yes" encoding="iso-8859-1"/>

	<xsl:template match="/">			
		<xsl:call-template name="escapeQuote"/>
	</xsl:template>
	
	<!-- search for quotes and replace them with single quotes -->
	<xsl:template name="escapeQuote">
      <xsl:param name="text" select="."/>
      <xsl:if test="string-length($text) >0">
       <xsl:value-of select=
        "substring-before(concat($text, '&quot;'), '&quot;')"/>

       <xsl:if test="contains($text, '&quot;')">
        <xsl:text>'</xsl:text>

        <xsl:call-template name="escapeQuote">
          <xsl:with-param name="text" select=
          "substring-after($text, '&quot;')"/>
        </xsl:call-template>
       </xsl:if>
      </xsl:if>
    </xsl:template>
	
</xsl:stylesheet>