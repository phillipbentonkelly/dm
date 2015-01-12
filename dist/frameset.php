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

        <?php if ($pageType == 'property-listings') { ?>
		    <!-- Simple Modal -->
	        <!-- <link rel="stylesheet" href="js/resources/basic/css/basic.css" /> -->
		<?php } ?>

	<!-- SCRIPTS -->
    <script src="js/resources/jquery.min.js"></script>
    	<script src="js/assets/mega-menu.js"></script>
    	<script src="js/assets/searchPanel.js"></script>
    	<script src="js/assets/responsive-gallery.js"></script>

		<?php if ($pageType == 'home') { ?>
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
		
		<?php if ($pageType == 'property-listings') { ?>
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

		<script src="js/resources/plugins/selectize/selectize.js"></script>
        <script src="js/resources/plugins/select2/select2.js"></script>
        <script src="js/assets/searchPanel.js"></script>
        <script>
            $(document).ready(function(){ 

            	if('#listingDropDown'){
                	$("#listingDropDown").select2({ dropdownCssClass: 'mplistings-dropdown' });
                }

                if ($(window).width() > 752) {
	                $('.page-layout__left-col').width($(window).width() - 320);
	            };
            });

            $(window).resize(function() {
	            if ($(window).width() > 752) { 
	                $('.page-layout__left-col').width($(window).width() - 320);
	            } else {
	                $('.page-layout__left-col').css('width', '100%');
	            }
	        });
        </script>

</head>
<body <?php if ($pageType == 'serp') { echo "class='page--$pageType serp'"; } else {  echo "class='page--$pageType'"; } ?>>
	<!-- Page Masthead -->
    <?php include 'page/page-masthead.php'; ?>

    <!-- Page Nav -->
    <?php include 'page/page-nav.php'; ?>

    <?php if ($pageType == 'serp') { ?>
	    <!-- Page Search -->
	    <?php include 'page/page-search.php'; ?>
    <?php } ?>
	
	<?php if ($pageType == 'home') { ?>
		<!-- Module Content -->
		<?php include 'page/modules/full-width-carousel.php'; ?>
	<?php } ?>
	
	
	<?php if ($pageType == 'neighborhood') { ?>
	<div class="page-layout-wrapper">
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
			<?php if ($pageType == 'property-listings') { ?>
				<!-- Property Info -->
				<?php include 'page-content/property-info.php'; ?>
				
				<!-- Explore Widget -->
				<?php include 'page-content/explore-widget.php'; ?>
				
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
			<?php } ?>
			

			<!-- SEARCH PAGE -->
			<?php if ($pageType == 'serp') { ?>
				<!-- Related Articles -->
				<?php include 'page-content/modules/related-articles.php'; ?>
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
			<?php if ($pageType == 'property-listings') { ?>
				<!-- DFP Sidebar Placeholder Ad Content -->
				<?php include 'ads/real-estate-brokerage__coldwell-banker.php'; ?>

				<!-- Contact The Agent Widget -->
				<?php include 'page-content/modules/contact-the-agent.php'; ?>

				<!-- DFP Ad - Experience the Difference -->
				<?php include 'ads/dfp-ads__experience-the-difference.php'; ?>

				<!-- Property Listings Widget -->
				<?php include 'page/modules/property-listings.php'; ?>

				<!-- Contact This Agent Widget -->
				<?php include 'page-content/modules/contact-this-agent.php'; ?>
			<?php } ?>
			
			
			<!-- NEIGHBORHOOD -->
			<?php if ($pageType == 'neighborhood') { ?>
				<!-- DFP Ad - Experience the Difference -->
				<?php include 'ads/dfp-ads__experience-the-difference.php'; ?>

				<!-- DFP Ad - Moo Printing -->
				<?php include 'ads/dfpAds__300by250__moo.php'; ?>

				<!-- DFP Sidebar Placeholder Ad Content -->
				<?php include 'ads/adplaceholer__right-column.php'; ?>
				
				<!-- Explore Brookline -->
				<?php include 'page-content/explore-brookline.php'; ?>
			<?php } ?>
			
			
			<!-- ARTICLES/GALLERY -->
			<?php if ($pageType == 'articles') { ?>
				<!-- DFP Ad - Experience the Difference -->
				<?php include 'ads/dfp-ads__experience-the-difference.php'; ?>

				<!-- Property Listings Widget -->
				<?php include 'page/modules/property-listings.php'; ?>
			<?php } ?>
			
			
			<!-- SEARCH PAGE -->
			<?php if ($pageType == 'serp') { ?>
				<!-- Contact The Agent Widget -->
				<?php include 'page-content/modules/contact-the-agent.php'; ?>

				<!-- DFP Ad - Experience the Difference -->
				<?php include 'ads/dfp-ads__experience-the-difference.php'; ?>

				<!-- DFP Ad - Moo Printing -->
				<?php include 'ads/dfpAds__300by250__moo.php'; ?>
			<?php } ?>
		</div>
	</div>
	
	<?php if ($pageType == 'neighborhood') { ?>
	</div>
	<?php } ?>
	
	<?php if ($pageType == 'home') { ?>
		<!-- DFP Sidebar Placeholder Ad Content -->
		<?php include 'page-content/real-estate-blog.php'; ?>
	<?php } ?>

	<!-- Page Footer -->
    <?php include 'page/page-footer.php'; ?>
</body>
</html>