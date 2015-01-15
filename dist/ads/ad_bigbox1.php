<div id="ad_bigbox1"></div>


<script>
    var networkCode = 61381659;
    var topLevelAdUnit = "testboston.com";
    var s1 = "testboston.com";
    var s2 = "real-estate";
    var adUnit = topLevelAdUnit + "/" + s2;
    var slotName = "/" + networkCode + "/" + adUnit;
    
    googletag.cmd.push(function() {
        googletag.defineSlot(slotName, [300,250], "ad_bigbox1")
        .addService(googletag.pubads())
        .setTargeting("pos", "ad_bigbox1");
        googletag.pubads().setTargeting("s1",s1);
        googletag.pubads().setTargeting("s2",s2);      
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>

<script type="text/javascript">
    googletag.cmd.push(function() {
        googletag.display("ad_bigbox1");
    });
</script>