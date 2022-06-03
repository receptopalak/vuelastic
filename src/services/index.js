import appAxios from '@/utils/appAxios'

const SearchService = {
    query: async function query(queryParam,size,from) {
       return await appAxios
        .get(`_search?pretty=true&q="*${queryParam}*"&size=${size}&from=${from}`, {
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