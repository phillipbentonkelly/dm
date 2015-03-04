<c:set var="pagLimit" value="10" /> <%-- should be 10 --%>

<%-- 
<p>page ${page}</p>
<p>numPages ${numPages}</p>
<p>count ${count}</p>
<p>limitPerPage ${limitPerPage}</p>
<p>pagLimit ${pagLimit }</p>
<p>pages ${pages}</p>
<p>${numPages}</p>
<p>${page eq '1'}</p>
<p>${(count+0) >= (limitPerPage)}</p>
<p>${8 >= 3}</p>
<p>${(numPages) < (pagLimit)}</p>
<p>${19 < 10}</p> iiii
<p>${(page eq '1') && (count+0 > limitPerPage)}</p>
--%>
<fmt:parseNumber value="${count}" integerOnly="true" var="count"/>
		<c:choose>
			<c:when test="${(page eq '1') && (count > limitPerPage)}">
				<c:choose>
					<c:when test="${numPages < (pagLimit-1)}"> 
						<c:set var="case" value="1"/>
					</c:when>
					<c:otherwise>
						<c:set var="case" value="2"/>
					</c:otherwise>
				</c:choose>
			</c:when>
		 	<c:when test="${(count > limitPerPage) && (page < numPages)}">
				<c:choose>
					<c:when test="${(page < (pagLimit-1)) && (numPages < pagLimit)}">		
						<c:set var="case" value="3"/>
					</c:when>
			 		<c:when test="${page < (numPages - pagLimit+2)}"> <%-- took out page < pagLimit and < pagLimit-1 --%>
			 			<c:set var="case" value="4"/>
					</c:when>
					<c:otherwise>
					 	<c:set var="case" value="5"/>
					</c:otherwise>
				</c:choose>
			</c:when>
			<c:when test="${(count > limitPerPage) && (page eq numPages)}">
				<c:choose>
					<c:when test="${numPages < pagLimit}">
						<c:set var="case" value="6"/>
					</c:when>
					<c:when test="${numPages >= pagLimit}">
						<c:set var="case" value="7"/>
					</c:when>
				</c:choose>
			</c:when>
	</c:choose>
	



<%-- <div class="pagination">
	<ul>
		<li class="active"><a href="">1</a></li>
		<li><a href="">2</a></li>
		<li><a href="">3</a></li>
		<li><a href="">>></a></li>
		<li><a href="">Last</a></li>
	</ul>
</div><!-- / .pagination -->--%>