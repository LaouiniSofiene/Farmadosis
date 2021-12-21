<template>
  <div>
    <v-card>
      <v-card-title>
        {{$t('products_from_api.title')}}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('products_from_api.search')"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="products"
        sort-by="recalling_firm"
        class="elevation-1"
        :search="search"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        show-expand
        item-key="product_description"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{$t('products_from_api.create')}}
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
                          v-model="editedProduct.country"
                          :label="$t('products_from_api.form.country')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.city"
                          :label="$t('products_from_api.form.city')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.address_1"
                          :label="$t('products_from_api.form.address_1')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.address_2"
                          :label="$t('products_from_api.form.address_2')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.postal_code"
                          :label="$t('products_from_api.form.postal_code')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.product_quantity"
                          :label="$t('products_from_api.form.product_quantity')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.center_classification_date"
                          :label="$t('products_from_api.form.center_classification_date')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.distribution_pattern"
                          :label="$t('products_from_api.form.distribution_pattern')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.state"
                          :label="$t('products_from_api.form.state')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.report_date"
                          :label="$t('products_from_api.form.report_date')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.classification"
                          :label="$t('products_from_api.form.classification')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.recalling_firm"
                          :label="$t('products_from_api.form.recalling_firm')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.product_type"
                          :label="$t('products_from_api.form.product_type')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.event_id"
                          :label="$t('products_from_api.form.event_id')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.termination_date"
                          :label="$t('products_from_api.form.termination_date')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.recall_initiation_date"
                          :label="$t('products_from_api.form.recall_initiation_date')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.recall_number"
                          :label="$t('products_from_api.form.recall_number')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.voluntary_mandated"
                          :label="$t('products_from_api.form.voluntary_mandated')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedProduct.status"
                          :label="$t('products_from_api.form.status')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="12">
                        <v-textarea
                          v-model="editedProduct.initial_firm_notification"
                          :label="$t('products_from_api.form.initial_firm_notification')"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6" md="12">
                        <v-textarea
                          v-model="editedProduct.product_description"
                          :label="$t('products_from_api.form.product_description')"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6" md="12">
                        <v-textarea
                          v-model="editedProduct.code_info"
                          :label="$t('products_from_api.form.code_info')"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6" md="12">
                        <v-textarea
                          v-model="editedProduct.reason_for_recall"
                          :label="$t('products_from_api.form.reason_for_recall')"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    {{$t('products_from_api.cancel')}}
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> {{$t('products_from_api.save')}} </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="700px">
              <v-card>
                <v-card-title class="text-h5"
                  >{{$t('products_from_api.delete')}}</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >{{$t('products_from_api.cancel')}}</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteProductConfirm"
                    >{{$t('products_from_api.ok')}}</v-btn
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
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            {{$t('products_from_api.form.product_description')}} : {{ item.product_description }} <br>
            {{$t('products_from_api.form.reason_for_recall')}} : {{ item.reason_for_recall }}
          </td>
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
      expanded: [],
      singleExpand: true,
      dialog: false,
      dialogDelete: false,
      search: "",
      headers: [
        {
          text: this.$t('products_from_api.table.recalling_firm'),
          align: "start",
          sortable: true,
          value: "recalling_firm",
        },
        { text: this.$t('products_from_api.table.country'), value: "country" },
        { text: this.$t('products_from_api.table.city'), value: "city" },
        { text: this.$t('products_from_api.table.address_1'), value: "address_1" },
        { text: this.$t('products_from_api.table.product_quantity'), value: "product_quantity" },
        { text: this.$t('products_from_api.table.product_type'), value: "product_type" },
        { text: this.$t('products_from_api.table.status'), value: "status" },
        { text: this.$t('products_from_api.table.actions'), value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedProduct: {
        country: '',
        city: '',
        address_1: '',
        reason_for_recall: '',
        readdress_2view: '',
        product_quantity: '',
        code_info : '',
        center_classification_date : '',
        distribution_pattern : '',
        state: '',
        product_description: '',
        report_date: '',
        classification: '',
        openfda:{},
        recalling_firm:'',
        recall_number: '',
        initial_firm_notification:'',
        product_type:'',
        event_id:'',
        termination_date:'',
        recall_initiation_date:'',
        postal_code:'',
        voluntary_mandated:'',
        status:''
      },
      defaultProduct: {
        country: '',
        city: '',
        address_1: '',
        reason_for_recall: '',
        readdress_2view: '',
        product_quantity: '',
        code_info : '',
        center_classification_date : '',
        distribution_pattern : '',
        state: '',
        product_description: '',
        report_date: '',
        classification: '',
        openfda:{},
        recalling_firm:'',
        recall_number: '',
        initial_firm_notification:'',
        product_type:'',
        event_id:'',
        termination_date:'',
        recall_initiation_date:'',
        postal_code:'',
        voluntary_mandated:'',
        status:''
      },
    };
  },
  computed: {
    ...mapGetters({
      products: "productsFromApi/all",
    }),
    formTitle () {
        return this.editedIndex === -1 ? this.$t('products_from_api.create') : this.$t('products_from_api.edit')
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
          create:"productsFromApi/ADD_PRODUCT_FROM_API",
          delete:"productsFromApi/DELETE_PRODUCT_FROM_API",
          edit:"productsFromApi/EDIT_PRODUCT_FROM_API"
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
        this.delete(this.editedProduct.recall_number);
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
  },
  
};
</script>

<style>
</style>