<div id="ad_toprightslot" class="dfp-ads"><!--<img src="images/ads/dfp/dfpAds__300by250__coldwell-banker.jpg" />--></div>

<script>
    var networkCode = 61381659;
    var topLevelAdUnit = "testboston.com";
    var s1 = "testboston.com";
    var s2 = "real-estate";
    var adUnit = topLevelAdUnit + "/" + s2;
    var slotName = "/" + networkCode + "/" + adUnit;
    
    googletag.cmd.push(function() {
        googletag.defineSlot(slotName, [300,250], "ad_toprightslot")
        .addService(googletag.pubads())
        .setTargeting("pos", "ad_toprightslot");
        googletag.pubads().setTargeting("s1",s1);
        googletag.pubads().setTargeting("s2",s2);      
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>

<script type="text/javascript">
    googletag.cmd.push(function() {
        googletag.display("ad_toprightslot");
    });
</script>