import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './deb_style';

export const TEAM_PROPOSITION = "proposition";
export const TEAM_OPPOSITION = "opposition";
export const TEAM_GOV = "gov";
export const TEAM_OPP = "opp";
export const TEAM_OG = "OG";
export const TEAM_OO = "OO";
export const TEAM_CG = "CG";
export const TEAM_CO = "CO";

export const TEAM_STYLE_MAPPING={
    STYLE_NA: [TEAM_GOV, TEAM_OPP],
    STYLE_ASIAN: [TEAM_PROPOSITION, TEAM_OPPOSITION],
    STYLE_BP: [TEAM_OG, TEAM_OO, TEAM_CG, TEAM_CO]
}