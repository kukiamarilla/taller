var app = new Vue({
  el: "#app",
  data() {
    return {
      tabla: []
    };
  },
  methods: {
    empezar(transaccion, trabajo) {
      axios
        .post(
          "http://localhost/taller/servicios/empezar.php",
          {
            transaccion,
            trabajo
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(resp => {
          this.tabla = resp.data;
          for (let i = 0; i < this.tabla.length; i++) {
            const element = this.tabla[i];

            diferencia = { dias: 0, horas: 0, minutos: 0, mora: true };
            if (element.fechahorafin != null) {
              diff = new Date(element.fechahorafin) - new Date();
              dias = Math.floor(diff / (24 * 60 * 60 * 1000));
              diff -= 24 * 60 * 60 * 1000 * dias;
              horas = Math.floor(diff / (60 * 60 * 1000));
              diff -= 60 * 60 * 1000 * horas;
              minutos = Math.floor(diff / (60 * 1000));
              diferencia = {
                dias: dias,
                horas: horas,
                minutos: minutos,
                mora: diff == 0
              };
            }
            this.tabla[i] = { ...this.tabla[i], diferencia: diferencia };
          }
        });
    },
    finalizar(transaccion, trabajo) {
      axios
        .post(
          "http://localhost/taller/servicios/finalizar.php",
          {
            transaccion,
            trabajo
          },
          {
            headers: {
              "Content-type": "application/json"
            }
          }
        )
        .then(resp => {
          this.tabla = resp.data;
          for (let i = 0; i < this.tabla.length; i++) {
            const element = this.tabla[i];

            diferencia = { dias: 0, horas: 0, minutos: 0, mora: true };
            if (element.fechahorafin != null) {
              diff = Math.max(new Date(element.fechahorafin) - new Date(), 0);
              dias = Math.floor(diff / (24 * 60 * 60 * 1000));
              diff -= 24 * 60 * 60 * 1000 * dias;
              horas = Math.floor(diff / (60 * 60 * 1000));
              diff -= 60 * 60 * 1000 * horas;
              minutos = Math.floor(diff / (60 * 1000));
              diferencia = {
                dias: dias,
                horas: horas,
                minutos: minutos,
                mora: diff == 0
              };
            }
            this.tabla[i] = { ...this.tabla[i], diferencia: diferencia };
          }
        });
    }
  },
  mounted() {
    axios
      .get("http://localhost/taller/servicios/tabla.php")
      .then(resp => {
        this.tabla = resp.data;
        for (let i = 0; i < this.tabla.length; i++) {
          const element = this.tabla[i];

          diferencia = { dias: 0, horas: 0, minutos: 0, mora: true };
          if (element.fechahorafin != null) {
            diff = Math.max(new Date(element.fechahorafin) - new Date(), 0);
            dias = Math.floor(diff / (24 * 60 * 60 * 1000));
            diff -= 24 * 60 * 60 * 1000 * dias;
            horas = Math.floor(diff / (60 * 60 * 1000));
            diff -= 60 * 60 * 1000 * horas;
            minutos = Math.floor(diff / (60 * 1000));
            diferencia = {
              dias: dias,
              horas: horas,
              minutos: minutos,
              mora: diff == 0
            };
          }
          this.tabla[i] = { ...this.tabla[i], diferencia: diferencia };
        }
      });
    setInterval(() => {
      axios
        .get("http://localhost/taller/servicios/tabla.php")
        .then(resp => {
          this.tabla = resp.data;
          for (let i = 0; i < this.tabla.length; i++) {
            const element = this.tabla[i];

            diferencia = { dias: 0, horas: 0, minutos: 0, mora: true };
            if (element.fechahorafin != null) {
              diff = Math.max(new Date(element.fechahorafin) - new Date(), 0);
              dias = Math.floor(diff / (24 * 60 * 60 * 1000));
              diff -= 24 * 60 * 60 * 1000 * dias;
              horas = Math.floor(diff / (60 * 60 * 1000));
              diff -= 60 * 60 * 1000 * horas;
              minutos = Math.floor(diff / (60 * 1000));
              diferencia = {
                dias: dias,
                horas: horas,
                minutos: minutos,
                mora: diff == 0
              };
            }
            this.tabla[i] = { ...this.tabla[i], diferencia: diferencia };
          }
        });
    }, 10000);
  }
});
