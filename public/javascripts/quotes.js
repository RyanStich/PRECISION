
$(':input').on('input', function() {
    $(this).toggleClass('empty', this.value.length != 0);
}).trigger('input');


