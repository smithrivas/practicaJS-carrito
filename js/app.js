document.addEventListener('DOMContentLoaded',()=>{
    const data = {
        nombre: '',
        correo: '',
        asunto: '',
        mensaje: ''
    }    

    // Seleccionar elementos
    const name = document.querySelector('#nombre');
    const email = document.querySelector('#correo');
    const copia = document.querySelector('#correo-copia');
    const asunto = document.querySelector('#asunto');
    const message = document.querySelector('#mensaje');
    const form = document.querySelector('#form');
    const btnSubmit = document.querySelector('#form button');
    const spinner = document.querySelector('#spinner');

    // Asignar eventos
    name.addEventListener('blur', validate);
    email.addEventListener('blur', validate);
    copia.addEventListener('blur', validate);
    asunto.addEventListener('blur', validate);
    message.addEventListener('input', validate);
    form.addEventListener('submit', sendData);

    // Mostrar spinner posterior al envío del formulario
    function sendData(e){
        e.preventDefault();
        spinner.classList.add('spinner-active');
        spinner.classList.remove('spinner-disabled');
        setTimeout(() => {
            spinner.classList.remove('spinner-active');
            spinner.classList.add('spinner-disabled');

            // Reiniciar objeto
            resetForm();
            
            // Crear alerta
            const div = document.createElement('DIV');
            const success = document.createElement('P');
            success.textContent = 'Mensaje enviado correctamente!';
            
            // Inyectar mensaje en el formulario
            success.classList.add('alert-green');
            btnSubmit.parentElement.appendChild(success);        
            
            // Pasados 3 segundos se elimina la alerta
            setTimeout(() => {
                success.remove();
            }, 3000);        
            
        }, 2500);
    }

    function validate(e){
        // Campo sin validación
        if (e.target.id == 'correo-copia') {
            // data[e.target.id] = '';
            // dataValidation();
            return;
        }
        // Validar los campos
        if (e.target.value.trim() === '') {
            showAlert(`El campo ${e.target.id} es obligatorio`, e.target.parentElement.parentElement);
            data[e.target.id] = '';
            dataValidation();
            return;
        } 
        // Validar email
        if (!validarEmail(e.target.value) && e.target.id === 'correo') {
            showAlert('El correo electrónico no es valido', e.target.parentElement.parentElement);
            data[e.target.id] = '';
            dataValidation();
            return;
        }
        
        // Limpiar alerta
        clearAlert(e.target.parentElement.parentElement);
        
        // Asignar los valores
        data[e.target.id] = e.target.value.trim().toLowerCase();        

        // Comprobar email
        dataValidation();
    }

    // Mostrar alerta
    function showAlert(message, ref){
        // Comprobar si ya existe una alerta
        clearAlert(ref);

        // Generar alerta HTML        
        const div = document.createElement('DIV');
        const error = document.createElement('P');
        error.textContent = message;
        
        // Inyectar el error en el formulario
        error.classList.add('alert-red');
        ref.appendChild(error);        
    }

    // Limpiar alerta
    function clearAlert(ref){
        const alertExist = ref.querySelector('.alert-red');
        if (alertExist) {
            alertExist.remove();
        }
    }

    // Validar el correo con una expresión regular
    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const result = regex.test(email);
        return result;
    }

    // Validar la habilitación del botón de envío de formulario
    function dataValidation(){
        if (Object.values(data).includes('')) {
            btnSubmit.classList.add('disabled');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('disabled');
        btnSubmit.disabled = false;        
    }

    // Reset a los campos del formulario y boton de submit
    function resetForm(){
        data.nombre = '';
        data.correo = '';
        data.asunto = '';
        data.mensaje = '';

        form.reset();
        dataValidation();
    }
});