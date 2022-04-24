const fs = require("fs");

const recortarTamanioDeUnArreglo = (arreglo, tamanio) => {
  let arregloModificado = [];
  for (let i = 0; i < tamanio && i < arreglo.length; i++) {
    arregloModificado.push(arreglo[i]);
  }
  return arregloModificado;
};

const eliminarArchivo = (urlArchivo) => {
  fs.unlink(urlArchivo)
    .then((res) => {
      console.log("Archivo eliminado: ", urlArchivo);
    })
    .catch((err) => {
      console.error("Something wrong happened removing the file", err);
    });
};

module.exports = {
  recortarTamanioDeUnArreglo,
  eliminarArchivo,
};
