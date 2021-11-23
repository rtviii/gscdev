import axios from 'axios';
import { fetchAndLoadById } from './pori_graphkb_loader/src/ensembl/index'
import { ApiConnection, rid } from './pori_graphkb_loader/src/graphkb'
const apiConn = new ApiConnection('http://0.0.0.0:8080/api')
apiConn.password = "kush552881498";
apiConn.username = "rxz";
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
// 




// ! 1. be able to create and retrieve nodes from the db
// what types of nodes?
//  where do ensp/enst/ensg fit in?
// ! 2. verify what is which edge to what
// ! 3. verify that the loader recurses correctly
// ! 4. plug in jest



(async () => {

  const KRAS = [
    {
      sourceIdVersion: '',
      sourceId: 'ENSG00000133703',
      biotype: 'gene'
    },
    {
      sourceIdVersion: "",
      sourceId: 'ENST00000311936.8',
      biotype: 'transcript'
    },
    {
      sourceIdVersion: '',
      sourceId: 'ENST00000256078.10',
      biotype: 'transcript'
    },
    {
      sourceIdVersion: '',
      sourceId: 'ENST00000556131.1',
      biotype: 'transcript'
    },
    {
      sourceIdVersion: '',
      sourceId: 'ENST00000557334.5',
      biotype: 'transcript'
    }
  ]

    var resp = await fetchAndLoadById(apiConn, 
    {
      sourceIdVersion: '',
      sourceId: 'ENSG00000133703',
      biotype: 'gene'
    },
)
  console.log(resp);

// I'm not super sure how to reproduce the {{URI}}/xrefs/id/ENSG00000133703 endpoint
var gene_id = KRAS[0]['sourceId']
var refs    = await axios.get(`https://rest.ensembl.org/xrefs/id/${gene_id}?content-type=application/json`)
console.log(refs.data.map(( r:any ) => r.dbname));
console.log(refs.data.slice(0,5));


axios.get(`https://rest.ensembl.org/lookup/id/${KRAS[1]['sourceId']}?expand=1;content-type=application/json`)
axios.get(`https://rest.ensembl.org/lookup/id/${KRAS[1]['sourceId']}`).then(r=>console.log(r.data))




 





  // var result = await fetchAndLoadById(apiConn, { ...KRAS['gene'] })
    //  result = await fetchAndLoadById(apiConn, { ...KRAS['transcripts'][1] })
    //  var result = await fetchAndLoadById(apiConn, { ...KRAS['transcripts'][2] })
    //  var result = await fetchAndLoadById(apiConn, { ...KRAS['transcripts'][3] })
    //  var result = await fetchAndLoadById(apiConn, { ...KRAS['transcripts'][4] })

  // const all = await apiConn.getRecords({
  //   filters         : [{ biotype: "transcript"}],
  //   target          : "Feature",
  //   returnProperties: ["name", 'source.name', 'sourceId', "sourceIdVersion","biotype"],
  //   })
  // console.log(all);

  // const fetched = await apiConn.getUniqueRecordBy({
  //   filters: [
  //     { sourceId },
  //     { sourceIdVersion },
  //     { biotype },
  //     // { source: CACHE._source },
  //   ],
  //   target: 'Feature',
  //   // @ts-ignore
  //   returnProperties: ["name"]

  // })

  // console.log(fetched);

})()

/**
 * @param What's the deal with in-ram caching in pori_graphkb_loader/src/ensembl/index.js?
 *
 * Shouldn't the alternative branch only execute if the caching failed?
 * Which it will unless you are uploading everything in a single run of a loader...?
 *
 *
 * @link {{baseUrl}}/biomarkers/:rid?neighbors=2
 * @link {{URI}}/xrefs/id/ENSG00000133703
 * @link {{URI}}/overlap/id/ENST00000256078
 * @link {{URI}}/lookup/id/ENST00000256078
 *
 *
 * ENSG00000133703
 *
 *
 * some info on ensembl's distinction between genes and transcripts https://genome.ucsc.edu/FAQ/FAQgenes.html
 * ----------- KRAS
 * @param Transcript ENST00000256078.10 - KRAS [https://uswest.ensembl.org/Homo_sapiens/Transcript/ProteinSummary?db=core;g=ENSG00000133703;r=12:25205246-25250929;t=ENST00000256078]
 * @param Gene       ENSG00000133703    - KRAS [https://uswest.ensembl.org/Homo_sapiens/Transcript/ProteinSummary?db=core;g=ENSG00000133703;r=12:25205246-25250929;t=ENST00000256078]
 * @param toss the gene into the xrefs lookup endpoint
 */





//:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:
//:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:
// ※ when fetch-uploading a single 

    // var resp = await fetchAndLoadById(apiConn, {
    //     sourceIdVersion: '',
    //     sourceId: 'ENST00000557334.5',
    //     biotype: 'transcript'
    //   })
    //   console.log(resp);
      
// (node:15990) UnhandledPromiseRejectionWarning: Error: unsupported biotype: transcript
//     at fetchAndLoadById (/home/rxz/dev/gsc/pori_graphkb_loader/src/ensembl/index.js:205:19)
//     at /home/rxz/dev/gsc/qtest.ts:109:16



//:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:
//:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:∷∷∷∷:
// ※ I dont quite understand why 2 new genes are created if neither is unversioned for 
    // var resp = await fetchAndLoadById(apiConn, 
    // {
    //   sourceIdVersion: '',
    //   sourceId: 'ENSG00000133703',
    //   biotype: 'gene'
    // })