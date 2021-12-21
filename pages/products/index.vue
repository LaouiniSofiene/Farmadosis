<template>
  <div>
    <v-card>
      <v-card-title>
        {{$t('products.title')}}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('products.search')"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="products"
        sort-by="name"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{$t('products.create')}}
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.name"
                          :label="$t('products.table.name')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.price"
                          :label="$t('products.table.price')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.rate"
                          :label="$t('products.table.rate')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.review"
                          :label="$t('products.table.review')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="8">
                        <v-textarea
                          v-model="editedProduct.content"
                          :label="$t('products.table.description')"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    {{$t('products.cancel')}}
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> {{$t('products.save')}} </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="700px">
              <v-card>
                <v-card-title class="text-h5"
                  >{{ $t('products.delete')}}</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >{{$t('products.cancel')}}</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteProductConfirm"
                    >{{$t('products.ok')}}</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editProduct(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteProduct(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      search: "",
      headers: [
        {
          text: this.$t('products.table.name'),
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: this.$t('products.table.price'), value: "price" },
        { text: this.$t('products.table.rate'), value: "rate" },
        { text: this.$t('products.table.description'), value: "content" },
        { text: this.$t('products.table.review'), value: "review" },
        { text: this.$t('products.table.actions'), value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedProduct: {
        name: '',
        price: 0,
        rate: 0,
        content: '',
        review: 0
      },
      defaultProduct: {
        name: '',
        price: 0,
        rate: 0,
        content: '',
        review: 0
      },
    };
  },
  computed: {
    ...mapGetters({
      products: "products/all",
    }),
    formTitle () {
        return this.editedIndex === -1 ? this.$t('products.create') : this.$t('products.edit')+ this.editedProduct.name
    },
    
  },
  watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
  },
  methods:{
      ...mapMutations({
          create:"products/ADD_PRODUCT",
          delete:"products/DELETE_PRODUCT",
          edit:"products/EDIT_PRODUCT"
      }),
      editProduct (product) {
        this.editedIndex = this.products.indexOf(product)
        this.editedProduct = Object.assign({}, product)
        this.dialog = true
      },
      deleteProduct (product) {
        this.editedIndex = this.products.indexOf(product)
        this.editedProduct = Object.assign({}, product)
        this.dialogDelete = true
      },
      deleteProductConfirm () {
        this.delete(this.editedProduct.id);
        this.closeDelete()
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedProduct = Object.assign({}, this.defaultProduct)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedProduct = Object.assign({}, this.defaultProduct)
          this.editedIndex = -1
        })
      },
      save () {
        if (this.editedIndex > -1) {
          this.edit(this.editedProduct)
        } else {
          this.create(this.editedProduct)
        }
        this.close()
      },
  }
};
</script>

<style>
</style>