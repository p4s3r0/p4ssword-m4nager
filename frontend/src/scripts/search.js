export async function rankFoldersBySearch(folders, search) {
    if (search === "") {
        return rankFolderAlphabetically(folders);
    }
    let ranking = [];

    for (let f = 0; f < folders.length; f++) {
        let curr_score = 0;
        let curr_score_index = 0;
        for (let w = 0; w < folders[f].folder.length && curr_score_index < search.length; w++) {
            if (folders[f].folder[w].toLowerCase() === search[curr_score_index].toLowerCase()) {
                curr_score_index += 1;
                curr_score += 1;
            }
        }
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



export async function rankPasswordsBySearch(passwords, search) {
    if (search === "") {
        return rankPasswordsAlphabetically(passwords);
    }

    let ranking = [];

    for (let p = 0; p < passwords.length; p++) {
        let curr_score = 0;
        let curr_score_index = 0;
        for (let w = 0; w < passwords[p].name.length && curr_score_index < search.length; w++) {
            if (passwords[p].name[w].toLowerCase() === search[curr_score_index].toLowerCase()) {
                curr_score_index += 1;
                curr_score += 1;
            }
        }
        //create object
        const el = {
            score: curr_score,
            data: passwords[p]
        };
        ranking.push(el);
    }

    ranking.sort((a,b) => b.score - a.score); 
    let ret = [];
    for (let i = 0; i < ranking.length; i++) {
        ret.push(ranking[i].data);
        ret[i]["id"] = ranking[i].data.idx;
    }

    return ret;  
}



export function rankPasswordsAlphabetically(passwords) {
    return [...passwords].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
}




export function rankFolderAlphabetically(folders) {
    return [...folders].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
}
