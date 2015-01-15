<div id="ad_t6" class="dfp-ads__new-homes"></div>

<script>
    var networkCode = 61381659;
    var topLevelAdUnit = "testboston.com";
    var s1 = "testboston.com";
    var s2 = "real-estate";
    var adUnit = topLevelAdUnit + "/" + s2;
    var slotName = "/" + networkCode + "/" + adUnit;
    
    googletag.cmd.push(function() {
        googletag.defineSlot(slotName, [660,320], "ad_t6")
        .addService(googletag.pubads())
        .setTargeting("pos", "ad_t6");
        googletag.pubads().setTargeting("s1",s1);
        googletag.pubads().setTargeting("s2",s2);      
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>

<script type="text/javascript">
    googletag.cmd.push(function() {
        googletag.display("ad_t6");
    });
</script>