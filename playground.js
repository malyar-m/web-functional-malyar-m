var pattern = /^<speak>.*?<s>([\w ,.]*)?<\/s><\/speak>/g
var pattern = /.*?<s>([\w ,.]*)?<\/s>/g

// var str = "<speak><s>This is a sentence.</s></speak>"
// console.log(str.match(pattern));

// var str = "<speak><s>This is a sentence.</s><s>This is another sentence</s></speak>"
// console.log(str.match(pattern));

// var str = "<speak><s>This is a sentence.</s><s>This is another sentence</s>Some more text</speak>"
// console.log(str.match(pattern));

// var str = "<speak><s>This is a sentence.</s><s>This is another sentence</s><s>Some more text</s><s>This is a longer piece of content</s></speak>"
// console.log(str.match(pattern));

// var str = "<speak><s>This is a sentence.</s><s>This is another sentence</s>Some more text<s>This is a longer piece of content</s></speak>"
// console.log(str.match(pattern));

var str = "<speak><p><s>Nulla facilisi</s><s>Aenean sed nisl quis nisl euismod commodo</s><s>Vestibulum nec varius sapien, eget tristique lectus</s><s>Curabitur et nulla lectus</s><s>Aenean ut viverra mauris, ut ullamcorper elit</s><s>Ut at dapibus risus, ut imperdiet mi</s><s>Suspendisse potenti</s><s>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos</s><s>Sed id nibh lacinia, vulputate lacus eu, lobortis nisi</s><s>Phasellus porttitor semper nunc</s><s>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas</s><s>Phasellus et odio nec dolor convallis malesuada nec a ante</s><s>Mauris arcu diam, vehicula quis tempus eu, feugiat in augue</s><s>Mauris rutrum fermentum ex non cursus.</s></p><speak>"
const sentences = []
for(const match of str.matchAll(pattern)) {
    sentences.push(match[1])
}

// console.log(sentences);

const boundaries = new Object();
var end = 0;
for (const [i, sentence] of sentences.entries()) {
    const len = sentence.length;
    const start = end;
    end += len;
    boundaries[i] = [ start, end, len ]
}

const getSentenceIdx = (charIndex, boundaries) => {
    for (const [key, value] of Object.entries(boundaries)) {
        if (value[0] < charIndex && value[1] > charIndex)
            return key;
    }
    return false;
}

console.log(getSentenceIdx(12, boundaries));

// boundaries.start > start && boundaries.end < start

console.log(boundaries);
console.log(boundaries);

