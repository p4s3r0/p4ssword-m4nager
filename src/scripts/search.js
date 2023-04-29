import { DBL_getFolders, DBL_updatePasswords } from "@/dexie"



export async function rankFoldersBySearch(search) {
    const folders = await DBL_getFolders()
    if (search == "") {
        return rankFolderAlphabetically(folders);
    }
    let ranking = []

    for (let f = 0; f < folders.length; f++) {
        let curr_score = 0;
        let curr_score_index = 0;
        for (let w = 0; w < folders[f].folder.length && curr_score_index < search.length; w++) {
            if (folders[f].folder[w].toLowerCase() == search[curr_score_index].toLowerCase()) {
                curr_score_index += 1;
                curr_score += 1;
            }
        }
        //create object
        ranking.push({
            score: curr_score,
            data: folders[f]
        });
    }

    ranking.sort((a,b) => b.score - a.score); 
    for (let i = 0; i < ranking.length; i++) {
        ranking[i] = ranking[i].data;
    }
    return ranking;    
}



export async function rankPasswordsBySearch(search) {
    const passwords = await DBL_updatePasswords(null)
    if (search == "") {
        return rankPasswordsAlphabetically(passwords);
    }

    let ranking = []

    for (let p = 0; p < passwords.length; p++) {
        let curr_score = 0;
        let curr_score_index = 0;
        for (let w = 0; w < passwords[p].name.length && curr_score_index < search.length; w++) {
            if (passwords[p].name[w].toLowerCase() == search[curr_score_index].toLowerCase()) {
                curr_score_index += 1;
                curr_score += 1;
            }
        }
        //create object
        const el = {
            score: curr_score,
            data: passwords[p]
        }
        ranking.push(el)
    }

    ranking.sort((a,b) => b.score - a.score); 
    for (let i = 0; i < ranking.length; i++) {
        ranking[i] = ranking[i].data;
    }

    return ranking;  
}



export function rankPasswordsAlphabetically(passwords) {
    let ranking = []

    for (let p = 0; p < passwords.length; p++) {
        if (passwords[p].name.length == 0) {
            ranking.push({
                score: 0,
                data: passwords[p]
            })
            continue;
        }

        ranking.push({
            score: passwords[p].name.charCodeAt(0),
            data: passwords[p]
        })
    }
    ranking.sort((a,b) => a.score - b.score); 
    for (let i = 0; i < ranking.length; i++) {
        ranking[i] = ranking[i].data;
    }
    return ranking;
}




export function rankFolderAlphabetically(folders) {
    let ranking = []

    for (let f = 0; f < folders.length; f++) {
        if (folders[f].folder.length == 0) {
            ranking.push({
                score: 0,
                data: folders[f]
            })
            continue;
        }
        const first_letter = folders[f].folder[0].toLowerCase()

        ranking.push({
            score: first_letter.charCodeAt(0),
            data: folders[f]
        })
    }
    ranking.sort((a,b) => a.score - b.score); 
    for (let i = 0; i < ranking.length; i++) {
        ranking[i] = ranking[i].data;
    }
    return ranking;
}
