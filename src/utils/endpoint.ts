export const BASE_URL ='http://localhost:4002'
export const API_URL = {
    TEAM : {
        GETALL : '/team/all',
        BANNER : '/team/logo/preview',
        GETONE : '/team'
    },
    MATCHES : {
        MATCHES:'/match/getall?page=',
        ONE_MATCH:'/match/',
        ADMIN_MATCHES:'/match/all',
        MYMATCHES : '/match/get_all_match_of_a_team',
        MYHOMEMATCHES : '/match/getallhomematchofteam',
        EDIT_MATCH:'/match/update/'
    },
    PLAYER : {
        GETALL: '/players/all?page=',
        GETONE: '/players/',
        TOPPLAYER:'/players/top10',
        ORANGECAP:'/players/orange_cap',
        PURPULCAP:'/players/purplecap',
        UPDATE_PLAYER:'/players/update/'
    },
    POINTS_TABLE:{
        GETALL:'/points/all',
        UPDATE_POINTS_TABLE:'/points/'
    }
}

