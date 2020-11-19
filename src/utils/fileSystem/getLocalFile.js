import * as FileSystem from 'expo-file-system';

export default async path => {
    const base64File = await FileSystem.readAsStringAsync(path, {
        encoding: FileSystem.EncodingType.Base64
    })

    return `data:image/png;base64,${base64File}`
}

