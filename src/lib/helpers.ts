export const getPartialName = (name:string) => {
    const partialName = name.split('_').pop();
    return partialName.charAt(0).toLowerCase() + partialName.slice(1);
};

export const removeEndpoint = (url:string) => {
    const urlParts = url.split('/');
    urlParts.pop();
    return urlParts.join('/');
}

export const replaceUrl = (string:string, replace:string, withThis:string) => {
    return string.replace(replace, withThis);
}

export const sleep = (ms:number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getFieldType = (type:any) => {
    switch (type) {
        case 'TEXT' :
            return 'text';
        case 'TEXTAREA' :
            return 'textarea';
        case 'EMAIL' :
            return 'email';
        case "PHONE" :
            return 'tel';
        default :
            return 'text';
    }
}

// remove /graphql from url
export const getWordpressUrl = (url:string) => {
    const urlParts = url.split('/');
    urlParts.pop();
    return urlParts.join('/');
}
