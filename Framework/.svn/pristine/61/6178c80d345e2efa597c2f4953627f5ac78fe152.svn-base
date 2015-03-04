<%@ include file="includes/init.inc"%>
<%@ tag body-content="scriptless" import="
  org.w3c.dom.Document, 
  org.w3c.dom.Element,
  org.w3c.dom.Node,
  org.w3c.dom.NodeList,
    java.util.ArrayList,
    java.util.LinkedHashSet,
    java.util.LinkedList,
    java.util.List,
    java.util.ListIterator,
    java.util.Map,
    
    java.io.ByteArrayInputStream,
    java.io.ByteArrayOutputStream,
    java.io.StringWriter,
  java.io.File,
  java.io.FileInputStream,
com.eidosmedia.eomcache.ObjectId,
com.eidosmedia.portal.util.PortalEscapeUtils,
javax.servlet.jsp.PageContext,
javax.servlet.jsp.JspWriter,
javax.servlet.jsp.JspException,
javax.servlet.jsp.tagext.TagSupport,
com.eidosmedia.portal.jsp.tag.UrlTag,
    javax.xml.xpath.*,    
    javax.xml.parsers.DocumentBuilderFactory,
    javax.xml.parsers.DocumentBuilder,

com.eidosmedia.portal.url.BaseUrl,
com.eidosmedia.portal.url.PortalMetaUrl,
com.eidosmedia.portal.url.PortalUrl,
com.eidosmedia.portal.url.PortalUrlType,
com.eidosmedia.portal.url.UrlDomain,
com.eidosmedia.portal.url.UrlVariant,

  
    javax.xml.transform.Transformer,
    javax.xml.transform.TransformerConfigurationException,
    javax.xml.transform.TransformerException,
    javax.xml.transform.TransformerFactory,
    javax.xml.transform.dom.DOMSource,
    javax.xml.transform.stream.StreamResult,
    javax.xml.transform.stream.StreamSource,
    javax.xml.transform.OutputKeys,

    com.eidosmedia.portal.PortalContext,
    com.eidosmedia.portal.context.UrlResolver,
    com.eidosmedia.portal.util.PortalWebObjectWrapper,
    com.eidosmedia.portal.util.ObjectResolver,                                      
    com.eidosmedia.wa.render.WebObject,
    com.eidosmedia.wa.render.WebObjectImpl,
    com.eidosmedia.wa.render.WebType,
    
    com.eidosmedia.wa.render.WebZone,
    com.eidosmedia.wa.render.WebTypeTemplate,
    com.eidosmedia.eomcache.ObjectProxy,
    com.eidosmedia.eomcache.proxies.data.XMLData,
    com.eidosmedia.portal.render.impl.cached.MetaOutputBuilder,
    com.eidosmedia.misc.xpath.AbstractXPathHelper,
    com.eidosmedia.misc.URIUtil,
    java.net.URLConnection,

com.eidosmedia.eomcache.CacheAccessId,
com.eidosmedia.eomcache.ObjectProxy,
com.eidosmedia.eomcache.protocols.EOMCacheURLConnection,
com.eidosmedia.eomcache.proxies.data.ObjectProxyData,
com.eidosmedia.eomcache.proxies.data.XSLData,
com.eidosmedia.portal.render.impl.cached.Content,
com.eidosmedia.misc.UnsafeDocumentBuilderFactory,
com.eidosmedia.portal.jsp.tag.util.OutTagFragment,

com.eidosmedia.portal.xslt.PortalXsltContext,
org.apache.log4j.Logger,
    
    java.net.URL,
    org.apache.xerces.dom.AttrNSImpl
" %>

<%@ taglib prefix="p" uri="ptag"%>
<%@ taglib prefix="c" uri="jstlCore"%>

<%@ attribute name="var" rtexprvalue="false" required="true"%>
<%@ attribute name="path" rtexprvalue="true" required="false"%>
<%@ attribute name="uuid" rtexprvalue="true" required="false"%>
<%@ attribute name="loid" rtexprvalue="true" required="false"%>
<%@ attribute name="webObject" rtexprvalue="true" required="false" type="java.lang.Object" %>
<%@ attribute name="filterZone" rtexprvalue="true" required="false"%>

<%@ variable name-from-attribute="var" alias="output" scope="AT_END"%>
  
<c:choose>
  <c:when test="${not empty path}">
    <p:getObject path="${path}" var="obj" onError="ignore" />
  </c:when>
  <c:when test="${not empty uuid}">
    <p:getObject uuid="${uuid}" var="obj" onError="ignore" />
  </c:when>
  <c:when test="${not empty loid}">
    <p:getObject loid="${loid}" var="obj" onError="ignore" />
  </c:when>
  <c:when test="${not empty webObject}">
    <p:getObject webObject="${webObject}" var="obj"  />
  </c:when>
  <c:when test="${empty filterZone}">
    <p:out var="filterZone" value="not-set" />
  </c:when>
  <c:otherwise>
    <p:getObject webObject="${currentObject}" var="obj"  />
  </c:otherwise>
</c:choose>

<p:out var="configurationURI" xvalue="$configurationURI"/>
<c:import var="dfps" url="/fragment/SysConfig/WebPortal/BDC/Framework/feeds/placester/utils/getDPFSettingsXML.jpt"/>
<x:parse var="dfpDoc" doc="${dfps}"/>

<p:out var="configurationURI" xvalue="$configurationURI"/>
<% 
//DM 219
final class PlacesterElement {

    PortalWebObjectWrapper objectWrapper;
    WebObject webObject;
    ObjectResolver objectResolver;
    PortalContext portalContext;
    MetaOutputBuilder outputBuilder;
    String filterZone;

    Map result;
    Map resultItems;

    public PlacesterElement(PortalWebObjectWrapper objectWrapper) throws Exception {
      this.filterZone = "not-set";
      this.portalContext = PortalContext.instance();
      this.objectResolver = this.portalContext.getObjectResolver();
      
      this.initVariables();
      this.init((WebObject) objectWrapper.getWebObject());

    }
    public PlacesterElement(WebObject webObject) throws Exception {
     this.filterZone = "not-set";
      this.portalContext = PortalContext.instance();
      this.objectResolver = this.portalContext.getObjectResolver();
      
      this.initVariables();
      this.init((WebObject) webObject);

    }
    public PlacesterElement(PortalWebObjectWrapper objectWrapper, String pfilterZone) throws Exception {
      this.filterZone = pfilterZone;
      this.portalContext = PortalContext.instance();
      this.objectResolver = this.portalContext.getObjectResolver();
      
      this.initVariables();
      this.init((WebObject) objectWrapper.getWebObject());
    }
    public PlacesterElement(WebObject webObject, String pfilterZone) throws Exception {
      this.filterZone = pfilterZone;
      this.portalContext = PortalContext.instance();
      this.objectResolver = this.portalContext.getObjectResolver();
      
      this.initVariables();
      this.init((WebObject) webObject);
    }


    public void getObjectComponents() throws Exception {

      Document _meta = this.getMetadata(this.webObject);
      Document _doc = this.getDocument(this.webObject);

      //String _ObjectType = getValue(_meta, "//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/WebType");
      //String _ObjectTitle = getValue(_meta, "//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/Title");
      //String _ObjectMediaName = getValue(_meta, "//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/MediaName");

      //this.result.put("id", this.webObject.getLoid());
      //this.result.put("title", _ObjectTitle);
      //this.result.put("type", _ObjectType);
      
      Map thisDetail = this.getObjectDetail(this.webObject,"parent",true);
      
      Object thisDetailObj[] = thisDetail.keySet().toArray();

      for (int i = 0; i < thisDetail.size(); i++) {
          String _propName = (String)thisDetailObj[i];
          this.result.put(_propName,thisDetail.get(_propName));
      }
 
      String _ObjectCanonicalUrl = getValue(_meta, "//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/CanonicalUrl");
      try {
      	  if (_ObjectCanonicalUrl.equals("") || _ObjectCanonicalUrl.isEmpty()) {
    	  	this.result.put("link",this.getURL(this.webObject));
      	  } else {
      		this.result.put("link",_ObjectCanonicalUrl);
      	  }
          //this.result.put("link", url.byPageId((String)this.webObject.getLoid()));
        } catch (Exception ex) {
          this.result.put("error", ex);
        }


      ArrayList _zones = this.getZones();

      for (int a = 0; a < _zones.size(); a++) {
        Map _zone = this.getZoneContent((String) _zones.get(a));
        ArrayList<Map> ZoneItems = new ArrayList<Map>();
        //Get all zone objects
        for (WebObject zoneElement: (List < WebObject > ) _zone.get("items")) {
          if ((this.filterZone== null) || (this.filterZone.equals("not-set") || (this.filterZone.indexOf((String) _zones.get(a)) >= 0))) {
            Map zoneElementDetail = this.getObjectDetail(zoneElement, (String) _zones.get(a));
            //this.resultItems.put("hi",a);
            //this.resultItems.put((String) _zones.get(a),(Map)zoneElementDetail);
            ZoneItems.add(zoneElementDetail);
          } 
        }
        if (ZoneItems.size() > 0)
        	this.resultItems.put((String) _zones.get(a),ZoneItems);
      }
    }
    public String getURL(WebObject paramObj) throws Exception {
      try {
        UrlResolver urlResolver = portalContext.getUrlResolver();
        MetaOutputBuilder outputBuilder = (MetaOutputBuilder)jspContext.getAttribute("com.eidosmedia.portal.jsp.PortalSupport.OUTPUT_BUILDER", 2);
        Content content = (Content)jspContext.getAttribute("com.eidosmedia.portal.jsp.PortalSupport.PORTAL_OBJECT", 2);
  
        ObjectProxy proxy = this.objectResolver.resolveByLoidEx(paramObj.getLoid());
  
        PortalUrl pUrl = urlResolver.evalUrl(proxy, PortalUrlType.page, null, null, outputBuilder);
        BaseUrl baseUrl = BaseUrl.absolute;
        
        
      return pUrl.resolve(baseUrl);
      } catch (Exception ex) {
      }

      return "";
    }
    public String getURL(String paramURL) throws Exception {
      return this.getURL(paramURL, null);
    }
    public String getURL(String paramURL, String paramFormat) throws Exception {
      try {
        UrlResolver urlResolver = portalContext.getUrlResolver();
        MetaOutputBuilder outputBuilder = (MetaOutputBuilder)jspContext.getAttribute("com.eidosmedia.portal.jsp.PortalSupport.OUTPUT_BUILDER", 2);
        Content content = (Content)jspContext.getAttribute("com.eidosmedia.portal.jsp.PortalSupport.PORTAL_OBJECT", 2);
          
        BaseUrl baseUrl = BaseUrl.absolute;
        
        ObjectProxy proxy = objectResolver.tryResolveByMethodeUriWithUUID(null, paramURL);
        PortalUrl pUrl = urlResolver.evalUrl(proxy, PortalUrlType.resource, UrlVariant.parseFormat(paramFormat), null, outputBuilder);
        //PortalUrl pUrl = urlResolver.evalResourceUrlByObjectProxy(objectProxy,null,null);

        return pUrl.resolve(baseUrl);
      
      } catch (Exception ex) {
      }

      return "";
          
    }
    public Map getObjectDetail(WebObject paramObj, String paramZone) throws Exception {
      return getObjectDetail(paramObj,paramZone,false);
    }
    
    public Map getObjectDetail(WebObject paramObj, String paramZone, boolean paramNoSubItems) throws Exception {
      Map _return = new HashMap();

      Map _image = new HashMap();

      Document _meta = this.getMetadata(paramObj);
      Document _doc = this.getDocument(paramObj);


      String _ObjectSystemType = getValue(_meta,"//sys/type");
      String _ObjectType = getValue(_meta, "//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/WebType");
      String _ObjectTitle = getValue(_meta, "//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/Title");
      String _ObjectMediaName = getValue(_meta, "//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/MediaName");
      String _ObjectSource = getValue(_meta, "//ObjectMetadata/Source");
      String _ObjectXRef = getValue(_doc, "//story/xref");
      String _ObjectLink=getURL(paramObj);
      String _ObjectCanonicalUrl = getValue(_meta, "//OnlineProducts/OnlineProduct[child::ProductName='Boston.com']/CanonicalUrl");
      
      _return.put("canonicalURL",_ObjectCanonicalUrl);
      
      //Fix URL
      if ( !(_ObjectCanonicalUrl.equals("")) || !(_ObjectCanonicalUrl.isEmpty()))
    	  _ObjectLink = _ObjectCanonicalUrl;

      String _ObjectStoryDFPAdPosition = getValue(_meta, "//DfpAdPosition");

      

      String _ObjectText = getValue(_doc, "//document-root");

      String _ObjectStoryHeadline = getValue(_doc, "//doc/story/headlines/headline");
      String _ObjectEditorialLeadIn = getValue(_meta, "//Editorial/LeadIn");

      String _ObjectStoryBody = getValue(_doc, "//text/content", "/Framework/xslt/bdc_story_default_new.xslt");
      String _ObjectStoryWebTease = getValue(_doc, "//doc/story/web-tease");
      String _ObjectStoryStreamTease = getValue(_doc, "//doc/story/stream-tease");
      if (_ObjectStoryBody.isEmpty()) {
        _ObjectStoryBody = _ObjectStoryWebTease;
        if (_ObjectStoryBody.isEmpty()) {
          _ObjectStoryBody = _ObjectStoryStreamTease;
        }
      }


      String _ObjectMainImageClass = getValue(_doc, "//photogrp[@class='main-web-images']/@class");
      String _ObjectMainImageCaption = getValue(_doc, "//photogrp[@class='main-web-images']/captiongrp/caption/p");
      String _ObjectMainImageCredit = getValue(_doc, "//photogrp[@class='main-web-images']/captiongrp/credit/p");
      String _ObjectMainImageFormat = getValue(_doc, "//photogrp[@class='main-web-images']/photo[@fileref!='']/@name");
      String _ObjectMainImageURL = getURL((String)getValue(_doc, "//photogrp[@class='main-web-images']/photo[@fileref!='']/@fileref"),_ObjectMainImageFormat);
      String _ObjectMainImageRawURL = getURL((String)getValue(_doc, "//photogrp[@class='main-web-images']/photo[@fileref!='']/@fileref"));

      if (_ObjectMainImageCaption.isEmpty() || _ObjectMainImageCaption.isEmpty()) _ObjectMainImageCaption = getValue(_doc, "//photogrp[@class='main-web-images']/captiongrp/caption");


      String _ObjectSEOInformationSummary = getValue(_meta, "//ObjectMetadata/SEOInformation/Summary");
      String _ObjectSEOInformationHeadline = getValue(_meta, "//ObjectMetadata/SEOInformation/Headline");

      
      //Common items between all the types
      _return.put("id", paramObj.getLoid());
      _return.put("type", _ObjectType);
      _return.put("title", _ObjectTitle);
      _return.put("zone", paramZone);
      _return.put("path", paramObj.getPath());
      _return.put("xref",_ObjectXRef);

      //SEO Information
      Map _ObjectSEOInformation = new HashMap();
    _ObjectSEOInformation.put("summary",_ObjectSEOInformationSummary);
    _ObjectSEOInformation.put("headline",_ObjectSEOInformationHeadline);

      if (!((_ObjectSEOInformationSummary.equals("") || _ObjectSEOInformationSummary.isEmpty()) && 
          (_ObjectSEOInformationHeadline.equals("") || _ObjectSEOInformationHeadline.isEmpty())
    )) {
        _return.put("SEOInformation",_ObjectSEOInformation);
      }
      //All Regular Images
      ArrayList<Document> _DocumentImages = getDocument(_doc, "//photogrp/photo[@fileref!='']/..");
      ArrayList<Map> _ObjectAllImages = new ArrayList<Map>();
      for (int i = 0; i < _DocumentImages.size(); i++) {
        Map _ObjectAllImagesImage = new HashMap();
        Document _imageDoc = (Document)_DocumentImages.get(i);
          String _ObjectAllImagesImageClass = getValue(_imageDoc, "/@class");
          String _ObjectAllImagesImageCaption = getValue(_imageDoc, "//captiongrp/caption", "/Framework/xslt/bdc_story_default_new.xslt");
          String _ObjectAllImagesImageCredit = getValue(_imageDoc, "//captiongrp/credit");
          String _ObjectAllImagesImageFormat = getValue(_imageDoc, "//photo[@fileref!='']/@name");
          String _ObjectAllImagesImageURL = getURL((String)getValue(_imageDoc, "//photo[@fileref!='']/@fileref"),_ObjectAllImagesImageFormat);
          String _ObjectAllImagesImageRawURL = getURL((String)getValue(_imageDoc, "//photo[@fileref!='']/@fileref"));
        
          _ObjectAllImagesImage.put("--class", _ObjectAllImagesImageClass);
          _ObjectAllImagesImage.put("--format", _ObjectAllImagesImageFormat);
          _ObjectAllImagesImage.put("--medium", "image");
          _ObjectAllImagesImage.put("url", _ObjectAllImagesImageURL);
          _ObjectAllImagesImage.put("rawUrl", _ObjectAllImagesImageRawURL);
          _ObjectAllImagesImage.put("credit", _ObjectAllImagesImageCredit);
          _ObjectAllImagesImage.put("caption", _ObjectAllImagesImageCaption);
          _ObjectAllImagesImage.put("order", i+1);
          _ObjectAllImagesImage.put("type", "attachment");
          _ObjectAllImages.add(_ObjectAllImagesImage);
      }
      if (_DocumentImages.size() > 0)
          _return.put("images", _ObjectAllImages);

      
      _DocumentImages = getDocument(_doc, "//photogrp-inline[@channel='Boston.com']/photo-inline[@fileref!='']/..");
      _ObjectAllImages = new ArrayList<Map>();
      for (int i = 0; i < _DocumentImages.size(); i++) {
        Map _ObjectAllImagesImage = new HashMap();
        Document _imageDoc = (Document)_DocumentImages.get(i);
          String _ObjectAllImagesImageClass = getValue(_imageDoc, "/@class");
          String _ObjectAllImagesImageCaption = getValue(_imageDoc, "//captiongrp/caption", "/Framework/xslt/bdc_story_default_new.xslt");
          String _ObjectAllImagesImageCredit = getValue(_imageDoc, "//captiongrp/credit");
          String _ObjectAllImagesImageFormat = getValue(_imageDoc, "//photo-inline[@fileref!='']/@name");
          String _ObjectAllImagesImageURL = getURL((String)getValue(_imageDoc, "//photo-inline[@fileref!='']/@fileref"),_ObjectAllImagesImageFormat);
          String _ObjectAllImagesImageRawURL = getURL((String)getValue(_imageDoc, "//photo-inline[@fileref!='']/@fileref"));
        
          _ObjectAllImagesImage.put("--class", _ObjectAllImagesImageClass);
          _ObjectAllImagesImage.put("--format", _ObjectAllImagesImageFormat);
          _ObjectAllImagesImage.put("--medium", "image");
          _ObjectAllImagesImage.put("url", _ObjectAllImagesImageURL);
          _ObjectAllImagesImage.put("rawUrl", _ObjectAllImagesImageRawURL);
          _ObjectAllImagesImage.put("credit", _ObjectAllImagesImageCredit);
          _ObjectAllImagesImage.put("caption", _ObjectAllImagesImageCaption);
          _ObjectAllImagesImage.put("order", i+1);
          _ObjectAllImagesImage.put("type", "inline");
          _ObjectAllImages.add(_ObjectAllImagesImage);
      }      
      //All Inline Images
      if (_DocumentImages.size() > 0)
        _return.put("inlineImages", _ObjectAllImages);

      
      //Keywords
      ArrayList<Document> _DocumentKeywords = getDocument(_meta, "//ObjectMetadata/Categorization/Keywords/Keyword");
      ArrayList<String> _ObjectAllKeywords = new ArrayList<String>();
      
      for (int i = 0; i < _DocumentKeywords.size(); i++) {
        Document _keywordDoc = (Document)_DocumentKeywords.get(i);
          String _ObjectAllKeywordsKeyword = getValue(_keywordDoc, ".");

          _ObjectAllKeywords.add(_ObjectAllKeywordsKeyword);
      }
      if (_DocumentKeywords.size() > 0)
        _return.put("keywords", _ObjectAllKeywords);

      //Taxonomies
      ArrayList<Document> _DocumentTaxonomies = getDocument(_meta, "//Categorization/Taxonomies/Taxonomy");
      ArrayList<String> _ObjectAllTaxonomies = new ArrayList<String>();
    
      for (int i = 0; i < _DocumentTaxonomies.size(); i++) {
        Document _taxonomyDoc = (Document)_DocumentTaxonomies.get(i);
        String _ObjectAllTaxonomiesTaxonomy = getValue(_taxonomyDoc, ".");
        if (!_ObjectAllTaxonomiesTaxonomy.equals("") || !_ObjectAllTaxonomiesTaxonomy.isEmpty())
          _ObjectAllTaxonomies.add(_ObjectAllTaxonomiesTaxonomy);

      }      

      if (_ObjectAllTaxonomies.size() > 0)
        _return.put("taxonomies", _ObjectAllTaxonomies);

      Document _dfp = (Document)jspContext.getAttribute("dfpDoc");
      ArrayList<Document> allDFP = (ArrayList<Document>)getDocument(_dfp, "//dfp[@loid='" + paramObj.getLoid() + "']");
      
      if (allDFP.size() > 0) {
        _dfp = (Document)allDFP.get(0);

        String _ObjectDFPNetworkCode = getValue(_dfp,"//network-code");
        String _ObjectDFPAdUnit = getValue(_dfp,"//ad-unit");
        String _ObjectDFPAdSlots = getValue(_dfp,"//ad-slots");
        String _ObjectDFPAdFrequency = getValue(_dfp,"//ad-frequency");
        String _ObjectDFPGalleryAdFrequency = getValue(_dfp,"//gallery-ad-frequency");
        String _ObjectDFPCityName= getValue(_dfp,"//city-name");
        String _ObjectDFPKeyValuePairsS1 = getValue(_dfp,"//key-value-pairs/s1");
        String _ObjectDFPKeyValuePairsS2 = getValue(_dfp,"//key-value-pairs/s2");
        String _ObjectDFPKeyValuePairsS3 = getValue(_dfp,"//key-value-pairs/s3");
        String _ObjectDFPKeyValuePairsS4 = getValue(_dfp,"//key-value-pairs/s4");
        String _ObjectDFPKeyValuePairsS5 = getValue(_dfp,"//key-value-pairs/s5");
        String _ObjectDFPKeyValuePairsPageType = getValue(_dfp,"//key-value-pairs/page-type");
        String _ObjectDFPKeyValuePairsPageURL = getValue(_dfp,"//key-value-pairs/page-URL");
        String _ObjectDFPKeyValuePairsMeta = getValue(_dfp,"//key-value-pairs/meta");
        String _ObjectDFPKeyValuePairsStreamCount = getValue(_dfp,"//key-value-pairs/stream-count");
        
        if (_ObjectDFPKeyValuePairsMeta.equals("") && _ObjectType.equals("dwp_placester_category"))
        	_ObjectDFPKeyValuePairsMeta = getValue(_meta,"//SectionDisplayName");
        	
        Map _ObjectDFP = new HashMap();
        _ObjectDFP.put("networkCode",_ObjectDFPNetworkCode);
        _ObjectDFP.put("adUnit",_ObjectDFPAdUnit);
        _ObjectDFP.put("adSlots",_ObjectDFPAdSlots);
        _ObjectDFP.put("adFrequency",_ObjectDFPAdFrequency);
        _ObjectDFP.put("galleryAdFrequency",_ObjectDFPGalleryAdFrequency);
        _ObjectDFP.put("cityName",_ObjectDFPCityName);
        Map _ObjectDFPKeyValuePairs = new HashMap();
        _ObjectDFPKeyValuePairs.put("s1",_ObjectDFPKeyValuePairsS1);
        _ObjectDFPKeyValuePairs.put("s2",_ObjectDFPKeyValuePairsS2);
        _ObjectDFPKeyValuePairs.put("s3",_ObjectDFPKeyValuePairsS3);
        _ObjectDFPKeyValuePairs.put("s4",_ObjectDFPKeyValuePairsS4);
        _ObjectDFPKeyValuePairs.put("s5",_ObjectDFPKeyValuePairsS5);
        _ObjectDFPKeyValuePairs.put("pageType",_ObjectDFPKeyValuePairsPageType);
        _ObjectDFPKeyValuePairs.put("pageURL",_ObjectDFPKeyValuePairsPageURL);
        _ObjectDFPKeyValuePairs.put("meta",_ObjectDFPKeyValuePairsMeta);
        _ObjectDFPKeyValuePairs.put("streamCount",_ObjectDFPKeyValuePairsStreamCount);

        _ObjectDFP.put("keyValuePairs",_ObjectDFPKeyValuePairs);

        _return.put("dfp",_ObjectDFP);
        
        //Get Omniture Info
        if (_ObjectDFPAdUnit != null && !_ObjectDFPAdUnit.equals("") && !_ObjectDFPAdUnit.isEmpty()) {
        	Document _omniture = getDocument("/SysConfig/Classify/Data/Sections_Boston.xml");
        	ArrayList<Document> entireSection;
        	if (_ObjectType.equals("story")) {
				entireSection = (ArrayList<Document>)getDocument(_omniture,"//Section[SectionAdTagGenericPage='" + _ObjectDFPAdUnit + "']");
        	} else {
        		entireSection = (ArrayList<Document>)getDocument(_omniture,"//Section[SectionAdTagIndexPage='" + _ObjectDFPAdUnit + "']");
        	}
        	if (entireSection.size() >= 1) {
        		Document _sect = (Document)entireSection.get(0);
        		String _ObjectSectionTracking = getValue(_sect,"//SectionTracking");
        		String _ObjectOmnitureValue = _ObjectSectionTracking.toLowerCase();
        		//_return.put("sectionTracking",_ObjectSectionTracking);
        		_return.put("omnitureValue",_ObjectOmnitureValue);
        	}
        }
      }

      //Author & Creation information
      String _ObjectCreationDate = getValue(_meta,"//ObjectMetadata/OnlineProducts/OnlineProduct/FirstPublicationDate");
      String _ObjectUpdateDate = getValue(_meta,"//ObjectMetadata/OnlineProducts/OnlineProduct/LastPublicationDate");
      String _ObjectAuthorStoryName = getValue(_doc,"//doc/story/text/byline/byname");
      String _ObjectAuthorStorySource = getValue(_doc,"//doc/story/text/byline/bysource");
      String _ObjectAuthorMetaName = getValue(_meta,"//Byline/ByName");
      String _ObjectAuthorMetaRole = getValue(_meta,"//Byline/Role");
      String _ObjectAuthorMetaEmail = getValue(_meta,"//Byline/AuthorEmail");
      String _ObjectAuthorMetaTwitter = getValue(_meta,"//Byline/AuthorTwitter");
      String _ObjectAuthorMetaPicture = getValue(_meta,"//Byline/ByPicture");

      String _ObjectListingWidgetTitle = getValue(_meta,"//ObjectMetadata/ListingWidgetTitle");
      String _ObjectListingWidgetURL = getValue(_meta,"//ObjectMetadata/ListingWidgetURL");

      if (!((_ObjectAuthorMetaName.equals("") || _ObjectAuthorMetaName.isEmpty()) && 
          (_ObjectAuthorMetaRole.equals("") || _ObjectAuthorMetaRole.isEmpty()) &&
        (_ObjectAuthorMetaEmail.equals("") || _ObjectAuthorMetaEmail.isEmpty()) &&
        (_ObjectAuthorMetaTwitter.equals("") || _ObjectAuthorMetaTwitter.isEmpty()) &&
        (_ObjectAuthorMetaPicture.equals("") || _ObjectAuthorMetaPicture.isEmpty()) &&
        (_ObjectAuthorStoryName.equals("") || _ObjectAuthorStoryName.isEmpty()) &&
        (_ObjectAuthorStorySource.equals("") || _ObjectAuthorStorySource.isEmpty()) 
        )) {
            Map _ObjectAuthor = new HashMap();
            Map _ObjectAuthorMeta = new HashMap();
            Map _ObjectAuthorStory = new HashMap();
      
            _ObjectAuthorMeta.put("name",_ObjectAuthorMetaName);
            _ObjectAuthorMeta.put("role",_ObjectAuthorMetaRole);
            _ObjectAuthorMeta.put("email",_ObjectAuthorMetaEmail);
            _ObjectAuthorMeta.put("twitter",_ObjectAuthorMetaTwitter);
            _ObjectAuthorMeta.put("picture",_ObjectAuthorMetaPicture);
      
            _ObjectAuthorStory.put("name",_ObjectAuthorStoryName);
            _ObjectAuthorStory.put("source",_ObjectAuthorStorySource);
      
            _ObjectAuthor.put("meta",_ObjectAuthorMeta);
            _ObjectAuthor.put("story",_ObjectAuthorStory);
      
            _return.put("author",_ObjectAuthor);
      }
      _return.put("creationDate",_ObjectCreationDate);
      _return.put("updateDate",_ObjectUpdateDate);

      //Listing Widget
      if (!((_ObjectListingWidgetTitle.equals("") || _ObjectListingWidgetTitle.isEmpty()) && (_ObjectListingWidgetURL.equals("") || _ObjectListingWidgetURL.isEmpty()))) {
        Map _ObjectListingWidget = new HashMap();
        _ObjectListingWidget.put("title",_ObjectListingWidgetTitle);
        _ObjectListingWidget.put("url",_ObjectListingWidgetURL);

        _return.put("listingWidget",_ObjectListingWidget);
      }


      //Gallery Type    
      if (_ObjectType.equals("gallery")) {
        _ObjectTitle = getValue(_doc, "//gallery-container/headlines/headline");
        _ObjectMainImageURL = getValue(_doc, "//photogrp[@class='photo-gallery-tease']/photo[@fileref!='']/@fileref");
        _ObjectMainImageClass = getValue(_doc, "//photogrp[@class='photo-gallery-tease']/@class");
        _ObjectMainImageCaption = getValue(_doc, "//photogrp[@class='photo-gallery-tease']/captiongrp[../photo-inline]/caption", "/Framework/xslt/bdc_story_default_new.xslt");
        _ObjectMainImageCredit = getValue(_doc, "//photogrp[@class='photo-gallery-tease']/captiongrp[../photo-inline]/credit");
        _ObjectMainImageFormat = getValue(_doc, "//photogrp[@class='photo-gallery-tease']/photo[@fileref!='']/@name");

        //Time to set Specific Values
        _return.put("type", "gallery");
        _return.put("title", _ObjectTitle);
        _return.put("source", _ObjectSource);
        _return.put("content", _ObjectStoryBody);

        _return.put("link", _ObjectLink);

        if (!(_ObjectMainImageURL == null) && !_ObjectMainImageURL.isEmpty()) {
          _image.put("--class", _ObjectMainImageClass);
          _image.put("--format", _ObjectMainImageFormat);
          _image.put("--medium", "image");
          _image.put("url", _ObjectMainImageURL);
          _image.put("rawUrl", _ObjectMainImageRawURL);
          _image.put("credit", _ObjectMainImageCredit);
          _image.put("caption", _ObjectMainImageCaption);
          _return.put("image", _image);
        }

      }

      //Listings Widget
      if (_ObjectType.equals("dwc_dfp_ad_position")) {
        _return.put("type", "ad");
        _return.put("title", _ObjectTitle);
        _return.put("source", _ObjectStoryDFPAdPosition);
      }

      //Listings Widget
      if (_ObjectType.equals("dwc_placester_listings_widget")) {
        _return.put("type", "listings");
        _return.put("title", _ObjectTitle);
        _return.put("source", _ObjectSource);
      }
      //Content Tile
      if (_ObjectType.equals("dwc_placester_content_tile")) {
        _return.put("type", "content_tile");
        _return.put("title", _ObjectTitle);
        _return.put("source", _ObjectSource);
      }
      //HTML Story
      if (_ObjectType.equals("story") && _ObjectMediaName.equals("html")) {
        //Story on the right panel should be rendered as it is.
        _return.put("type", "story_html");
        _return.put("title", _ObjectEditorialLeadIn);
        _return.put("content", _ObjectText);
      }
      //Regular Story
      if ((_ObjectType.equals("story") && !_ObjectMediaName.equals("html")) || _ObjectType.equals("summarystory") || _ObjectType.equals("streamtease")) {
        //Story on the right panel should be rendered as it is.
        _return.put("type", "story");
        _return.put("title", (_ObjectTitle.equals("") ? _ObjectStoryHeadline : _ObjectTitle));
        _return.put("source", _ObjectSource);
        _return.put("content", _ObjectStoryBody);
        _return.put("link", _ObjectLink);

        if (!(_ObjectMainImageURL == null) && !_ObjectMainImageURL.isEmpty()) {
          _image.put("--class", _ObjectMainImageClass);
          _image.put("--format", _ObjectMainImageFormat);
          _image.put("--medium", "image");
          _image.put("url", _ObjectMainImageURL);
          _image.put("rawUrl", _ObjectMainImageRawURL);
          _image.put("credit", _ObjectMainImageCredit);
          _image.put("caption", _ObjectMainImageCaption);
          _return.put("image", _image);
        }
      }

      if (_ObjectType.equals("dwc_placester_carousel")) {
        _return.put("type", "carousel");
        _return.put("title", _ObjectTitle);
        _return.put("source", _ObjectSource);
        _return.put("link", _ObjectLink);
      }

      if (!paramNoSubItems) {
        PlacesterElement _ObjectDetailItems = new PlacesterElement(paramObj);
        Map _subItems = (Map)_ObjectDetailItems.getResult().get("items");
        //if (_subItems.keySet().toArray().length > 0)
        	_return.put("items", _subItems);
        	
      }
      
      return _return;
    }
    
    public String getValue(Document source, String xpath) throws Exception {

      XPath xPathObj = XPathFactory.newInstance().newXPath();

      NodeList nodes = (NodeList) xPathObj.evaluate(xpath,
      source.getDocumentElement(), XPathConstants.NODESET);
      if (nodes.getLength() >= 1) return this.getCleanString(nodes.item(0).getTextContent());

      return "";

    }

    public String getCount(Document source, String xpath) throws Exception {

        XPath xPathObj = XPathFactory.newInstance().newXPath();

        NodeList nodes = (NodeList) xPathObj.evaluate(xpath,
        source.getDocumentElement(), XPathConstants.NODESET);
        return nodes.getLength() + "";
        //if (nodes.getLength() >= 1) return this.getCleanString(nodes.item(0).getTextContent());

        //return "";

      }
  public ArrayList<Document> getDocument(Document source, String xpath) throws Exception {
    ArrayList<Document> _return = new ArrayList<Document>();
    
    
    XPath xPathObj = XPathFactory.newInstance().newXPath();

        NodeList nodes = (NodeList) xPathObj.evaluate(xpath,
        source.getDocumentElement(), XPathConstants.NODESET);

    for (int i=0; i < nodes.getLength(); i++) {
      Node node = (Node)nodes.item(i);
      DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
      factory.setNamespaceAware(true);
      DocumentBuilder builder = factory.newDocumentBuilder();
      Document newDocument = builder.newDocument();
      Node importedNode = newDocument.importNode(node, true);
      newDocument.appendChild(importedNode);
      _return.add(newDocument);
    }
    
    return _return;
    
  }
  public Document getDocument(String paramFilepath) throws Exception {
    


    ObjectProxy proxy = null;
    try {

    
      String xmlURL = this.portalContext.resolveInternalUrl(paramFilepath);
      if (!URIUtil.isAbsolute(xmlURL) && !xmlURL.startsWith("/fragment/")) {
      xmlURL = "eomcache:" + xmlURL;
      }

      URL url = new URL(xmlURL);
      URLConnection connection = url.openConnection();
      connection.connect();
      ObjectProxy xmlProxy = ((EOMCacheURLConnection) connection).getObjectProxy();

      DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
      DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
      Document doc = dBuilder.parse(connection.getInputStream());
      return doc;
    } catch (Exception ex) {

    }


    return null;
  }
    public String getValue(Document source, String xpath, String xsltPath) throws Exception {

      XPath xPathObj = XPathFactory.newInstance().newXPath();

      NodeList nodes = (NodeList) xPathObj.evaluate(xpath,
      source.getDocumentElement(), XPathConstants.NODESET);
      if (nodes.getLength() >= 1) {
        Object resultObject = this.transform(nodes.item(0), this.portalContext.getConfigurationURI() + xsltPath, null, (PageContext) jspContext, this.portalContext);
        return (String) resultObject;
      }



      return "Hello";

    }


    protected Object transform(Node node, String xsltUrl, Map < String, Object > params, PageContext pageContext, PortalContext portalContext) throws Exception {
      long t0 = System.currentTimeMillis();

      MetaOutputBuilder outputBuilder = null;
      if (pageContext != null) {
        outputBuilder = (MetaOutputBuilder) pageContext.getAttribute("com.eidosmedia.portal.jsp.PortalSupport.OUTPUT_BUILDER", 2);
      }
      String xslt = portalContext.resolveInternalUrl(xsltUrl);
      if (!URIUtil.isAbsolute(xslt)) {
        xslt = "eomcache:" + xslt;
      }
      URL url = new URL(xslt);
      URLConnection connection = url.openConnection();
      connection.connect();

      Transformer transformer = null;
      if ((connection instanceof EOMCacheURLConnection)) {
        ObjectProxy xsltProxy = ((EOMCacheURLConnection) connection).getObjectProxy();

        if (outputBuilder != null) {
          outputBuilder.referenceObject(xsltProxy);
        }
        XSLData data = (XSLData) xsltProxy.getData();
        transformer = data.getTransformer();
      } else {
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        StreamSource streamSource = new StreamSource(connection.getInputStream());
        transformer = transformerFactory.newTransformer(streamSource);
      }

      if (params != null) {
        for (Map.Entry param: params.entrySet()) {
          String key = (String) param.getKey();
          Object value = param.getValue();
          if (value == null) {
            //if (logger.isDebugEnabled()) {
            //  logger.debug("Param \"" + key + "\" is null\n" + RenderTagException.evalContextData(pageContext));
            //}
          } else {
            transformer.setParameter(key, value);
          }
        }
      }

      PortalXsltContext xsltContext = new PortalXsltContext(portalContext, outputBuilder);
      transformer.setParameter("ctx", xsltContext);

      transformer.setParameter("portalContext", portalContext);
      if (outputBuilder != null) {
        transformer.setParameter("outputBuilder", outputBuilder);
      }
      HashMap includeMap = null;
      if (pageContext != null) {
        Content portalContent = (Content) pageContext.getAttribute("com.eidosmedia.portal.jsp.PortalSupport.PORTAL_OBJECT", 2);
        if (portalContent != null) {
          ObjectProxy objectProxy = portalContent.getObjectProxy();
          ObjectProxyData proxyData = objectProxy.getData();
          Document document = proxyData.getDbMetadata();
          transformer.setParameter("currentObject", document);

          includeMap = new HashMap();
          transformer.setParameter("includeMap", includeMap);
        }
      }

      //transformer.setErrorListener(new OutTagXsltErrorListener(xslt, outputBuilder));
      transformer.setURIResolver(new PortalXslURIResolver(outputBuilder));
      transformer.setOutputProperty("omit-xml-declaration", "yes");

      ByteArrayOutputStream xsltResult = new ByteArrayOutputStream();
      Document source = UnsafeDocumentBuilderFactory.newDocument();
      source.appendChild(source.adoptNode(node.cloneNode(true)));
      transformer.transform(new DOMSource(source), new StreamResult(xsltResult));

      String resultString = xsltResult.toString("UTF-8");
      String trimmedString = resultString.trim();
      Object resultObject = trimmedString;

      if ((includeMap != null) && (!includeMap.isEmpty())) {
        //if (logger.isInfoEnabled()) {
        //  String info = "Resolve xslt inclusion: ";
        //  for (XsltIncludeData data : includeMap.values())
        //    info = info + "\n " + data;
        //  logger.info(info);
        //}
        resultObject = OutTagFragment.parse(resultObject.toString(), includeMap);
      }

      long dt = System.currentTimeMillis() - t0;

      //if (logger.isDebugEnabled()) {
      //logger.debug("Time to process xslt " + xsltUrl + ": " + dt);
      //}
      return resultObject;
    }



    protected Document getMetadata(WebObject paramObj) throws Exception {
      String _meta = paramObj.getMetadataString();

      DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();

      factory.setNamespaceAware(true);
      DocumentBuilder builder = factory.newDocumentBuilder();

      return builder.parse(new ByteArrayInputStream(_meta.getBytes()));

    }
    protected Document getDocument(WebObject paramObj) throws Exception {

      Document _return = null;

      try {
        _return = paramObj.getContentDocument();
      } catch (Exception ex) {
        byte[] _docByte = paramObj.getContent();
        String _docString = new String(_docByte, "UTF-8");

        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();

        factory.setNamespaceAware(true);
        DocumentBuilder builder = factory.newDocumentBuilder();

        String XMLBase = "<document-root></document-root>";
        _return = builder.parse(new ByteArrayInputStream(XMLBase.getBytes()));

        Element element = _return.getDocumentElement();
        Node contentNode = _return.createElement("content");
        Node textNode = _return.createElement("text");
        contentNode.appendChild(textNode);
        textNode.setTextContent("<!CDATA[[" + _docString + "]]>");
        element.appendChild(contentNode);
      }

      return _return;

    }
    protected String getCleanString(String _string) throws Exception {

      String _return = _string.replaceAll("\\n|\\r", "")
        .replaceAll("\\\"", "\\\\\"")
        .replaceAll("\\\t", "    ");
      return _return;
    }
    public Map getResult() throws Exception {
      this.result.remove("items");
      this.result.put("items", this.resultItems);


      return this.result;

    }
    public Map getZoneContent(String zoneName) throws Exception {
      Map _return = new HashMap();

      List < WebObject > content = new ArrayList < WebObject > ();

      Map < String, Map > zonesMap = this.webObject.getZonesMap();
      Map zone = zonesMap.get(zoneName);
      int linksCount = Integer.parseInt(zone.get("linksCount").toString());
      for (int linkedObjectIndex = 0; linkedObjectIndex < linksCount; linkedObjectIndex++) {
        WebObject linked = (WebObject) zone.get("" + linkedObjectIndex);
        content.add(linked);
      }

      _return.put("items", content);

      return _return;
    }

    public ArrayList getZones() throws Exception {
      ArrayList _return = new ArrayList();

      Map zones;

      try {
        zones = (Map) this.webObject.getZonesMap();
      } catch (Exception e) {
        //Just empty zone
        zones = new HashMap();
      }


      Object o[] = zones.keySet().toArray();




      for (int i = 0; i < zones.size(); i++) {
        String zone = (String) o[i];
        _return.add(zone);
      }

      return _return;
    }
    public void initVariables() throws Exception {
      this.result = new HashMap();
      this.resultItems = new HashMap();

    }

    public void init(WebObject webObject) throws Exception {
      this.webObject = (WebObject) webObject;
      this.getObjectComponents();
    }

  }

  PortalWebObjectWrapper objectWrapper = (PortalWebObjectWrapper) jspContext.getAttribute("obj");
  PlacesterElement element = new PlacesterElement(objectWrapper,(String)jspContext.getAttribute("filterZone"));

  jspContext.setAttribute("output", element.getResult());
%>

