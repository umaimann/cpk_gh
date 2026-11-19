$(function(){
	$("body").addClass('is-movie');
	if($("#js-movieLists")[0]){
		var page=1;
		if(getParam('page')){
			page=getParam('page');
		}
		getPosts('movie',page,20).done(function(data,status,xhr){
			var newsPageNum=xhr.getResponseHeader("x-wp-totalpages");
			for(var i=1;i<=newsPageNum;i++){
				if(page==i){
					$("#pnav").append('<span>'+i+'</span>');
				}else{
					$("#pnav").append('<a href="./?page='+i+'">'+i+'</a>');
				}
			}
			data.forEach((v)=>{					
				const ytID = v.acf.youtube_id;
				const thumb = ytID ? `https://img.youtube.com/vi/${ytID}/sddefault.jpg` : '../assets/img/common/noimg.jpg';
					$("#js-movieLists").append(
						'<li class="movie__item">'+
							'<a href="javascript:;" class="movie__itemLink js-moviePlay" data-yt="'+ytID+'"><img src="'+thumb+'" alt=""><span class="movie__frame"><span class="movie__framein"><span class="movie__playBtn"></span></span></span></a>'+
							'<p class="movie__itemName">'+v.title.rendered+'</p>'+
						'</li>'
					);
			})
		}).fail(function(){
			console.log('[ERROR]Failed to get movie list');
		});
	}
});