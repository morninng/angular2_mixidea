

export const TEAM_PROPOSITION = "proposition";
export const TEAM_OPPOSITION = "opposition";
export const TEAM_GOV = "gov";
export const TEAM_OPP = "opp";
export const TEAM_OG = "OG";
export const TEAM_OO = "OO";
export const TEAM_CG = "CG";
export const TEAM_CO = "CO";

export const TEAM_STYLE_MAPPING={
    NA: [TEAM_GOV, TEAM_OPP],
    ASIAN: [TEAM_PROPOSITION, TEAM_OPPOSITION],
    BP: [TEAM_OG, TEAM_OO, TEAM_CG, TEAM_CO]
}

export const TEAM_SIDE_MAPPING={
    proposition: "LEFT",
    opposition: "RIGHT",
    gov: "LEFT",
    opp: "RIGHT",
    OG: "LEFT",
    OO: "RIGHT",
    CG: "LEFT",
    CO: "RIGHT"
}