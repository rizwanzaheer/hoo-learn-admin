<script setup>
import { ref, useSlots, useAttrs, inject, onMounted, computed } from "vue";
import { usePagination } from "vue-request";

// import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn";
// import Font from "@ckeditor/ckeditor5-font/src/font";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import ButtonRepo from "@/components/ButtonRepo.vue";
import Header from "@/components/Header.vue";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    width: "20%",
    slots: {
      customRender: "name",
    },
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      {
        text: "Male",
        value: "male",
      },
      {
        text: "Female",
        value: "female",
      },
    ],
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];

const queryData = (params) => {
  return `https://randomuser.me/api?noinfo&${new URLSearchParams(params)}`;
};

const slots = useSlots();
const attrs = useAttrs();
const axios = inject("axios");

const { data: tableDataSource, run, loading, current, pageSize } = usePagination(
  queryData,
  {
    formatResult: (res) => res.results,
    pagination: {
      currentKey: "page",
      pageSizeKey: "results",
    },
  }
);
const pagination = computed(() => ({
  total: 200,
  current: current.value,
  pageSize: pageSize.value,
}));

const handleTableChange = (pag, filters, sorter) => {
  run({
    results: pag.pageSize,
    page: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
};

onMounted(async () => {
  await axios.get("https://jsonplaceholder.typicode.com/todos/1").then((response) => {
    console.log("response.data is: ", response.data);
  });
});

async function test() {
  const { data } = await axios(`https://jsonplaceholder.typicode.com/todos/1`);

  console.log("res is: ", data);
}

test();

// variables
const editor = ClassicEditor;
const editorData = ref(
  '<p><strong>gfhfhjgf</strong></p><blockquote><p><i><strong>gfghjfjghj</strong></i></p></blockquote><figure class="table"><table><tbody><tr><td>gghjjk</td><td>hlkjhkhk</td><td>ghgkgkihi</td></tr><tr><td>09</td><td>555</td><td>67676</td></tr></tbody></table></figure><h2>fhgfghfgh</h2><ol><li>fghfjhfghfg<ol><li>&nbsp;</li></ol></li></ol>'
);
const editorConfig = {
  //   plugins: [EssentialsPlugin, BoldPlugin, ItalicPlugin, LinkPlugin, ParagraphPlugin],
  // // plugins: [Font],
  // fontFamily: {
  //   options: [
  //     "default",
  //     "Ubuntu, Arial, sans-serif",
  //     "Ubuntu Mono, Courier New, Courier, monospace",
  //   ],
  // },
  // fontSize: {
  //   options: [9, 11, 13, "default", 17, 19, 21],
  // },
  // fontColor: {
  //   colors: [
  //     {
  //       color: "hsl(0, 0%, 0%)",
  //       label: "Black",
  //     },
  //     {
  //       color: "hsl(0, 0%, 30%)",
  //       label: "Dim grey",
  //     },
  //     {
  //       color: "hsl(0, 0%, 60%)",
  //       label: "Grey",
  //     },
  //     {
  //       color: "hsl(0, 0%, 90%)",
  //       label: "Light grey",
  //     },
  //     {
  //       color: "hsl(0, 0%, 100%)",
  //       label: "White",
  //       hasBorder: true,
  //     },

  //     // ...
  //   ],
  // },
  // fontBackgroundColor: {
  //   colors: [
  //     {
  //       color: "hsl(0, 75%, 60%)",
  //       label: "Red",
  //     },
  //     {
  //       color: "hsl(30, 75%, 60%)",
  //       label: "Orange",
  //     },
  //     {
  //       color: "hsl(60, 75%, 60%)",
  //       label: "Yellow",
  //     },
  //     {
  //       color: "hsl(90, 75%, 60%)",
  //       label: "Light green",
  //     },
  //     {
  //       color: "hsl(120, 75%, 60%)",
  //       label: "Green",
  //     },

  //     // ...
  //   ],
  // },
  // toolbar: {
  //   items: [
  //     "heading",
  //     "bulletedList",
  //     "numberedList",
  //     "fontSize",
  //     "fontColor",
  //     "fontBackgroundColor",

  //     "undo",
  //     "redo",
  //   ],
  // },

  language: "en", // zh-cn
  // or different multiple support langue with different language ui
  // language: {
  //      // The UI will be English.
  //      ui: 'en',

  //      // But the content will be edited in Arabic.
  //      content: 'ar'
  //  }

  //  toolbar: [
  //             'heading', 'bulletedList', 'numberedList', 'fontColor', 'fontBackgroundColor', 'undo', 'redo'
  //         ],

  // toolbar: [ ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] ],
  ckfinder: {
    uploadUrl: "https://33333.cke-cs.com/easyimage/upload/",
  },
};

// compiler macros
const props = defineProps({
  foo: String,
});

const emit = defineEmits(["change", "delete"]);

// Methods
const onEditorFocus = () => {
  console.log("onEditorFocus is calling!!!");
};
function emptyEditor() {
  editorData.value = "";
}
function getEditorData() {
  console.log("editorData.value is: ", editorData.value);
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
    <a-button type="primary" @click="emptyEditor">Reset Editor</a-button>
    <br />
    <br />
    <a-button type="primary" @click="getEditorData">Get Editor data</a-button>
    <br />
    <br />
    <br />

    <a-table
      :columns="columns"
      :row-key="(record) => record.login.uuid"
      :data-source="tableDataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #name="{ text }">{{ text.first }} {{ text.last }}</template>
    </a-table>
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
