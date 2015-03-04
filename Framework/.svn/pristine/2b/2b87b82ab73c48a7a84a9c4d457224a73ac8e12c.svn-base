<%@ include file="includes/init.inc" %>

<%@ attribute name="var" rtexprvalue="false" required="true" %>	
<%@ attribute name="days" rtexprvalue="false" required="true" %>

<c:if test="${empty days}">
	<p:out var="days" value="5" />
</c:if>

<%@ variable name-from-attribute="var" alias="output" scope="AT_END"  %>

<c:import var="weatherData" url="http://weather.boston.com/api/current/bos" />
<x:parse var="weather" xml="${weatherData}" />

<c:import var="futureWeatherData" url="http://weather.boston.com/api/forecast/bos" />
<x:parse var="futureWeather" xml="${futureWeatherData}" />
<p:out var="highTemp" xvalue="$futureWeather/forecasts/forecast[2]/highf" />
<p:out var="lowTemp"  xvalue="$futureWeather/forecasts/forecast[2]/lowf" />

<jsp:useBean id="data" class="java.util.HashMap" />
<jsp:useBean id="forecast" class="java.util.ArrayList" />

<%
        Map weatherMap = new HashMap();

        String[] weatherNames = new String[] { "clouds", "moon", "mooncloud", "rain", "snow", "suncloud", "thunder", "wind"};
        String[] clouds = new String[] { "06s", "07s", "08s", "11s" };
        String[] moon = new String[] { "33s", "34s", "37s" };
        String[] mooncloud = new String[] { "35s", "36s", "38s" };
        String[] rain = new String[] { "12s", "13s", "14s", "18s", "26s", "29s", "39s", "40s" };
        String[] snow = new String[] { "19s", "20s", "21s", "22s", "23s", "24s", "25s", "43s", "44s" };
        String[] suncloud = new String[] { "03s", "04s" };
        String[] thunder = new String[] { "15s", "16s", "17s", "41s", "42s" };
        String[] wind = new String[] {"32s"};
        String[][] arrayLists = new String[][] { clouds, moon, mooncloud, rain, snow, suncloud, thunder, wind };

        for(int x = 0; x < arrayLists.length; x++) {
                for(int y = 0; y < arrayLists[x].length; y++) {
                        weatherMap.put(arrayLists[x][y], weatherNames[x]);
                }
		}
		
%>


<p:out var="forecastData" xvalue="$futureWeather//forecast" />

<x:forEach var="dayData" select="$futureWeather//forecast" end="${days - 1}">
	
	<p:out var="day" xvalue="$dayData//dayname/text()" />
	<p:out var="date" xvalue="$dayData//monthday/text()" />
	<p:out var="forecastText" xvalue="$dayData//weather/text()" />
	<p:out var="high" xvalue="$dayData//highf/text()" />
	<p:out var="low" xvalue="$dayData//lowf/text()" />
	<x:set var="iconBase" select="string($dayData/smallimage/text())" />
	<p:out var="iconEdit" value="${fn:substringBefore(iconBase, '.')}" />
	<%
		Map<String, String> day = new HashMap<String,String>();
	
		String iconIndex = (String)jspContext.getAttribute("iconEdit");
		String hasKey = (weatherMap.containsKey(iconIndex)) ? "yes" : "no";
		String weatherClass = (weatherMap.containsKey(iconIndex) ?
		(String)weatherMap.get(iconIndex) : "sun");

		day.put("day", (String) jspContext.getAttribute("day"));
		day.put("date", (String) jspContext.getAttribute("date"));
		day.put("forecast", (String) jspContext.getAttribute("forecastText"));
		day.put("high", (String) jspContext.getAttribute("high"));
		day.put("low", (String) jspContext.getAttribute("low"));
		day.put("iconClass", weatherClass);
		
		forecast.add(day);	
		
	%>
</x:forEach>

<% jspContext.setAttribute("output", forecast); %>

