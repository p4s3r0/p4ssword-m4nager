export async function rankFoldersBySearch(folders, search) {
    if (!search || search.trim() === "") {
        return rankFolderAlphabetically(folders);
    }

    const query = search.toLowerCase();
    const ranking = folders.map(folder => {
        let score = 0;
        const name = (folder.name || "").toLowerCase();

        if (name === query) {
            score = 100;
        } else if (name.startsWith(query)) {
            score = 80;
        } else if (name.includes(query)) {
            score = 60;
        } else {
            // Fuzzy match score: count how many characters of query appear in name in order
            let queryIdx = 0;
            for (let i = 0; i < name.length && queryIdx < query.length; i++) {
                if (name[i] === query[queryIdx]) {
                    queryIdx++;
                    score++;
                }
            }
        }

        return { score, data: folder };
    });

    return ranking
        .sort((a, b) => b.score - a.score || a.data.name.localeCompare(b.data.name))
        .map(item => item.data);
}

export async function rankPasswordsBySearch(passwords, search) {
    if (!search || search.trim() === "") {
        return rankPasswordsAlphabetically(passwords);
    }

    const query = search.toLowerCase();
    const ranking = passwords.map(password => {
        let score = 0;
        const name = (password.name || "").toLowerCase();
        const username = (password.username || "").toLowerCase();
        const url = (password.url || "").toLowerCase();

        if (name === query) {
            score = 100;
        } else if (name.startsWith(query)) {
            score = 80;
        } else if (name.includes(query)) {
            score = 60;
        } else if (username.includes(query) || url.includes(query)) {
            score = 40;
        } else {
            let queryIdx = 0;
            for (let i = 0; i < name.length && queryIdx < query.length; i++) {
                if (name[i] === query[queryIdx]) {
                    queryIdx++;
                    score++;
                }
            }
        }

        return { score, data: password };
    });

    return ranking
        .sort((a, b) => b.score - a.score || a.data.name.localeCompare(b.data.name))
        .map(item => item.data);
}

export function rankPasswordsAlphabetically(passwords) {
    return [...passwords].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
}

export async function rankTfasBySearch(tfas, search) {
    if (!search || search.trim() === "") {
        return rankTfasAlphabetically(tfas);
    }

    const query = search.toLowerCase();
    const ranking = tfas.map(tfa => {
        let score = 0;
        const name = (tfa.name || "").toLowerCase();

        if (name === query) {
            score = 100;
        } else if (name.startsWith(query)) {
            score = 80;
        } else if (name.includes(query)) {
            score = 60;
        } else {
            let queryIdx = 0;
            for (let i = 0; i < name.length && queryIdx < query.length; i++) {
                if (name[i] === query[queryIdx]) {
                    queryIdx++;
                    score++;
                }
            }
        }

        return { score, data: tfa };
    });

    return ranking
        .sort((a, b) => b.score - a.score || a.data.name.localeCompare(b.data.name))
        .map(item => item.data);
}

export function rankTfasAlphabetically(tfas) {
    return [...tfas].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
}

export function rankFolderAlphabetically(folders) {
    return [...folders].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
}
