$(document).ready(function () {

	let data = JSON.parse(movies);
	let swapped = true;
	
	function sort_data(sort_direction){
		let direction = sort_direction
		while(swapped){
			swapped = false;
			if(direction == 'down'){
				for(let j = 0; j < data.length-1; j++){
					if(data[j].Likes < data[j+1].Likes){
						let data_temp = data[j];
						data[j] = data[j+1]
						data[j+1] = data_temp;
						swapped = true;
					};
				};
			};

			if(direction == 'up'){
				for(let j = 0; j < data.length-1; j++){
					if(data[j].Likes > data[j+1].Likes){
						let data_temp = data[j];
						data[j] = data[j+1]
						data[j+1] = data_temp;
						swapped = true;
					};
				};
			};
		};
	};

	function activate_data_menu(){
		$('#sort_descending').on('click', function(){
			swapped = true;
			sort_data('down');
			build_document();
		});

		$('#sort_ascending').on('click', function(){
			swapped = true;
			sort_data('up');
			build_document();
		});

		$('#remove_likes').on('click', function(){
			swapped = true;
			for (i = 0; i< data.length; i++){
				data[i].Likes = 0;
			}
			sort_data('up');
			build_document();
		});

		$('#random_like').on('click', function(){
			for (i = 0; i< data.length; i++){
				data[i].Likes = Math.floor((Math.random() * 51)-10);
			}
			build_document();
		});

	
	};

	

	function build_document(){
		$('#main_wrapper').empty();
		for (let i = 0; i < data.length; i++) {
			$('#main_wrapper').append(`
				<div class="box">

					<div class="movie_pic">
						<img src="${data[i].Image}" alt="${data[i].Title}">
					</div>

					<div class="info">
						<div class="movie_info">
							<h3>${data[i].Title}</h3>
							<p>${data[i].Description}</p>
							
						</div>

						<div class="like_area">
							<div class="dis_like_line dis_like_line_${i}">Dislike 
							<div class="fa fa-thumbs-down">
							</div>
							</div>
							
							<div class="like_line like_line_${i}">Like <div class="fa fa-thumbs-up"></div></div>
							<div class="likes like_${i}">${data[i].Likes}</div>

							
						</div>

						
							
						

					</div>
				</div>
			`);
			
			$(`.like_line_${i}`).on(`click`, function(){
				data[i].Likes++;
				$(`.like_${i}`).text(data[i].Likes);
				
			});

			$(`.dis_like_line_${i}`).on(`click`, function(){
				data[i].Likes--;
				$(`.like_${i}`).text(data[i].Likes);
				
			});
		};
	};

	activate_data_menu();
	
	build_document();
});