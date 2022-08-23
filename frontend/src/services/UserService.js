import axios from 'axios';

const UsersRestApiUrl = 'api/users';

class UserService{

    getUsers(pageNumber,pageSize,sortElement,sortDir){
        return axios.get(UsersRestApiUrl+'?pageNumber='+pageNumber+'&pageSize='+pageSize+'&sortBy='+sortElement+'&sortDir='+sortDir);
    }

    calculatePages(pageSize){
        return axios.get("api/calculate/"+pageSize);
    }

    searchUser(searchValue, searchUserText,pageNumber,pageSize,sortElement,sortDir){
        return axios.get("api/searchUser/"+searchValue+"/"+searchUserText+'?pageNumber='+pageNumber+'&pageSize='+pageSize+'&sortBy='+sortElement+'&sortDir='+sortDir);
    }

}

export default new UserService();