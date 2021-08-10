<template>
  <div>
    <Toast />

    <Button
      type="button"
      icon="pi pi-search"
      :label="selectedProduct ? selectedProduct.name : 'Select a Product'"
      @click="toggle"
      aria:haspopup="true"
      aria-controls="overlay_panel"
    />

    <OverlayPanel
      ref="op"
      appendTo="body"
      :showCloseIcon="true"
      id="overlay_panel"
      style="width: 450px"
      :breakpoints="{ '960px': '75vw' }"
    >
      <DataTable
        :value="products"
        v-model:selection="selectedProduct"
        selectionMode="single"
        :paginator="true"
        :rows="5"
        @rowSelect="onProductSelect"
        responsiveLayout="scroll"
      >
        <Column field="name" header="Name" sortable style="width: 50%"></Column>
        <Column header="Image" style="width: 20%">
          <template #body="slotProps">
            <img
              src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
              :alt="slotProps.data.image"
              class="product-image"
            />
          </template>
        </Column>
        <Column field="price" header="Price" sortable style="width: 30%">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
          </template>
        </Column>
      </DataTable>
    </OverlayPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent , ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import ProductService from './service/ProductService';

export default defineComponent({
  props: {

  },
    setup() {
        onMounted(() => {
            productService.value.getProductsSmall().then(data => products.value = data);
        })

        const toast = useToast();
        const op = ref();
        const productService = ref(new ProductService());
        const products = ref();
        const selectedProduct = ref();
        const toggle = (event) => {
            op.value.toggle(event);
        };
        const formatCurrency = (value) => {
            return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        };
        const onProductSelect = (event) => {
            op.value.hide();
            toast.add({severity:'info', summary: 'Product Selected', detail: event.data.name, life: 3000});
        };

        return { op, productService, products, selectedProduct, toggle, formatCurrency, onProductSelect}
    }
})
</script>
