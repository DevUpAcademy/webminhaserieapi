const apiURL = 'https://minhaserieapi.herokuapp.com'

$(function() {
	$( "[name='textSearch']" ).keyup(function() {
		fetch(`${apiURL}/search/${this.value}`).then(res => res.json())
		.then(data => {
			$('.top-series').empty()
			if (data.count <= 0) {
				//	
			} else {
				$('.top-series').append(cardTwo(data))
			}
		})
		.catch((err) => {
			console.log(err)
		})
	})

	console.log('Start');
	fetch(`${apiURL}/series`)
		.then(res => res.json())
		.then((data) => {
			$('.top-series').append(cardOne(data))
		})
		.catch((err) => {
			$('.top-series').append('Falha')
		})

		$('.searchForm').submit(function(e) {
			e.preventDefault()
			console.log(this.textSearch.value)
			
			if(this.textSearch.value.length > 0) {
				fetch(`${apiURL}/search/${this.textSearch.value}`)
				.then(res => res.json())
				.then(data => {
					$('.top-series').empty()
					if (data.count <= 0) {
						$('#info').append(alertMessage(
								'info',
								'<strong>Nenhum serie encontrada,</strong> verifique sua pesquisa ou tente novamente.' 
							));
					} else {
						$('.top-series').append(cardTwo(data))
					}
				})
				.catch((err) => {
					console.log(err)
				})
			} else {
				$('#info').append(alertMessage(
					'warning', 
					'<strong>Não entendi,</strong> vai ficar dificil se não informar o que você quer pesquisar :/'
				));
			}
		})
});

const cardOne = data => {
	$(function () {
		$('.card-serie').click(function(e) {
			$('#serieModal').empty()
			let name = $(this).find('.link-serie').text()
			fetch(`${apiURL}/series/${name}`)
				.then(res => res.json())
				.then(data => {
					console.log(data)
					$('#serieModal').append(modalSerie(data))
					$('#serieModal').modal('show')
				})

		})
	});
	return data.results.map(serie => {
		return (`
		<div class="card card-serie m-1" style="max-width: 540px;">
		<span class="d-none link-serie">${serie.name}</span>
		  <div class="row no-gutters">
		    <div class="col-md-4">
		      <img src="${serie.thumb}" class="card-img card-img-one ml-2" alt="${serie.title}">
		    </div>
		    <div class="col-md-8">
		      <div class="card-body">
		        <h5 class="card-title">${serie.title}</h5>
		        <p class="card-text">${serie.description.substr(0, 70)}...</p>
		        <p class="card-text"><small class="badge badge-info">${serie.category}</small></p>
		      </div>
		    </div>
		  </div>
		</div>
		`)
	});
}

const cardTwo = data => {
	$(function () {
		$('.card-serie').click(function(e) {
			$('#serieModal').empty()
			let name = $(this).find('.link-serie').text()
			fetch(`${apiURL}/series/${name}`)
				.then(res => res.json())
				.then(data => {
					console.log(data)
					$('#serieModal').append(modalSerie(data))
					$('#serieModal').modal('show')
				})

		})
	});
	return data.results.map(serie => {
		return (`
		<div class="card card-serie col-3 m-2">
			<span class="d-none link-serie">${serie.name}</span>
		  <div class="row no-gutters">
		    <div class="col-12">
		      <img src="${serie.thumb}" class="card-img" alt="${serie.title}">
		    </div>
		    <div class="col-md-8">
		      <div class="card-body">
		        <h5 class="card-title">${serie.title}</h5>
		        <p class="card-text">${serie.visits} visitas</p>
		        <p class="card-text"><small class="badge badge-info">${serie.category}</small></p>
		      </div>
		    </div>
		  </div>
		</div>
		`)
	});
}

const modalSerie = serie => {
	return (`
		<div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="exampleModalLabel">${serie.title}</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
		      <div class="container-fluid">
		        <div class="row">
					<div class="col-12 mb-2">
						<img src="${serie.thumb}" alt="${serie.title}" class="col-6 offset-3">
						<div class="col-6 offset-3">
							<span class="badge badge-info">${serie.category}</span>
	        		<p>${serie.visits} visitas</p>
						</div>
					</div>
	        
					<p>${serie.description}</p>

		        </div>
		      </div>
	      </div>
	      <div class="modal-footer">
	        <a href="${serie.link}" target="_blank"><button type="button" class="btn btn-info">Ver no Site</button></a>
	        <button type="button" class="btn btn-danger" data-dismiss="modal">Fechar</button>
	      </div>
	    </div>
	  </div>
	`)
}

const alertMessage = (type, message) => {
	return (`
		<div class="alert alert-${type} alert-dismissible fade show" role="alert">
			${message}
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		  </button>
		</div>
	`)
}