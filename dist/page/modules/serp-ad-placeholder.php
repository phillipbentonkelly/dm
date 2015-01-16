<style type="text/css">

    .tmp-serp-ad-wrap {
        margin: 70px auto 10px auto;
    }

	.tmp-serp-ad {
        width: 320px;
        float: none;
        height: 50px;
        border: 1px solid black;
        margin: 10px auto;
    }

    @media (min-width: 768px) {

        .tmp-serp-ad-wrap {
            width: 100%;
        }

        .tmp-serp-ad {
            width: 460px;
            margin: 0 auto;
            height: 184px;
            border: 1px solid black;
            margin-bottom: 10px;
        }
    }

    @media (min-width: 960px) {
        .tmp-serp-ad-wrap {
            width: 960px;
        }

        .tmp-serp-ad {
            float: left;
            border: 1px solid black;
            width: 48%;
        }

        #ad_spotlight1 {
            min-height: 150px;
            margin-right: 2%;
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

