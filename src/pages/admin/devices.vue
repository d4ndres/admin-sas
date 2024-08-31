<script setup>

// schema devices
// {
//   name,
//   dId
//   templateName,
//   templateId
// }


const agregarDispositivo = (ev) => {
  const fields = Object.fromEntries(new FormData(ev.target).entries())
  console.log(fields)
}

const sending = ref(false)

</script>

<template>

  <NuxtLayout name="content" title="Devices">
    <Card>
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
    </Card>
  </NuxtLayout>
</template>