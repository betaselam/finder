//console.log('implemented3');

function funcExpCol(varTarget) {
	var expcolState = $('a[target="' + varTarget + '"]').attr('title');
    var headingTitle = $('a[target="' + varTarget + '"]').attr('data-name');

	if (expcolState == "collapse") {
		//hides content
	    var temp = "<span class='HiddenText'>" + headingTitle + "</span> Expand <span aria-hidden='true'>+</span>";
	    $('a[target="' + varTarget + '"]').attr('title', 'expand');
	    $('a[target="' + varTarget + '"]').html('');
		$('a[target="' + varTarget + '"]').html(temp);
		$('.' + varTarget).addClass('hideContent');
		//$('a[target="' + varTarget + '"]').focus();
	} else {
    //shows content
    var temp = "<span class='HiddenText'>" + headingTitle + "</span> Close <span aria-hidden='true'>-</span>";
		$('a[target="' + varTarget + '"]').attr('title', 'collapse');
		$('a[target="' + varTarget + '"]').html('');
        $('a[target="' + varTarget + '"]').html(temp);
		$('.' + varTarget).removeClass('hideContent');
		//$('a[target="' + varTarget + '"]').focus();
	}
}
