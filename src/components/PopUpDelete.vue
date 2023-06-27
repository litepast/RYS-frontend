<template>
    <div>
        <div class="modal">
            <div class="modal-content">

                <div v-if="!showDeleteMessage">
                    <div class="modal-header" :title="name">
                        Are You Sure?
                     </div>                    
                    <div class="modal-message">
                         You would be deleting <span> {{ id }}</span>
                    </div>                    
                    <div class="modal-buttons pl-[200px] justify-between">
                        <button class="cancel" @click="closePopUp">Cancel</button>
                        <button class="delete" @click="deleteAlbum">Delete</button>
                    </div>
                </div>

                <div v-else>
                    <div v-if="loading">                        
                            <img src="./img/loading.gif" alt="loading" class="w-[50px] h-[50px]"/>
                        
                    </div>
                    <div v-else>
                        <div class="modal-header truncate" :title="name">
                            {{ name }} 
                        </div>                    
                        <div class="modal-message flex justify-start items-center text-left">
                            {{delMsg}}
                        </div>                    
                        <div class="modal-buttons justify-center">
                            <button class="cancel" @click="closePopUpWithDelete">OK</button>
                        </div>
                    </div>
                  
                </div>
               

            </div>        
        </div>
    </div>
</template>

<script setup>
    import {defineEmits, defineProps, ref} from "vue";
    import axios from "axios";       
    const {name, id}   = defineProps([
            'name',
            'id'
        ])     
    const loading = ref(false)
    const showDeleteMessage = ref(false)

    const delMsg = ref("")

    const emit = defineEmits(["closeModal","closewithDelete"])

    const closePopUp = () =>{
        emit("closeModal")
    }

    const closePopUpWithDelete = () =>{
        emit("closewithDelete")
    }

    const deleteAlbum = async () =>{
        showDeleteMessage.value = true
        loading.value = true
        let url = `http://192.168.100.14:5000/api/v1/delete-album-data/${id}`
        

        axios.delete(url)
        .then(response => {                       
            let result = response.data.msg
            console.log(response.data.text)
            if (result){
                delMsg.value = 'It has been deleted from your library'
            }else{
                delMsg.value = 'Error deleting from your library'
            }            
        })
        .catch((error) => {
            delMsg.value = 'Error deleting from your library'  
            })
        .finally( () => {
            
            loading.value = false
        })
        
       
        
    }

    function delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

</script>


<style scoped>
    .modal{
        @apply absolute top-0 left-0 w-full h-full flex justify-center items-center z-20 p-3;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .modal-content{
        @apply bg-white rounded-lg flex flex-col p-6;
        @apply w-[450px] h-[185px];

    }
    .modal-header{
        @apply text-xl mb-3 w-full text-left;
    }
    .modal-message{
        @apply w-full h-[60px] text-sm mb-1 overflow-ellipsis overflow-hidden whitespace-pre-wrap;
    }

    .modal-message span{
        @apply font-semibold;
    }

    .modal-buttons{
        @apply w-full flex items-center;
    }
    .modal-buttons button{
        @apply w-[75px] h-[35px] text-[13px];

    }

    .modal-buttons button.cancel{
        @apply bg-green-400 rounded-full px-2 py-1 hover:bg-green-600 text-base;
    }

    .modal-buttons button.delete{
        @apply bg-red-400 rounded-full px-2 py-1 hover:bg-red-600 text-base;
    }

</style>