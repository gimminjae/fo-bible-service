const findBibleType1 = async (searchData) => {
    try {
        const result = await axios.get(`/api/bibleverse/input?bookName=${searchData.value.bookName}&chapter=${searchData.value.chapter}&verse=${bibleSearchInfo.value.verse}`)
        return result.data
        router.replace({ hash: `#verse_${bibleSearchInfo.value.verse-1}` });
        if(bibleInfos.value.length <= 0) {
            
        }
    } catch(error) {
        console.log(error)
    }
}
const findBibleType2 = async (searchData) => {
    try {
        const result = await axios.get(`/api/bibleverse/select?book=${searchData.value.book}&chapter=${searchData.value.chapter}&verse=${bibleSearchInfo.value.verse}`)
        bibleInfos.value = result.data
        router.replace({ hash: `#verse_${bibleSearchInfo.value.verse-1}` });
        if(bibleInfos.value.length <= 0) {
            
        }
    } catch(error) {
        console.log(error)
    }
}
const findBibleType3 = async (searchData) => {
    try {
        const result = await axios.get(`/api/bibleverse/inputString?bibleSearchString=${bibleSearchString.value}`)
        bibleInfos.value = result.data
        let searchParams = bibleSearchString.value.split(' ')
        if(searchParams.length > 2) {
            router.replace({ hash: `#verse_${bibleSearchString.value.split(' ')[2]-1}` });
        }
        if(bibleInfos.value.length <= 0) {
            
        }
    } catch(error) {
        console.log(error)
    }
}
const findBible = (formType, searchData) => {
    if(formType === 'input') {
        findBibleType1(searchData)
    } else if (formType === 'select') {
        findBibleType2(searchData)
    } else if (formType === 'inputString') {
        findBibleType3(searchData)
    }
}

export default bibleService