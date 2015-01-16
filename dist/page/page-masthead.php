<!-- Page Masthead -->
<div class="masthead">
    <div class="page-header">
        <div id="ad_lead1" class="page-header__content"><!--<img src="images/BannerAd-placeholder.jpg" />--></div>
    </div>
</div>
<!-- Page Masthead -->

<script>
    var networkCode = 61381659;
    var topLevelAdUnit = "testboston.com";
    var s1 = "testboston.com";
    var s2 = "real-estate";
    var adUnit = topLevelAdUnit + "/" + s2;
    var slotName = "/" + networkCode + "/" + adUnit;
    
    googletag.cmd.push(function() {
        googletag.defineSlot(slotName, [728,90], "ad_lead1")
        .addService(googletag.pubads())
        .setTargeting("pos", "ad_lead1");
        googletag.pubads().setTargeting("s1",s1);
        googletag.pubads().setTargeting("s2",s2);      
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>

<script type="text/javascript">
    googletag.cmd.push(function() {
        googletag.display("ad_lead1");
    });
</script>