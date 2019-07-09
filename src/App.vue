<template>
    <div id="app">
        <table>
            <tr>
                <td width="60px"><img src="../src/assets/logo.png" width="50px"></td>
                <td>
                    <span class="table-title"><b>#re-registration event</b></span>
                    <br>
                    <span class="table-desc">Made with <span class="vue-font">Vue.js</span></span>
                </td>
            </tr>
        </table>

        <hr>

        <div class="row">
            <div class="col-md-8">

                <div class="card">
                    <div class="card-header">
                        Users has successfully re-registered!
                        <download-excel class="btn btn-sm btn-success float-right" :data="users" :fields="users_fields" name="Data Users.xls">
                        Export Excel
                        </download-excel>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ID Register</th>
                                    <th scope="col">Created at</th>
                                    <th scope="col" width="10%">Del</th>
                                </tr>
                            </thead>
                            <tbody v-for="(user, index) in users" :key="user.id">
                                <tr>
                                    <th scope="row">{{ user.id }}</th>
                                    <td>{{ user.reg }}</td>
                                    <td>{{ user.date }}</td>
                                    <td>
                                        <a href="#" @click.prevent="deleteUser(index)">x</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <div class="col-md-4">

                <div class="card" style="width: 18rem;">
                    <qrcode-stream @decode="onDecode" @init="onInit" />
                    <div class="card-body">
                        <p class="card-text">Please scan the qrcode event registration that we have sent via your email.</p>
                        <hr>
                        <div class="alert" :class="alert" role="alert">
                            {{ status }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  name: 'app',
  data() {
    return {
      users: [
        {
          id: 1,
          reg: 'B3092130',
          date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
        },
        {
          id: 2,
          reg: 'B3033130',
          date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
        }
      ],
      users_fields: {
          'No': 'id',
          'ID Register': 'reg',
          'Created at': 'date',
      },
      error: '',
      status: 'Webcam ready!',
      alert: 'alert-warning',
      idUser: 3
    }
  },
  components: { QrcodeStream },
  methods: {
    deleteUser(index) {
      this.users.splice(index, 1)
    },
    async onDecode (result) {
      this.users.push({
        id: this.idUser,
        reg: result,
        date: new Date().toJSON().slice(0,10).replace(/-/g,'/')
      })

      this.idUser++

      let audio = await new Audio('http://soundbible.com/mp3/Bike Horn-SoundBible.com-602544869.mp3')
      audio.play()

      this.alert = 'alert-success'
      this.status = 'Success re-registration!'
      setTimeout(() => {
        this.status = 'Webcam ready!',
        this.alert = 'alert-warning'
      }, 3000)

    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {

        let audio = await new Audio('http://soundbible.com/mp3/Industrial Alarm-SoundBible.com-1012301296.mp3')
        audio.play()

        if (error.name === 'NotAllowedError') {
          this.alert = 'alert-danger'
          this.status = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.alert = 'alert-danger'
          this.status = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.alert = 'alert-danger'
          this.status = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.alert = 'alert-danger'
          this.status = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.alert = 'alert-danger'
          this.status = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.alert = 'alert-danger'
          this.status = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
  }
}
</script>

<style>
#app {
  color: #404040;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 40px;
  margin-left: 60px;
  margin-right: 60px;
}

.table-title {
  font-size: 23px;
  color: #404040
}

.table-desc {
  font-size: 17px
}

.vue-font {
  color: green; font-weight: bold
}
</style>
