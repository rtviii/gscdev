import {fetchAndLoadById} from './pori_graphkb_loader/src/ensembl/index'
import {ApiConnection, rid   } from './pori_graphkb_loader/src/graphkb'

// Given a tsv row with 
  //     geneIdVersion      : 'Gene stable ID version',
  //     hgncId             : 'HGNC ID',
  //     refseqId           : 'RefSeq mRNA ID',
  //     transcriptIdVersion: 'Transcript stable ID version',
// verify that :

/**
  Write a test for loading a single ensembl protein and all of its parent components.
  This will require mocking all of the GraphKB and Ensembl API connections.

  If we pick a well known gene/protein you can likely just make the requests to the ensembl api and
  save the JSON as test data since it is unlikely to change.
  The test should check the following expected behaviour:

    @todo the protein is loaded both versioned and unversioned
    @todo unversioned protein    is linked to the versioned    protein via            GeneralizationOf edge
    @todo unversioned protein    is linked to the unversioned  transcript         via ElementOf        edge
    @todo unversioned transcript is linked to the unversioned  gene               via ElementOf        edge

  Note: This is related to the non-linked proteins we've seen a couple of so this might also require some minor changes to the loader.
  We suspect there is a bug right now where something isn't getting linked to the protein so this will test that
 */


//  
// 1. What constitutes well-formed protein; what's malformed?
// 2. Where to find/how to map ensembl data to the protein & neighbors subgraph?
// http://rest.ensembl.org/lookup/id/ENSG00000157764?expand=1;content-type=application/json
// https://rest.ensembl.org/archive/id/ENSG00000198888?content-type=application/json

// https://uswest.ensembl.org/Homo_sapiens/Transcript/ProteinSummary?db=core;g=ENSG00000133703;r=12:25205246-25250929;t=ENST00000256078

const apiConn = new ApiConnection('http://0.0.0.0:8080/api')
apiConn.password = "kush552881498";
apiConn.username = "rxz";

(async () =>{

  let sourceIdVersion = "2";
  let sourceId        = "ENSG00000198888";
  let biotype         = "gene";

  const result = await fetchAndLoadById(apiConn,{
      sourceId       : 'ENSG00000198888',
      sourceIdVersion: "2",
      biotype        : "gene"
  })
  console.log(result)

  // const all = await apiConn.getRecords({
  //     // limit           : 1000,
  //     filters         : [{ 
  //       biotype: "protein" 
  //     }],
  //     target          : "Feature",
  //     returnProperties: ["name", 'source.name', 'sourceId', "sourceIdVersion","biotype"],
  //     })
  //   console.log(all);

        // const fetched = await apiConn.getUniqueRecordBy({
        //     filters: [
        //         { sourceId },
        //         { sourceIdVersion },
        //         { biotype },
        //         // { source: CACHE._source },
        //     ],
        //     target: 'Feature',

        //     // @ts-ignore
        // returnProperties: ["name", 'source.name', 'sourceId', "sourceIdVersion","biotype"],}) 
        
        // console.log(fetched);
        
        
        
        // const other = await apiConn.getUniqueRecordBy({
        //     filters: [
        //           // { source    : rid(sourceId, true) },
        //          { biotype   : 'protein' }    ,
        //           // { dependency: null }      ,
        //         // { source: CACHE._source },
        //     ],
        //     target: 'Feature',
        // });
        // console.log(other);
})()





// All connections of a gene

