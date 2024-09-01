<script setup>
const mock = {
  userId: 1,
  selectedDevice: {
    name: "Home",
    dId: "1234",
    templateName: "Power Sensor",
    templateId: "4das65d4as",
    saverRule: false
  },
  variableFullName: "Pump",
  variable: "pump",
  icon: "fa-sun",
  column: 'col-6',
  widget: 'indicator',
  class: 'danger'
}

const toSend = () => {
  // funcionalidad 
  const config = {
    message: `{ "fanStatus": "stop"}`
  }

  return {
    topic: `${mock.userId}/${mock.selectedDevice.dId}/${mock.variable}/actData` 
    msg: {
      value: config.message
    }
  }
}

</script>
<template>
  <card>
    {{ mock }}
  </card>
</template>