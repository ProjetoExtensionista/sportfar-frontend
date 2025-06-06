import {ref, onMounted, computed} from 'vue'
import { useRoute } from 'vue-router'
import ModalitiesService from "../services/ModalitiesService.js";
import router from "../router/index.js";

export function useFormModalidades() {
    const modalidade = ref({});
    const route = useRoute();

    onMounted(async () => {
        let id = route.params.id ?? null;

        console.log(id);

        if (id) {
            let response = await ModalitiesService.getById(id);
            modalidade.value = response.data;
            return;
        }

        modalidade.value = {
            name: '',
            company_id: 1
        };
    });

    async function save() {
        let response = await ModalitiesService.create(modalidade.value);
        if (response.success) {
            await router.push({ name: 'ModalitiesList' });
            return;
        }
        console.log(response.error);
    }

    const nameIsEmpty = computed(() => {
        return 'name' in modalidade.value && modalidade.value.name.trim() === '';
    });

    return {
        modalidade,
        save,
        nameIsEmpty
    };
}

export function useListModalides(){
    const tableValues = ref([]);

    onMounted(async () => {
        await getDados();
    });

    function normalizeReturn(data){
        return data.map(i => {
            return {
                'id': i.id,
                'Nome': i.name
            }
        })
    }

    async function getDados() {
        let response = await ModalitiesService.getAll();
        tableValues.value = normalizeReturn(response.data);
    }

    function editar(id) {
        router.push({ name: 'ModalitiesForm', params: { id } });
    }

    async function excluir(id) {
        let response = await ModalitiesService.delete(id);
        if (response.success) {
            await getDados();
        }
    }

    return {
        tableValues,
        editar,
        excluir,
    };
}