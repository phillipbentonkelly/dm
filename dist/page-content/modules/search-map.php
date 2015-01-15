<script type="text/javascript">
	$(function() {

	    var $sidebar   = $(".sticky-map-wrapper"), 
	        $window    = $(window),
	        offset     = $sidebar.offset(),
	        topPadding = 100;

	    $window.scroll(function() {
	    	if ($window.scrollTop() > 3200) return;
	        if ($window.scrollTop() > offset.top) {
	            $sidebar.stop().animate({
	                marginTop: $window.scrollTop() - offset.top + topPadding
	            });
	        } else {
	            $sidebar.stop().animate({
	                marginTop: 0
	            });
	        }
	    });
	});
	
</script>

<div class='sticky-map-wrapper'>
	<div class='map-header' style='text-align:right;margin:95px 0 5px 0;padding:15px;background:lightgrey;'>
		<p><span><input type='checkbox'/></span>Redo search on move</p>
	</div>

	<div class='map-placeholder' style='height:300px;width:100%;border: 1px solid black;box-sizing:border-box;'></div>
</div>