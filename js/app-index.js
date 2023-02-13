document.addEventListener('DOMContentLoaded',()=>{
    // Mostrar cursos
    showCourses(cursos);
});

// SELECTORES
const card = document.querySelector('#principal-content');

// FUNCIONES
function showCourses(cursos){
    cursos.forEach(curso => {
        const divCourseHTML = document.createElement('DIV');        
        const imgCourseHTML = document.createElement('IMG');
        const hCourseHTML = document.createElement('H2');
        const p1CourseHTML = document.createElement('P');
        const p2CourseHTML = document.createElement('P');
        const sCourseHTML = document.createElement('SPAN');
        const bCourseHTML = document.createElement('BUTTON');

        divCourseHTML.classList.add('card');
        imgCourseHTML.src = 'img/'+curso.imagen;        
        hCourseHTML.textContent = curso.nombre;
        p1CourseHTML.textContent = curso.descripcion;
        p2CourseHTML.textContent = 'Precio: ';
        sCourseHTML.textContent = '$'+curso.precio;
        bCourseHTML.textContent = 'comprar';
        divCourseHTML.appendChild(imgCourseHTML);
        divCourseHTML.appendChild(hCourseHTML);
        divCourseHTML.appendChild(p1CourseHTML);
        p2CourseHTML.appendChild(sCourseHTML);
        divCourseHTML.appendChild(p2CourseHTML);
        divCourseHTML.appendChild(bCourseHTML);
        card.appendChild(divCourseHTML)
    });
}