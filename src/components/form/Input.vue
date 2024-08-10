<script setup>
/**
  <FormInput id="empleado_id" name="empleado_id" type="select" setElementOptionLabel="nombre" :options="[
    { nombre: 'Carlos Armado Llanos', value: 3 },
    { nombre: 'Hector ortiz', value: 6 },
    { nombre: 'Jose', value: 4 },
    { nombre: 'Carlos Guzman', value: 2 },
    { nombre: 'Ernesto Gutiérrez', value: 1 }
  ]"/>
 */



const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  options: {
    type: Array,
    default: () => []
  },
  setElementOptionValue: {
    type: String,
    default: 'value'
  },
  setElementOptionLabel: {
    type: String,
    default: 'label'
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  }
})

const emit = defineEmits({
  'update:modelValue': (value) => typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean',
  'changeObject': (value) => typeof value === 'object'
})


const optionsIsPrimitive = computed(() => {
  return props.options[0] !== Object(props.options[0])
})

const emitInput = (ev) => {
  emit('update:modelValue', ev.target.value)
  emit('changeObject', {
    label: ev.target.options[ev.target.selectedIndex].text,
    value: ev.target.value
  })
}

const handleInputCurrency = (ev) => {
  const currency = ev.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')  
  ev.target.value = currency
  emit('update:modelValue', currency)
}

</script>

<template>
  <select v-if="type == 'select'" :value="modelValue" @input="emitInput"
    class="dark:bg-dark outline-none bg-transparent border rounded-md border-gray dark:border-gray_dark dark:focus:border-gray_dark_font px-2 py-1">
    <option  v-if="optionsIsPrimitive" v-for="(option, index) in options" :key="option + index" :value="option">
      {{ option }}</option>
    <option v-else v-for="(option, index) in options" :key="option[setElementOptionValue] + index"
      :value="option[setElementOptionValue]">{{ option[setElementOptionLabel] }}</option>
  </select>
  <input v-else-if="type == 'checkbox'" :type="type" />
  <input v-else-if="type == 'currency'" inputmode="numeric" type="currency" :value="modelValue" @input="handleInputCurrency" class="text-darkoutline-none bg-transparent border rounded-md border-gray dark:border-gray_dark dark:focus:border-gray_dark_font px-2 py-1"/>
  <input v-else :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="text-darkoutline-none bg-transparent border rounded-md border-gray dark:border-gray_dark dark:focus:border-gray_dark_font px-2 py-1" />
</template>