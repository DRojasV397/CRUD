document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('formCrearUsuario').addEventListener('submit', (event) => {
        event.preventDefault();
        crearUsuario();
    });

    document.getElementById('formActualizarUsuario').addEventListener('submit', (event) => {
        event.preventDefault();
        actualizarUsuario();
    });
});

async function realizarConsulta() {
    try {
        const query = `
            query {
                getAllUsers {
                    id
                    name
                    username
                    password
                }
            }
        `;

        const usuarios = await realizarConsultaGraphQL(query);
        mostrarResultados(usuarios);
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
    }
}

async function crearUsuario() {
    const nombre = document.getElementById('nombre').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const nuevoUsuario = {
            name: nombre,
            username: username,
            password: password,
        };

        const resultado = await crearUsuarioGraphQL(nuevoUsuario);
        console.log('Nuevo usuario creado:', resultado);
        // Realizar una nueva consulta después de la creación
        realizarConsulta();
    } catch (error) {
        console.error('Error al crear el usuario:', error);
    }
}

async function actualizarUsuario() {
    const idActualizar = document.getElementById('idActualizar').value;
    const nombreActualizar = document.getElementById('nombreActualizar').value;
    const usernameActualizar = document.getElementById('usernameActualizar').value;
    const passwordActualizar = document.getElementById('passwordActualizar').value;

    try {
        const usuarioActualizar = {
            id: idActualizar,
            name: nombreActualizar,
            username: usernameActualizar,
            password: passwordActualizar,
        };

        const resultado = await actualizarUsuarioGraphQL(usuarioActualizar);
        console.log('Usuario actualizado:', resultado);
        // Realizar una nueva consulta después de la actualización
        realizarConsulta();
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    }
}

// Las funciones realizarConsultaGraphQL, crearUsuarioGraphQL, y mostrarResultados se mantienen como en el ejemplo anterior.


async function realizarConsultaGraphQL(query) {
    const url = 'http://localhost:3000/graphql';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    const { data } = await response.json();
    return data.getAllUsers;
}

function mostrarResultados(resultados) {
    const contenedorResultados = document.getElementById('resultados');
    contenedorResultados.innerHTML = '<h2>Resultados:</h2>';

    resultados.forEach(usuario => {
        const usuarioHTML = `
            <div>
                <p>ID: ${usuario.id}</p>
                <p>Nombre: ${usuario.name}</p>
                <p>Usuario: ${usuario.username}</p>
                <p>Contraseña: ${usuario.password}</p>
            </div>
            <hr>
        `;
        contenedorResultados.innerHTML += usuarioHTML;
    });
}
// ... (código existente)

async function crearUsuarioGraphQL(nuevoUsuario) {
    const mutation = `
        mutation {
            createUser(name: "${nuevoUsuario.name}", username: "${nuevoUsuario.username}", password: "${nuevoUsuario.password}") {
                id
                name
                username
                password
            }
        }
    `;

    return await realizarConsultaGraphQL(mutation);
}

async function actualizarUsuarioGraphQL(usuarioActualizar) {
    const mutation = `
        mutation {
            updateUser(id: "${usuarioActualizar.id}", name: "${usuarioActualizar.name}", username: "${usuarioActualizar.username}", password: "${usuarioActualizar.password}") {
                id
                name
                username
                password
            }
        }
    `;

    return await realizarConsultaGraphQL(mutation);
}

// ... (código existente)

document.getElementById('formBorrarUsuario').addEventListener('submit', (event) => {
    event.preventDefault();
    borrarUsuario();
});

document.getElementById('formBuscarUsuario').addEventListener('submit', (event) => {
    event.preventDefault();
    buscarUsuarioPorID();
});

async function borrarUsuario() {
    const idBorrar = document.getElementById('idBorrar').value;

    try {
        const resultado = await borrarUsuarioGraphQL(idBorrar);
        console.log('Usuario borrado:', resultado);
        // Realizar una nueva consulta después de borrar el usuario
        realizarConsulta();
    } catch (error) {
        console.error('Error al borrar el usuario:', error);
    }
}

async function buscarUsuarioPorID() {
    const idBuscar = document.getElementById('idBuscar').value;

    try {
        const usuarioEncontrado = await buscarUsuarioPorIDGraphQL(idBuscar);
        console.log('Usuario encontrado:', usuarioEncontrado);
        mostrarResultadoBusqueda(usuarioEncontrado);
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
    }
}

async function borrarUsuarioGraphQL(id) {
    const mutation = `
        mutation {
            deleteUser(id: "${id}")
        }
    `;

    return await realizarConsultaGraphQL(mutation);
}

async function buscarUsuarioPorIDGraphQL(id) {
    const query = `
        query {
            getUser(id: "${id}") {
                id
                name
                username
                password
            }
        }
    `;

    return await realizarConsultaGraphQL(query);
}

function mostrarResultadoBusqueda(usuario) {
    const resultadoBusqueda = document.getElementById('resultadoBusqueda');
    resultadoBusqueda.innerHTML = '<h2>Resultado de Búsqueda:</h2>';

    if (usuario) {
        const usuarioHTML = `
            <div>
                <p>ID: ${usuario.id}</p>
                <p>Nombre: ${usuario.name}</p>
                <p>Usuario: ${usuario.username}</p>
                <p>Contraseña: ${usuario.password}</p>
            </div>
        `;
        resultadoBusqueda.innerHTML += usuarioHTML;
    } else {
        const usuarioHTML = `
            <div>
                <p>ID: ${usuario.id}</p>
                <p>Nombre: ${usuario.name}</p>
                <p>Usuario: ${usuario.username}</p>
                <p>Contraseña: ${usuario.password}</p>
            </div>
        `;
        resultadoBusqueda.innerHTML += usuarioHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('operacionSelect').addEventListener('change', actualizarFormulario);

    // Actualizar el formulario al cargar la página
    actualizarFormulario();
});

async function realizarOperacion() {
    const seleccion = document.getElementById('operacionSelect').value;

    if (seleccion === 'consultar') {
        await consultarTodosUsuarios();
    } else if (seleccion === 'crear') {
        await crearUsuario();
    }
}

async function consultarTodosUsuarios() {
    try {
        const query = `
            query {
                getAllUsers {
                    id
                    name
                    username
                    password
                }
            }
        `;

        const usuarios = await realizarConsultaGraphQL(query);
        mostrarResultados(usuarios);
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
    }
}

async function crearUsuario() {
    const nombre = prompt('Ingrese el nombre:');
    const username = prompt('Ingrese el nombre de usuario:');
    const password = prompt('Ingrese la contraseña:');

    try {
        const nuevoUsuario = {
            name: nombre,
            username: username,
            password: password,
        };

        const resultado = await crearUsuarioGraphQL(nuevoUsuario);
        console.log('Nuevo usuario creado:', resultado);
        // Realizar una nueva consulta después de la creación
        consultarTodosUsuarios();
    } catch (error) {
        console.error('Error al crear el usuario:', error);
    }
}

function actualizarFormulario() {
    const seleccion = document.getElementById('operacionSelect').value;
    const resultados = document.getElementById('resultados');

    if (seleccion === 'consultar') {
        resultados.innerHTML = '<h2>Resultados:</h2>';
    } else if (seleccion === 'crear') {
        resultados.innerHTML = '';
    }
}

// ... (código existente)



