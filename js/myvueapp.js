/*
Aplicatia Vue pentru pagina web
*/

var vue_app = new Vue({ 
    el: '#app' ,
    data: {
        /*
        Varaibile Locale pentru Modal
        */
        variants: [
            'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'
        ],
        headerBgVariant: 'dark',
        headerTextVariant: 'light',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'warning',
        footerTextVariant: 'dark',
        /*
        Varaibile locale si variabile initiale
        */
        backendServerUrl : "http://localhost:3000/api/",
        erroreMessage : "Default Errore",
        api_key : "5aed99d168ea3e1988f3b6de",
        toAddNumber : {
            "number" : "",
            "type" : "",
            "level" : ""
        },
        toDeleteNumber : "",
        toQuerryNumber : "",
        querryStatus : {
            type: "",
            level : ""
        }
    },
    methods: {
        deleteNumber: function(index) {
            this.$http.delete(this.backendServerUrl + 'management/' + this.toDeleteNumber).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    console.log("delete success");
                } else {
                    this.erroreMessage = response.message;
                }
            });
        },
        addNumber: function() {
            var messageToSend = {
                "number" : this.toAddNumber.number,
                "type" : this.toAddNumber.type,
                "level" : this.toAddNumber.level
            }
            var tmp_toAddNumber = new Object();
            tmp_toAddNumber.number = this.toAddNumber.number;
            tmp_toAddNumber.type = this.toAddNumber.type;
            tmp_toAddNumber.level = this.toAddNumber.level;
            this.toAddNumber.number = "";
            this.toAddNumber.type = "";
            this.toAddNumber.level = "";
            this.$http.post(this.backendServerUrl + 'management/number', messageToSend).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    console.log("inserted success")
                } else {
                    this.erroreMessage = response.message;
                }
            });
        },
        getNumber: function() {
            this.$http.get(this.backendServerUrl + 'mobile/' + this.toQuerryNumber, {headers : {
                'api-key': this.api_key}}).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    console.log("success querry")
                    this.querryStatus = response;
                } else {
                    this.erroreMessage = response.message;
                }
            });
        }
    }
});