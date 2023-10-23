    <template>    
    <div class="modal-background">
        <div class="modal-body">
            <div v-if="loading" class="flex w-full h-full justify-center items-center">
                <Spinner/>
            </div>
            <div v-else>
                <div v-if="goodResponse" ref ="modalBodyOK" >
                    <div class="modal-header" :title="name">
                        Adding {{ name }}
                    </div>
                    <div class="modal-message">
                        {{message}}
                    </div>            
                    <div class="modal-buttons">
                        <button @click="closePopUp">Continue</button>
                        <button @click="goToAlbumView">Go to Album Page</button>
                    </div>
                </div>
                <div v-else ref="modalBodyNOK">
                    <div class="modal-header" >
                        Oops!
                    </div>
                    <div class="modal-message">
                        Something went wrong, please try again later.
                    </div>            
                    <div class="modal-buttons">
                        <button @click="closePopUp">OK</button>                        
                    </div>
                </div>
            </div>                            
        </div>        
    </div>    
</template>

<script setup>
    import {defineEmits, defineProps, ref, onBeforeMount} from "vue";
    import axios from 'axios'
    import { useRouter } from 'vue-router';
    import { onClickOutside } from '@vueuse/core'
    import Spinner from '../components/SpinnerLoaderWhite.vue'
    import { FLASK_API } from '../../config';

    const router = useRouter()
    const loading = ref(true)
    const goodResponse = ref(true)
    const message = ref('') 
    const modalBodyOK = ref(null)
    const modalBodyNOK = ref(null)
    onClickOutside(modalBodyOK, () => ( closePopUp() ))
    onClickOutside(modalBodyNOK, () => ( closePopUp() ))    
    


    const {name, id}   = defineProps([
            'name',
            'id'
        ])    
    const emit = defineEmits(["closeModal"])

    const closePopUp = () =>{
        if(!loading.value){
            emit("closeModal")
        }
        
    }

    const goToAlbumView = () => {       
            router.push(`/library/${id}`)            
        }
       
    function addAlbumLibrary(){
        loading.value = true;
        let url = `${FLASK_API}api/v1/insert-album-catalog/${id}`              
        axios.put(url)
            .then((response) => {      
                    goodResponse.value = true                        
                    message.value = response.data.msg
            })
            .catch((error) => {                    
                goodResponse.value = false
                console.log(error)
            })
            .finally(() => {
                loading.value = false
            })
    }

    onBeforeMount(() => {
       addAlbumLibrary()
    })


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
        @apply text-sm mb-3 text-black;
    }

    .modal-buttons{
        @apply flex w-full h-[45px] justify-end items-center;
    }

    button{
        @apply ml-3 items-center h-full text-base rounded-full px-3 py-1 bg-green-600  hover:bg-green-400;
        @apply transition-all duration-300 ease-in-out;
    }

</style>