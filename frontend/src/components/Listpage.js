import React from 'react';
import UserService from '../services/UserService';
import md5 from 'md5';

class Listpage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            users:[],
	        showAdd:false,
	        showUpdate:false,
            showDelete:false,

            currentid:null,
            currentfirstName:null,
            currentsurname:null,
            currentpesel:null,
            currentcompany:null,

            sortToggle : false,

            pageNumber: 0,
            pageSize: 10,
            totalPages: 0,
            
            sortDataParam: "id",
        }
    }

    componentDidMount(){
        UserService.getUsers(this.state.pageNumber,this.state.pageSize,"id","asc").then((response) => {
            this.setState({ users: response.data.content.map(obj => ({ ...obj, surname: obj.surname.concat("_"+md5(obj.surname)) })) })
        });
        UserService.calculatePages(this.state.pageSize).then((response) => {
            this.setState({ totalPages: response.data });
            document.getElementById("totalPages").innerHTML = response.data;
        });
    }

    showTableAfterOperation(){
        
        setTimeout(()=>{

            var sortDir = !this.state.sortToggle ? "asc" : "desc";

            if(document.getElementById("searchUserText").value===""){
                
                UserService.getUsers(this.state.pageNumber,this.state.pageSize,this.state.sortDataParam,sortDir).then((response) => {
                    this.setState({ users: response.data.content.map(obj => ({ ...obj, surname: obj.surname.concat("_"+md5(obj.surname)) })) })
                });
                UserService.calculatePages(this.state.pageSize).then((response) => {
                    this.setState({ totalPages: response.data });
                    document.getElementById("totalPages").innerHTML = response.data;
                });
            }
            else{
                
                UserService.searchUser(document.getElementById("searchValue").value, document.getElementById("searchUserText").value,
                this.state.pageNumber,this.state.pageSize,this.state.sortDataParam,sortDir).then((response) => {
                    this.setState({ users: response.data.content.map(obj => ({ ...obj, surname: obj.surname.concat("_"+md5(obj.surname)) })) })
                    this.setState({ totalPages: response.data.totalPages });
                    document.getElementById("totalPages").innerHTML = response.data.totalPages;
                });
    
            }
        },500)
    }


    sortData = () => {
        this.setState(state => ({
            sortToggle : !state.sortToggle
        }));
    }

    sortDataParam(sortingParam){
        let sortDir = this.state.sortToggle ? "asc" : "desc";

        if(document.getElementById("searchUserText").value!==""){
            UserService.searchUser(document.getElementById("searchValue").value, document.getElementById("searchUserText").value,
            this.state.pageNumber,this.state.pageSize,sortingParam,sortDir).then((response) => {
                this.setState({ users: response.data.content.map(obj => ({ ...obj, surname: obj.surname.concat("_"+md5(obj.surname)) })) })
            });
        }
        else{
            UserService.getUsers(this.state.pageNumber,this.state.pageSize,sortingParam,sortDir).then((response) => {
                this.setState({ users: response.data.content.map(obj => ({ ...obj, surname: obj.surname.concat("_"+md5(obj.surname)) })) })
            });
        }
    }

    searchUser(){
        if(document.getElementById("searchUserText").value===""){
            UserService.getUsers(this.state.pageNumber,this.state.pageSize,"id","asc").then((response) => {
                this.setState({ users: response.data.content.map(obj => ({ ...obj, surname: obj.surname.concat("_"+md5(obj.surname)) })) })
            });
            UserService.calculatePages(this.state.pageSize).then((response) => {
                //console.log(response.data);
                this.setState({ totalPages: response.data });
                this.setState({ pageNumber: 0 });
                this.setState({ sortDataParam: "id"});
                this.setState({ sortToggle : false });
                document.getElementById("totalPages").innerHTML = response.data;
                this.showTableAfterOperation();
            });
        }
        else{
            UserService.searchUser(document.getElementById("searchValue").value, document.getElementById("searchUserText").value,
            this.state.pageNumber,this.state.pageSize,"id","asc").then((response) => {
                //this.setState({ users: response.data.content})
                //console.log(response.data.totalPages);
                this.setState({ users: response.data.content.map(obj => ({ ...obj, surname: obj.surname.concat("_"+md5(obj.surname)) })) })
                //console.log(this.state.users);
                this.setState({ pageNumber: 0 });
                this.setState({ sortDataParam: "id"});
                this.setState({ sortToggle : false });
                this.setState({ totalPages: response.data.totalPages });
                document.getElementById("totalPages").innerHTML = response.data.totalPages;
                this.showTableAfterOperation();
            });

        }
    }

    onKeyUpValueSearchUser(event) {
        if (event.key === 'Enter') {
            this.searchUser();
        }
    }

    onKeyUpValuePageNumber(event) {
        if (event.key === 'Enter') {
            //console.log(document.getElementById("pageNumber").value);
            if(document.getElementById("pageNumber").value===""){
                this.setState({ pageNumber: this.state.pageNumber });
                this.showTableAfterOperation();
            }
            else{
                this.setState({ pageNumber: document.getElementById("pageNumber").value-1 });
                document.getElementById("pageNumber").value="";
                this.showTableAfterOperation();
            }

        }
    }

    render (){  
        
        return (
            <div>
                <h1 className = "text-center">Lista</h1>
                <br></br><br></br><br></br>
                <p>Tabela jest sortowana po kliknięciu w jasnoczerwone pole z nazwą kolumny.</p>
                <br></br>
                <p style={{display: "inline"}}>Aktualny stan posortowania tabeli: </p><div className={this.state.sortToggle ? "arrow arrow-down" : "arrow arrow-up"}></div>
                <br></br><br></br><br></br>
                <table id="tableLista" className = "table table-striped">
                    <thead>
                        <tr>   
                            <td style={{background: "#ffa0a0"}}>
                                <button class="astext" onClick={ () => {
                                    this.sortData();
                                    this.sortDataParam("id");
                                    this.setState({sortDataParam: "id"});
                                }}>
                                    <b>ID</b>
                                </button>
                            </td>
                            <td style={{background: "#ffa0a0"}}>
                            <button class="astext" onClick={ () => {
                                    this.sortData();
                                    this.sortDataParam("name");
                                    this.setState({sortDataParam: "name"});
                                }}>
                                    <b>Imię</b>
                                </button>
                            </td>
                            <td style={{background: "#ffa0a0"}}>
                                <button class="astext" onClick={ () => {
                                    this.sortData();
                                    this.sortDataParam("surname");
                                    this.setState({sortDataParam: "surname"});
                                }}>
                                    <b>Nazwisko_Nazwisko zaszyfrowane algorytmem md5</b>
                                </button>
                            </td>
                            <td style={{background: "#ffa0a0"}}>
                                <button class="astext" onClick={ () => {
                                    this.sortData();
                                    this.sortDataParam("login");
                                    this.setState({sortDataParam: "surname"});
                                }}>
                                    <b>Login</b>
                                </button>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(
                                user =>
                                <tr key = {user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td>{user.login}</td>
                                </tr>
                            )
                        }
                    </tbody>
                    <tfoot></tfoot>                   
                </table>

                <div>
                    <br></br><br></br>
                    <button class="button-22" onClick={ () => {
                                    if(this.state.pageNumber>0){
                                        this.setState({pageNumber: this.state.pageNumber - 1});
                                    }                                   
                                    this.showTableAfterOperation();
                                }}>poprzednia</button>

                    <p style={{display: "inline"}}>Strona: </p>
                    <input type="text" id="pageNumber" placeholder={this.state.pageNumber+1} onKeyUp={this.onKeyUpValuePageNumber.bind(this)}></input>
                    <p style={{display: "inline"}}> / </p>
                    <p id="totalPages" style={{display: "inline"}}></p>
                    <button class="button-22" onClick={ () => {
                                    if(this.state.pageNumber<(this.state.totalPages-1)){
                                        this.setState({pageNumber: this.state.pageNumber + 1});
                                    } 
                                    this.showTableAfterOperation();
                                }}>następna</button>
                </div>

                <div>
                    <br></br><br></br>
                    <p style={{display: "inline"}}>Wyszukaj użytkownika po </p>
                    <select id="searchValue" defaultValue="name">
                        <option value="name">imieniu</option>
                        <option value="surname">nazwisku</option>
                        <option value="login">loginie</option>
                    </select>
                    <p style={{display: "inline"}}>: </p>
                    <input type="text" id="searchUserText" placeholder="nazwa" onKeyUp={this.onKeyUpValueSearchUser.bind(this)}></input>
                    <button class="button-21" onClick={ () => {
                                    this.searchUser();
                                }}>wyszukaj</button>
                </div>
                
            </div>
        )
    }
}


export default Listpage