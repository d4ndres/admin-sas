<script setup>

const maquetaDevices = ref([
  { name: "Home", dId: "1234", templateName: "Power Sensor", templateId: "4das65d4as", saverRule: false },
  { name: "Farm", dId: "2364", templateName: "Power Sensor", templateId: "da467saw", saverRule: false },
  { name: "Office", dId: "3487", templateName: "Temperature Sensor", templateId: "gs564das", saverRule: true },
  { name: "Garage", dId: "4578", templateName: "Motion Sensor", templateId: "asd56fasd", saverRule: true },
  { name: "Greenhouse", dId: "5689", templateName: "Humidity Sensor", templateId: "f65ds4das", saverRule: false }
]);
const toggleSaverRule = (rowIndex) => {
  const row = maquetaDevices.value[rowIndex]
  maquetaDevices.value.splice(rowIndex, 1, {...row, saverRule: !row.saverRule})
}

const columnsTable = [
  { text: "ID", autoValue: ({index}) => `${index + 1}` },
  { bindKey: "name", text: "Name" },
  { text: "Full name", autoValue: ({row}) => `${row.name} ${row.dId}` },
  { bindKey: "dId", text: "Device ID" },
  { bindKey: "templateName", text: "Template Name" },
  { bindKey: "templateId", text: "Template ID" },
  { bindKey: "actions", text: "Actions" },
  { bindKey: "saverRule", text: "save on DB" },
]


const agregarDispositivo = (ev) => {
  const fields = Object.fromEntries(new FormData(ev.target).entries())
  console.log(fields)
}

const sending = ref(false)

</script>

<template>

  <NuxtLayout name="content" title="Devices">
    <!-- <Card class="mb-4">
      <h3 class="text-xl font-bold text-text_main">Add new device</h3>
      <form @submit.prevent="submit" id="agregarDispositivo">
        <div class="flex justify-between gap-4">
          <FormInputWrapper  label="Device name" for="deviceName">
            <FormInput required :disabled="sending" id="deviceName" name="deviceName" type="text" />
          </FormInputWrapper>
          <FormInputWrapper label="Device ID" for="deviceID">
            <FormInput required :disabled="sending" id="deviceID" name="deviceID" type="text" />
          </FormInputWrapper>
          <FormInputWrapper label="Template" for="template">
            <FormInput required :disabled="sending" id="template" name="template" type="select" :options="['Template 1', 'Template 2', 'Template 3']"/>
          </FormInputWrapper>
        </div>
        <buttonMain type="submit" :disabled="sending">
          <span v-if="sending">Sending...</span>
          <span v-else>Send</span>
        </buttonMain>
      </form>
    </Card> -->

    <!-- <Card class="mb-4">
    </Card> -->
    <EasyTable :data="maquetaDevices" :columns="columnsTable">
      <template #default="{value, key, row, rowIndex}"> 
        <div v-if="key == 'actions'">
          <ButtonSwitch :value="row.saverRule" @click="toggleSaverRule(rowIndex)"/>
        </div>
      </template>
    </EasyTable>

    <!-- <Card>
      <DataTable :data="maquetaDevices" class="max-h-[50vh] overflow-auto">
        <template #default="{value, key, row, rowIndex}"> 
          <div v-if="key == 'saverRule'">
            
            <ButtonSwitch :value="value" @click="toggleSaverRule(rowIndex)"/>
            
          </div>
        </template>
      </DataTable>
    </Card> -->
  </NuxtLayout>
</template>