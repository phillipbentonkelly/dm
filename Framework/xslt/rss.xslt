<?xml version="1.0" encoding="iso-8859-1"?>

<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:str="http://exslt.org/strings"
	xmlns:met="xalan://com.eidosmedia.portal.util.PortalXsltUtil"
	exclude-result-prefixes="str met">

	<xsl:output method="xml" omit-xml-declaration="yes" media-type="*//raw" />

	<xsl:template match="rss">
		<rss version="2.0">
			<channel>
				<title><xsl:value-of select="channel/title" /></title>
				<link><xsl:value-of select="//rss/channel/link" /></link>
				<!-- <description><xsl:value-of select="channel/description" /></description> -->
				<language>en-us</language>
				<copyright>Copyright 2014</copyright>
				<generator>Methode</generator>
				<xsl:copy-of select="//item" />
			</channel>
		</rss>
	</xsl:template>
	      
	

	<xsl:param name="portalContext" />
	<xsl:param name="portalPublicUrl" />	
		<xsl:template match="doc">
			<xsl:if test="story">
				<xsl:for-each select="story">
					<item>
						<title>
							<xsl:value-of select="headlines/headline/p" />
						</title>
						<description>
							<xsl:choose>
								<xsl:when test="//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/WebType = 'summarystory' and //OnlineProducts/StubStatus = '3'">
									<xsl:value-of select="text/content/p" />
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="summary/p" />
								</xsl:otherwise>
							</xsl:choose>
						</description>
						<link><xsl:value-of select="met:digestPublicPageUrl(0,//sys/path,$portalContext)" /></link>
						<guid><xsl:value-of select="met:digestPublicPageUrl(0,//sys/path,$portalContext)" /></guid>
						<categories>
						<xsl:for-each select="//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/Sections/Section/SubSections/SubSection/@title">
							<category>
								<xsl:value-of select="." />
							</category>
						</xsl:for-each>
						</categories>						
						<pubDate><xsl:value-of select="met:parseDate(//sys/timeModified,'secs','gmt')" /></pubDate>
					</item>
				</xsl:for-each>
			</xsl:if>
		</xsl:template>
</xsl:stylesheet>