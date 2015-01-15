<script type="text/javascript">
    $(document).ready(function() {
        $('.contact__agent-number').on('click', function(e) {
            e.preventDefault();
            $(this).text() == 'View My Contact Number' ? $(this).text('(617) 230-6674') : $(this).text('View My Contact Number');
        })
    });
</script>

<div class='contact__container'>
    <div class='contact__header'>
        <p>Listing Provided By</p>
    </div>

    <div class='contact__wrapper--lower'>
        <div class='contact__agent-info' style='margin-left:0px;'>
            <p class='contact__agent-name'>Deborah M. Gordon</p>
            <div class='contact__agent-links'>
                <a class='contact__agent-number' href='javascript:;'>View My Contact Number</a>
            </div>
        </div>
    </div>  
</div>