document.addEventListener('DOMContentLoaded',()=>{
    // Mostrar todos los cursos
    showCourses(cursos);
});

// CONTENEDOR PARA LOS RESULTADOS
const result = document.querySelector('#principal-content');

// SELECTORES
const category = document.querySelector('#categoria');
const min = document.querySelector('#minimo');
const max = document.querySelector('#maximo');
const reset = document.querySelector('#reset');

// OBJETO QUE SE LLENARÁ CON LA BUSQUEDA
const data = {    
    categoria: '',
    minimo: '',
    maximo: ''
}

// EVENT LISTENERS PARA LOS FILTROS
category.addEventListener('change', e=>{
    data.categoria = e.target.value;
    filterCourses();
});
min.addEventListener('change', e=>{
    data.minimo = parseInt(e.target.value);
    filterCourses();
});
max.addEventListener('change', e=>{
    data.maximo = parseInt(e.target.value);
    filterCourses();
});

// RESETEAR FILTROS
reset.addEventListener('click',()=>{    
    data.categoria = '';
    data.minimo = '';
    data.maximo = '';
    category.value = '';
    min.value = '';
    max.value = '';
    filterCourses(data);    
});

// FUNCIONES
function showCourses(cursos){
    clearHTML(); // Limpia el HTML
    cursos.forEach(curso => {
        const {imagen, nombre, categoria, descripcion, precio} = curso;
        // Crear los elementos
        const divCourseHTML = document.createElement('DIV');        
        const imgCourseHTML = document.createElement('IMG');
        const hCourseHTML = document.createElement('H2');
        const catCourseHTML = document.createElement('P');
        const p1CourseHTML = document.createElement('P');
        const p2CourseHTML = document.createElement('P');
        const sCourseHTML = document.createElement('SPAN');
        const bCourseHTML = document.createElement('BUTTON');

        // Crear los cards
        divCourseHTML.classList.add('card');
        imgCourseHTML.src = 'img/'+imagen;        
        hCourseHTML.textContent = nombre;
        catCourseHTML.textContent = 'Categoria: '+categoria;
        catCourseHTML.classList.add('category');
        p1CourseHTML.textContent = descripcion;
        p2CourseHTML.textContent = 'Precio: ';
        sCourseHTML.textContent = '$'+precio;
        bCourseHTML.textContent = 'comprar';
        divCourseHTML.appendChild(imgCourseHTML);
        divCourseHTML.appendChild(hCourseHTML);
        divCourseHTML.appendChild(catCourseHTML);
        divCourseHTML.appendChild(p1CourseHTML);
        p2CourseHTML.appendChild(sCourseHTML);
        divCourseHTML.appendChild(p2CourseHTML);
        divCourseHTML.appendChild(bCourseHTML);
        
        // Insertar en el HTML
        result.appendChild(divCourseHTML)
    });
}

// LIMPIAR HTML
function clearHTML(){
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
}

// FILTRAR CURSOS
function filterCourses(){    
    const result = cursos.filter(filterCategory).filter(filterMin).filter(filterMax);    
    if (result.length) {
        return showCourses(result);
    }else{
        noResult();
    }
}

// FILTRAR POR CATEGORIA
function filterCategory(curso){
    const {categoria} = data;
    if (categoria) {
        return curso.categoria === categoria;
    }
    return curso;
}

// FILTRAR POR PRECIO MÍNIMO
function filterMin(curso){
    const {minimo} = data;
    if (minimo) {
        return curso.precio >= minimo;
    }
    return curso;
}

// FILTRAR POR PRECIO MÁXIMO
function filterMax(curso){
    const {maximo} = data;
    if (maximo) {
        return curso.precio <= maximo;
    }
    return curso;
}

// SIN RESULTADO
function noResult(){
    clearHTML();
    const noResult = document.createElement('DIV');
    noResult.classList.add('container-no-result');
    const pNoResult = document.createElement('P');
    pNoResult.classList.add('no-result');
    pNoResult.textContent = 'No hay resultados, intenta seleccionando otras opciones';
    const error404 = document.createElement('IMG');
    error404.src = 'img/404.jpg';
    noResult.appendChild(pNoResult);
    noResult.appendChild(error404);
    result.appendChild(noResult);
}