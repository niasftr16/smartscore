new Vue({
    el: '#app',
    data: {
        msg: '',
        title: 'Silakan login dengan menggunakan akun Smartscore anda',
        apiUrl: 'http://localhost:70/smartscore/api/',
        username: '', password: ''        
    },
    methods: {
        login: function() {
            var data = $("#formLogin").serialize()
            var self = this
            if(this.username === '' || this.password === '') {
                this.msg = 'Silakan masukkan username dan password anda'
            } else {
                $.ajax({
                    url: `${this.apiUrl}authcontroller/validate/`,
                    type: 'POST',
                    dataType: 'json',
                    data: data,
                    success: function(data) {                 
                        if(data.code === 1) {
                            var tgl = new Date(),
                            skrg = tgl.getTime(),
                            expMs = skrg + 3600000,
                            exp = new Date(expMs)
                            document.cookie = `ss_session=${data.cookie};expires=${exp};path=/;`
                            self.msg = ''
                            self.title = data.msg
                            window.location.href = 'http://localhost:8080/'
                        } else {
                            self.msg = data.msg
                        }                   
                    }
                })
            }            
        },
    }
})