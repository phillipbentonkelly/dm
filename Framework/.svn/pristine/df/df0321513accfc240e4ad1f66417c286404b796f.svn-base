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
<div class="pagination">
	<ul>
		<c:choose>
			<c:when test="${(page eq '1') && (count > limitPerPage)}">
				<c:choose>
					<c:when test="${numPages < (pagLimit-1)}"> 
				<%-- case 1 --%>
						<li class="active"><a href="?page=1">1</a></li>
						<c:forEach var="i" begin="2" end="${numPages}" step="1" varStatus ="status">
							<li><a href="?page=${i}">${i}</a></li>
						</c:forEach>
						<li><a href="?page=2">>></a></li>
						<li><a href="?page=${numPages}">Last</a></li>
					</c:when>
					<c:otherwise>
					<%-- <p>case 2</p> --%>
						<li class="active"><a href="?page=1">1</a></li>
						<c:forEach var="i" begin="2" end="${pagLimit-1}" step="1" varStatus ="status"> 
							<li><a href="?page=${i}">${i}</a></li>
						</c:forEach>
						<li><a href="?page=2">>></a></li>
						<li><a href="?page=${numPages}">Last</a></li>
					</c:otherwise>
				</c:choose>
			</c:when>
		 	<c:when test="${(count > limitPerPage) && (page < numPages)}">
				<c:choose>
					<c:when test="${(page < (pagLimit-1)) && (numPages < pagLimit)}">		
						<%-- <p>case 3</p> --%>
						<li><a href="?page=1">First</a></li>
						<li><a href="?page=${page-1}"><<</a></li>
						<c:forEach var="i" begin="1" end="${numPages}" step="1" varStatus ="status">
							<c:choose>
								<c:when test="${i == page}">
									<li class="active"><a href="?page=${i}">${i}</a></li>
								</c:when>
								<c:otherwise>
									<li><a href="?page=${i}">${i}</a></li>
								</c:otherwise>
							</c:choose>
						</c:forEach>
						<li><a href="?page=${page+1}">>></a></li>
						<li><a href="?page=${numPages}">Last</a></li>
					</c:when>
			 		<c:when test="${page < (numPages - pagLimit+2)}"> <%-- took out page < pagLimit and < pagLimit-1 --%>
			 			<%-- <p>case 4</p>--%>
			 			<li><a href="?page=1">First</a></li>
						<li><a href="?page=${page-1}"><<</a></li>
						<c:forEach var="i" begin="${page-1}" end="${page+pagLimit-2}" step="1" varStatus ="status">
							<c:choose>
								<c:when test="${i == page}">
									<li class="active"><a href="?page=${i}">${i}</a></li>
								</c:when>
								<c:otherwise>
									<li><a href="?page=${i}">${i}</a></li>
								</c:otherwise>
							</c:choose>
						</c:forEach>
						<li><a href="?page=${page+1}">>></a></li>
						<li><a href="?page=${numPages}">Last</a></li>
					</c:when>
					<c:otherwise>
					 <%-- <p>case 5</p>--%>
						<li><a href="?page=1">First</a></li>
					<%-- 	<p>${(page < (pagLimit-1))}</p>
						<p>${(numPages < pagLimit)}</p>
						<p>numPages ${numPages}</p>
						<p>pagLimit ${pagLimit }</p>--%>
					 	<li><a href="?page=${page-1}"><<</a></li> 
						<c:forEach var="i" begin="${numPages-pagLimit+1}" end="${numPages}" step="1" varStatus ="status">
							<c:choose>
								<c:when test="${i == page}">
									<li class="active"><a href="?page=${i}">${i}</a></li>
								</c:when>
								<c:otherwise>
									<li><a href="?page=${i}">${i}</a></li>
								</c:otherwise>
							</c:choose>
						</c:forEach>
						<li><a href="?page=${page+1}">>></a></li>
						<li><a href="?page=${numPages}">Last</a></li>
					</c:otherwise>
				</c:choose>
			</c:when>
			<c:when test="${(count > limitPerPage) && (page eq numPages)}">
				<c:choose>
					<c:when test="${numPages < pagLimit}">
						<%-- <p>case 6</p> --%>
						<li><a href="?page=1">First</a></li>
						<li><a href="?page=${page-1}"><<</a></li>
						<c:forEach var="i" begin="1" end="${numPages-1}" step="1" varStatus ="status">
							<li><a href="?page=${i}">${i}</a></li>
						</c:forEach>
						<li class="active"><a href="?page=${page}">${page}</a></li>
					</c:when>
					<c:when test="${numPages >= pagLimit}">
					<%-- <p>case 7</p>--%>
						<li><a href="?page=1">First</a></li>
						<li><a href="?page=${page-1}"><<</a></li>
						<c:forEach var="i" begin="${numPages-pagLimit+1}" end="${numPages-1}" step="1" varStatus ="status">
							<li><a href="?page=${i}">${i}</a></li>
						</c:forEach>
						<li class="active"><a href="?page=${numPages}">${numPages}</a></li>
					</c:when>
				</c:choose>
			</c:when>
	</c:choose>
	</ul>
</div>
<!-- / .pagination -->


<%-- <div class="pagination">
	<ul>
		<li class="active"><a href="">1</a></li>
		<li><a href="">2</a></li>
		<li><a href="">3</a></li>
		<li><a href="">>></a></li>
		<li><a href="">Last</a></li>
	</ul>
</div><!-- / .pagination -->--%>