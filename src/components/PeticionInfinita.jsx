const PeticionInfinita = () => {
    async function obtenerReservas() {
        try {
          const response = await fetch("http://testaws-env.eba-6swprbqg.eu-north-1.elasticbeanstalk.com/api/reservas/listar");
          if (!response.ok) {
            throw new Error("Error en la solicitud: " + response.status);
          }
          const data = await response.json();
          console.log("Datos recibidos:", data);
        } catch (error) {
          console.error("Hubo un problema con la solicitud:", error);
        }
      }
      
      // Ejecutar inmediatamente al inicio
      obtenerReservas();
      
      // Luego repetir cada 3 minutos (180000 milisegundos)
      setInterval(obtenerReservas, 180000);
      
}

export default PeticionInfinita;