<template>
        <div class="confirm-modal py-10">
              <div class="w-full flex px-10">
              <div class="w-full"></div>
                <button @click="handleCloseConfirmModal">
                <CloseIcon />
              </button>
            </div>

            <div class="w-full py-3">
              <p class="text-center confirm-text">Are you sure you want to</p>
              <p class="text-center confirm-text">Disable User</p>
              <div class="flex justify-center mt-8">
                <div class="flex">
                  <div class="w-1/2 px-1">
                    <Button
                        label="Yes"
                        color="#3399FF"
                        config="px-10 py-2"
                        :clickAction="handleDeleteUser"
                    />
                  </div>
                  <div class="w-1/2 px-1">
                    <Button
                        label="No, Cancel"
                        color="transparent"
                        config="px-3 py-2"
                        textColor="gray"
                        :clickAction="handleCloseConfirmModal"
                    />
                  </div>
                </div>
              </div>
            </div>
        </div>
</template>

<script>
import CloseIcon from "./icons/Close.vue";
import Button from "./Button.vue";
export default {
    props: {
        handleCloseConfirmModal: {
            type: Function,
            default: () => []
        },
        handleDeleteUser: {
            type: Function,
            default: () => []
        }
    },
  components: {
    CloseIcon,
    Button
  }
}
</script>

<style lang="scss">
.confirm-modal {
    width: 90%;
    background: white;
    margin-left: 5%;
    @media (min-width: 1000px) {
      margin-left: 30%;
      width: 40%;
    }
    .confirm-text {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        color: #061A48;
    }
}
</style>
