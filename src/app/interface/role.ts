import {TEAM_PROPOSITION, TEAM_OPPOSITION, 
        TEAM_GOV, TEAM_OPP, TEAM_OG, TEAM_OO, TEAM_CG, TEAM_CO} from './team';


export enum NA_ROLE_SHORT_ENUM{
    PM = 1,
    LO,
    MG,
    MO,
    LOR,
    PMR
}
export const NA_ROLE_ARRAY = [
    {name:"PM" ,side:"LEFT" },
    {name:"LO" ,side:"RIGHT" },
    {name:"MG" ,side:"LEFT" },
    {name:"MO" ,side:"RIGHT" },
    {name:"LOR" ,side:"RIGHT" },
    {name:"PMR" ,side:"LEFT" }
]


export enum NA_ROLE_LONG_ENUM{
    PrimeMinister = 1,
    LeaderOpposition,
    MemberGovernment,
    MemberOpposition,
    LeaderOppositionReply,
    PrimeMinisterReply
}

export const ROLE_TEAM_MAPPING_NA={
    PM: TEAM_GOV,
    LO: TEAM_OPP,
    MG: TEAM_GOV,
    MO: TEAM_OPP,
    PMR: TEAM_GOV,
    LOR: TEAM_OPP
}




export enum Asian_ROLE_SHORT_ENUM{
    PM = 1,
    LO,
    DPM,
    DLO,
    WG,
    WO,
    PMR,
    LOR
}

export const Asian_ROLE_ARRAY = [
    {name:"PM" ,side:"LEFT" },
    {name:"LO" ,side:"RIGHT" },
    {name:"DPM" ,side:"LEFT" },
    {name:"DLO" ,side:"RIGHT" },
    {name:"WG" ,side:"RIGHT" },
    {name:"WO" ,side:"LEFT" },
    {name:"PMR" ,side:"RIGHT" },
    {name:"LOR" ,side:"LEFT" }
]



export enum Asian_ROLE_LONG_ENUM{
    PrimeMinister = 1,
    LeaderOpposition,
    DeptyPrimeMinister,
    DeptyLeaderOpposition,
    WhipGovernment,
    WhiipOpposition,
    PrimeMinisterReply,
    LeaderOppositionReply
}

export const ROLE_TEAM_MAPPING_Asian={
    PM : TEAM_PROPOSITION,
    LO : TEAM_OPPOSITION,
    DPM : TEAM_PROPOSITION,
    DLO : TEAM_OPPOSITION,
    WG : TEAM_PROPOSITION,
    WO : TEAM_OPPOSITION,
    PMR : TEAM_PROPOSITION,
    LOR : TEAM_OPPOSITION
}


export enum BP_ROLE_SHORT_ENUM{
    PM = 1,
    LO,
    DPM,
    DLO,
    MG,
    MO,
    GW,
    OW
}


export const BP_ROLE_ARRAY = [
    {name:"PM" ,side:"LEFT" },
    {name:"LO" ,side:"RIGHT" },
    {name:"DPM" ,side:"LEFT" },
    {name:"DLO" ,side:"RIGHT" },
    {name:"MG" ,side:"RIGHT" },
    {name:"MO" ,side:"LEFT" },
    {name:"GW" ,side:"RIGHT" },
    {name:"OW" ,side:"LEFT" }
]

export enum BP_ROLE_LONG_ENUM{
    PrimeMinister = 1,
    LeaderOpposition,
    DeptyPrimeMinister,
    DeptyLeaderOpposition,
    MemberGovernment,
    MemberOpposition,
    GovernmentWhip,
    OppositionWhip
}




export const ROLE_TEAM_MAPPING_BP={
    PM : TEAM_OG,
    LO : TEAM_OO,
    DPM : TEAM_OG,
    DLO : TEAM_OO,
    MG : TEAM_CG,
    MO : TEAM_CO,
    GW : TEAM_CG,
    OW : TEAM_CO
}


export const ROLE_SIDE_MAPPING={
    PM: "LEFT",
    LO: "RIGHT",
    MG: "LEFT",
    MO: "RIGHT",
    DPM: "LEFT",
    DLO: "RIGHT",
    WG: "LEFT",
    WO: "RIGHT",
    PMR: "LEFT",
    LOR: "RIGHT",
    GW: "LEFT",
    OW: "RIGHT"
}


