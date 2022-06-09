import appAxios from '@/utils/appAxios'

const SearchService = {
    query: async function query(queryParam,size,from) {
        const queryBool=queryParam.includes(":")
        const queryArr = queryParam.split(':')
        if (queryBool && queryArr[0] != ''){
            return await appAxios
            .get(`_search?pretty=true&q=${queryArr[0]}:"${queryArr[1]}"&size=${size}&from=${from}`, {
                data: JSON.stringify(queryParam),
                auth: {
                    username: 'elastic',
                    password: '123456'
                  }
            }).then((response) => {
                return response.data
            })
            .catch((err)=>{
                throw err
            });
        }else {
            return await appAxios
            .get(`_search?pretty=true&q="*${queryParam.replace(':','')}*"&size=${size}&from=${from}`, {
                data: JSON.stringify(queryParam.replace(':','')),
                auth: {
                    username: 'elastic',
                    password: '123456'
                  }
            }).then((response) => {
                return response.data
            })
            .catch((err)=>{
                throw err
            });
        }
       
    },
    querySort: async function query(queryParam,size,from,column,type) {
        return await appAxios
         .get(`_search?pretty=true&q="*${queryParam}*"&size=${size}&from=${from}&sort=${column}:${type}`, {
             data: JSON.stringify(queryParam),
             auth: {
                 username: 'elastic',
                 password: '123456'
               }
         }).then((response) => {
             return response.data
         })
         .catch((err)=>{
             throw err
         });
     }
}



export default SearchService