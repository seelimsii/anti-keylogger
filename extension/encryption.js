// Generate a random key for encryption
async function generateKey() {
    return await window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"]
    );
}

// Encrypt function
async function encryptData(key, data) {
    const enc = new TextEncoder();
    const encodedData = enc.encode(data);
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        encodedData
    );
    return { iv, encrypted };
}

// Decrypt function
async function decryptData(key, iv, encryptedData) {
    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        encryptedData
    );
    const dec = new TextDecoder();
    return dec.decode(decrypted);
}
