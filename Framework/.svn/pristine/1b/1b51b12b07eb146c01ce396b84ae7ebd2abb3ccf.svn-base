<div class="pagination">
	<ul>
		<c:choose>
			<c:when test="${case eq '1'}">
				<li class="active"><a href="?page=1">1</a></li>
				<c:forEach var="i" begin="2" end="${numPages}" step="1" varStatus ="status">
					<li><a href="?page=${i}">${i}</a></li>
				</c:forEach>
				<li><a href="?page=2">>></a></li>
				<li><a href="?page=${numPages}">Last</a></li>
			</c:when>
			<c:when test="${case eq '2'}">
				<li class="active"><a href="?page=1">1</a></li>
				<c:forEach var="i" begin="2" end="${pagLimit-1}" step="1" varStatus ="status"> 
					<li><a href="?page=${i}">${i}</a></li>
				</c:forEach>
				<li><a href="?page=2">>></a></li>
				<li><a href="?page=${numPages}">Last</a></li>
			</c:when>
			<c:when test="${case eq '3'}">
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
			<c:when test="${case eq '4'}">
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
			<c:when test="${case eq '5'}">
				<li><a href="?page=1">First</a></li>
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
			</c:when>
			<c:when test="${case eq '6'}">
				<li><a href="?page=1">First</a></li>
				<li><a href="?page=${page-1}"><<</a></li>
				<c:forEach var="i" begin="1" end="${numPages-1}" step="1" varStatus ="status">
					<li><a href="?page=${i}">${i}</a></li>
				</c:forEach>
				<li class="active"><a href="?page=${page}">${page}</a></li>
			</c:when>
			<c:when test="${case eq '7'}">
				<li><a href="?page=1">First</a></li>
				<li><a href="?page=${page-1}"><<</a></li>
				<c:forEach var="i" begin="${numPages-pagLimit+1}" end="${numPages-1}" step="1" varStatus ="status">
					<li><a href="?page=${i}">${i}</a></li>
				</c:forEach>
				<li class="active"><a href="?page=${numPages}">${numPages}</a></li>
			</c:when>
		</c:choose>
	</ul>
</div>
<!-- / .pagination -->	
	