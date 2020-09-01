// Funciones para poder consumir los datos de la base de datos
async function getLocales() {
  let data = await axios.get('https://trabajocastro4.000webhostapp.com/index.php').then(data => data)
  return data
}

async function getInformeId(id) {
  let data = await axios.get(`https://trabajocastro4.000webhostapp.com/get_informes_id.php?id=${id}`).then(data => data)
  return data
}

async function getInformeFecha(id, fecha) {
  let data = await axios.get(`https://trabajocastro4.000webhostapp.com/get_informe_fecha.php?id=${id}&fecha=${fecha}`).then(data => data)
  return data
}

// Lógica del programa
// Esta función carga los locales que tenemos creados en la base de datos dando una pequeña animación del logo
async function cargarLocales(id){
  let loading = new Image(); loading.src = './utils/logo.png'; loading.id = 'imgCargando'
  loading.className = 'heart'
  document.getElementById('charCont').style = `
    align-items: center;
    transform: translate(0, 30%)
  `
  document.getElementById('charCont').appendChild(loading)
  setTimeout(async () => {
    document.getElementById('charCont').style = `
      align-items: center;
      transform: translate(0, 0)
    `
    document.getElementById('charCont').removeChild(loading)
    let data = await getLocales()
    let locales = Object.values(data.data).flat(1)
    let listaLocales = document.getElementById('listaLocales')
    let x = 0
    locales.map(local => {
      x++
      let button = document.createElement('button')
      let div = document.createElement('div')
      div.className = "dropdown-divider"
      button.id = local.id
      button.className = 'btn-info dropdown-item'
      button.style = 'text-align: center'
      button.addEventListener('click', (event) => {
        cargarLocal(event)
      })
      button.innerHTML = `${local.ubicacion}`
      listaLocales.appendChild(button)
      if (x!==locales.length){
        listaLocales.appendChild(div)
      }
    })
  }, 1200);
}

// Al momento de cargar el script, se inicializa la función
cargarLocales()

// Esta función permite cargar el local según su ubicación, y mostrar la información de este y también visualizar los diferentes reportes que se pueden ver
async function cargarLocal(event) {
  document.getElementById('charContenedor').style = 'display: none;'
  let data = await getLocales()
  let locales = Object.values(data.data).flat(1)
  let localContainer = document.getElementById('localContenedor')
  document.getElementById('subContainer').style = 'display: block'
  localContainer.innerHTML = ''
  locales.map((local) => {
    if (local.id === event.target.id){
      // console.log(local)
      let contenedor = document.createElement('div')
      contenedor.className = 'col'
      contenedor.innerHTML = `
        <div class="row">
          <div class="col-9 d-flex flex-column">
            <span>Ubicación: ${local.ubicacion}</span>
            <span>Número máximo: ${local.numero_max} personas</span>
            <span>Número actual de personas: ${local.numero_personas} personas</span>
          </div>
          <div class="col-3 d-flex justify-content-center align-items-center">
            <span id="led"></span>
          </div>
        </div>
      `
      setTimeout(() => {
        if (parseInt(local.numero_personas) >= parseInt(local.numero_max)){
          let led = document.getElementById('led')
          led.className = 'rounded-circle'
          led.style = `
            background-color: red;
            width: 50px;
            height: 50px;
          `
        } else {
          let led = document.getElementById('led')
          led.className = 'rounded-circle'
          led.style = `
            background-color: greenyellow;
            width: 50px;
            height: 50px;
          `
        }
      }, 15);
      localContainer.appendChild(contenedor)
      let date = moment().format('YYYY-MM-DD')
      document.getElementById('botonesContenedor').innerHTML = `
        <div id="boton1" title="Últimos 11 informes" type="button" class="col btnInput rounded px-2 py-1 d-flex flexCenterA" onclick="formulario1(${local.id})"><span>Últimos reportes</span></div>
        <div class="col btnInput btnMargin d-flex flex-column align-items-center">
          <label for="inputFecha">Informe Diario</label>
          <input id="inputFecha" type="date" value="${date}" onkeydown="return false" class="rounded px-2 py-1" onchange="formulario2(${local.id})"/>
        </div>
        <div class="col btnInput d-flex flex-column align-items-center">
          <label for="inputMes">Informe Mensual</label>
          <select id="inputMes" class="rounded px-2 py-1" onchange="formulario3(${local.id})">
            <option value="nothing" selected disabled>Meses</option>
            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>
      `
    }
  })
}

// Esta función visualiza por un bar chart los últimos 11 informes que se tiene en la base de datos
async function formulario1(id) {
  let data = await getInformeId(id)
  let informes = Object.values(data.data).flat(1)
  informes.splice(0, informes.length - 11)
  pintarChart(informes)
}

// Esta función muestra un bar chart del día en elección
async function formulario2(id) {
  let fecha = document.getElementById('inputFecha').value
  let data = await getInformeFecha(id, fecha)
  let informes = Object.values(data.data).flat(1)
  pintarChart(informes)
}

// Esta función muestra un bar chart de todos los días del mes en elección
async function formulario3(id) {
  let mes = document.getElementById('inputMes').value
  let data = await getInformeId(id)
  let informes = Object.values(data.data).flat(1)
  let foundMes = informes.filter( index => index.fecha.split('-')[1] === mes)
  // console.log(foundMes)
  let diaConteo = []
  let diaRecuerdo = 0
  let copiaDiaRecuerdo = 0
  let contadorPersonas = 0
  let x = 0
  foundMes.map(informe => {
    copiaDiaRecuerdo = diaRecuerdo
    diaRecuerdo = informe.fecha.split(' ')[0].split('-')[2]
    contadorPersonas = parseInt(informe.conteo_diario)
    // console.log(diaRecuerdo)
    if (diaRecuerdo === copiaDiaRecuerdo){
      diaConteo[x-1].contador = diaConteo[x-1].contador + contadorPersonas
    } else {
      diaConteo.push(new Object())
      diaConteo[x] = {
        dia: diaRecuerdo,
        contador: contadorPersonas
      }
      x++
    }
  })
  // console.log(diaConteo)
  pintarChartV2(diaConteo)
}

// Esta función genera un nodo canvas para luego, utilizando la librería de chartJs, generar un gráfico.
function pintarChart(informes){
  let charContenedor = document.getElementById('charContenedor')
  let canvas = document.createElement('canvas')
  canvas.id = 'myChart'
  charContenedor.style = 'display: block;'
  charContenedor.innerHTML = ''
  charContenedor.appendChild(canvas)

  let horas = []
  let conteos = []
  let bgColor = []
  let border = []
  for (let i = 0; i < informes.length; i++){
    horas.push(informes[i].fecha)
    conteos.push(informes[i].conteo_diario)
    if(informes[i].conteo_diario >= 0 && informes[i].conteo_diario <= 25){
      bgColor.push('rgba(54, 162, 235, 0.2)')
    } else if (informes[i].conteo_diario > 25 && informes[i].conteo_diario <= 50){
      bgColor.push('rgba(54, 162, 235, 0.35)')
    } else if (informes[i].conteo_diario > 50 && informes[i].conteo_diario <= 75){
      bgColor.push('rgba(54, 162, 235, 0.5)')
    } else if (informes[i].conteo_diario > 75 && informes[i].conteo_diario <= 100){
      bgColor.push('rgba(54, 162, 235, 0.65)')
    } else if (informes[i].conteo_diario > 100){
      bgColor.push('rgba(54, 162, 235, 0.8)')
    }
    border.push('rgba(54, 162, 235, 1)')
  }

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: horas,
      datasets: [{
        label: 'Conteo de personas',
        data: conteos,
        backgroundColor: bgColor,
        borderColor: border,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// Esta función genera un nodo canvas para luego, utilizando la librería de chartJs, generar un gráfico para los meses.
function pintarChartV2(data){
  // console.log(data.length)
  let charContenedor = document.getElementById('charContenedor')
  let canvas = document.createElement('canvas')
  canvas.id = 'myChart'
  charContenedor.style = 'display: block;'
  charContenedor.innerHTML = ''
  charContenedor.appendChild(canvas)

  let dias = []
  let conteos = []
  let bgColor = []
  let border = []
  for (let i = 0; i < data.length; i++){
    dias.push(data[i].dia)
    conteos.push(data[i].contador)
    if(data[i].contador >= 0 && data[i].contador <= 250){
      bgColor.push('rgba(54, 162, 235, 0.2)')
    } else if (data[i].contador > 250 && data[i].contador <= 500){
      bgColor.push('rgba(54, 162, 235, 0.35)')
    } else if (data[i].contador > 500 && data[i].contador <= 750){
      bgColor.push('rgba(54, 162, 235, 0.5)')
    } else if (data[i].contador > 750 && data[i].contador <= 1000){
      bgColor.push('rgba(54, 162, 235, 0.65)')
    } else if (data[i].contador > 1000){
      bgColor.push('rgba(54, 162, 235, 0.8)')
    }
    border.push('rgba(54, 162, 235, 1)')
  }

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dias,
      datasets: [{
        label: 'Conteo de personas',
        data: conteos,
        backgroundColor: bgColor,
        borderColor: border,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

