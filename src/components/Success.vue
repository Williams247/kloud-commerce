<template>
    <div>
        <div class="success-box">
            <Space>
                <div class="py-6">
                    <div class="w-full flex">
                        <div class="w-full"></div>
                        <button @click="handleOpenCloseSuccess">
                            <CloseIcon />
                        </button>
                    </div>
                </div>
            </Space>
            <div class="flex justify-center mt-16">
                <div>
                    <div class="flex justify-center">
                        <Check />
                    </div>
                    <p class="text-center success-text">Successful</p>
                    <p class="text-center success-text-2">You have successfully created a new user</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CloseIcon from "./icons/Close.vue";
import Check from "./icons/Check.vue";
import Space from "./Space.vue"
export default {
    props: {
      handleOpenCloseSuccess: {
        type: Function,
        default: () => []
      }
    },
    components: {
        Check,
        CloseIcon,
        Space
    }
}
</script>

<style lang="scss">
.success-box {
    background: white;
    padding-bottom: 100px;
     width: 90%;
    margin-left: 5%;
    @media (min-width: 1000px) {
         width: 40%;
        margin-left: 30%;
    }
    .success-text {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
        align-items: center;
        text-align: center;
        color: #061A48;
    }
    .success-text-2 {
        font-family: 'Open Sans Light';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        align-items: center;
        text-align: center;
    }
}
</style>
