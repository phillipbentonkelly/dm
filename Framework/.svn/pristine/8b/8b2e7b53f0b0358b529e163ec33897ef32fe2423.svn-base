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
	<xsl:param name="nextPage"/>
	<xsl:param name="lastPage" />
	<xsl:param name="hasTagline" />
	
	<!-- To break up the story for the new articles -->
	<xsl:param name="startGraf" />
	<xsl:param name="endGraf" />
	
	
	<!-- ***** root ****************************** -->
	<xsl:template match="/">
		<xsl:apply-templates select="*"/>
	</xsl:template>
	
	<!-- ****************** remove anything that might be a note,annotation or should otherwise not show up  ******************* -->
	<xsl:template match="*[contains(@class,'@notes')]"/>
	<xsl:template match="//annotation" />
	<xsl:template match="//quotes" />
	<xsl:template match="//web-quotes" />
	<xsl:template match="//correction" />
	<xsl:template match="//review-container-art" />
	<xsl:template match="//review-container-book" />
	<xsl:template match="//review-container-cd" />
	<xsl:template match="//review-container-concert" />
	<xsl:template match="//review-container-dance" />
	<xsl:template match="//review-container-dvd" />
	<xsl:template match="//review-container-movie" />
	<xsl:template match="//review-container-restaurant" />
	<xsl:template match="//review-containers" />
	<xsl:template match="//review-container-television" />
	<xsl:template match="//review-container-theater" />

	<!-- ***** html elements ****************************** -->
	<xsl:template match="span|div|font|tt|i|b|B|big|small|u|s|strike|em|strong|q|sub|sup|cite|abbr|acronym|hr|blockquote|address|center|ul|dl|ol|li|dt|dd|table|caption|col|colgroup|thead|tfoot|tbody|tr|th|td" name="html-t">
		<xsl:element name="{name()}">
			<!-- <xsl:call-template name="compute-class-t"/>-->
			<xsl:call-template name="process-attributes-default"/> 
			<xsl:apply-templates/>
		</xsl:element>
	</xsl:template>
	
	<xsl:template match="content/p[position() = 1]">
		<p class="article-p first-p"><i class="dropcap"><xsl:value-of select="substring(.,1,1)" /></i>
		<xsl:value-of select="substring(.,2)" /></p>
	</xsl:template>
	
	<xsl:template match="content/p[position() != 1]">
		<p class="article-p"><xsl:apply-templates /></p>
	</xsl:template>
	
	<!--
		// Removing for summaries.
	<xsl:template match="content/p[position() = 3]">
		<p class="article-p"><xsl:apply-templates /></p>
		<p:include uri="$objectPath" styleName="'$configurationURI/Framework/skins/leaf/story/includes/story_related_links.jpt'" />
	</xsl:template>
	-->

	
	
	
	<!-- **** bold **** -->
	<xsl:template match="b">	
		<strong><xsl:apply-templates /></strong>
	</xsl:template>
	
	<!-- **** itals **** -->
	<xsl:template match="i">	
		<em><xsl:apply-templates /></em>
	</xsl:template>
	
	
	
	
	
	
	<!-- **** anchors **** -->
	<xsl:template match="a">
		<a>
			<xsl:choose>
				<xsl:when test="starts-with(@href,'http') or
						substring-after(substring-before(@href,'?'),'.') = 'pdf' or
						substring-after(substring-before(@href,'?'),'.') = 'PDF' or
						substring-after(substring-before(@href,'?'),'.') = 'doc' or 
						substring-after(substring-before(@href,'?'),'.') = 'xls'">
					<xsl:attribute name="target">_blank</xsl:attribute>
					<xsl:attribute name="href">
						<xsl:value-of select="met:digestResourceUrl(0,@href,$portalContext)" />
					</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="href">
						<xsl:value-of select="met:digestPageUrl(0,@href,$portalContext)" />
					</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:apply-templates/>
		</a>
	</xsl:template>
	


	<!-- ********* process-attributes-default ************************** -->
	<xsl:template name="process-attributes-default">
		<!-- <xsl:call-template name="compute-class-t"/> -->
		<xsl:for-each select="@*">
			<xsl:choose>
				<xsl:when test="name()='channel' or name()='altid'">
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="{name()}">
						<xsl:value-of select="string()"/>
					</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:for-each>
	</xsl:template>

	<!-- ***** find and replace template ****************************** -->	
	<xsl:template name="string-replace-all">
		<xsl:param name="text" />
		<xsl:param name="replace" />
		<xsl:param name="by" />
		<xsl:choose>
			<xsl:when test="contains($text, $replace)">
				<xsl:value-of select="substring-before($text,$replace)" />
				<xsl:value-of select="$by" />
				<xsl:call-template name="string-replace-all">
					<xsl:with-param name="text" select="substring-after($text,$replace)" />
					<xsl:with-param name="replace" select="$replace" />
					<xsl:with-param name="by" select="$by" />
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$text" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
  
	<!-- ***** replace all em dashes ****************************** -->
	<xsl:template match="*/text()">
		<xsl:variable name="myVar">
			<xsl:call-template name="string-replace-all">
				<xsl:with-param name="text">
					<xsl:call-template name="string-replace-all">
						<xsl:with-param name="text" select="." />
						<xsl:with-param name="replace" select="' -- '" />
						<xsl:with-param name="by" select="'&#8212;'" />
					</xsl:call-template>
				</xsl:with-param>
				<xsl:with-param name="replace" select="' - '" />
				<xsl:with-param name="by" select="'&#8212;'" />
			</xsl:call-template>
			</xsl:variable>
		<xsl:value-of select="$myVar" /> 	
	</xsl:template>


	<!-- INLINE IMAGES -->
	<xsl:template match="content/photogrp-inline">
		<xsl:variable name="imgSrc" select="photo-inline/@fileref" />
		<xsl:variable name="formattedImage"><xsl:value-of select="met:digestResourceUrl(0,string($imgSrc),'image_329w',$portalContext)"/></xsl:variable>
		<xsl:choose>
			<!-- Left aligned -->
			<xsl:when test="@float='left'">
				<figure class="article-figure-wrap-vert left">
					<img src="" class="article-image">
						<xsl:attribute name="src"><xsl:value-of select="$formattedImage" /></xsl:attribute>
						<xsl:attribute name="alt"><xsl:value-of select="captiongrp/alt-tag/p" /></xsl:attribute>
					</img>
					<figcaption class="article-img-wrap-caption">
						<xsl:value-of select="captiongrp/caption/p" />
					</figcaption>
				</figure>
			</xsl:when>
			<!-- Right aligned -->
			<xsl:when test="@float='right'">
				<figure class="article-figure-wrap-vert">
					<img src="" class="article-image">
						<xsl:attribute name="src"><xsl:value-of select="$formattedImage" /></xsl:attribute>
						<xsl:attribute name="alt"><xsl:value-of select="captiongrp/alt-tag/p" /></xsl:attribute>
					</img>
					<figcaption class="article-img-wrap-caption">
						<xsl:value-of select="captiongrp/caption/p" />
					</figcaption>
				</figure>
			</xsl:when>
			<xsl:otherwise/>
		</xsl:choose>
	</xsl:template>
	
	<!-- Summary-specific info -->
	<xsl:template match="summary/p[position() = 1]">
		<p class="article-p first-p"><i class="dropcap"><xsl:value-of select="substring(.,1,1)" /></i>
		<xsl:value-of select="substring(.,2)" /></p>
	</xsl:template>
	<xsl:template match="summary/p[position() != 1]">
		<p class="article-p"><xsl:apply-templates /></p>
	</xsl:template>
	
	<!-- **** Fragments **** -->
	<xsl:template match="content//fragment">	
		<div class=""><!-- articlePluckHidden -->
			<xsl:value-of select="." disable-output-escaping="yes"/>
		</div>
	</xsl:template>
	
	<xsl:template match="related-link/fragment">	
		<xsl:value-of select="." disable-output-escaping="yes"/>
	</xsl:template>
	
	<xsl:template match="p[@class='@notes']" />
	
</xsl:stylesheet>