<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:html="http://www.w3.org/Profiles/XHTML-transitional"
	xmlns:met="xalan://com.eidosmedia.portal.util.PortalXsltUtil"
	xmlns:p="xalan://com.eidosmedia.portal.util.PortalXsltExtensions" 
	extension-element-prefixes="p"
	xmlns:xf="xalan://web.CssXform"
	exclude-result-prefixes="xf html met">
	
	<xsl:param name="beforeRelated" />
	<xsl:param name="afterRelated" />
	
	<xsl:if test="$beforeRelated = 'yes'">
		<xsl:template match="content/p[position() = 1]">
			<p class="article-p first-p"><i class="dropcap"><xsl:value-of select="substring(.,1,1)" /></i>
				<xsl:value-of select="substring(.,2)" /></p>
		</xsl:template>
		<xsl:template match="content/p[position() = 2]">
			<p class="article-p"><xsl:apply-templates /></p>
		</xsl:template>
	</xsl:if>
	
	<xsl:if test="$afterRelated = 'yes'">
		<xsl:template match="content/p[position() >= 3]">
			<p class="article-p"><xsl:apply-templates /></p>
		</xsl:template>
	</xsl:if>
	
</xsl:stylesheet>