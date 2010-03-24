jQuery(function($){
	
	// 검색창 글꼴 색
	var input_search = $('form.search>fieldset.basic>input[type=text]');
	input_search.focus(function(){$(this).attr('style','color:#767676')});
	input_search.bind('focusout',function(){$(this).removeAttr('style')});
	
	// .pxeT2 .pxeT3 상세보기
	var button_tr = $('button.toggleTr');
	var button_table = $('button.toggleTable');
	var pxeT2_tr = $('table.pxeT2>tbody>tr');
	var pxeT3_tr = $('table.pxeT3>tbody>tr');
	
	// 이슈목록 상세검색
	$('form.search').removeClass('openSrch');
	$('button.toggleSrch').click(function(){
		$('form.search').toggleClass('openSrch');
	});
	
	// 다운로드
	$('.pxeDownload>.dBody').removeClass('show');
	$('.pxeDownload').each(function(){ 
		$(this).find('>.dBody:first').addClass('show'); 
	});
	$('.pxeDownload>.dFooter button').click(function(){
		$(this).toggleClass('hidden');
		
		if($(this).hasClass('hidden')){
			//alert('1');
			$(this).parents('.pxeDownload').find('.dBody').removeClass('show');
			$(this).parents('.pxeDownload').find('.dBody:first').addClass('show');
		} else {
			//alert('2');
			$(this).parents('.pxeDownload').find('.dBody').addClass('show');
		}
	});
	
	// 다운로드 - 배포기록 및 변경사항
	$('.vInfo').removeClass('openInfo');
	$('.vInfo>button').click(function(){
		$(this).parents('.vInfo:first').toggleClass('openInfo');
	});
	
	// 필터
	$('.tFilter>button').click(function(){
		$(this).parent('.tFilter').toggleClass('fOpen');
	});
	$('.tFilter').mouseleave(function(){
		$(this).removeClass('fOpen');
	});

	var iText = $('label.iLabel').next('.iText');
	iText
		.focus(function(){
			$(this).prev('label.iLabel').attr('style','visibility:hidden');
		})
		.blur(function(){
			if($(this).val() == ''){
				$(this).prev('label.iLabel').attr('style','visibility:visible');
			}
		});
	
});

function button_tr_click(element)
{
	jQuery(element).parents('tr:first').toggleClass('open');	
}

function button_table_click(element)
{
	if(jQuery(element).toggleClass('all').hasClass('all')){
		jQuery(element).parents('.pxeT3').find('tr').addClass('open');
	} else {
		jQuery(element).parents('.pxeT3').find('tr').removeClass('open');
	}	
}

function button_table_click_t2(element)
{
	var pxeT2_tr = jQuery('table.pxeT2>tbody>tr');
	if(jQuery(element).toggleClass('all').hasClass('all')){
		pxeT2_tr.addClass("open");
	}
	else
	{
		pxeT2_tr.removeClass("open");
	}
}

