<template>
    <div>
        <div class="modal">
            <div class="modal-content">
                <div class="modal-header" :title="header">
                    Adding {{ header }}
                </div>
                <div class="modal-message">
                    {{ message }}
                </div>
                <div class="modal-button">
                    <button @click="closePopUp">OK</button>
                </div>                
            </div>        
        </div>
    </div>
</template>

<script setup>
    import {defineEmits, defineProps} from "vue";    
    const { header, message }  = defineProps([
            'header',
            'message'
        ]) 
    
    
    const emit = defineEmits(["closeModal"])


    const closePopUp = () =>{
        emit("closeModal")
    }

</script>


<style scoped>
    .modal{
        @apply absolute top-0 left-0 w-full h-full flex justify-center items-center z-20 p-3;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .modal-content{
        @apply bg-white rounded-lg p-3;
        @apply w-[450px] h-[130px];

    }
    .modal-header{
        @apply truncate text-lg mb-3;
    }
    .modal-message{
        @apply text-sm mb-3;
    }

    .modal-button{
        @apply w-full flex justify-center items-center;
    }
    .modal-button button{
        @apply w-[75px] bg-green-600 rounded-full px-2 py-1 hover:bg-green-400 text-base;

    }

</style>