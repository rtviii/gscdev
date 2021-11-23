
const {fetchAndLoadById} = require('./pori_graphkb_loader/src/ensembl/index')
const {ApiConnection}    = require('./pori_graphkb_loader/src/graphkb')

const apiConn = new ApiConnection('http://0.0.0.0:8080/api')

apiConn.password = "kush552881498"
apiConn.username = "rxz"

const query =  async () =>{
  const result = await fetchAndLoadById(apiConn,{
      sourceId       : 'ENSG00000198888',
      sourceIdVersion: "2",
      biotype        : "gene"
  })
  console.log(result)
}

console.log(query())