<script type="text/javascript">
	$(function() {

	    var $sidebar   = $(".sticky-map-wrapper"), 
	        $window    = $(window),
	        offset     = $sidebar.offset(),
	        topPadding = 100;

	    $window.scroll(function() {
	    	var resultsContainerHeight = $('.search-results').height();
	    	if ($window.scrollTop() > resultsContainerHeight - 345) return;
	        if ($window.scrollTop() > offset.top) {
	            $sidebar.stop().animate({
	                marginTop: $window.scrollTop() - offset.top + topPadding
	            });
	        } else {
	            $sidebar.stop().animate({
	                marginTop: 10
	            });
	        }
	    });
	});
	
</script>

<style>
	@media (max-width: 768px) {

		.sticky-map-wrapper {
			display: none;
		}
	}
</style>

<div class='sticky-map-wrapper'>
	<div class='map-header' style='text-align:right;margin:95px 0 5px 0;padding:15px;background:lightgrey;'>
		<p><span><input type='checkbox'/></span>Redo search on move</p>
	</div>

	<div class='map-placeholder' style='height:300px;width:100%;border: 1px solid black;box-sizing:border-box;'></div>
</div>