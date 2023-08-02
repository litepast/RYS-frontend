<template>
    <div>
        <div class="modal-background">
            <div class="modal-body">
                <div v-if="!showDeleteMessage">
                    <div class="modal-header">
                        Are You Sure?
                     </div>                    
                    <div class="modal-message" :title="name">
                         You would be deleting <span> {{ name}}</span>
                    </div>                    
                    <div class="modal-buttons">
                        <button class="cancel" @click="closePopUp">Cancel</button>
                        <button class="delete" @click="deleteAlbum">Delete</button>
                    </div>
                </div>
                <div v-else>
                    <div v-if="loading" class="flex w-full h-full justify-center items-center">                        
                        <Spinner/>                      
                    </div>
                    <div v-else>                        
                        <div class="modal-header" :title="name">
                            {{ goodResponse ? name : 'Oops!'}} 
                        </div>                    
                        <div class="modal-message flex justify-start items-center text-left">
                            {{delMsg}}
                        </div>                    
                        <div class="modal-buttons !justify-center">
                            <button class="cancel !w-16" @click="closePopUpWithDelete">OK</button>
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
    import Spinner from '../components/SpinnerLoaderWhite.vue'
    const goodResponse = ref(true)

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
                goodResponse.value = true
                delMsg.value = 'It has been deleted from your library'
            }else{
                delMsg.value = 'Something went wrong, please try again later'
            }            
        })
        .catch((error) => {
            goodResponse.value = false
            delMsg.value = 'Something went wrong, please try again later'  
            })
        .finally( () => {
            
            loading.value = false
        })
        
       
        
    }

</script>


<style scoped>
    .modal-background{
        @apply absolute top-0 left-0 w-full h-full flex justify-center items-center z-20;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .modal-body{
        @apply bg-white rounded-lg p-3;
        @apply w-[450px] h-[140px];

    }
    .modal-header{
        @apply text-left text-xl mb-3 truncate ;
    }
    .modal-message{
        @apply text-sm mb-3 text-black truncate;
    }

    .modal-buttons{
        @apply flex w-full h-[45px] justify-end items-center;
    }

    button{
        @apply ml-3 items-center h-full text-base rounded-full px-3 py-1;
        @apply transition-all duration-300 ease-in-out;
    }

    button.cancel{
        @apply bg-green-400 rounded-full hover:bg-green-600 text-base;
    }

    button.delete{
        @apply bg-red-400 rounded-full hover:bg-red-600 text-base;
    }

</style>