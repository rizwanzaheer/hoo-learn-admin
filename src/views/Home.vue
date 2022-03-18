<script setup>
import { ref, useSlots, useAttrs,inject,onMounted } from 'vue';
import ButtonRepo from '@/components/ButtonRepo.vue';
import Header from '@/components/Header.vue';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const slots = useSlots();
const attrs = useAttrs();
const axios = inject('axios');

onMounted(async () => {
  await axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
      console.log("response.data is: ",response.data);
    })
})

async function test() {
  const {data} = await axios(`https://jsonplaceholder.typicode.com/todos/1`);

  console.log('res is: ', data);
}

test();

// res.response.json()
// import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
// import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
// import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";

// variables
const editor = ClassicEditor;
const editorData = ref('<p>adfadf</p><ul><li>adfad</li><li>adfaf</li><li>adf</li></ul><ol><li>fadfadf</li><li>adfdsfad</li></ol>');
const editorConfig = {
  //   plugins: [EssentialsPlugin, BoldPlugin, ItalicPlugin, LinkPlugin, ParagraphPlugin],
  // toolbar: {
  //   items: ["bold", "italic", "link", "undo", "redo"],
  // },
  language: 'en', // zh-cn
  // or different multiple support langue with different language ui
  // language: {
  //      // The UI will be English.
  //      ui: 'en',

  //      // But the content will be edited in Arabic.
  //      content: 'ar'
  //  }
  ckfinder: {
    uploadUrl: 'https://33333.cke-cs.com/easyimage/upload/',
  },
};

// compiler macros
const props = defineProps({
  foo: String,
});

const emit = defineEmits(['change', 'delete']);

// Methods
const onEditorFocus = () => {
  console.log('onEditorFocus is calling!!!');
};
function emptyEditor() {
  editorData.value = '';
}
function getEditorData() {
  console.log('editorData.value is: ', editorData.value);
}
</script>

<template>
  <div class="bg-gray-50 mx-[10%]">
    <Header />

    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      @focus="onEditorFocus"
      tag-name="textarea"
    ></ckeditor>
     <a-button type="primary"  @click="emptyEditor">Reset Editor</a-button>
    <br />
    <br />
     <a-button type="primary" @click="getEditorData">Get Editor data</a-button>
    <div
      class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
    >
      <h2
        class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        Ready to dive in?
        <br />
        <span class="text-indigo-600">
          Hoo Learn Admin with Vite + Vue 3 + Tailwind CSS
        </span>
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex rounded-md shadow">
          <router-link
            to="/about"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:outline-none"
          >
            Next Page
          </router-link>
        </div>
        <ButtonRepo />
      </div>
    </div>
  </div>
</template>