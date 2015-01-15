<style type="text/css">
	.tmp-serp-ad-wrap {
		max-width: 960px;
		height: 150px;
		margin: 0 auto;
		margin-top: 20px;
	}

	.tmp-serp-ad {
		width: 48%;
		float: left;
		height: 100%;
		border: 1px solid black;
		margin-top: 60px;
	}

	#ad_spotlight1 {
		margin-right: 1%; 
	}

	#ad_spotlight2 {
		margin-left: 2%; 
	}

    @media (max-width: 768px) {
    	.tmp-serp-ad-wrap {
			display: none;
    	}
    }

</style>

<div class='tmp-serp-ad-wrap'>
	<div id='ad_spotlight1' class='tmp-serp-ad'></div>

	<div id='ad_spotlight2' class='tmp-serp-ad'></div>
</div>

<script>
    var networkCode = 61381659;
    var topLevelAdUnit = "testboston.com";
    var s1 = "testboston.com";
    var s2 = "real-estate";
    var adUnit = topLevelAdUnit + "/" + s2;
    var slotName = "/" + networkCode + "/" + adUnit;
    
    googletag.cmd.push(function() {
        googletag.defineSlot(slotName, [460,150], "ad_spotlight1")
        googletag.defineSlot(slotName, [460,150], "ad_spotlight2")
        .addService(googletag.pubads())
        .setTargeting("pos", "ad_spotlight1")
        .setTargeting("pos", "ad_spotlight2");
        googletag.pubads().setTargeting("s1",s1);
        googletag.pubads().setTargeting("s2",s2);      
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>

<script type="text/javascript">
    googletag.cmd.push(function() {
        googletag.display("ad_spotlight1");
        googletag.display("ad_spotlight2");
    });
</script>

