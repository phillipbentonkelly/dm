<?xml version="1.0" encoding="utf-8"?><!DOCTYPE EOMSearch>
<xsl:stylesheet version="1.0" 
        xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        xmlns:html="http://www.w3.org/Profiles/XHTML-transitional"
        xmlns:met="xalan://com.eidosmedia.portal.util.PortalXsltUtil"
        xmlns:p="xalan://com.eidosmedia.portal.util.PortalXsltExtensions"
        extension-element-prefixes="p"
        xmlns:xf="xalan://web.CssXform"
        exclude-result-prefixes="xf html met">

<!-- 
{comments}
BDC-1733 - megamenu query optimization
{comments}
-->
 
 
<xsl:param name="date" />
<xsl:param name="meta" />
<xsl:param name="exclude" />
<!-- Extract data from XML Query fragment into variables -->
<xsl:template match="/">

<EOMSearch version="1.0" xmlns="http://EidosMedia.com/EOM/SearchEngine"
	xmlns:se="http://EidosMedia.com/EOM/SearchEngine" xmlns:q="http://EidosMedia.com/EOM/SearchEngine/query"
	xmlns:qm="http://EidosMedia.com/EOM/SearchEngine/query/macro" xmlns:qa="http://EidosMedia.com/EOM/SearchEngine/query/alias"
	xmlns:qui="http://EidosMedia.com/EOM/SearchEngine/query/UI">
	<q:Query type="INDEX">
		<q:Properties>
			<q:Index name="boston@meth01_eomse1"/>
			<q:Index name="wires@meth01_eomse2"/>
			<q:MaxResultItems value="100"></q:MaxResultItems>
			<!-- 20140403 take out pinned <q:Sort on="attributes/ObjectMetadata/OnlineProducts/OnlineProduct/Streams/Stream/Pinned" type="DESCENDING" /> -->
			<q:Sort on="attributes/ObjectMetadata/OnlineProducts/OnlineProduct/LastPublicationDate" type="NDESCENDING"></q:Sort>
		</q:Properties>
		<q:Boolean>
			<ObjectInfo>   
				<q:OR>
					<type>EOM::CompoundStory</type>
					<type>EOM::MediaGallery</type>
					<type>VideoStory</type>					
					<type>WireStory</type>
					<type>EOM::Story</type>
					<type>StreamTease</type>
				</q:OR>
			</ObjectInfo>
			<se:Attributes xmlns="">
				<ObjectMetadata>
					<OnlineProducts>
						<OnlineProduct>
							<ProductName>Boston.com</ProductName>
							<LastPublicationDate q:op="RANGE">
		                        <q:LowValue><qm:TMinDateTime/></q:LowValue>
		                        <q:HighValue>
		                        	<xsl:value-of select="$date" />
		                        </q:HighValue>
				            </LastPublicationDate>													
							<Streams>
								<Stream>
									<Filters>
										<Filter>
											<q:OR>
												<xsl:for-each select="$meta//StreamFilters/Filter">
													<FilterKey q:op="MATCH"><xsl:value-of select="$meta//Slug" />:<xsl:value-of select="FilterSlug" />:Approved</FilterKey>
												</xsl:for-each>
											</q:OR>
										</Filter>
									</Filters>
								</Stream>
							</Streams>							
						</OnlineProduct>
					</OnlineProducts>
				</ObjectMetadata>
			</se:Attributes>
		</q:Boolean>

	</q:Query>
</EOMSearch>


</xsl:template>
</xsl:stylesheet>
