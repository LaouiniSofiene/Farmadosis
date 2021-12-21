<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <VuetifyLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline">
        </v-card-title>
        <v-card-text>
          <p>{{$t('home.1')}}</p>
          <p>
            {{$t('home.2')}}
          </p>
          <p>
            {{$t('home.3')}}
          </p>
          <ul>
            <li>{{$t('home.4')}}</li>
            <li>{{$t('home.5')}}</li>
            <li>{{$t('home.6')}}</li>
            <li>{{$t('home.7')}}</li>
            <li>{{$t('home.8')}}</li>
            <li>{{$t('home.9')}}</li>
          </ul>
          <div class="text-xs-right">
            <em><small>&mdash; Sofiene Laouini</small></em>
          </div>
          <hr class="my-3">
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'IndexPage'
}
</script>
