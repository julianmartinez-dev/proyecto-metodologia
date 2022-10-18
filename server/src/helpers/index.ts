export function validateEmail(email: string) : Boolean {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

export function validateFullName(fullName: string) : Boolean {
    const regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(fullName);
}

export function validateIdentityCard(identityCard: string) : Boolean {
    if(typeof identityCard !== 'string') return false;
    const regex = /^[0-9]{8}$/;
    return regex.test(identityCard);
}