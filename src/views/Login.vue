<script setup>
import logoHoo from "@/assets/logo_hoo.svg";
import logoMicrosoft from "@/assets/logo_microsoft.svg";
</script>

<template>
  <div
    class="login-banner flex justify-center items-center w-screen h-screen"
    :style="{ backgroundImage: bgGalaxy }"
  >
    <div class="login p-4">
      <img class="logo ml-auto" :src="logoHoo" />

      <div
        class="flex justify-center items-center w-full h-full mt-[-14px] text-center"
      >
        <div>
          <h1 class="mb-0">Hoo Learn content management system</h1>
          <p class="my-4 mx-auto">
            The ultimate tool for the content creators to write and publish a
            content in Hoo learning portal
          </p>
          <a-button class="mt-6 mx-auto"> <img :src="logoMicrosoft"/> Login with Microsoft Account </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.login-banner {
  background: url("../assets/bg_galaxy.jpg") no-repeat;
  background-size: cover;
}
.login {
  background-color: rgba($color: $black, $alpha: 0.8);
  width: 650px;
  height: 400px;

  .logo {
    width: 50px;
  }

  h1 {
    font-size: 24px;
    color: $white;
  }
  p {
    width: 400px;
    font-size: 12px;
    color: $white;
  }

  button {
    background-color: #005fee;
    border: 1px solid #005fee;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 20px 14px;

    color: $white;
    font-size: 12px;
    font-weight: 300;

    img{
        margin-top: -5px;
        margin-right: 10px;
    }
  }
}
</style>
