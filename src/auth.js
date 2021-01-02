import axios from 'axios';

let currentUser = "";


const Deneme = {
    authenticated: false,
    currentUser: "",

    signup: (name, surname, email, password) => {
            axios({
                method: "POST",
                data: {
                    firstName: name,
                    lastName: surname,
                    email: email,
                    password: password
                },
                url: "http://localhost:8000/members/signup",
            }).then((res) => console.log(res))
            .catch(error => {
                console.log(error.response)
            })
       
    },

    login: (email, password) => {
        axios({
            method: "POST",
            data: {
                email: email,
                password: password
            },
            url: "http://localhost:8000/members/login"
           }).then((res) => {
            console.log(res)
                
        })
        .catch(error => {
            console.log(error.response)
        })
    },

}






class Auth {
    constructor(){
        this.currentUser = "";
        this.authenticated = false;
    }
    signup = (name, surname, email, password) => {
        axios({
            method: "POST",
            data: {
                firstName: name,
                lastName: surname,
                email: email,
                password: password
            },
            url: "http://localhost:8000/members/signup",
        }).then((res) => console.log(res))
        .catch(error => {
            console.log(error.response)
        })
    };

    login = (email, password) => {
        axios({
            method: "POST",
            data: {
                email: email,
                password: password
            },
            url: "http://localhost:8000/members/login"
           }).then((res) => {
            console.log(res)
                if(res.status === 200){
                this.currentUser = res.data.data._id;
            }
        })
        .catch(error => {
            console.log(error.response)
        })
    }
}

export default Deneme;