<template>
  <div class="q-pa-md justify-center">
    <q-card class="q-pa-md justify-center" style="max-width: 600px">
    <img src="http://www.serperuano.com/wp-content/uploads/2013/12/reniec.jpg">
    <q-card-section>
      <div class="justify-center" style="max-width: 350px">
<q-form
  @submit="Buscar"
  @reset="Limpiar"
  class="q-gutter-md"
>

  <q-input
    filled
    v-model="dni"
    type="text"
    maxlength="8"
    onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
    label="Documento de Identidad *"
    lazy-rules
    :rules="[
    (val) =>
    (val && val.length === 8) ||
    'Por favor ingrese un número de DNI válido',s
    ]"
  />
  <div>
    <q-btn label="Buscar" type="submit" color="primary"/>
    <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
  </div>
</q-form>

</div>
    </q-card-section>
    <div class="q-pa-md justify-center " style="max-width: 900px" >
    <q-table
    title="DATOS"
        :rows="rows"
        :columns="columns"
        row-key="name"
        no-data-label="Sin datos que mostrar"
        :rows-per-page-options="[0]"
        dense
    />
  </div>
    <q-card-section>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </q-card-section>
  </q-card>

  </div>


</template>

<script>

import { api } from "../boot/axios";
import { defineComponent ,onMounted} from 'vue'

const consulta = async () => {
      try {
        const dni = await api.get("/dni/'dni'?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNlbGVuZWN1bHF1aWNvbmRvcjEzQGdtYWlsLmNvbSJ9.S_Cy-Kyrlcqh8yQ1AwmSEqgYD-UMe6DezCVSJ8_XeHo");

        if (dni.data) {
          rows.value = dni.data;
        }
      } catch (error) {
        console.error('Error en la consulta:', error);
      }
    }
const columns = [
{
    name: "dni",
    required: true,
    label: "DNI",
    align: "left",
    field: (row) => row.dni,
  },
  {
    name: "nombres",
    align: "center",
    label: "Nombres",
    field: (row) => row.nombres,
  },
  {
    name: "apellidoPaterno",
    align: "center",
    label: "Apellido Paterno",
    field: (row) => row.apellidoPaterno,
  },
  {
    name: "apellidoMaterno",
    align: "center",
    label: "Apellidos Maternos",
    field: (row) => row.apellidoMaterno,
  },

  {
    name: "codVerifica",
    label: "Codigo Verificador",
    field: (row) => row.codVerifica,
  },
]
const rows = [
  {
    dni:'',
    nombres:'',
    apellidoPaterno:'',
    apellidoMaterno:'',
    codVerifica:'',
  }
]
export default defineComponent({
  name: 'IndexPage',
  setup() {
  return {
      columns,
      rows,
      consulta
    }
  },


    },
    onMounted(() => {
      consulta();
    }
    ));
</script>
