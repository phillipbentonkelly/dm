<?php $pageType = $_GET['page-type']; ?>
<!doctype html>
<!--[if !IE]>
  <html class="no-js">
<![endif]-->
<!--[if lte IE 8]> 
  <html class="no-js ie8" lang="en">
<![endif]-->
<!--[if lte IE 9]> 
  <html class="no-js ie9" lang="en">
<![endif]-->
<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>DM | <?php echo ucwords($pageType) ?></title>
    <meta name="description" content="">
    <meta name=viewport content="width=device-width, initial-scale=1">

    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    
    <!-- STYLING -->
    <link rel="stylesheet" href="styles/css/dm-screen.css" />

        <!-- Real Estate Listings -->
        <link rel="stylesheet" href="styles/css/realestatelistings.css" />
        <link rel="stylesheet" href="styles/css/plugins/selectize/selectize.css" />
        <link rel="stylesheet" href="styles/css/plugins/select2/select2.css" />

	<!-- SCRIPTS -->
    <script src="js/resources/jquery.min.js"></script>
	<script src="js/assets/mega-menu.js"></script>
	<script src="js/assets/responsive-gallery.js"></script>

	<?php if ($pageType == 'home' || $pageType == 'category' || $pageType == 'category-details' || $pageType == 'neighborhood') { ?>
	    <!-- Carousel Scripts -->
		<script src="js/assets/basicMobileDetection.js"></script>
		<script src="http://wurfl.io/wurfl.js"></script>
		<script src="js/resources/img.srcset.polyfill.js"></script>
		<script src="js/assets/bdc.carouselFullWidthSlider.js"></script>
		<!-- Carousel Scripts -->

		<!-- Real Estate Listings -->
        <script src="js/assets/mpListings.js"></script>
        <script src="js/assets/listings.data.js"></script>
	<?php } ?>

	<?php if ($pageType == 'home' || $pageType == 'category' || $pageType == 'category-details' || $pageType == 'neighborhood') { ?>
		<script src="js/assets/listings.map.js"></script>
	<?php } ?>

	<?php if ($pageType == 'serp') { ?>
		<script src="js/resources/basic/js/jquery.simplemodal.js"></script>
        <script src="js/assets/popup.js"></script>
	<?php } ?>

	<?php if ($pageType == 'property-listings' || $pageType == 'property-listings-premium') { ?>
	    <!-- Real Estate Listings -->
        <script src="js/assets/mpListings.js"></script>
        <script src="js/assets/listings.data.js"></script>
        <script src="js/resources/basic/js/jquery.simplemodal.js"></script>
        <script src="js/assets/popup.js"></script>
	<?php } ?>
	
	<?php if ($pageType == 'articles') { ?>
	    <!-- Real Estate Listings -->
        <script src="js/assets/mpListings.js"></script>
        <script src="js/assets/listings.data.js"></script>
	<?php } ?>

	<script type="text/javascript">
	    var googletag = googletag || {};
	    googletag.cmd = googletag.cmd || [];
	    
	    (function() {
	        var gads = document.createElement("script");
	        gads.async = true;
	        gads.type = "text/javascript";
	        var useSSL = "https:" == document.location.protocol;
	        gads.src = (useSSL ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
	        var node =document.getElementsByTagName("script")[0];
	        node.parentNode.insertBefore(gads, node);
	    })();
	</script>

	<script src="js/resources/plugins/selectize/selectize.js"></script>
    <script src="js/resources/plugins/select2/select2.js"></script>
    <script src="js/assets/searchPanel.js"></script>
    <script>
        $(document).ready(function(){
        	if('#listingDropDown'){
                $("#listingDropDown").select2({ dropdownCssClass: 'mplistings-dropdown' });
            }

            if ($ ('body').hasClass('property-listings-premium')) {
            	$('.listing__contact-agent').hide();
            }

            if ($(window).width() > 752) {
                $('.page-layout__left-col').width($(window).width() - 320);
            };

            $('.contact__agent-number').on('click', function(e) {
            	e.preventDefault();
            	$(this).text() == 'View My Contact Number' ? $(this).text('(617) 230-6674') : $(this).text('View My Contact Number');
        	});
        });

        $(window).resize(function() {
            if ($(window).width() > 752) {
            	$('.page-layout__right-col').find('.close-modal-wrap').remove();
                $('.page-layout__left-col').width($(window).width() - 320);
            } else {
                $('.page-layout__left-col').css('width', '100%');
            }
        });
    </script>
    
	<?php if ($pageType == 'articles' || $pageType == 'property-listings' || $pageType == 'property-listings-premium') { ?>
	    <!-- Share This Plugin -->
        <script type="text/javascript">var switchTo5x=true;</script> 
		<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script> 
		<script type="text/javascript">stLight.options({publisher: "e851a161-a35b-49b9-8352-4cb9c793f371", doNotHash: false, doNotCopy: false, hashAddressBar: true});</script>
	<?php } ?>
</head>
<body <?php if ($pageType == 'home') { echo 'class="home"'; } else {  echo "class='page-section $pageType'"; } ?>>

	<!-- Page Masthead -->
    <?php include 'page/page-masthead.php'; ?>

    <!-- Page Nav -->
    <?php include 'page/page-nav.php'; ?>

    <!-- Page Search -->
    <?php include 'page/page-search.php'; ?>
    
	
	<?php if ($pageType == 'home' || $pageType == 'category') { ?>
		<!-- Module Content -->
		<?php include 'page/modules/full-width-carousel.php'; ?>
	<?php } ?>

	<?php if ($pageType == 'serp') { ?>
		<!-- Module Content -->
		<?php include 'page/modules/serp-ad-placeholder.php'; ?>
	<?php } ?>

	<!-- Page Layout -->
    <div class="page-layout">
        <div class="page-layout__left-col">
        	<!-- HOME -->
			<?php if ($pageType == 'home') { ?>
				<!-- dfp news home Content -->
				<?php include 'ads/dfp__new-homes.php'; ?>
				
				<!-- Real Estate News Content -->
				<?php include 'page-content/modules/real-estate-news.php'; ?>
			<?php } ?>
			
			
			<!-- PROPERTY LISTINGS -->
			<?php if ($pageType == 'property-listings' || $pageType == 'property-listings-premium') { ?>
				<!-- Property Info -->
				<?php include 'page-content/property-info.php'; ?>
				
				<!-- Explore Widget -->
				<?php include 'page-content/explore-widget.php'; ?>
				
				<!-- Related Articles -->
				<?php include 'page-content/modules/related-articles.php'; ?>
			<?php } ?>
			
			
			<!-- NEIGHBORHOOD -->
			<?php if ($pageType == 'category-details') { ?>
				<!-- Multimedia Chip -->
				<?php include 'page/modules/multimedia-chip.php'; ?>
			<?php } ?>
			
			<!-- CATEGORY -->
			<?php if ($pageType == 'category') { ?>
				<!-- Related Articles -->
				<?php include 'page-content/modules/related-articles.php'; ?>
			<?php } ?>
			
			<!-- CATEGORY DETAILS -->
			<?php if ($pageType == 'category-details') { ?>
				<!-- Related Articles -->
				<?php include 'page-content/modules/related-articles.php'; ?>
			<?php } ?>
			
			<!-- NEIGHBORHOOD -->
			<?php if ($pageType == 'neighborhood') { ?>
				<!-- Property Listings Map -->
				<?php include 'page/modules/property-listing-map.php'; ?>

				<!-- Related Articles -->
				<?php include 'page-content/modules/related-articles.php'; ?>
			<?php } ?>
			
			
			<!-- ARTICLES -->
			<?php if ($pageType == 'articles') { ?>
				<!-- Property Listings Map -->
				<?php include 'page-content/article-content.php'; ?>

				<!-- Related Articles -->
				<?php include 'page-content/modules/related-articles.php'; ?>

				<!-- Ad Slots 2 and 3 -->
				<?php include 'ads/gallery-ads-2-and-3.php'; ?>

				<!-- Discus -->
				<?php include 'page-content/modules/comments.php'; ?>
			<?php } ?>
			

			<!-- SEARCH PAGE -->
			<?php if ($pageType == 'serp') { ?>
				<!-- Search Result -->
				<?php include 'page-content/modules/property-search-result.php'; ?>

				<!-- Related Articles -->
				<?php include 'page-content/modules/related-articles--mobile.php'; ?>

				<!-- Contact Agent Popup -->
				<?php include 'page-content/modules/conatct-agent-premium--large.php'; ?>

				<!-- Search Filter Modal for mobile -->
				<?php include 'page-content/modules/search-filter-modal.php'; ?>

			<?php } ?>
			
        </div>
		<div class="page-layout__right-col">
			
			<!-- HOME -->
			<?php if ($pageType == 'home') { ?>
				<!-- DFP Sidebar Placeholder Ad Content -->
				<?php include 'ads/adplaceholer__right-column.php'; ?>

				<!-- Property Listings Widget -->
				<?php include 'page/modules/property-listings.php'; ?>
			<?php } ?>
			
			
			<!-- PROPERTY LISTINGS -->
			<?php if ($pageType == 'property-listings-premium') { ?>

				<!-- Contact The Agent Widget -->
				<?php include 'page-content/modules/contact-agent-premium--large.php'; ?>

				<!-- DFP Ad - Experience the Difference -->
				<?php include 'ads/dfp-ads__experience-the-difference.php'; ?>

				<!-- Property Listings Widget -->
				<?php include 'page/modules/property-listings.php'; ?>

				<!-- Contact This Agent Widget -->
				<?php include 'page-content/modules/contact-agent-premium--small.php'; ?>

				<!-- Share Modal for mobile -->
				<?php include 'page-content/modules/share-modal.php'; ?>

			<?php } ?>

			<?php if ($pageType == 'property-listings') { ?>
	

				<!-- Contact The Agent Widget -->
				<?php include 'page-content/modules/contact-agent-basic--large.php'; ?>

				<!-- DFP Ad - Experience the Difference -->
				<?php include 'ads/dfp-ads__experience-the-difference.php'; ?>

				<!-- Property Listings Widget -->
				<?php include 'page/modules/property-listings.php'; ?>

				<!-- Contact This Agent Widget -->
				<?php include 'page-content/modules/contact-agent-basic--small.php'; ?>

				<!-- Share Modal for mobile -->
				<?php include 'page-content/modules/share-modal.php'; ?>
			<?php } ?>
			
			
			<!-- CATEGORY -->
			<?php if ($pageType == 'category') { ?>
				<!-- DFP Ad - Experience the Difference -->
				<?php include 'ads/dfp-ads__experience-the-difference.php'; ?>

				<!-- DFP Ad - Moo Printing -->
				<?php include 'ads/dfpAds__300by250__moo.php'; ?>

				<!-- DFP Sidebar Placeholder Ad Content -->
				<?php include 'ads/adplaceholer__right-column.php'; ?>
				
				<!-- Explore Brookline -->
				<?php include 'page-content/explore-brookline.php'; ?>
			<?php } ?>
			
			
			<!-- CATEGORY DETAILS -->
			<?php if ($pageType == 'category-details') { ?>
				<!-- DFP Ad - Experience the Difference -->
				<?php include 'ads/dfp-ads__experience-the-difference.php'; ?>

				<!-- DFP Ad - Moo Printing -->
				<?php include 'ads/dfpAds__300by250__moo.php'; ?>

				<!-- DFP Sidebar Placeholder Ad Content -->
				<?php include 'ads/adplaceholer__right-column.php'; ?>

				<!-- Property Listings Widget -->
				<?php include 'page/modules/property-listings.php'; ?>
				
				<!-- Explore Brookline -->
				<?php include 'page-content/explore-brookline.php'; ?>
			<?php } ?>
			
			
			<!-- NEIGHBORHOOD -->
			<?php if ($pageType == 'neighborhood') { ?>
				<!-- DFP Ad - Experience the Difference -->
				<?php include 'ads/ad_bigbox1.php'; ?>

				<!-- DFP Ad - Moo Printing -->
				<?php include 'ads/ad_bigbox2.php'; ?>

				<!-- DFP Sidebar Placeholder Ad Content -->
				<?php include 'ads/adplaceholer__right-column.php'; ?>

				<!-- Property Listings Widget -->
				<?php include 'page/modules/property-listings.php'; ?>
			<?php } ?>
			
			
			<!-- ARTICLES/GALLERY -->
			<?php if ($pageType == 'articles') { ?>
				<!-- DFP Ad - Experience the Difference -->
				<?php include 'ads/dfp-ads__experience-the-difference.php'; ?>

				<!-- Property Listings Widget -->
				<?php include 'page/modules/property-listings.php'; ?>

				<!-- Long DFP Ad -->
				<?php include 'ads/ad_bigbox1.php'; ?>
			<?php } ?>
			
			
			<!-- SEARCH PAGE -->
			<?php if ($pageType == 'serp') { ?>
				<!-- Contact The Agent Widget -->
				<?php include 'page-content/modules/search-map.php'; ?>

				<!-- Related Articles (right rail) Widget -->
				<?php include 'page-content/modules/related-articles-right-rail.php'; ?>

				<!-- Contact The Agent Widget -->
				<?php include 'page-content/modules/contact-agent-premium--large.php'; ?>

			<?php } ?>
		</div>

	</div>
	
	<?php if ($pageType == 'home') { ?>
		<!-- DFP Sidebar Placeholder Ad Content -->
		<?php include 'page-content/real-estate-blog.php'; ?>
	<?php } ?>

	<?php if ($pageType == 'category' || $pageType == 'category-details' || $pageType == 'neighborhood') { ?>
		<!-- Gallery Widget -->
    	<?php include 'page/modules/gallery.php'; ?>
	<?php } ?>

	<!-- Page Footer -->
	<?php //include 'page-content/modules/category-footer.php'; ?>
    <?php include 'page/page-footer.php'; ?>


    <!-- Search Modal -->
    <?php include 'page-content/modules/search-modal.php'; ?>


    <!-- ARTICLES: Discus -->
	<?php if ($pageType == 'articles') { ?>
		<script type="text/javascript"> 
			/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */ 
			var disqus_shortname = 'bcomrealestate'; // required: replace example with your forum shortname 

			/* * * DON'T EDIT BELOW THIS LINE * * */ 
			(function () { 
				var s = document.createElement('script'); s.async = true; 
				s.type = 'text/javascript'; 
				s.src = '//' + disqus_shortname + '.disqus.com/count.js'; 
				(document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s); 
			}()); 
		</script> 
	<?php } ?>
</body>
</html>