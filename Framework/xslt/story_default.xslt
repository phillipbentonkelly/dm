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
	
	
	<!-- ***** article lead ****************************** -->	
	<xsl:template match="content/p[position() = 1]">
		<div class="article-lead">
			<p itemprop="articleBody"><xsl:apply-templates /></p>
		</div>	
		<!-- <p:include uri="$objectPath" styleName="'$configurationURI/Framework/skins/leaf/story/includes/related_content.jpt'" /> -->
		<p:include uri="$objectPath" styleName="'/SysConfig/WebPortal/Boston/Framework/skins/leaf/story/includes/related_content.jpt'" />
	</xsl:template>
	
	<!-- ***** not article lead ****************************** -->
	
	<xsl:template match="content/p[position() != 1][not(child::fragment)]">	
		<p itemprop="articleBody"><xsl:apply-templates /></p>
	</xsl:template>
	
	<xsl:variable name="numPtags" select="count(content/p)" />
	<xsl:template match="content/p[position() = last()][not(child::fragment)]">
		<xsl:if test="$numPtags = 1">
			<p:include uri="$objectPath" styleName="'/SysConfig/WebPortal/Boston/Framework/skins/leaf/story/includes/related_content.jpt'" />
		</xsl:if>
		<div class="last-paragraph"><!-- articlePluckHidden -->
			<p itemprop="articleBody"><xsl:apply-templates />
				<xsl:choose>
					<xsl:when test="$lastPage = 'false'">
						<span class="continued"><a href="">
						<xsl:attribute name="href">
							<xsl:value-of select="$nextPage" />
						</xsl:attribute>
						<xsl:text>Continued...</xsl:text></a></span>
					</xsl:when>
					<xsl:otherwise>
						<xsl:if test="$hasTagline = ''">
							<!-- <img class="storyend" src="/r/SysConfig/WebPortal/Boston/Framework/images/dingbat_story_end_icon.gif" width="6" height="8" alt="end of story marker" /> -->
						</xsl:if>
					</xsl:otherwise>
				</xsl:choose>
			</p>
		</div>
	</xsl:template>
	
	<!-- **** Tagline **** -->
	<xsl:template match="tagline/p" name="tagline">
		<xsl:if test="$hasTagline != ''">
		<div class="endGraph"><!-- articlePluckHidden -->
			<p><em><xsl:apply-templates /></em>
			<!-- 	<img class="storyend"
				src="/r/SysConfig/WebPortal/Boston/Framework/images/site_graphics/dingbat_story_end_icon.gif"
				width="6" height="8" alt="end of story marker" /> -->
			</p>
		</div>
		</xsl:if>
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

	<!-- **** table grafs **** -->
	<xsl:template match="table//p">	
		<p><xsl:apply-templates /></p>
	</xsl:template>
	
	<!-- **** bold **** -->
	<xsl:template match="b">	
		<strong><xsl:apply-templates /></strong>
	</xsl:template>
	
	<!-- **** itals **** -->
	<xsl:template match="i">	
		<em><xsl:apply-templates /></em>
	</xsl:template>
	
	<!-- **** crossheads **** -->
	<xsl:template match="crosshead">	
		<div class="articlePluckHidden">
			<p><span class="crosshead"><xsl:apply-templates /></span></p>
		</div>
	</xsl:template>
	
	<!-- **** questions **** -->
	<xsl:template match="question">	
		<div class="question"><br />
			<span class="q">Q:</span> 
			<xsl:apply-templates />
		</div>
		<!--/end question -->
	</xsl:template>
	
	<!-- **** attribution-name **** -->
	<xsl:template match="attribution-name">	
		<p class="signature"><strong>&#8212; <xsl:apply-templates /></strong></p>
	</xsl:template>
	
	<!-- **** answers **** -->
	<xsl:template match="answer">	
		<div class="answer"><br />
			<span class="a">A:</span> 
			<xsl:apply-templates />
		</div>
		<!--/end answer -->
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


	
	<xsl:template match="content/photogrp-inline">
		<xsl:choose>
			<xsl:when test="@float='left'">
				<figure class="left">
					<img src=""> 
						<xsl:variable name="imgSrc" select="photo-inline/@fileref"/> 
						<xsl:attribute name="src"><xsl:value-of select="met:digestResourceUrl(0,string($imgSrc),'image_329w',$portalContext)"/></xsl:attribute> 
						<!-- <xsl:attribute name="width"><xsl:value-of select="photo-inline/@width"/></xsl:attribute> --> 
						<xsl:attribute name="title"><xsl:value-of select="captiongrp/caption/p"/></xsl:attribute> 
						<xsl:attribute name="alt"><xsl:value-of select="captiongrp/caption/p"/></xsl:attribute>
					</img>
					<!-- <div class="credit"><xsl:value-of select="captiongrp/credit/p"/></div> -->
					<figcaption>
						<span class="image-credit"><xsl:value-of select="captiongrp/credit/p"/></span>
						<span class="image-caption"><xsl:value-of select="captiongrp/caption/p"/></span>
					</figcaption>
				</figure>
			</xsl:when>
			<xsl:when test="@float='right'">
				<figure class="right">
					<img src=""> 
						<xsl:variable name="imgSrc" select="photo-inline/@fileref"/> 
						<xsl:attribute name="src"><xsl:value-of select="met:digestResourceUrl(0,string($imgSrc),'image_329w',$portalContext)"/></xsl:attribute> 
						<!-- <xsl:attribute name="width"><xsl:value-of select="photo-inline/@width"/></xsl:attribute> --> 
						<xsl:attribute name="title"><xsl:value-of select="captiongrp/caption/p"/></xsl:attribute> 
						<xsl:attribute name="alt"><xsl:value-of select="captiongrp/caption/p"/></xsl:attribute> 
					</img>
					<figcaption>
						<span class="image-credit"><xsl:value-of select="captiongrp/credit/p"/></span>
						<span class="image-caption"><xsl:value-of select="captiongrp/caption/p"/></span>
					</figcaption>
				</figure>
			</xsl:when>
			<xsl:otherwise/>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template match="p[@class='@notes']" />
	
</xsl:stylesheet>