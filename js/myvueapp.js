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
        /*
        Ce modals sunt afisate
        */
        showModals : {
            "addBoard" : false,
            "editBoard" : false,
            "addList" : false,
            "editList" : false,
            "addCard" : false,
            "openCard" : false,
            "erroreState" : false
        },
        tasks : [
            {
                "number" : "",
                "type" : "",
                "name" : ""
            }
        ],
        aiscams : [
            {
                "number" : "",
                "type" : "",
                "name" : "",
                "date" : ""
            }
        ],
        scams : [
            {
                "number" : "",
                "type" : "",
                "name" : "",
                "date" : ""
            }
        ],
        toAddTask : {
            "number" : "",
            "type" : "",
            "name" : ""
        },
        toAddAIScam : {
            "number" : "",
            "type" : "",
            "name" : ""
        },
        toAddScam : {
            "number" : "",
            "type" : "",
            "name" : ""
        },
        scamsfields: [
            'index',
            'number',
            'type',
            'name',
            'date',
            { key: 'delete', label: 'Delete number' }
        ],
        aiscamsfields: [
            'index',
            'number',
            'type',
            'name',
            { key: 'delete', label: 'Delete number' },
            { key: 'addToScam', label: 'Add number to scam'}
        ],
        tasksfields: [
            'index',
            'number',
            'type',
            'name',
            { key: 'delete', label: 'Delete number' },
            { key: 'addToScamAI', label: 'Add number to scamAI'}
        ],
        querryNumber : "",
        querryStatus : ""
    },
    methods: {
        /*
        Initializarea in care se iau de la serverul de backend toate board-urile
        */
        initializare: function() {
            var year = new Date().getFullYear();
            var month = new Date().getMonth() + 1;
            var day = new Date().getDate();
            year = "2017";
            month = "03";
            day = "04";

            this.$http.get(this.backendServerUrl + 'mobile/scam/' + year + '/' + month + '/' + day).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    this.scams = response.message;
                } else {
                    this.showModals.erroreState = true;
                    this.erroreMessage = response.message;
                }
            });

            this.$http.get(this.backendServerUrl + 'ai/reports').then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    this.tasks = response.message;
                } else {
                    this.showModals.erroreState = true;
                    this.erroreMessage = response.message;
                }
            });

            this.$http.get(this.backendServerUrl + 'management/scam/' + year + '/' + month + '/' + day).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    this.aiscams = response.message;
                } else {
                    this.showModals.erroreState = true;
                    this.erroreMessage = response.message;
                }
            });
        },

        //SCAM
        refreshScams: function() {
            var year = new Date().getFullYear();
            var month = new Date().getMonth() + 1;
            var day = new Date().getDate();
            year = "2017";
            month = "03";
            day = "04";

            this.$http.get(this.backendServerUrl + 'mobile/scam/' + year + '/' + month + '/' + day).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    this.scams = response.message;
                } else {
                    this.showModals.erroreState = true;
                    this.erroreMessage = response.message;
                }
            });
        },
        deleteScam: function(index) {
            this.$http.delete(this.backendServerUrl + 'management/info/' + this.scams[index].number).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    this.scams.splice(index, 1);
                } else {
                    this.showModals.erroreState = true;
                    this.erroreMessage = response.message;
                }
            });
        },
        addScam: function() {
            var messageToSend = {
                "number" : this.toAddScam.number,
                "type" : this.toAddScam.type,
                "name" : this.toAddScam.name
            }
            var tmp_toAddScam = new Object();
            tmp_toAddScam.number = this.toAddScam.number;
            tmp_toAddScam.type = this.toAddScam.type;
            tmp_toAddScam.name = this.toAddScam.name;
            this.toAddScam.number = "";
            this.toAddScam.type = "";
            this.toAddScam.name = "";
            this.$http.post(this.backendServerUrl + 'management/scam', messageToSend).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    this.scams.push(tmp_toAddScam);
                } else {
                    this.showModals.erroreState = true;
                    this.erroreMessage = response.message;
                }
            });
        },

        //ScamsAI
        refreshScamsAI: function() {
            var year = new Date().getFullYear();
            var month = new Date().getMonth() + 1;
            var day = new Date().getDate();
            year = "2017";
            month = "03";
            day = "04";

            this.$http.get(this.backendServerUrl + 'management/scam/' + year + '/' + month + '/' + day).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    this.aiscams = response.message;
                } else {
                    this.showModals.erroreState = true;
                    this.erroreMessage = response.message;
                }
            });
        },
        deleteScamAI: function(index) {
            this.$http.delete(this.backendServerUrl + 'management/infoAI/' + this.aiscams[index].number).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    this.aiscams.splice(index, 1);
                } else {
                    this.showModals.erroreState = true;
                    this.erroreMessage = response.message;
                }
            });
        },
        addScamAI: function() {
            var messageToSend = {
                "number" : this.toAddAIScam.number,
                "type" : this.toAddAIScam.type,
                "name" : this.toAddAIScam.name
            }
            var tmp_toAddAIScam = new Object();
            tmp_toAddAIScam.number = this.toAddAIScam.number;
            tmp_toAddAIScam.type = this.toAddAIScam.type;
            tmp_toAddAIScam.name = this.toAddAIScam.name;
            this.toAddAIScam.number = "";
            this.toAddAIScam.type = "";
            this.toAddAIScam.name = "";

            this.$http.post(this.backendServerUrl + 'ai/scam', messageToSend).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    this.aiscams.push(tmp_toAddAIScam);
                } else {
                    this.showModals.erroreState = true;
                    this.erroreMessage = response.message;
                }
            });
        },
        addScamAIToScam: function(index) {
            var messageToSend = {
                "number" : this.aiscams[index].number,
                "type" : this.aiscams[index].type,
                "name" : this.aiscams[index].name
            }
            var tmp_toAddScam = new Object();
            tmp_toAddScam.number = this.aiscams[index].number;
            tmp_toAddScam.type = this.aiscams[index].type;
            tmp_toAddScam.name = this.aiscams[index].name;
            this.$http.post(this.backendServerUrl + 'management/scam', messageToSend).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    this.scams.push(tmp_toAddScam);
                } else {
                    this.showModals.erroreState = true;
                    this.erroreMessage = response.message;
                }
            });
        },

        // TASKS
        refreshTasks: function() {
            this.$http.get(this.backendServerUrl + 'ai/reports').then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    this.tasks = response.message;
                } else {
                    this.showModals.erroreState = true;
                    this.erroreMessage = response.message;
                }
            });
        },
        deleteTask: function(index) {
            this.$http.delete(this.backendServerUrl + 'management/tasks/' + this.tasks[index].number).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    this.tasks.splice(index, 1);
                } else {
                    this.showModals.erroreState = true;
                    this.erroreMessage = response.message;
                }
            });
        },
        addTask: function() {
            var messageToSend = {
                "number" : this.toAddTask.number,
                "type" : this.toAddTask.type,
                "name" : this.toAddTask.name
            }
            var tmp_toAddTask = new Object();
            tmp_toAddTask.number = this.toAddTask.number;
            tmp_toAddTask.type = this.toAddTask.type;
            tmp_toAddTask.name = this.toAddTask.name;
            this.toAddTask.number = "";
            this.toAddTask.type = "";
            this.toAddTask.name = "";

            this.$http.post(this.backendServerUrl + 'mobile/posiblescam', messageToSend).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    this.tasks.push(tmp_toAddTask);
                } else {
                    this.showModals.erroreState = true;
                    this.erroreMessage = response.message;
                }
            });
        },
        addTaskToScamAI: function(index) {
            var messageToSend = {
                "number" : this.tasks[index].number,
                "type" : this.tasks[index].type,
                "name" : this.tasks[index].name
            }
            var tmp_toAddScamAI = new Object();
            tmp_toAddScamAI.number = this.tasks[index].number;
            tmp_toAddScamAI.type = this.tasks[index].type;
            tmp_toAddScamAI.name = this.tasks[index].name;
            this.$http.post(this.backendServerUrl + 'ai/scam', messageToSend).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    this.aiscams.push(tmp_toAddScamAI);
                } else {
                    this.showModals.erroreState = true;
                    this.erroreMessage = response.message;
                }
            });
        },
        getNumberStatus: function() {
            this.$http.get(this.backendServerUrl + 'all/' + this.querryNumber).then(response => {
                return response.body;
            }, response => {
                console.log("eroare1", response);
            }).then( response => {
                console.log("raspuns2", response);
                if(response.status == "success") {
                    this.querryStatus = response.message;
                } else {
                    this.showModals.erroreState = true;
                    this.erroreMessage = response.message;
                }
            });
        }
    }
});
vue_app.initializare();