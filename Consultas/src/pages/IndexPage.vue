<template>
  <div class="q-pa-md justify-center" >
    <q-card class="q-pa-md justify-center" style="max-width: 700px">
      <img src="http://www.serperuano.com/wp-content/uploads/2013/12/reniec.jpg" />
      <q-card-section>
        <div class="justify-center" style="max-width: 350px" >
          <q-form @submit="Buscar" @reset="Limpiar" class="q-gutter-md">
            <q-input
            rounded outlined
              filled
              v-model="dni"
              type="text"
              maxlength="8"
              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
              label="Documento de Identidad *" counter
              lazy-rules
              :rules="[
                (val) => (val && val.length === 8) || 'Por favor ingrese un número de DNI válido'
              ]"
            >
            <template v-slot:append>
              <q-avatar>
                <img src="https://cdn-icons-png.flaticon.com/512/49/49152.png" @click="dni = ''" class="cursor-pointer">
                <q-icon name="close" @click="dni = ''" class="cursor-pointer" />
              </q-avatar>
            </template>
            </q-input>
            <div>
              <q-btn label="Buscar" type="submit" color="primary" />

              <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" @click="Limpiar" />
            </div>
          </q-form>
        </div>
      </q-card-section>
      <div class="q-pa-md justify-center" style="max-width: 100%">
        <q-table
          class="form"
          title="DATOS"
          :rows="rows"
          :columns="columns"
          row-key="dni"
          no-data-label="Sin datos que mostrar"
          :rows-per-page-options="[0]"
          dense
          :loading="loading"
        />
      </div>
      <q-card-section>
        Esto es una consulta realiza por Selene Culquicondor.
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { api } from "../boot/axios";
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "IndexPage",
  setup() {

    const dni = ref("");
    const columns = [
      {
        name: "dni",
        required: true,
        label: "DNI",
        align: "left",
        field: (row) => row.dni
      },
      {
        name: "nombres",
        align: "center",
        label: "Nombres",
        field: (row) => row.nombres
      },
      {
        name: "apellidoPaterno",
        align: "center",
        label: "Apellido Paterno",
        field: (row) => row.apellidoPaterno
      },
      {
        name: "apellidoMaterno",
        align: "center",
        label: "Apellido Materno",
        field: (row) => row.apellidoMaterno
      },
      {
        name: "codVerifica",
        align: "center",
        label: "Código Verificador",
        field: (row) => row.codVerifica
      }
    ];
    const rows = ref([]);
    const loading=ref (false)

    const Buscar = async () => {
      if (dni.value) {
        try {
          loading.value=true
          const response = await api.get(`/dni/${dni.value}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNlbGVuZWN1bHF1aWNvbmRvcjEzQGdtYWlsLmNvbSJ9.S_Cy-Kyrlcqh8yQ1AwmSEqgYD-UMe6DezCVSJ8_XeHo`);
          loading.value=false
          if (response.data) {
            rows.value = [response.data];
          }
        } catch (error) {
          console.error("Error en la consulta:", error);
        }
      }
    };

    const Limpiar = () => {
      dni.value = "";
      rows.value = [];
    };

    onMounted(() => {

      Buscar();
    });

    return {
      dni,
      columns,
      rows,
      Buscar,
      Limpiar,
      loading
    };
  }
});
</script>

<style scoped>
.q-pa-md {
  padding: 5%;
}
.form {

}
</style>

