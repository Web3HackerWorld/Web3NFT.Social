<script setup lang="ts">
import DropZone from './components/DropZone.vue'
import { useNFTStorage } from '~/composables/useNFTStorage'
interface Props {
  title: string
  size: string
  modelValue: string
}

const {
  title,
  size,
  modelValue,
} = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])
const { checkExist, storeBlob } = useNFTStorage()
let isLoading = $ref(false)
let error = $ref('')
const addFilesAndStartUpload = async (files) => {
  const file = files[0]
  const url = URL.createObjectURL(file)
  emit('update:modelValue', url)

  isLoading = true
  const isExist = await checkExist(file)
  if (isExist) {
    emit('update:modelValue', isExist.cid)
    isLoading = false
    return
  }

  const cid = await storeBlob(file)
  emit('update:modelValue', cid)
  isLoading = false
}

async function onInputChange(e) {
  addFilesAndStartUpload(e.target.files)
  // reset so that selecting the same file again will still cause it to fire this change
  e.target.value = null
}

const resetStatus = () => {
  emit('update:modelValue', '')
  error = ''
  isLoading = false
}

const isMedium = $computed(() => size === 'medium')
const isSmall = $computed(() => size === 'small')
</script>

<template>
  <div>
    <label for="cover-photo" class="font-medium text-sm mr-2 pb-2 text-gray-700 block"> {{ title }} </label>
    <div class="rounded-full" :class="{ 'h-60 w-60': isMedium, 'h-30 w-30': isSmall }">
      <DropZone v-slot="{ dropZoneActive }" class="drop-area" @files-dropped="addFilesAndStartUpload">
        <div v-if="modelValue" class="relative">
          <div v-show="isLoading" class="bg-black rounded-full flex w-full opacity-80  top-0 left-0 justify-center items-center absolute" :class="{ 'h-60 p-10': isMedium, 'h-30 p-5': isSmall }">
            <div i-eos-icons-loading class="h-10 text-white w-10" />
          </div>
          <div v-show="error" class="bg-black flex  w-full opacity-80 top-0 left-0 text-red-500 justify-center items-center absolute">
            {{ error }}
          </div>
          <BsBoxImg class="rounded-full object-cover" :class="{ 'h-60 w-60': isMedium, 'h-30 w-30': isSmall }" :src="modelValue" :alt="title" />
          <div v-show="!isLoading" i-material-symbols-cancel class=" text-gray-400 absolute hover:cursor-pointer" :class="{ 'top-2 right-2 w-8 h-8': isMedium, 'top-0 right-0 w-5 h-5': isSmall }" @click="resetStatus" />
        </div>
        <div v-else class="border-dashed rounded-full flex border-2 border-gray-300 mt-1 justify-center relative  overflow-hidden" :class="{ 'h-60 w-60 px-6 pt-5 pb-6': isMedium, 'h-30 w-30 text-xs p-2': isSmall }">
          <div class="flex flex-col space-y-1 text-center py-10 justify-center items-center">
            <div i-heroicons-outline-photo class="mx-auto h-12 text-gray-400 w-12" />
            <div class="h-10">
              <div v-if="dropZoneActive" class="text-gray-600">
                Drop to upload
              </div>
              <div v-else>
                <div class="font-bold text-center  text-gray-600">
                  Drag and Drop
                </div>
                <p class=" text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <label for="file-uploader" class="bg-black flex font-medium h-full bg-opacity-75 text-sm text-white w-full opacity-0 inset-0 absolute items-center justify-center hover:opacity-100 focus-within:opacity-100">
            <span>Click to upload</span>
            <span class="sr-only">image</span>
            <input id="file-uploader" type="file" name="user-photo" class="rounded-md cursor-pointer h-full border-gray-300 w-full opacity-0 inset-0 absolute" @change="onInputChange">
          </label>
        </div>
      </DropZone>
    </div>
  </div>
</template>
