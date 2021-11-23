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
  var kras_xrefs= [
    {
        "primary_id"     : "LRG_344",
        "info_text"      : "",
        "db_display_name": "LRG display in Ensembl gene",
        "description"    : "Locus Reference Genomic record for KRAS",
        "version"        : "0",
        "dbname"         : "ENS_LRG_gene",
        "display_id"     : "LRG_344",
        "info_type"      : "DIRECT",
        "synonyms"       : []
    },
    {
        "display_id"     : "ENSG00000133703",
        "dbname"         : "ArrayExpress",
        "version"        : "0",
        "db_display_name": "Expression Atlas",
        "info_text"      : "",
        "description"    : null,
        "primary_id"     : "ENSG00000133703",
        "synonyms"       : [],
        "info_type"      : "DIRECT"
    },
    {
        "info_type"      : "DEPENDENT",
        "synonyms"       : [],
        "primary_id"     : "3845",
        "info_text"      : "",
        "description"    : "KRAS proto-oncogene, GTPase",
        "db_display_name": "NCBI gene (formerly Entrezgene)",
        "dbname"         : "EntrezGene",
        "version"        : "0",
        "display_id"     : "KRAS"
    },
    {
        "dbname"         : "HGNC",
        "version"        : "0",
        "display_id"     : "KRAS",
        "info_text"      : "Generated via ensembl_manual",
        "db_display_name": "HGNC Symbol",
        "description"    : "KRAS proto-oncogene, GTPase",
        "primary_id"     : "HGNC:6407",
        "synonyms"       : [
            "KRAS1",
            "KRAS2"
        ],
        "info_type": "DIRECT"
    },
    {
        "synonyms"       : [],
        "info_type"      : "DEPENDENT",
        "info_text"      : "",
        "description"    : "KRAS PROTOONCOGENE, GTPase; KRAS;;V-KI-RAS2 KIRSTEN RAT SARCOMA VIRAL ONCOGENE HOMOLOG;;ONCOGENE KRAS2; KRAS2;;KIRSTEN MURINE SARCOMA VIRUS 2; RASK2;;C-KRAS V-KI-RAS1 PSEUDOGENE, INCLUDED; KRAS1P, INCLUDED;;ONCOGENE KRAS1, INCLUDED; KRAS1, INCLUDED; /.../EN RAS1, INCLUDED; RASK1, INCLUDED",
        "db_display_name": "MIM gene",
        "dbname"         : "MIM_GENE",
        "version"        : "0",
        "display_id"     : "KRAS PROTOONCOGENE, GTPase; KRAS [*190070]",
        "primary_id"     : "190070"
    },
    {
        "info_text"      : "",
        "description"    : "ARTERIOVENOUS MALFORMATIONS OF THE BRAIN;;BAVM;;CEREBRAL ARTERIOVENOUS MALFORMATIONS INTRACRANIAL HEMORRHAGE IN BRAIN ARTERIOVENOUS MALFORMATIONS, SUSCEPTIBILITY TO, INCLUDED",
        "db_display_name": "MIM morbid",
        "display_id"     : "ARTERIOVENOUS MALFORMATIONS OF THE BRAIN [#108010]",
        "version"        : "0",
        "dbname"         : "MIM_MORBID",
        "primary_id"     : "108010",
        "synonyms"       : [],
        "info_type"      : "DEPENDENT"
    },
    {
        "synonyms"       : [],
        "info_type"      : "DEPENDENT",
        "display_id"     : "BLADDER CANCER [#109800]",
        "version"        : "0",
        "dbname"         : "MIM_MORBID",
        "info_text"      : "",
        "db_display_name": "MIM morbid",
        "description"    : "BLADDER CANCER",
        "primary_id"     : "109800"
    },
    {
        "info_type"      : "DEPENDENT",
        "synonyms"       : [],
        "primary_id"     : "114480",
        "info_text"      : "",
        "db_display_name": "MIM morbid",
        "description"    : "BREAST CANCER;;BREAST CANCER, FAMILIAL BREAST CANCER, FAMILIAL MALE, INCLUDED",
        "dbname"         : "MIM_MORBID",
        "version"        : "0",
        "display_id"     : "BREAST CANCER [#114480]"
    },
    {
        "synonyms"       : [],
        "info_type"      : "DEPENDENT",
        "info_text"      : "",
        "description"    : "GASTRIC CANCER, HEREDITARY DIFFUSE; HDGC;;GASTRIC CANCER, HEREDITARY DIFFUSE; HDGC;;GASTRIC CANCER, FAMILIAL DIFFUSE BREAST CANCER, LOBULAR, INCLUDED; LBC, INCLUDED;;GASTRIC CANCER, FAMILIAL DIFFUSE, AND CLEFT LIP WITH OR WITHOUT CLEFT PALATE, INCLUDED",
        "db_display_name": "MIM morbid",
        "display_id"     : "GASTRIC CANCER, HEREDITARY DIFFUSE; HDGC [#137215]",
        "dbname"         : "MIM_MORBID",
        "version"        : "0",
        "primary_id"     : "137215"
    },
    {
        "synonyms"       : [],
        "info_type"      : "DEPENDENT",
        "display_id"     : "SCHIMMELPENNING-FEUERSTEIN-MIMS SYNDROME; SFM [#163200]",
        "version"        : "0",
        "dbname"         : "MIM_MORBID",
        "info_text"      : "",
        "db_display_name": "MIM morbid",
        "description"    : "SCHIMMELPENNING-FEUERSTEIN-MIMS SYNDROME; SFM;;SFM SYNDROME;;LINEAR SEBACEOUS NEVUS SYNDROME;;SEBACEOUS NEVUS SYNDROME, LINEAR;;JADASSOHN NEVUS PHAKOMATOSIS; JNP;;NEVUS SEBACEUS OF JADASSOHN;;ORGANOID NEVUS PHAKOMATOSIS;;EPIDERMAL NEVUS SYNDROME, FORMERLY",
        "primary_id"     : "163200"
    },
    {
        "synonyms"       : [],
        "info_type"      : "DEPENDENT",
        "version"        : "0",
        "dbname"         : "MIM_MORBID",
        "display_id"     : "PANCREATIC CANCER [#260350]",
        "info_text"      : "",
        "db_display_name": "MIM morbid",
        "description"    : "PANCREATIC CANCER;;PANCREATIC CARCINOMA;;PANCREATIC ACINAR CARCINOMA",
        "primary_id"     : "260350"
    },
    {
        "synonyms"       : [],
        "info_type"      : "DEPENDENT",
        "display_id"     : "OCULOECTODERMAL SYNDROME; OES [#600268]",
        "version"        : "0",
        "dbname"         : "MIM_MORBID",
        "info_text"      : "",
        "description"    : "OCULOECTODERMAL SYNDROME; OES;;APLASIA CUTIS CONGENITA WITH EPIBULBAR DERMOIDS",
        "db_display_name": "MIM morbid",
        "primary_id"     : "600268"
    },
    {
        "info_type"      : "DEPENDENT",
        "synonyms"       : [],
        "primary_id"     : "601626",
        "info_text"      : "",
        "description"    : "LEUKEMIA, ACUTE MYELOID; AML;;LEUKEMIA, ACUTE MYELOGENOUS LEUKEMIA, ACUTE MYELOID, SUSCEPTIBILITY TO, INCLUDED",
        "db_display_name": "MIM morbid",
        "display_id"     : "LEUKEMIA, ACUTE MYELOID; AML [#601626]",
        "dbname"         : "MIM_MORBID",
        "version"        : "0"
    },
    {
        "primary_id"     : "609942",
        "info_text"      : "",
        "db_display_name": "MIM morbid",
        "description"    : "NOONAN SYNDROME 3; NS3",
        "display_id"     : "NOONAN SYNDROME 3; NS3 [#609942]",
        "dbname"         : "MIM_MORBID",
        "version"        : "0",
        "info_type"      : "DEPENDENT",
        "synonyms"       : []
    },
    {
        "synonyms"       : [],
        "info_type"      : "DEPENDENT",
        "db_display_name": "MIM morbid",
        "info_text"      : "",
        "description"    : "RAS-ASSOCIATED AUTOIMMUNE LEUKOPROLIFERATIVE DISORDER; RALD;;AUTOIMMUNE LYMPHOPROLIFERATIVE SYNDROME, TYPE IV; ALPS4",
        "dbname"         : "MIM_MORBID",
        "version"        : "0",
        "display_id"     : "RAS-ASSOCIATED AUTOIMMUNE LEUKOPROLIFERATIVE DISORDER; RALD [#614470]",
        "primary_id"     : "614470"
    },
    {
        "primary_id"     : "615278",
        "info_text"      : "",
        "description"    : "CARDIOFACIOCUTANEOUS SYNDROME 2; CFC2",
        "db_display_name": "MIM morbid",
        "dbname"         : "MIM_MORBID",
        "version"        : "0",
        "display_id"     : "CARDIOFACIOCUTANEOUS SYNDROME 2; CFC2 [#615278]",
        "info_type"      : "DEPENDENT",
        "synonyms"       : []
    },
    {
        "info_type"      : "DIRECT",
        "synonyms"       : [],
        "primary_id"     : "R-HSA-1643685",
        "info_text"      : "Generated via gene",
        "db_display_name": "Reactome gene",
        "description"    : "Disease",
        "dbname"         : "Reactome_gene",
        "version"        : "0",
        "display_id"     : "R-HSA-1643685"
    },
    {
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-109582",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Hemostasis",
        "primary_id": "R-HSA-109582",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Innate Immune System",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-168249",
        "primary_id": "R-HSA-168249"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "display_id": "R-HSA-168256",
        "version": "0",
        "dbname": "Reactome_gene",
        "description": "Immune System",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "primary_id": "R-HSA-168256"
    },
    {
        "primary_id": "R-HSA-212436",
        "description": "Generic Transcription Pathway",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-212436",
        "dbname": "Reactome_gene",
        "version": "0",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "primary_id": "R-HSA-73857",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-73857",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "RNA Polymerase II Transcription",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-74160",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Gene expression (Transcription)",
        "display_id": "R-HSA-74160",
        "version": "0",
        "dbname": "Reactome_gene"
    },
    {
        "primary_id": "R-HSA-162582",
        "display_id": "R-HSA-162582",
        "version": "0",
        "dbname": "Reactome_gene",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Signal Transduction",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-1266738",
        "description": "Developmental Biology",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "primary_id": "R-HSA-1266738"
    },
    {
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-9675108",
        "info_text": "Generated via gene",
        "description": "Nervous system development",
        "db_display_name": "Reactome gene",
        "primary_id": "R-HSA-9675108",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-5663202",
        "display_id": "R-HSA-5663202",
        "version": "0",
        "dbname": "Reactome_gene",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Diseases of signal transduction by growth factor receptors and second messengers"
    },
    {
        "primary_id": "R-HSA-1280218",
        "info_text": "Generated via gene",
        "description": "Adaptive Immune System",
        "db_display_name": "Reactome gene",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-1280218",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "info_text": "Generated via gene",
        "description": "Cell surface interactions at the vascular wall",
        "db_display_name": "Reactome gene",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-202733",
        "primary_id": "R-HSA-202733",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "display_id": "R-HSA-195721",
        "dbname": "Reactome_gene",
        "version": "0",
        "description": "Signaling by WNT",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "primary_id": "R-HSA-195721",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-372790",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Signaling by GPCR",
        "primary_id": "R-HSA-372790",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-9006931",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-9006931",
        "description": "Signaling by Nuclear Receptors",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-422475",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-422475",
        "description": "Axon guidance",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene"
    },
    {
        "synonyms"       : [],
        "info_type"      : "DIRECT",
        "info_text"      : "Generated via gene",
        "description"    : "ESR-mediated signaling",
        "db_display_name": "Reactome gene",
        "dbname"         : "Reactome_gene",
        "version"        : "0",
        "display_id"     : "R-HSA-8939211",
        "primary_id"     : "R-HSA-8939211"
    },
    {
        "primary_id"     : "R-HSA-112314",
        "display_id"     : "R-HSA-112314",
        "dbname"         : "Reactome_gene",
        "version"        : "0",
        "db_display_name": "Reactome gene",
        "info_text"      : "Generated via gene",
        "description"    : "Neurotransmitter receptors and postsynaptic signal transmission",
        "info_type"      : "DIRECT",
        "synonyms"       : []
    },
    {
        "description"    : "Transmission across Chemical Synapses",
        "info_text"      : "Generated via gene",
        "db_display_name": "Reactome gene",
        "dbname"         : "Reactome_gene",
        "version"        : "0",
        "display_id"     : "R-HSA-112315",
        "primary_id"     : "R-HSA-112315",
        "synonyms"       : [],
        "info_type"      : "DIRECT"
    },
    {
        "primary_id"     : "R-HSA-112316",
        "db_display_name": "Reactome gene",
        "info_text"      : "Generated via gene",
        "description"    : "Neuronal System",
        "dbname"         : "Reactome_gene",
        "version"        : "0",
        "display_id"     : "R-HSA-112316",
        "info_type"      : "DIRECT",
        "synonyms"       : []
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-388396",
        "description": "GPCR downstream signalling",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "primary_id": "R-HSA-388396"
    },
    {
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Post NMDA receptor activation events",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-438064",
        "primary_id": "R-HSA-438064",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "primary_id": "R-HSA-442755",
        "info_text": "Generated via gene",
        "description": "Activation of NMDA receptors and postsynaptic events",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-442755",
        "dbname": "Reactome_gene",
        "version": "0",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "info_text": "Generated via gene",
        "description": "Beta-catenin independent WNT signaling",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-3858494",
        "dbname": "Reactome_gene",
        "version": "0",
        "primary_id": "R-HSA-3858494",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "description": "Signaling by FGFR in disease",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-1226099",
        "dbname": "Reactome_gene",
        "version": "0",
        "primary_id": "R-HSA-1226099",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "primary_id": "R-HSA-190236",
        "display_id": "R-HSA-190236",
        "version": "0",
        "dbname": "Reactome_gene",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Signaling by FGFR",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "display_id": "R-HSA-5654738",
        "version": "0",
        "dbname": "Reactome_gene",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Signaling by FGFR2",
        "primary_id": "R-HSA-5654738",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Signaling by FGFR2 in disease",
        "display_id": "R-HSA-5655253",
        "version": "0",
        "dbname": "Reactome_gene",
        "primary_id": "R-HSA-5655253"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-9006934",
        "display_id": "R-HSA-9006934",
        "version": "0",
        "dbname": "Reactome_gene",
        "info_text": "Generated via gene",
        "description": "Signaling by Receptor Tyrosine Kinases",
        "db_display_name": "Reactome gene"
    },
    {
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-5621481",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "C-type lectin receptors (CLRs)",
        "primary_id": "R-HSA-5621481",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "info_text": "Generated via gene",
        "description": "CD209 (DC-SIGN) signaling",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-5621575",
        "version": "0",
        "dbname": "Reactome_gene",
        "primary_id": "R-HSA-5621575"
    },
    {
        "primary_id": "R-HSA-8878159",
        "info_text": "Generated via gene",
        "description": "Transcriptional regulation by RUNX3",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-8878159",
        "version": "0",
        "dbname": "Reactome_gene",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Signaling by MET",
        "display_id": "R-HSA-6806834",
        "dbname": "Reactome_gene",
        "version": "0",
        "primary_id": "R-HSA-6806834",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-5673001",
        "info_text": "Generated via gene",
        "description": "RAF/MAP kinase cascade",
        "db_display_name": "Reactome gene",
        "primary_id": "R-HSA-5673001",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "MAP2K and MAPK activation",
        "display_id": "R-HSA-5674135",
        "dbname": "Reactome_gene",
        "version": "0",
        "primary_id": "R-HSA-5674135"
    },
    {
        "primary_id": "R-HSA-5683057",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "MAPK family signaling cascades",
        "display_id": "R-HSA-5683057",
        "version": "0",
        "dbname": "Reactome_gene",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-5684996",
        "info_text": "Generated via gene",
        "description": "MAPK1/MAPK3 signaling",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-5684996",
        "version": "0",
        "dbname": "Reactome_gene"
    },
    {
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-6802946",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Signaling by moderate kinase activity BRAF mutants",
        "primary_id": "R-HSA-6802946",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "primary_id": "R-HSA-6802948",
        "display_id": "R-HSA-6802948",
        "dbname": "Reactome_gene",
        "version": "0",
        "info_text": "Generated via gene",
        "description": "Signaling by high-kinase activity BRAF mutants",
        "db_display_name": "Reactome gene",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "description": "Signaling by RAS mutants",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-6802949",
        "primary_id": "R-HSA-6802949",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-6802952",
        "info_text": "Generated via gene",
        "description": "Signaling by BRAF and RAF fusions",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-6802952",
        "dbname": "Reactome_gene",
        "version": "0"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-6802955",
        "display_id": "R-HSA-6802955",
        "dbname": "Reactome_gene",
        "version": "0",
        "info_text": "Generated via gene",
        "description": "Paradoxical activation of RAF signaling by kinase inactive BRAF",
        "db_display_name": "Reactome gene"
    },
    {
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Oncogenic MAPK signaling",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-6802957",
        "primary_id": "R-HSA-6802957",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-9649948",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Signaling downstream of RAS mutants",
        "primary_id": "R-HSA-9649948",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "description": "Signaling by RAF1 mutants",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-9656223",
        "version": "0",
        "dbname": "Reactome_gene",
        "primary_id": "R-HSA-9656223"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Cytokine Signaling in Immune system",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-1280215",
        "primary_id": "R-HSA-1280215"
    },
    {
        "info_text": "Generated via gene",
        "description": "Signaling by NTRKs",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-166520",
        "dbname": "Reactome_gene",
        "version": "0",
        "primary_id": "R-HSA-166520",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "info_text": "Generated via gene",
        "description": "Signaling by NTRK1 (TRKA)",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-187037",
        "version": "0",
        "dbname": "Reactome_gene",
        "primary_id": "R-HSA-187037"
    },
    {
        "primary_id": "R-HSA-416476",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-416476",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "G alpha (q) signalling events",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "NCAM signaling for neurite out-growth",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-375165",
        "primary_id": "R-HSA-375165"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-167044",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-167044",
        "info_text": "Generated via gene",
        "description": "Signalling to RAS",
        "db_display_name": "Reactome gene"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "description": "p38MAPK events",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-171007",
        "primary_id": "R-HSA-171007"
    },
    {
        "primary_id": "R-HSA-187687",
        "display_id": "R-HSA-187687",
        "version": "0",
        "dbname": "Reactome_gene",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Signalling to ERKs",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Signaling by ERBB2",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-1227986",
        "primary_id": "R-HSA-1227986",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-983705",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-983705",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Signaling by the B Cell Receptor (BCR)"
    },
    {
        "primary_id": "R-HSA-1168372",
        "description": "Downstream signaling events of B Cell Receptor (BCR)",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-1168372",
        "version": "0",
        "dbname": "Reactome_gene",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-2454202",
        "description": "Fc epsilon receptor (FCERI) signaling",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-2454202"
    },
    {
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-5658442",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Regulation of RAS by GAPs",
        "primary_id": "R-HSA-5658442",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "primary_id": "R-HSA-8851805",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "MET activates RAS signaling",
        "display_id": "R-HSA-8851805",
        "version": "0",
        "dbname": "Reactome_gene",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "display_id": "R-HSA-2172127",
        "version": "0",
        "dbname": "Reactome_gene",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "DAP12 interactions",
        "primary_id": "R-HSA-2172127",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "primary_id": "R-HSA-2424491",
        "display_id": "R-HSA-2424491",
        "version": "0",
        "dbname": "Reactome_gene",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "DAP12 signaling",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-1433557",
        "display_id": "R-HSA-1433557",
        "dbname": "Reactome_gene",
        "version": "0",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Signaling by SCF-KIT"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-194138",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-194138",
        "info_text": "Generated via gene",
        "description": "Signaling by VEGF",
        "db_display_name": "Reactome gene"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-4420097",
        "info_text": "Generated via gene",
        "description": "VEGFA-VEGFR2 Pathway",
        "db_display_name": "Reactome gene",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-4420097"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-9006115",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Signaling by NTRK2 (TRKB)",
        "display_id": "R-HSA-9006115",
        "dbname": "Reactome_gene",
        "version": "0"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "info_text": "Generated via gene",
        "description": "FLT3 Signaling",
        "db_display_name": "Reactome gene",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-9607240",
        "primary_id": "R-HSA-9607240"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "description": "Signaling by KIT in disease",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-9669938",
        "primary_id": "R-HSA-9669938"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-9670439",
        "display_id": "R-HSA-9670439",
        "version": "0",
        "dbname": "Reactome_gene",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Signaling by phosphorylated juxtamembrane, extracellular and kinase domain KIT mutants"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "description": "Signaling by FGFR1",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-5654736",
        "primary_id": "R-HSA-5654736"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Negative regulation of MAPK pathway",
        "display_id": "R-HSA-5675221",
        "dbname": "Reactome_gene",
        "version": "0",
        "primary_id": "R-HSA-5675221"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-2404192",
        "display_id": "R-HSA-2404192",
        "dbname": "Reactome_gene",
        "version": "0",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Signaling by Type 1 Insulin-like Growth Factor 1 Receptor (IGF1R)"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-2428924",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "IGF1R signaling cascade",
        "primary_id": "R-HSA-2428924"
    },
    {
        "primary_id": "R-HSA-2428928",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "IRS-related events triggered by IGF1R",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-2428928",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "primary_id": "R-HSA-2428933",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "SHC-related events triggered by IGF1R",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-2428933",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "RUNX3 regulates p14-ARF",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-8951936",
        "primary_id": "R-HSA-8951936",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-1236394",
        "info_text": "Generated via gene",
        "description": "Signaling by ERBB4",
        "db_display_name": "Reactome gene",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-1236394"
    },
    {
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "CREB1 phosphorylation through NMDA receptor-mediated activation of RAS signaling",
        "display_id": "R-HSA-442742",
        "dbname": "Reactome_gene",
        "version": "0",
        "primary_id": "R-HSA-442742",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "primary_id": "R-HSA-442982",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-442982",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Ras activation upon Ca2+ influx through NMDA receptor",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "primary_id": "R-HSA-112399",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-112399",
        "description": "IRS-mediated signalling",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "primary_id": "R-HSA-5655302",
        "info_text": "Generated via gene",
        "description": "Signaling by FGFR1 in disease",
        "db_display_name": "Reactome gene",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-5655302",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "description": "Insulin receptor signalling cascade",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-74751",
        "primary_id": "R-HSA-74751",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-74752",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-74752",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Signaling by Insulin receptor"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "display_id": "R-HSA-9682385",
        "dbname": "Reactome_gene",
        "version": "0",
        "description": "FLT3 signaling in disease",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "primary_id": "R-HSA-9682385"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-9703465",
        "info_text": "Generated via gene",
        "description": "Signaling by FLT3 fusion proteins",
        "db_display_name": "Reactome gene",
        "primary_id": "R-HSA-9703465"
    },
    {
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Signaling by FLT3 ITD and TKD mutants",
        "display_id": "R-HSA-9703648",
        "dbname": "Reactome_gene",
        "version": "0",
        "primary_id": "R-HSA-9703648",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-2871796",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "FCERI mediated MAPK activation",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-2871796"
    },
    {
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-186797",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Signaling by PDGF",
        "primary_id": "R-HSA-186797",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "description": "Downstream signal transduction",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-186763",
        "dbname": "Reactome_gene",
        "version": "0",
        "primary_id": "R-HSA-186763"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-8848021",
        "display_id": "R-HSA-8848021",
        "version": "0",
        "dbname": "Reactome_gene",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Signaling by PTK6"
    },
    {
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "PTK6 Regulates RHO GTPases, RAS GTPase and MAP kinases",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-8849471",
        "primary_id": "R-HSA-8849471",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-9006927",
        "info_text": "Generated via gene",
        "description": "Signaling by Non-Receptor Tyrosine Kinases",
        "db_display_name": "Reactome gene",
        "primary_id": "R-HSA-9006927",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "info_text": "Generated via gene",
        "description": "Tie2 Signaling",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-210993",
        "dbname": "Reactome_gene",
        "version": "0",
        "primary_id": "R-HSA-210993",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-9006335",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-9006335",
        "description": "Signaling by Erythropoietin",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene"
    },
    {
        "primary_id": "R-HSA-9671555",
        "info_text": "Generated via gene",
        "description": "Signaling by PDGFR in disease",
        "db_display_name": "Reactome gene",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-9671555",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-9673767",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-9673767",
        "info_text": "Generated via gene",
        "description": "Signaling by PDGFRA transmembrane, juxtamembrane and kinase domain mutants",
        "db_display_name": "Reactome gene"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-9673770",
        "info_text": "Generated via gene",
        "description": "Signaling by PDGFRA extracellular domain mutants",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-9673770",
        "version": "0",
        "dbname": "Reactome_gene"
    },
    {
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-5673000",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "RAF activation",
        "primary_id": "R-HSA-5673000",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-177929",
        "info_text": "Generated via gene",
        "description": "Signaling by EGFR",
        "db_display_name": "Reactome gene",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-177929"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "display_id": "R-HSA-9009391",
        "version": "0",
        "dbname": "Reactome_gene",
        "info_text": "Generated via gene",
        "description": "Extra-nuclear estrogen signaling",
        "db_display_name": "Reactome gene",
        "primary_id": "R-HSA-9009391"
    },
    {
        "info_text": "Generated via gene",
        "description": "Signaling by ERBB2 in Cancer",
        "db_display_name": "Reactome gene",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-1227990",
        "primary_id": "R-HSA-1227990",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "description": "SHC1 events in ERBB2 signaling",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-1250196",
        "dbname": "Reactome_gene",
        "version": "0",
        "primary_id": "R-HSA-1250196"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-9664565",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-9664565",
        "info_text": "Generated via gene",
        "description": "Signaling by ERBB2 KD Mutants",
        "db_display_name": "Reactome gene"
    },
    {
        "primary_id": "R-HSA-9665686",
        "display_id": "R-HSA-9665686",
        "version": "0",
        "dbname": "Reactome_gene",
        "description": "Signaling by ERBB2 TMD/JMD mutants",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "RAS processing",
        "display_id": "R-HSA-9648002",
        "version": "0",
        "dbname": "Reactome_gene",
        "primary_id": "R-HSA-9648002"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-5654696",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Downstream signaling of activated FGFR2",
        "primary_id": "R-HSA-5654696"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "description": "SHC-mediated cascade:FGFR2",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-5654699",
        "dbname": "Reactome_gene",
        "version": "0",
        "primary_id": "R-HSA-5654699"
    },
    {
        "primary_id": "R-HSA-5654700",
        "info_text": "Generated via gene",
        "description": "FRS-mediated FGFR2 signaling",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-5654700",
        "dbname": "Reactome_gene",
        "version": "0",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "VEGFR2 mediated cell proliferation",
        "display_id": "R-HSA-5218921",
        "version": "0",
        "dbname": "Reactome_gene",
        "primary_id": "R-HSA-5218921",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "primary_id": "R-HSA-9634635",
        "display_id": "R-HSA-9634635",
        "version": "0",
        "dbname": "Reactome_gene",
        "description": "Estrogen-stimulated signaling through PRKCZ",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-5654704",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "SHC-mediated cascade:FGFR3",
        "primary_id": "R-HSA-5654704",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-5654706",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "FRS-mediated FGFR3 signaling",
        "primary_id": "R-HSA-5654706"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-5654708",
        "display_id": "R-HSA-5654708",
        "version": "0",
        "dbname": "Reactome_gene",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Downstream signaling of activated FGFR3"
    },
    {
        "description": "Signaling by FGFR3",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-5654741",
        "primary_id": "R-HSA-5654741",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-5655332",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Signaling by FGFR3 in disease",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-5655332"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-8853334",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Signaling by FGFR3 fusions in cancer",
        "display_id": "R-HSA-8853334",
        "dbname": "Reactome_gene",
        "version": "0"
    },
    {
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-8853338",
        "description": "Signaling by FGFR3 point mutants in cancer",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "primary_id": "R-HSA-8853338",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "primary_id": "R-HSA-4086398",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-4086398",
        "info_text": "Generated via gene",
        "description": "Ca2+ pathway",
        "db_display_name": "Reactome gene",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-5654687",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-5654687",
        "info_text": "Generated via gene",
        "description": "Downstream signaling of activated FGFR1",
        "db_display_name": "Reactome gene"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-5654688",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-5654688",
        "info_text": "Generated via gene",
        "description": "SHC-mediated cascade:FGFR1",
        "db_display_name": "Reactome gene"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-5654693",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "FRS-mediated FGFR1 signaling",
        "primary_id": "R-HSA-5654693"
    },
    {
        "primary_id": "R-HSA-881907",
        "display_id": "R-HSA-881907",
        "version": "0",
        "dbname": "Reactome_gene",
        "info_text": "Generated via gene",
        "description": "Gastrin-CREB signalling pathway via PKC and MAPK",
        "db_display_name": "Reactome gene",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "primary_id": "R-HSA-5654712",
        "description": "FRS-mediated FGFR4 signaling",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-5654712",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-5654716",
        "info_text": "Generated via gene",
        "description": "Downstream signaling of activated FGFR4",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-5654716",
        "version": "0",
        "dbname": "Reactome_gene"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "description": "SHC-mediated cascade:FGFR4",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-5654719",
        "primary_id": "R-HSA-5654719"
    },
    {
        "primary_id": "R-HSA-5654743",
        "description": "Signaling by FGFR4",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-5654743",
        "dbname": "Reactome_gene",
        "version": "0",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-1236382",
        "display_id": "R-HSA-1236382",
        "version": "0",
        "dbname": "Reactome_gene",
        "description": "Constitutive Signaling by Ligand-Responsive EGFR Cancer Variants",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene"
    },
    {
        "primary_id": "R-HSA-1643713",
        "info_text": "Generated via gene",
        "description": "Signaling by EGFR in Cancer",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-1643713",
        "dbname": "Reactome_gene",
        "version": "0",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "primary_id": "R-HSA-5637810",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-5637810",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Constitutive Signaling by EGFRvIII",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "primary_id": "R-HSA-5637812",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Signaling by EGFRvIII in Cancer",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-5637812",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "info_text": "Generated via gene",
        "description": "Signaling by Ligand-Responsive EGFR Variants in Cancer",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-5637815",
        "dbname": "Reactome_gene",
        "version": "0",
        "primary_id": "R-HSA-5637815",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "info_text": "Generated via gene",
        "description": "Constitutive Signaling by Overexpressed ERBB2",
        "db_display_name": "Reactome gene",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-9634285",
        "primary_id": "R-HSA-9634285"
    },
    {
        "primary_id": "R-HSA-9665348",
        "display_id": "R-HSA-9665348",
        "version": "0",
        "dbname": "Reactome_gene",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Signaling by ERBB2 ECD mutants",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Signaling by NTRK3 (TRKC)",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-9034015",
        "primary_id": "R-HSA-9034015",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-9027284",
        "description": "Erythropoietin activates RAS",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-9027284"
    },
    {
        "primary_id": "R-HSA-179812",
        "display_id": "R-HSA-179812",
        "dbname": "Reactome_gene",
        "version": "0",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "GRB2 events in EGFR signaling",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-180336",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "SHC1 events in EGFR signaling",
        "primary_id": "R-HSA-180336"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-5655291",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-5655291",
        "info_text": "Generated via gene",
        "description": "Signaling by FGFR4 in disease",
        "db_display_name": "Reactome gene"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-1250347",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "SHC1 events in ERBB4 signaling",
        "display_id": "R-HSA-1250347",
        "version": "0",
        "dbname": "Reactome_gene"
    },
    {
        "synonyms": [],
        "info_type": "DIRECT",
        "info_text": "Generated via gene",
        "description": "GRB2 events in ERBB2 signaling",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-1963640",
        "dbname": "Reactome_gene",
        "version": "0",
        "primary_id": "R-HSA-1963640"
    },
    {
        "primary_id": "R-HSA-2179392",
        "display_id": "R-HSA-2179392",
        "version": "0",
        "dbname": "Reactome_gene",
        "info_text": "Generated via gene",
        "description": "EGFR Transactivation by Gastrin",
        "db_display_name": "Reactome gene",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "SOS-mediated signalling",
        "dbname": "Reactome_gene",
        "version": "0",
        "display_id": "R-HSA-112412",
        "primary_id": "R-HSA-112412",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "display_id": "R-HSA-9026519",
        "version": "0",
        "dbname": "Reactome_gene",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "Activated NTRK2 signals through RAS",
        "primary_id": "R-HSA-9026519",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "display_id": "R-HSA-9028731",
        "dbname": "Reactome_gene",
        "version": "0",
        "info_text": "Generated via gene",
        "description": "Activated NTRK2 signals through FRS2 and FRS3",
        "db_display_name": "Reactome gene",
        "primary_id": "R-HSA-9028731",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "info_text": "Generated via gene",
        "description": "Activated NTRK3 signals through RAS",
        "db_display_name": "Reactome gene",
        "display_id": "R-HSA-9034864",
        "dbname": "Reactome_gene",
        "version": "0",
        "primary_id": "R-HSA-9034864",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "info_type": "DIRECT",
        "synonyms": [],
        "primary_id": "R-HSA-1169092",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "description": "Activation of RAS in B cells",
        "display_id": "R-HSA-1169092",
        "version": "0",
        "dbname": "Reactome_gene"
    },
    {
        "display_id": "R-HSA-6802953",
        "dbname": "Reactome_gene",
        "version": "0",
        "description": "RAS signaling downstream of NF1 loss-of-function variants",
        "info_text": "Generated via gene",
        "db_display_name": "Reactome gene",
        "primary_id": "R-HSA-6802953",
        "synonyms": [],
        "info_type": "DIRECT"
    },
    {
        "primary_id": "R-HSA-9649913",
        "db_display_name": "Reactome gene",
        "info_text": "Generated via gene",
        "description": "RAS GTPase cycle mutants",
        "version": "0",
        "dbname": "Reactome_gene",
        "display_id": "R-HSA-9649913",
        "info_type": "DIRECT",
        "synonyms": []
    },
    {
        "dbname": "Uniprot_gn",
        "version": "0",
        "display_id": "KRAS",
        "info_text": "",
        "description": null,
        "db_display_name": "UniProtKB Gene Name",
        "primary_id": "P01116",
        "synonyms": [],
        "info_type": "DEPENDENT"
    },
    {
        "primary_id": "L7RSL8",
        "db_display_name": "UniProtKB Gene Name",
        "info_text": "",
        "description": null,
        "dbname": "Uniprot_gn",
        "version": "0",
        "display_id": "KRAS",
        "info_type": "DEPENDENT",
        "synonyms": []
    },
    {
        "primary_id": "A0A024RAV5",
        "dbname": "Uniprot_gn",
        "version": "0",
        "display_id": "KRAS",
        "db_display_name": "UniProtKB Gene Name",
        "info_text": "",
        "description": null,
        "info_type": "DEPENDENT",
        "synonyms": []
    },
    {
        "primary_id": "G3V4K2",
        "version": "0",
        "dbname": "Uniprot_gn",
        "display_id": "KRAS",
        "db_display_name": "UniProtKB Gene Name",
        "info_text": "",
        "description": null,
        "info_type": "DEPENDENT",
        "synonyms": []
    },
    {
        "info_type": "DEPENDENT",
        "synonyms": [],
        "primary_id": "G3V5T7",
        "info_text": "",
        "db_display_name": "UniProtKB Gene Name",
        "description": null,
        "display_id": "KRAS",
        "version": "0",
        "dbname": "Uniprot_gn"
    },
    {
        "primary_id": "3845",
        "description": "KRAS proto-oncogene, GTPase",
        "info_text": "",
        "db_display_name": "WikiGene",
        "dbname": "WikiGene",
        "version": "0",
        "display_id": "KRAS",
        "info_type": "DEPENDENT",
        "synonyms": []
    }
]

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