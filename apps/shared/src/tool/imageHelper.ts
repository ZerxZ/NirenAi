import extract from 'png-chunks-extract'
import PNGtext from 'png-chunk-text'
import encodeChunks from 'png-chunks-encode'
type PngChunk = {   
    keyword: string; 
    text: string; 
}
function findChuck(chucks: PngChunk[],keywords: string[]) {
    for (const keyword of keywords) {
        const chunk = chucks.find((chunk) => chunk.keyword === keyword)
        if (chunk) {
            return chunk
        }
    }
    return undefined
}

export function readImage(image:Uint8Array) {
    const chunks = extract(image)
    const textChunks = chunks
    .filter((chunk) => chunk.name === "tEXt")
    .map((chunk) => {
        const text = PNGtext.decode(chunk.data)
        text.keyword = text.keyword.toLowerCase()
        return text
    })
    if (textChunks.length === 0) {
        return undefined;
    }
    const keywords = ["ccv3","chara"]
    const chunk = findChuck(textChunks,keywords)
    if (chunk) {
        return chunk
    }
    return undefined;
}
