<script setup>

const agregarDispositivo = (ev) => {
  const fields = Object.fromEntries(new FormData(ev.target).entries())
  console.log(fields)
}

</script>

<template>

  <NuxtLayout name="content" title="Devices">
    <Card>
      <h3 class="text-xl font-bold">Add new device</h3>
      <form @submit.prevent="submit" id="agregarDispositivo">
        <div class="flex justify-between gap-4">
          <FormInputWrapper  label="Device name" for="deviceName">
            <FormInput required :disabled="sending" id="deviceName" name="deviceName" type="text" />
          </FormInputWrapper>
          <FormInputWrapper label="Device ID" for="deviceID">
            <FormInput required :disabled="sending" id="deviceID" name="deviceID" type="text" />
          </FormInputWrapper>
          <FormInputWrapper label="Template" for="template">
            <FormInput required :disabled="sending" id="template" name="template" type="text" />
          </FormInputWrapper>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="sending">
          <span v-if="sending">Sending...</span>
          <span v-else>Send</span>
        </button>
      </form>
    </Card>
  </NuxtLayout>
</template>