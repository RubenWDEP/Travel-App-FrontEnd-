
export async function registerOperation({ email, password }) {
    const response = await fetch(`${process.env.REACT_APP_API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const apiRes = await response.json()

    if (response.ok) {
        return response.ok;
    } else {
        throw new Error(apiRes.message)
    }
}

export async function loginOperation({ email, password }) {
    const response = await fetch(`${process.env.REACT_APP_API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const apiRes = await response.json()
    apiRes.res = response.ok;

    if (response.ok) {
        return apiRes;
    } else {
        throw new Error(apiRes.message);
    }
}

export async function verifyUserOperation(token) {
    const response = await fetch(`${process.env.REACT_APP_API}/login/onlineuser`, {
        headers: { Authorization: token },
    });

    const apiRes = await response.json();
    apiRes.res = response.ok;

    if (response.ok) {
        return apiRes
    } else {
        throw new Error(apiRes.message)
    }
}

export async function sendNewRecommentdation(newRecommendation, token) {
    const response = await fetch(`${process.env.REACT_APP_API}/publish`, {
        method: 'POST',
        body: newRecommendation,
        headers: { Authorization: token },
    });

    const apiRes = await response.json();
    apiRes.res = response.ok;

    if (response.ok) {
        return apiRes
    } else {
        throw new Error(apiRes.message)
    }
}

export async function rateRecommendation(idRec, userId, ratingValue, token) {
    const response = await fetch(`${process.env.REACT_APP_API}/raterecommendation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ id_rec: idRec, userId, rateValue: ratingValue }),
    });

    const apiRes = await response.json();
    apiRes.res = response.ok;

    if (response.ok) {
        return apiRes
    } else {
        throw new Error(apiRes.message)
    }
}

export async function searchRecommendation(id_rec) {
    const response = await fetch(`${process.env.REACT_APP_API}/searchrecommendation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_rec }),
    });

    const apiRes = response.json();
    apiRes.res = response.ok;

    if (response.ok) {
        return apiRes
    } else {
        throw new Error(apiRes.message)
    }
}

export async function getUserRating(token) {

    const response = await fetch(`${process.env.REACT_APP_API}/getuserrating`, {
        headers: { Authorization: token },
    });

    const apiRes = await response.json();
    apiRes.res = response.ok;

    if (response.ok) {
        return apiRes
    } else {
        throw new Error(apiRes.message)
    }

}

export async function getPostsFromCurrentUser(token, id_user_reg) {
    const query = new URLSearchParams({ id_user_reg }).toString()
    const response = await fetch(`${process.env.REACT_APP_API}/getposts?${query}`, {
        headers: { Authorization: token },
    });

    const apiRes = await response.json();
    apiRes.res = response.ok;

    if (response.ok) {
        return apiRes
    } else {
        throw new Error(apiRes.message)
    }
}

export async function deletepost(token, eventTargetValue) {
    const response = await fetch(`${process.env.REACT_APP_API}/deletepost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ id_rec: eventTargetValue }),
    })
    const apiRes = await response.json();
    apiRes.res = response.ok;

    if (response.ok) {
        return apiRes
    } else {
        throw new Error(apiRes.message)
    }
}
export async function countVotes(idArrayGlobalVotes) {
    const response = await fetch(`${process.env.REACT_APP_API}/gettotalvotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ arrayId: idArrayGlobalVotes }),
    })
    const apiRes = await response.json();
    apiRes.res = response.ok;

    if (response.ok) {
        return apiRes
    } else {
        throw new Error(apiRes.message)
    }
}


export function deMayorAMenorId(postA, postB) {
    return postB.id_rec - postA.id_rec
}
export function deMayorAMenor(postA, postB) {
    return postB.WeightedAverage - postA.WeightedAverage
}

export function deMenorAMayor(postA, postB) {
    return postA.WeightedAverage - postB.WeightedAverage
}

export async function preSearch(token, clue) {
    const response = await fetch(`${process.env.REACT_APP_API}/presearch?firstLetters=${clue}`, {
        headers: { Authorization: token },
    });

    const apiRes = await response.json();
    apiRes.res = response.ok;

    if (response.ok) {
        return apiRes
    } else {
        throw new Error(apiRes.message)
    }

}

export async function getUserComments(id_rec) {
    const response = await fetch(`${process.env.REACT_APP_API}/comments/load?id_rec=${id_rec}`);
    const apiRes = await response.json();
    apiRes.res = response.ok;

    if (response.ok) {
        return apiRes
    } else {
        throw new Error(apiRes.message)
    }

}

export async function sendUserComment(token, id, userComment, createBy) {
    const response = await fetch(`${process.env.REACT_APP_API}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ id, userComment, createBy }),
    });
    const apiRes = await response.json();
    apiRes.res = response.ok;

    if (response.ok) {
        return apiRes
    } else {
        throw new Error(apiRes.message)
    }
}
